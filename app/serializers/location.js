import _ from "npm:underscore";
import DS from "ember-data";
import NotFoundError from "../errors/not-found-error";

function resolveEntryLinks(field, payload) {
    if (field.hasOwnProperty('sys') && field.sys.linkType === "Entry") {
        let matchedEntry = _.find(payload.includes["Entry"], function (entry) {
            return entry.sys.id === field.sys.id;
        });

        return matchedEntry.fields;
    }
}

export default DS.JSONAPISerializer.extend({
    normalizeFindRecordResponse(store, primaryModelClass, payload) {
        if(payload.items.length === 0) {
            throw new NotFoundError();
        }

        let fields = payload.items[0].fields;

        _.mapObject(fields, function (field, fieldName) {
            let resolvedFields = resolveEntryLinks(field, payload);
            if (resolvedFields) {
                fields[fieldName] = resolvedFields;
            }

            if (field.hasOwnProperty('sys') && field.sys.linkType === "Asset") {
                let matchingAsset = _.find(payload.includes["Asset"], function (asset) {
                    return asset.sys.id === field.sys.id;
                });
                fields[fieldName] = matchingAsset.fields.file.url;
            }
        });

        payload = {
            data: {
                type: primaryModelClass.modelName,
                id: payload.items[0].fields.slug,
                attributes: fields
            }
        };

        return payload;
    },
});
