import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    host: 'https://cdn.contentful.com',
    namespace: 'spaces/nibrxe5ozouo',

    urlForFindRecord: function(id) {
        let baseUrl = this.buildURL();
        return `${baseUrl}/entries?select=fields&content_type=location&fields.slug=${id}&access_token=da2826c8c0a71a8a2def6ad4d01110b575abbeaf2e9c37311011eb82d4fc6973`;
    }
});