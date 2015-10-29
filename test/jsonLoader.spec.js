import JsonLoader from '../src/jsonLoader';

describe('JsonLoader Class', () => {
    let jsonLoader;

    before(() => {
        jsonLoader = new JsonLoader();
    });

    it('should read a json file', () => {
        let volumes = jsonLoader.read('fixture-definitions/volumes.json')
        let volume = {
            'display_name': '00-pasture-test-volume',
            'display_description': 'I am a test volume.',
            'size': 50,
            'volume_type': 'SSD'
        };
        expect(volumes).to.eql(volume);
    })
});
