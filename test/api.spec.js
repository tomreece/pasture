import path from 'path';
import _ from 'lodash';

import fixtures from '../src/volumeFixture';

describe('Api Class', () => {
    let api, Api;

    before(() => {
        Api = proxyquire(path.resolve(__dirname, '../src/api'), {
            'request-promise': sinon.stub().resolves({})
        });

        api = new Api();
    });

    it('should have a token if requesting a token succeeds', () => {
        return expect(api.token).to.eventually.not.be.undefined;
    });

    it('should not have a token if requesting a token fails');

    it('should create a volume', () => {
        return api.createFixture(fixtures[0]).then((response) => {
            return expect(response.volume.status).to.equal('creating');
        });
    });

    it('should create multiple volumes', () => {
        let promises = api.createFixtures(fixtures);
        return Promise.all(promises).then((fulfillments) => {
            _.each(fulfillments, (fulfillment) => {
                expect(fulfillment.volume.status).to.equal('creating');
            });
        });
    });
});
