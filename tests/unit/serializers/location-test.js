import {moduleForModel, test} from "ember-qunit";

moduleForModel('location', 'Unit | Serializer | location', {
    needs: ['serializer:location']
});

test('it serializes records', function (assert) {
    let record = this.subject();
    let normalizedResponse = record.store.serializerFor('location')
        .normalizeFindRecordResponse({},
            {modelName: "location"},
            {items: [{fields: {slug: "manchester"}}]},
            "manchester", "RecordType");

    assert.equal(normalizedResponse.data.type,
        'location');

    assert.equal(normalizedResponse.data.id,
        'manchester');

    assert.deepEqual(normalizedResponse.data.attributes,
        {slug: "manchester"});
});

test('it resolves asset links', function (assert) {
    let record = this.subject();
    let normalizedResponse = record.store.serializerFor('location')
        .normalizeFindRecordResponse({},
            {modelName: "location"},
            {
                items: [{
                    fields: {
                        image: {
                            "sys": {
                                "type": "Link",
                                "linkType": "Asset",
                                "id": "id-of-image"
                            }
                        }
                    }
                }],
                includes: {
                    "Asset": [
                        {
                            "sys": {
                                "id": "id-of-image"
                            },
                            "fields": {
                                "file": {
                                    "url": "/link/to/cool/image.jpg"
                                }
                            }
                        }
                    ]
                }
            },
            "manchester", "RecordType");

    assert.equal(normalizedResponse.data.attributes.image, "/link/to/cool/image.jpg");
});
