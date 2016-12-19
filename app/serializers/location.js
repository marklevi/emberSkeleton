import JSONAPISerializer from "ember-data/serializers/json-api";

export default JSONAPISerializer.extend({
    normalizeFindRecordResponse(store, primaryModelClass, payload) {
        payload = {
            data: {
                type: primaryModelClass.modelName,
                id: payload.items[0].fields.slug,
                attributes: payload.items[0].fields
            }
        };

        return payload;
    },
});
