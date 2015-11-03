import rp from 'request-promise';
import _ from 'lodash';

import secrets from '../secrets';
import URL from './url';

class Api {
    constructor(env) {
        // STAGING || PREPROD || PROD
        this._env = env || 'STAGING';
        this._token = null;
    }

    get token() {
        if (!this._token) {
            this._token = new Promise((resolve, reject) => {
                this._requestToken().then((data) => {
                    this._token = data.access.token.id;
                    resolve(this._token);
                }).catch((err) => {
                    reject(err);
                });
            });
        }

        return this._token;
    }

    createFixture(fixture) {
        return this.token.then((token) => {
            let request = {
                method: fixture.method,
                rejectUnauthorized: false,
                url: fixture.url,
                headers: {
                    'X-Auth-Token': token
                },
                body: fixture.body,
                json: true
            }

            return rp(request);
        });
    }

    createFixtures(fixtures) {
        return _.map(fixtures, this.createFixture.bind(this));
    }

    _requestToken() {
        let request = {
            method: 'POST',
            url: URL[this._env].IDENTITY,
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
}

export default Api;
