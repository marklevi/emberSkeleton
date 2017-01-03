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

test('resolves entry links up to 1 deep', function(assert) {
    let record = this.subject();
    let normalizedResponse = record.store.serializerFor('location')
        .normalizeFindRecordResponse({},
            {modelName: "location"},
            {
                items: [{
                    fields: {
                        menu1: {
                            "sys": {
                                "type": "Link",
                                "linkType": "Entry",
                                "id": "id-of-entry"
                            }
                        }
                    }
                }],
                includes: {
                    "Entry": [
                        {
                            "sys": {
                                "id": "id-of-entry"
                            },
                            "fields": {
                                "title": "Test Entry"
                            }
                        }
                    ]
                }
            },
            "manchester", "RecordType");

    assert.deepEqual(normalizedResponse.data.attributes.menu1, {"title": "Test Entry"});
});

test('resolves entry links up to 2 layers deep', function(assert) {
    let record = this.subject();
    let normalizedResponse = record.store.serializerFor('location')
        .normalizeFindRecordResponse({},
            {modelName: "location"},
            {
                items: [{
                    fields: {
                        menu1: {
                            "sys": {
                                "type": "Link",
                                "linkType": "Entry",
                                "id": "id-of-entry"
                            }
                        }
                    }
                }],
                includes: {
                    "Entry": [
                        {
                            "sys": {
                                "id": "id-of-entry"
                            },
                            "fields": {
                                "title": "Brunch Menu",
                                "submenus": [
                                    {
                                        "sys": {
                                            "type": "Link",
                                            "linkType": "Entry",
                                            "id": "id-of-submenu"
                                        }
                                    }
                                ]

                            }
                        },
                        {
                            "sys": {
                                "id": "id-of-submenu"
                            },
                            "fields": {
                                "title": "tapas offerings"
                            }
                        }
                    ]
                }
            },
            "manchester", "RecordType");

    assert.deepEqual(normalizedResponse.data.attributes.menu1, {"title": "Brunch Menu", "submenus": [{"title": "tapas offerings"}]});
});


