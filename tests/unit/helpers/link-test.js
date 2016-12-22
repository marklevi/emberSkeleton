import Handlebars from "npm:handlebars";
import {link} from "cdg-frontend/helpers/link";
import {module, test} from "qunit";

module('Unit | Helper | link');

test('should resturn an instance of handlebars safeString', function(assert) {
  let result = link([42,-1]);
  assert.ok(result instanceof Handlebars.SafeString);
});

