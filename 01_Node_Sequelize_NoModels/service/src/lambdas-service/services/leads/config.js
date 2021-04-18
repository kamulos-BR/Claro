module.exports = {
    "setEmailEvents": {
        "timeout": 25,
        "events": [
            {
                "http": {
                    "method": "post",
                    "path": "/bwr/leads/email",
                    "private": false
                }
            }
        ]
    },
    "setFormEvents": {
        "timeout": 25,
        "events": [
            {
                "http": {
                    "method": "post",
                    "path": "/bwr/leads/form",
                    "private": false
                }
            }
        ]
    },
    "setChatEvents": {
        "timeout": 25,
        "events": [
            {
                "http": {
                    "method": "post",
                    "path": "/bwr/leads/chat",
                    "private": false
                }
            }
        ]
    },
    "setLeadConverted": {
        "timeout": 25,
        "events": [
            {
                "http": {
                    "method": "get",
                    "path": "/bwr/leads/convert/{idLead}/{typeLead}/{typeVl}",
                    "private": false
                }
            }
        ]
    }
};
