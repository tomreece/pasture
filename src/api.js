require('babel/register')

var log = require('verbalize');
var rp = require('request-promise');
var secrets = require('../secrets');

const URL = {
    STAGING: {
        BASE: 'https://staging.encore.rackspace.com',
        IDENTITY: 'https://staging.identity-internal.api.rackspacecloud.com/v2.0/tokens'
    },

    PREPROD: {
        BASE: 'https://preprod.encore.rackspace.com',
        IDENTITY: 'https://identity-internal.api.rackspacecloud.com/v2.0/tokens'
    },

    PROD: {
        BASE: 'https://encore.rackspace.com',
        IDENTITY: 'https://identity-internal.api.rackspacecloud.com/v2.0/tokens'
    }
}

class Api {
    constructor(env) {
        // STAGING || PREPROD || PROD
        this.env = env || 'PREPROD';
    }

    get token() {
        return new Promise((resolve, reject) => {
            if (this.xAuthToken) {
                resolve(this.xAuthToken);
            } else {
                this._requestToken().then((data) => {
                    this.xAuthToken = data.access.token.id;
                    resolve(this.xAuthToken);
                }).catch(function (err) {
                    // todo what do we do here? blow up!
                    reject(Error());
                });
            }
        });
    }

    _requestToken() {
        let request = {
            method: 'POST',
            url: URL[this.env].IDENTITY,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: {
                auth: {
                    'RAX-AUTH:domain': {
                        name: 'Rackspace'
                    },
                    passwordCredentials: {
                        username: secrets.username,
                        password: secrets.password
                    }
                }
            },
            json: true
        }

        return rp(request);
    }

    createVolume(volume) {
        let request = {
            method: 'POST',
            rejectUnauthorized: false,
            // todo do we need to be able to configure the user or region?
            url: URL[this.env].BASE + '/api/cloud/users/hub_cap/block_storage/ORD/volumes/',
            headers: {
                'X-Auth-Token': this.xAuthToken
            },
            body: volume,
            json: true
        }

        return rp(request);
    }
}

export default Api;
