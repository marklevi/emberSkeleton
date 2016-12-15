import JSONAPISerializer from "ember-data/serializers/json-api";

export default JSONAPISerializer.extend({
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
        payload = {data: {type: 'location',
                          id: payload.items[0].fields.slug,
                          attributes: payload.items[0].fields}};
        return this._super(store, primaryModelClass, payload, id, requestType);
    }
});