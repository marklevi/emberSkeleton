import Ember from 'ember';
import Handlebars from 'npm:handlebars';

export function link(addressLocation) {
  let baseUrl = Handlebars.escapeExpression("https://www.google.com/maps/dir//");
  let text = Handlebars.escapeExpression("Get directions");
  let lat = addressLocation[0] + "";
  let long = addressLocation[1] + "";
  return new Handlebars.SafeString(
    "<a class='location__get-directions' href='" + baseUrl+ lat+ ','+ long+"'>"+'<h2>' + text + '</h2>'+"</a>"
  );
}

export default Ember.Helper.helper(link);

