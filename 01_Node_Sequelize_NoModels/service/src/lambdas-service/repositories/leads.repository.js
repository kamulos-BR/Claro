"use strict";
const Repository = require('./repository');
const Functions = require('../helpers/functions');
const axios = require('axios').default;
const SM = require('../helpers/AWS/systems-manager');

class LeadsRepository extends Repository {

    constructor(connections) {
        super(connections);
    }

    async build(open) {
        await super.build(open);
        this.Connection = this.connection.mainConnection;
        this.Query = this.Connection.sequelize;

        this.SM = new SM();
        this.SMData = await this._getParameters();
    }

    async setEmailEvents(pathParameters, body) {
        try {

            if (!body) {
                throw new Error('Body not valid!');
            }

            if (body.hasOwnProperty('event_name')) {
                if (body.event_name !== 'chat_finished') {
                    return 'chat not finished';
                }
            }

            await this.build(true);

            const _origin = await Functions.getOriginByWidget(this.SMData, body.widget_id);

            if (!_origin) {
                throw new Error('Origin not valid!');
            }

            const _name = (body.visitor) ? body.visitor.name : null;
            const _email = (body.visitor) ? body.visitor.email : null;
            const _phone = (body.visitor) ? body.visitor.phone : null;

            const _messageHTML = (body.html_messages) ? body.html_messages : null;
            let _message = (body.plain_messages) ? body.plain_messages : null;
            const _channel = (_origin && _origin.channel) ? _origin.channel : null;

            const agent = Functions.getLastAgent(body);
            const _emailAgent = (agent.email) ? agent.email : null;
            const _nameAgent = (agent.name) ? agent.name : null;

            const _chatID = (body.chat_id) ? body.chat_id : null;
            const _widgetID = (body.widget_id) ? body.widget_id : null;

            const _utmJson = (body.session && body.session.utm_json) ? body.session.utm_json : null;
            const _campaign = (_utmJson && _utmJson.campaign) ? _utmJson.campaign : null;
            const _source = (_utmJson && _utmJson.source) ? _utmJson.source : null;
            const _medium = (_utmJson && _utmJson.medium) ? _utmJson.medium : null;
            const _keyword = (_utmJson && _utmJson.keyword) ? _utmJson.keyword : null;

            const _url = (body.page && body.page.url) ? body.page.url : null;
            const _gClid = Functions.getGClid(_url);
            const _dateTime = Functions.getDateNow();

            if (!_channel || _channel === 'invalid') {
                throw new Error('Channel not valid!');
            }

            let checkReg = null;
            if (!_chatID) {
                throw new Error('Channel Email not valid!');
            }
            else {
                checkReg = await this._getIDByChatID(_chatID, 'tblEmailData');
            }

            const dataFields = {
                name: Functions.checkUndefined(_name),
                email: Functions.checkUndefined(_email),
                phone: Functions.checkUndefined(_phone),
                message: (checkReg.message) ? `${_message}${checkReg.message}` : _message,
                channel: Functions.checkUndefined(_channel),
                emailAgent: Functions.checkUndefined(_emailAgent),
                nameAgent: Functions.checkUndefined(_nameAgent),
                chatID: Functions.checkUndefined(_chatID),
                widgetID: Functions.checkUndefined(_widgetID),
                campaign: Functions.checkUndefined(_campaign),
                source: Functions.checkUndefined(_source),
                medium: Functions.checkUndefined(_medium),
                keyword: Functions.checkUndefined(_keyword),
                gClid: Functions.checkUndefined(_gClid),
                url: Functions.checkUndefined(_url),
                dateTime: _dateTime
            };

            if (!checkReg.ID) {
                await this.Query.query(`INSERT INTO tblEmailData 
                                             (client_name, client_email, client_phone, client_message, client_channel,
                                             client_url, agent_email, agent_name, chat_id, widget_id, creation_date,
                                             utm_campaign, utm_source, utm_medium, utm_keyword, page_gclid)
                                        VALUES 
                                             (:name, :email, :phone, :message, :channel, 
                                             :url, :emailAgent, :nameAgent, :chatID, :widgetID, :dateTime,
                                             :campaign, :source, :medium, :keyword, :gClid)`, {
                    replacements: dataFields
                });

                checkReg = await this._getIDByChatID(_chatID, 'tblEmailData');
            }
            else {
                await this.Query.query(`UPDATE tblEmailData SET 
                                             client_name = :name, client_email = :email, client_phone = :phone, 
                                             client_message = :message, client_channel = :channel, client_url = :url, 
                                             agent_email = :emailAgent, agent_name = :nameAgent, chat_id = :chatID,
                                             widget_id = :widgetID, creation_date = :dateTime, utm_campaign = :campaign, 
                                             utm_source = :source, utm_medium = :medium, utm_keyword = :keyword, page_gclid = :gClid
                                         WHERE ID = ${checkReg.ID};`, {
                    replacements: dataFields
                });
            }

            await this.close();

            // CREATE LEAD
            // change message text to html - only for crm
            dataFields.message = (checkReg.message) ? `${_messageHTML}<br>${checkReg.message}` : _messageHTML;
            return await this._setCreateLead(checkReg.ID, _channel, dataFields, _origin, 'Email');

        }
        catch (err) {
            return Functions.responseThrowError('setEmailEvents', err, this);
        }
    }

    async setChatEvents(pathParameters, body) {
        try {

            if (!body) {
                throw new Error('Body not valid!');
            }

            if (body.hasOwnProperty('event_name')) {
                if (body.event_name !== 'chat_finished') {
                    return 'chat not finished';
                }
            }

            await this.build(true);

            const _origin = await Functions.getOriginByWidget(this.SMData, body.widget_id);

            if (!_origin) {
                throw new Error('Origin not valid!');
            }

            const _name = (body.visitor) ? body.visitor.name : null;
            const _email = (body.visitor) ? body.visitor.email : null;
            const _phone = (body.visitor) ? body.visitor.phone : null;
            const _messageHTML = (body.html_messages) ? body.html_messages : null;
            let _message = (body.plain_messages) ? body.plain_messages : null;
            const _channel = (_origin && _origin.channel) ? _origin.channel : null;

            const agent = Functions.getLastAgent(body);
            const _emailAgent = (agent.email) ? agent.email : null;
            const _nameAgent = (agent.name) ? agent.name : null;

            const _chatID = (body.chat_id) ? body.chat_id : null;
            const _widgetID = (body.widget_id) ? body.widget_id : null;

            const _utmJson = (body.session && body.session.utm_json) ? body.session.utm_json : null;
            const _campaign = (_utmJson && _utmJson.campaign) ? _utmJson.campaign : null;
            const _source = (_utmJson && _utmJson.source) ? _utmJson.source : null;
            const _medium = (_utmJson && _utmJson.medium) ? _utmJson.medium : null;
            const _keyword = (_utmJson && _utmJson.keyword) ? _utmJson.keyword : null;

            const _url = (body.page && body.page.url) ? body.page.url : null;
            const _gClid = Functions.getGClid(_url);
            const _dateTime = Functions.getDateNow();

            if (!_channel || _channel === 'invalid') {
                throw new Error('Channel not valid!');
            }

            let checkReg = null;
            if (!_chatID) {
                throw new Error('Channel Chat not valid!');
            }
            else {
                checkReg = await this._getIDByChatID(_chatID, 'tblChatData');
            }

            const dataFields = {
                name: Functions.checkUndefined(_name),
                email: Functions.checkUndefined(_email),
                phone: Functions.checkUndefined(_phone),
                message: (checkReg.message) ? `${_message}${checkReg.message}` : _message,
                channel: Functions.checkUndefined(_channel),
                emailAgent: Functions.checkUndefined(_emailAgent),
                nameAgent: Functions.checkUndefined(_nameAgent),
                chatID: Functions.checkUndefined(_chatID),
                widgetID: Functions.checkUndefined(_widgetID),
                campaign: Functions.checkUndefined(_campaign),
                source: Functions.checkUndefined(_source),
                medium: Functions.checkUndefined(_medium),
                keyword: Functions.checkUndefined(_keyword),
                gClid: Functions.checkUndefined(_gClid),
                url: Functions.checkUndefined(_url),
                dateTime: _dateTime
            };

            if (!checkReg.ID) {
                await this.Query.query(`INSERT INTO tblChatData 
                                             (client_name, client_email, client_phone, client_message, client_channel,
                                             client_url, agent_email, agent_name, chat_id, widget_id, creation_date,
                                             utm_campaign, utm_source, utm_medium, utm_keyword, page_gclid)
                                        VALUES 
                                             (:name, :email, :phone, :message, :channel, 
                                             :url, :emailAgent, :nameAgent, :chatID, :widgetID, :dateTime,
                                             :campaign, :source, :medium, :keyword, :gClid)`, {
                    replacements: dataFields
                });

                checkReg = await this._getIDByChatID(_chatID, 'tblChatData');
            }
            else {
                await this.Query.query(`UPDATE tblChatData SET 
                                             client_name = :name, client_email = :email, client_phone = :phone, 
                                             client_message = :message, client_channel = :channel, client_url = :url, 
                                             agent_email = :emailAgent, agent_name = :nameAgent, chat_id = :chatID,
                                             widget_id = :widgetID, creation_date = :dateTime, utm_campaign = :campaign, 
                                             utm_source = :source, utm_medium = :medium, utm_keyword = :keyword, page_gclid = :gClid
                                         WHERE ID = ${checkReg.ID};`, {
                    replacements: dataFields
                });
            }

            await this.close();

            // CREATE LEAD
            // change message text to html - only for crm
            dataFields.message = (checkReg.message) ? `${_messageHTML}<br>${checkReg.message}` : _messageHTML;
            return await this._setCreateLead(checkReg.ID, _channel, dataFields, _origin, 'Chat');

        }
        catch (err) {
            return Functions.responseThrowError('setChatEvents', err, this);
        }
    }

    async setFormEvents(pathParameters, body) {
        try {

            await this.build(true);

            body = decodeURIComponent(body);

            let _name = Functions.getFormField(body, 'nome');
            _name = Functions.replaceALL(_name, '+', ' ');

            const _email = Functions.getFormField(body, 'email').toLowerCase();

            let _phone = Functions.getFormField(body, 'telefone');
            _phone = Functions.replaceALL(_phone, '+', ' ');

            let _message = Functions.getFormField(body, 'mensagem');
            _message = Functions.replaceALL(_message, '+', ' ');

            const _channel = Functions.getFormField(body, 'formulario');
            const _url = Functions.checkUndefined(Functions.getFormField(body, 'hdnUrl'));

            if (!_url) {
                throw new Error('URL not valid, probably spam!');
            }

            const _gClid = Functions.getGClid(body);
            const _dateTime = Functions.getDateNow();
            const _chatID = Math.floor(Math.random() * 1000000);

            if (!_channel || _channel === 'invalid') {
                throw new Error('Channel not valid!');
            }

            const _utmSource = Functions.getFormField(_url, 'utm_source');
            const _utmMedium = Functions.getFormField(_url, 'utm_medium');
            const _utmCampaign = Functions.getFormField(_url, 'utm_campaign');
            const _utmTerm = Functions.getFormField(_url, 'utm_keyword');

            const _domain = Functions.getDomain(_url);
            const _origin = await Functions.getOriginByChannel(this.SMData, _channel);
            _origin.channel = _channel;

            const dataFields = {
                name: Functions.checkUndefined(_name),
                email: Functions.checkUndefined(_email),
                phone: Functions.checkUndefined(_phone),
                message: Functions.checkUndefined(_message),
                url: Functions.checkUndefined(_url),
                channel: Functions.checkUndefined(_channel),
                gClid: Functions.checkUndefined(_gClid),
                dateTime: _dateTime,
                chatID: _chatID,
                campaign: Functions.checkUndefined(_utmCampaign),
                source: Functions.checkUndefined(_utmSource),
                medium: Functions.checkUndefined(_utmMedium),
                keyword: Functions.checkUndefined(_utmTerm),
                emailAgent: 'corretoraresplendore@gmail.com'
            };

            await this.Query.query(`INSERT INTO tblFormData 
                                             (client_name, client_email, client_phone, client_message, 
                                              client_url, client_channel, page_gclid, creation_date, chat_id,
                                              utm_campaign, utm_source, utm_medium, utm_keyword)
                                            
                                     VALUES (:name, :email, :phone, :message, :url, 
                                             :channel, :gClid, :dateTime, :chatID,
                                             :campaign, :source, :medium, :keyword)`, {
                replacements: dataFields
            });

            let checkReg = null;
            if (!_chatID) {
                throw new Error('Channel Form not valid!');
            }
            else {
                checkReg = await this._getIDByChatIDAndEmail(_chatID, _email,'tblFormData');
            }

            await this.close();

            // CREATE LEAD
            return await this._setCreateLead(checkReg.ID, _channel, dataFields, _origin, 'Form');
        }
        catch (err) {
            return Functions.responseThrowError('setFormEvents', err, this);
        }
    }

    async setLeadConverted(pathParameters, body) {
        let result = null;
        try {

            await this.build(true);

            let _table = '';
            if (pathParameters.typeLead === 'Email') {
                _table = 'tblEmailData'
            }
            else if (pathParameters.typeLead === 'Chat') {
                _table = 'tblChatData'
            }
            else if (pathParameters.typeLead === 'Form') {
                _table = 'tblFormData'
            }
            else {
                throw new Error('Type not valid!');
            }

            if (!pathParameters.idLead) {
                throw new Error('Lead not valid!');
            }

            if (!pathParameters.typeVl) {
                throw new Error('Lead value not valid!');
            }

            result = await this.Query.query(`UPDATE ${_table} 
                                                SET converted_lead = :converted 
                                             WHERE ID = :ID`, {
                replacements: {
                    ID: pathParameters.idLead,
                    converted: pathParameters.typeVl
                }
            });

            await this.close();
            return {redirectURL: 'https://lead-html-redirect.s3-sa-east-1.amazonaws.com/lead_success.html'};
        }
        catch (err) {
            const f = Functions.responseThrowError('setLeadConverted', err, this);
            return {redirectURL: 'https://lead-html-redirect.s3-sa-east-1.amazonaws.com/lead_error.html'};
        }
    }

    // private functions -----------------------------------------------------------------------
    async _setCreateLead(ID, channel, dataFields, origin, type) {

        let result = {
            success: false,
            message: null
        };

        let request = null;

        try {

            // router -----------------------------------------------------------------------------
            let router = 10;
            const routers = await Functions.getRouter(this.SMData, dataFields.emailAgent);
            if (routers) {
                router = routers.router;
            }
            // ------------------------------------------------------------------------------------

            const url = 'https://api.xcrm.com.br/index.php/external_resources/create_lead';

            const headers = {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            };

            request = {
                "domain": (origin && origin.domain) ? origin.domain : 'reducaocusto.com.br',
                "id_origin": (origin && origin.ID) ? origin.ID : 29,
                "id_router": router,
                "router_name": dataFields.emailAgent,
                "name": dataFields.name,
                "email": dataFields.email,
                "phone": dataFields.phone,
                "interest": Functions.getInterest(ID, type, dataFields.message, dataFields.gClid, origin.channel).toString()
            };

            axios.defaults.timeout = 15000;
            const objClient = await axios.post(url, request, {headers: headers});
            if (objClient.status === 200) {
                result.success = true;
                result.message = `Lead created successfully - Info ID: ${objClient.data.id}`;
                console.log('*************** LEAD CREATED SUCCESSFULLY ***************', result);
            }
            else {
                console.log('*************** LEAD ERROR ***************', request, result);
            }

        }
        catch (err) {
            console.log('*************** LEAD ERROR ***************', request, result);
            result.message = err.message;
        }

        return result;
    }

    async _getIDByChatID(chatID, source) {

        const response = {
            ID: null,
            message: null
        };

        if (chatID) {
            await this.Query.query(`SELECT ID, client_message 
                                    FROM ${source} WHERE chat_id = :chatID;`, {
                replacements: {
                    chatID: chatID
                }
            }).then( data => {
                response.ID = Functions.getTableFieldValue(data, 'ID');
                response.message = Functions.getTableFieldValue(data, 'client_message');
            });
        }

        return response;
    }

    async _getIDByChatIDAndEmail(chatID, email, source) {

        const response = {
            ID: null,
            message: null
        };

        if (chatID) {
            await this.Query.query(`SELECT ID, client_message 
                                    FROM ${source} 
                                    WHERE chat_id = :chatID 
                                    AND client_email = :email;`, {
                replacements: {
                    chatID: chatID,
                    email: email
                }
            }).then( data => {
                response.ID = Functions.getTableFieldValue(data, 'ID');
                response.message = Functions.getTableFieldValue(data, 'client_message');
            });
        }

        return response;
    }

    async _getParameters() {
        try {
            return await this.SM.getParameters();
        }
        catch (err) {
            console.log('ERROR', err.message);
            return [
                {
                    "Name": "origin",
                    "Value": "{\"data\":[{\"widget_id\":\"q0P6K37ai5\",\"ID\":29,\"campaign\":\"Stephen\",\"domain\":\"reducaocusto.com.br\",\"channel\":\"ReducaoCusto_Chat_Agencia_01\"},{\"widget_id\":\"NmxfZQRmPz\",\"ID\":14,\"campaign\":\"Stephen\",\"domain\":\"reducaocusto.com.br\",\"channel\":\"ReducaoCusto_Chat_Agencia_01\"},{\"widget_id\":\"VQyNVxjGTg\",\"ID\":10,\"campaign\":\"Stephen\",\"domain\":\"reducaocusto.com.br\",\"channel\":\"ReducaoCusto_Chat_Agencia_01\"},{\"widget_id\":\"yTt4VsGYEO\",\"ID\":29,\"campaign\":\"Stephen\",\"domain\":\"amilplanosempresariais.com.br\",\"channel\":\"Amil_Chat_Agencia_02\"},{\"widget_id\":\"sfJ69awQra\",\"ID\":29,\"campaign\":\"Stephen\",\"domain\":\"bradescoplanosempresariais.com.br\",\"channel\":\"Bradesco_Chat_Agencia_02\"},{\"widget_id\":\"s1NUffAhSJ\",\"ID\":29,\"campaign\":\"Stephen\",\"domain\":\"bradescoodontovendas.com.br\",\"channel\":\"\"},{\"widget_id\":\"fDYdTEo6aH\",\"ID\":29,\"campaign\":\"Stephen\",\"domain\":\"intermedicaplanosempresas.com.br\",\"channel\":\"Intermedica_Chat_Agencia_02\"},{\"widget_id\":\"DHJc8MB8Rg\",\"ID\":29,\"campaign\":\"Stephen\",\"domain\":\"portoseguroplanosempresa.com.br\",\"channel\":\"PortoSeguro_Chat_Agencia_02\"},{\"widget_id\":\"qrQQsPMNUH\",\"ID\":29,\"campaign\":\"Stephen\",\"domain\":\"goldencrossplanosempresas.com.br\",\"channel\":\"GoldenCross_Chat_Agencia_02\"},{\"widget_id\":\"PmTGE1CCdY\",\"ID\":9,\"campaign\":\"Tribbo\",\"domain\":\"amilcentralvenda.com.br\",\"channel\":\"Amil_Chat_Agencia_01\"},{\"widget_id\":\"tqrBRTEQz3\",\"ID\":9,\"campaign\":\"Tribbo\",\"domain\":\"bradescocentralvendas.com.br\",\"channel\":\"Bradesco_Chat_Agencia_01\"},{\"widget_id\":\"kp8T6Co3Z0\",\"ID\":9,\"campaign\":\"Tribbo\",\"domain\":\"intermedicacentralvendas.com.br\",\"channel\":\"Intermedica_Chat_Agencia_01\"},{\"widget_id\":\"GfE2RQmtMl\",\"ID\":9,\"campaign\":\"Tribbo\",\"domain\":\"portosegurocentralvendas.com.br\",\"channel\":\"PortoSeguro_Chat_Agencia_01\"},{\"widget_id\":\"2vGwK5HjDX\",\"ID\":9,\"campaign\":\"Tribbo\",\"domain\":\"goldencrosscentralvendas.com.br\",\"channel\":\"GoldenCross_Chat_Agencia_01\"}]}"
                },
                {
                    "Name": "router",
                    "Value": "{\"data\":[{\"email\":\"comercial8@bwrseguros.com.br\",\"router\":2,\"name\":\"\"},{\"email\":\"comercial6@bwrseguros.com.br\",\"router\":4,\"name\":\"Ricardo\"},{\"email\":\"comercial7@bwrseguros.com.br\",\"router\":5,\"name\":\"Ana Carolina\"},{\"email\":\"comercial12@bwrseguros.com.br\",\"router\":6,\"name\":\"Mayumi\"},{\"email\":\"brunaporto@bwrseguros.com.br\",\"router\":7,\"name\":\"Bruna\"},{\"email\":\"comercial1@bwrseguros.com.br\",\"router\":8,\"name\":\"jose\"},{\"email\":\"comercial2@bwrseguros.com.br\",\"router\":9,\"name\":\"karen\"},{\"email\":\"comercial4@bwrseguros.com.br\",\"router\":10,\"name\":\"Lara\"},{\"email\":\"comercial10@bwrseguros.com.br\",\"router\":11,\"name\":\"Larissa\"},{\"email\":\"comercial5@bwrseguros.com.br\",\"router\":12,\"name\":\"Lindomar\"},{\"email\":\"comercial9@bwrseguros.com.br\",\"router\":13,\"name\":\"Lucas\"},{\"email\":\"comercial3@bwrseguros.com.br\",\"router\":14,\"name\":\"Nivia\"},{\"email\":\"comercial11@bwrseguros.com.br\",\"router\":15,\"name\":\"Priscila\"},{\"email\":\"rosepedroso@bwrseguros.com.br\",\"router\":17,\"name\":\"Rose\"},{\"email\":\"corretoraresplendore@gmail.com\",\"router\":17,\"name\":\"Rose\"}]}  "
                }
            ];
        }

    }
    // private functions -----------------------------------------------------------------------
}

module.exports = LeadsRepository;
