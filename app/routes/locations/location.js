import Ember from "ember";

export default Ember.Route.extend({
    model(params) {
        this.get('store').createRecord('location', {
            id: "manchester",
            title: "Manchester"
        }).save();

        return this.store.findRecord('location', params["location_id"]);
    }

});