import _ from "npm:underscore";
import DS from "ember-data";
import NotFoundError from "../errors/not-found-error";

export default DS.JSONAPISerializer.extend({
    normalizeFindRecordResponse(store, primaryModelClass, payload) {
        if(payload.items.length === 0) {
            throw new NotFoundError();
        }

        _.each(payload.items[0].fields, function (field) {
            if (field.hasOwnProperty('sys') && field.sys.linkType === "Asset") {
                let matchingAsset = _.find(payload.includes["Asset"], function (asset) {
                    return asset.sys.id === field.sys.id;
                });
                payload.items[0].fields["heroImageUrl"] = matchingAsset.fields.file.url;
            }
        });

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
