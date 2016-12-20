import Ember from 'ember';

let NotFoundError = function (errors, message = 'This entry was not found.') {
    Ember.Error.call(this, message);

    this.errors = errors || [
            {
                title: 'This entry was not found',
                detail: message
            }
        ];
};

NotFoundError.prototype = Object.create(Ember.Error.prototype);

export default NotFoundError;
