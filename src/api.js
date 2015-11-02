require('babel/register');

import rp from 'request-promise';
import _ from 'lodash';

import secrets from '../secrets';
import URL from './url';

class Api {
    constructor(env) {
        // STAGING || PREPROD || PROD
        this.env = env || 'STAGING';
        this.xAuthToken = null;
    }

    get token() {
        return new Promise((resolve, reject) => {
            if (this.xAuthToken) {
                resolve(this.xAuthToken);
            } else {
                this._requestToken().then((data) => {
                    this.xAuthToken = data.access.token.id;
                    resolve(this.xAuthToken);
                }).catch((err) => {
                    reject(err);
                });
            }
        });
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
}

export default Api;
