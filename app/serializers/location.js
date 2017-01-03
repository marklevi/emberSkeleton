import _ from "npm:underscore";
import DS from "ember-data";
import NotFoundError from "../errors/not-found-error";

function resolveEntryLinks(fieldValue, fieldName, payload, context) {
    if (fieldValue.hasOwnProperty('sys') && fieldValue.sys.linkType === "Entry") {
        let matchedEntry = _.find(payload.includes["Entry"], function (entry) {
            return entry.sys.id === fieldValue.sys.id;
        });

        if(matchedEntry) {
            context[fieldName] = matchedEntry.fields;
        }
    }
}

export default DS.JSONAPISerializer.extend({
    normalizeFindRecordResponse(store, primaryModelClass, payload) {
        if(payload.items.length === 0) {
            throw new NotFoundError();
        }

        let fields = payload.items[0].fields;

        _.mapObject(fields, function (fieldValue, fieldName) {
            resolveEntryLinks(fieldValue, fieldName, payload, fields);

            if (fieldValue.hasOwnProperty('sys') && fieldValue.sys.linkType === "Asset") {
                let matchingAsset = _.find(payload.includes["Asset"], function (asset) {
                    return asset.sys.id === fieldValue.sys.id;
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
