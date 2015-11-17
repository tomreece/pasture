class VolumeFixture {
    constructor(body) {
        this.body = body;
        this.method = 'POST';
        // abstract base url
        this.url = 'https://staging.encore.rackspace.com/api/cloud/users/hub_cap/block_storage/ORD/volumes/';
    }
}

let volumeFixtures = [
    new VolumeFixture({
        'display_name': '00-pasture-test-volume',
        'display_description': 'I am a test volume.',
        'size': 50,
        'volume_type': 'SSD'
    }),

    new VolumeFixture({
        'display_name': '01-pasture-test-volume',
        'display_description': 'I am a test volume.',
        'size': 50,
        'volume_type': 'SSD'
    }),

    new VolumeFixture({
        'display_name': '02-pasture-test-volume',
        'display_description': 'I am a test volume.',
        'size': 50,
        'volume_type': 'SSD'
    })
];

export default volumeFixtures;