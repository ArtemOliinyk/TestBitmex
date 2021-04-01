export const makeSimpleRequest = async (path) => {
    const requestOptions = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };
    return (await fetch(`/api/v1/${path}`, requestOptions)).json();
};

export const makeRequestAuth = async (path, method, body) => {
    const crypto = require('crypto');

    const apiSecret = "-hoVHM9kC1JRwlQBPjYdzosCCpKl7CNtomzyCTGVoLcQ5PSV";
    const apiKey = "48GphC_MTWN_0ntW4V1osU4S";

    const expires = Math.round(new Date().getTime() / 1000) + 60;

    let signature;
    signature = crypto.createHmac('sha256', apiSecret)
        .update(`${method}/api/v1/${path}` + expires + (body ? body : ''))
        .digest('hex');

    const requestOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'api-expires': expires,
            'api-key': apiKey,
            'api-signature': signature
        },
        body: body

    };
    return (await fetch(`/api/v1/${path}`, requestOptions)).json();
};