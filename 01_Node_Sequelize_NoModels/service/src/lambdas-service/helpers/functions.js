"use strict";
const striptags = require('striptags');
const momentTZ = require('moment-timezone');

Object.defineProperty(exports, "__esModule", {value: true});

class Functions {

    static responseError(err) {
        return err.message.split('Error:').join('').trim();
    }

    static async responseThrowError(functionName, err, obj) {
        console.log(`Function ${functionName} has a error:  `, err.message);
        throw new Error(err.message);
    }

    static getPathParameters(event) {
        return (event.pathParameters) ? event.pathParameters : null;
    }

    static getBody(event) {
        return (event.body) ? this.checkIsJson(event.body) ? JSON.parse(event.body) : event.body : null;
    }

    static checkIsJson(value) {
        try {
            JSON.parse(value);
            return true;
        }
        catch (err) {
            return false;
        }
    }

    static checkUndefined(value) {
        return (!value || value === undefined) ? null : value;
    }

    static getInterest(ID, type, message, gClid, channel) {
        const atob = require('atob');
        const btoa = require('btoa');
        const gClidFound = (gClid) ? 'gClid encontrado!' : '';
        const url1 = btoa(`https://9obv45dc54.execute-api.sa-east-1.amazonaws.com/prod/bwr/leads/convert/${ID}/${type}/1`); // approved
        const url2 = btoa(`https://9obv45dc54.execute-api.sa-east-1.amazonaws.com/prod/bwr/leads/convert/${ID}/${type}/0`); // not

        return `<h3><b>CANAL: ${this.replaceALL(channel, '_', ' ')}</b></h3>
                <div style="display: inline-block">
                   <button type="button" onclick="window.open(atob('${url1}'))">Lead</button>
                </div>
                <div style="display: inline-block">
                   <button type="button" onclick="window.open(atob('${url2}'))">ADM</button>
                </div>
                <br>${gClidFound}<br>${message}`;
    }

    static getFormField(body, field) {
        const exists = body.includes(`${field}=`);
        if (exists) {
            const arrField = body.split(`${field}=`);
            if (arrField && arrField[1]) {
                const final = arrField[1].split('&');
                if (final && final[0]) {
                    return final[0];
                }
            }
        }
        else {
            return '';
        }
    }

    static getGClid(url) {
        if (!url) {
            return '';
        }

        const field = 'gclid';
        const exists = url.includes(`${field}=`);
        if (exists) {
            const arrField = url.split(`${field}=`);
            if (arrField && arrField[1]) {
                const final = arrField[1].split('&');
                if (final && final[0]) {
                    return final[0];
                }
            }
        }
        else {
            return '';
        }
    }

    static getDomain(url) {
        if (!url) {
            return null;
        }

        const _arrDomain = url.split('/');
        for (const i of _arrDomain) {
            if (i && i.includes('.com.br')) {
                return i;
            }
        }
    }

    static async getRouter(SMData, emailAgent) {
        const _data = SMData.filter(f => f.Name === 'router')[0];
        const _json = JSON.parse(_data.Value).data;
        const _filter = _json.filter(f => f.email === emailAgent);

        return (_filter.length > 0) ? _filter[0] : null;
    }

    static async getOriginByWidget(SMData, widgetID) {
        const _data = SMData.filter(f => f.Name === 'origin')[0];
        const _json = JSON.parse(_data.Value).data;
        const _filter = _json.filter(f => f.widget_id === widgetID);

        return (_filter.length > 0) ? _filter[0] : null;
    }

    static async getOriginByDomain(SMData, domain) {
        const _data = SMData.filter(f => f.Name === 'origin')[0];
        const _json = JSON.parse(_data.Value).data;
        const _filter = _json.filter(f => f.domain === domain);

        return (_filter.length > 0) ? _filter[0] : null;
    }

    static async getOriginByChannel(SMData, channel) {
        const _data = SMData.filter(f => f.Name === 'origin')[0];
        const _json = JSON.parse(_data.Value).data;
        const _filter = _json.filter(f => f.channel === channel);

        return (_filter.length > 0) ? _filter[0] : null;
    }

    static replaceALL(data, o, d) {
        return (data) ? data.toString().split(o).join(d): null;
    }

    static getTableFieldValue(data, fieldName) {
        return (data && data[0] && data[0][0] && data[0][0][fieldName]) ? data[0][0][fieldName] : null;
    }

    static getRecords(event) {
        return (event.Records) ? event.Records : null;
    }

    static clearLineBreak(text) {
        return text.toString().replace(/\r?\n|\r/g, " ").trim();
    }

    static clearLineBreakAndHtml(text) {
        return striptags(text.toString().replace(/\r?\n|\r/g, " ").trim());
    }

    static chunkArrays(array, chunk) {
        const arrayLength = array.length;
        const tempArray = [];

        for (let index = 0; index < arrayLength; index += chunk) {
            const myChunk = array.slice(index, index + chunk);
            // Do something if you want with the group
            tempArray.push(myChunk);
        }

        return tempArray;
    }

    static logger(msg, level) {
        switch (level) {
            case 'error':
                console.error(msg);
                // logger.error(msg.toString());
                throw new Error(msg.toString());
            case 'debug':
                console.debug(msg);
                // logger.debug(msg);
                break;
            case 'log':
                // logger.info(msg);
                break;
        }
    }

    static chunkArray(array, chunkSize) {
        const R = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            R.push(array.slice(i, i + chunkSize));
        }

        return R;
    }

    static groupBy(xs, key) {
        return xs.reduce((rv, x) => {
            (rv[x[key]] = rv[x[key]] || []).push(x);

            return rv;
        }, {});
    }

    static flatten(obj, name, stem) {
        let out = {};
        // const newStem = (typeof stem !== 'undefined' && stem !== '') ? stem + '_' + name : name;

        if (typeof obj !== 'object') {
            out[name] = obj;
            return out;
        }

        for (const p in obj) {
            const prop = Functions.flatten(obj[p], p, name);
            out = Functions.merge([out, prop]);
        }

        return out;
    }

    static merge(objects) {
        const out = {};

        for (let i = 0; i < objects.length; i++) {
            for (let p in objects[i]) {
                if (objects[i].hasOwnProperty(p)) {
                    out[p] = objects[i][p];
                }
            }
        }

        return out;
    }

    static getDateNow() {
        return momentTZ().tz('America/Sao_Paulo').toISOString();
    }

    static getLastAgent(body) {
        try {
            if (body.agents && body.agents.length > 0) {
                let agent;
                if (body.agents.length > 1) {
                    agent = body.chat.messages[body.chat.messages.length - 1].agent_id;
                    const email =  body.agents.filter((f) => f.id === agent)[0].email;
                    const name =  body.agents.filter((f) => f.id === agent)[0].name;
                    return {email: email, name: name};
                }
                else {
                    return {email: body.agents[0].email, name: body.agents[0].name};
                }
            }
        }
        catch (e) {
            return '';
        }
    }
}

module.exports = Functions;
