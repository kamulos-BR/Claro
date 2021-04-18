"use strict";

class CustomResponse {

    constructor(statusCode, message, data, url = null) {
        this._statusCode = statusCode;
        this._message = message;
        this._data = data;
        this._url = url;
    }

    getResponse() {
        if (!this._url) {
            return {
                statusCode: this._statusCode,
                body: JSON.stringify({
                    statusCode: this._statusCode,
                    message: this._message,
                    data: this._data
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': 'GET,OPTIONS',
                    'Access-Control-Max-Age': this._getMaxAge(),
                    'Access-Control-Allow-Origin': this._getOrigin()
                }
            }
        }
        else {
            return {
                statusCode: 301,
                headers: {
                    Location: this._url
                }
            }
        }
    }

    _getMaxAge() {
        return 3600;
    }

    _getOrigin() {
        return '*';
    }

}

module.exports = CustomResponse;
