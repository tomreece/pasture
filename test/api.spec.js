import path from 'path';
import _ from 'lodash';

import fixtures from '../src/volumeFixture';

describe('Api Class', () => {
    let api, Api, rpStub;

    beforeEach(() => {
        rpStub = sinon.stub();

        Api = proxyquire(path.resolve(__dirname, '../src/api'), {
            'request-promise': rpStub
        });

        api = new Api();
    });

    describe('_requestToken', () => {
        it('should get a new token if it does not already have a token', () => {
            rpStub.resolves({ access: { token: { id: 'f4k3t0k3n' }}});

            let tokenPromise = api.token;
            expect(tokenPromise).to.eventually.equal('f4k3t0k3n');
            expect(rpStub).to.have.been.calledOnce;
            return tokenPromise;
        });

        it('should get a token only once', () => {
            rpStub.resolves({ access: { token: { id: 'f4k3t0k3n' }}});

            let tokenPromise = api.token;
            let otherTokenPromise = api.token;
            expect(rpStub).to.have.been.calledOnce;
            return tokenPromise;
        });

        it('should error if requesting a token fails', () => {
            rpStub.throws();

            return expect(api.token).to.be.rejected;
        });
    });

    describe.skip('createFixture', () => {
        it('should create a volume', () => {
            return api.createFixture(fixtures[0]).then((response) => {
                return expect(response.volume.status).to.equal('creating');
            });
        });
    });

    describe.skip('createFixtures', () => {
        it('should create multiple volumes', () => {
            let promises = api.createFixtures(fixtures);
            return Promise.all(promises).then((fulfillments) => {
                _.each(fulfillments, (fulfillment) => {
                    expect(fulfillment.volume.status).to.equal('creating');
                });
            });
        });
    });
});
