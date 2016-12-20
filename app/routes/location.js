import Ember from "ember";
import NotFoundError from "../errors/not-found-error";

export default Ember.Route.extend({
    model(params) {
        return this.store.findRecord('location', params.location_id);

    },
    actions: {
        error(err) {
            if (err instanceof NotFoundError) {
                return this.intermediateTransitionTo('404', '404');
            }
        }
    }
});