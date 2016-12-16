import DS from 'ember-data';
import ENV from 'cdg-frontend/config/environment';

export default DS.JSONAPIAdapter.extend({
    host: 'https://cdn.contentful.com',
    namespace: 'spaces/' + ENV.APP.CONTENTFUL_SPACE,

    urlForFindRecord: function(id) {
        let baseUrl = this.buildURL();
        return `${baseUrl}/entries?select=fields&content_type=location&fields.slug=${id}&access_token=${ENV.APP.CONTENTFUL_ACCESS_TOKEN}`;
    }
});