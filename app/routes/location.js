import Ember from "ember";
import NotFoundError from "../errors/not-found-error";

export default Ember.Route.extend({
    model(params) {
        return this.store.findRecord('location', params.location_id);

    },

    setupController (controller, model) {
      controller.setProperties({
        markers: Ember.A([
          {
            lat: model.get('addressLocation').lat,
            lng: model.get('addressLocation').lon
          }
        ])
      });
      this._super(controller, model);
    },

    actions: {
        error(err) {
            if (err instanceof NotFoundError) {
                return this.intermediateTransitionTo('404', '404');
            }
        }
    }
});
