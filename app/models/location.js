import DS from "ember-data";

export default DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),
    heroImageUrl: DS.attr('url'),
    addressLocation: DS.attr(),
    addressText: DS.attr('string'),
    openingHours: DS.attr('string')
});
