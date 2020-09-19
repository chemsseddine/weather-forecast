const Joi = require('joi-browser');

function validateSchema(resp, schema) {
    if (schema) {
        Joi.validate(resp, schema, function (err) {
            if (err) throw new Error(err);
        });
    }
    return resp;
}

function parseJSON(response, schema) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export default function request(url, schema, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(resp => validateSchema(resp, schema));
}
