
import { priceResolver } from 'cdg-frontend/helpers/price-resolver';
import { module, test } from 'qunit';

module('Unit | Helper | price resolver');

test('it works', function(assert) {
  let result = priceResolver([{pricebandL: "1.05"}, {title: "L"}]);
  assert.equal(result, "1.05");
});
