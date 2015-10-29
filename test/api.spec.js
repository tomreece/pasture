import Api from '../src/api';

describe('Api Class', () => {
    let api;

    before(() => {
        api = new Api();
    });

    it('should have a token if requesting a token succeeds', () => {
        return expect(api.token).to.eventually.equal('');
    });

    it('should not have a token if requesting a token fails', () => {
        return expect(api.token).to.eventually.equal('');
    });

    it('should create a volume', () => {
        let volume = {
            'display_name': '00-pasture-test-volume',
            'display_description': 'I am a test volume.',
            'size': 50,
            'volume_type': 'SSD'
        };

        return api.createVolume(volume).then(function (response) {
            return expect(response.volume.status).to.equal('creating');
        });
    });
});
