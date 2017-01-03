import _ from "npm:underscore";
import DS from "ember-data";
import NotFoundError from "../errors/not-found-error";

function resolveEntryLinks(fieldValue, fieldName, payload, context) {
    if(_.isArray(fieldValue))  {
        _.each(fieldValue, function(arrayItem) {
            resolveEntryLinks(arrayItem, fieldName, payload, context);
        });
    }

    if (fieldValue.hasOwnProperty('sys') && fieldValue.sys.linkType === "Entry") {
        let matchedEntry = _.find(payload.includes["Entry"], function (entry) {
            return entry.sys.id === fieldValue.sys.id;
        });

        if(matchedEntry) {
            if(_.isArray(context[fieldName])) {
                let fieldsWithCorrespondingSysRemoved = _.reject(context[fieldName], function(fieldInArray) {
                    return fieldInArray.sys && fieldInArray.sys.id === fieldValue.sys.id;
                });
                fieldsWithCorrespondingSysRemoved.push(matchedEntry.fields);
                context[fieldName] = fieldsWithCorrespondingSysRemoved;
            } else {
                context[fieldName] = matchedEntry.fields;
            }

            _.mapObject(matchedEntry.fields, function(mappedEntryValue, mappedEntryFieldName) {
                resolveEntryLinks(mappedEntryValue, mappedEntryFieldName, payload, matchedEntry.fields);
            });
        }

    }
}

function resolveAssetLink(fieldValue, payload, fields, fieldName) {
    if (fieldValue.hasOwnProperty('sys') && fieldValue.sys.linkType === "Asset") {
        let matchingAsset = _.find(payload.includes["Asset"], function (asset) {
            return asset.sys.id === fieldValue.sys.id;
        });
        fields[fieldName] = matchingAsset.fields.file.url;
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
            resolveAssetLink(fieldValue, payload, fields, fieldName);
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
