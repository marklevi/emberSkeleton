import {moduleForModel, test} from 'ember-qunit';

moduleForModel('location', 'Unit | Serializer | location', {
    needs: ['serializer:location']
});

test('it serializes records', function (assert) {
    let record = this.subject();
    let normalizedResponse = record.store.serializerFor('location')
        .normalizeFindRecordResponse({},
            {modelName: "location"},
            {items: [{fields: [{slug: "manchester"}]}]},
            "manchester", "RecordType");
    
    assert.equal(normalizedResponse.data.type,
        'location');
});
