import { test } from 'qunit';
import moduleForAcceptance from 'cdg-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | user can see location');

test('visiting /user-can-see-location', function(assert) {
  visit('/locations/sheffield');

  andThen(function() {
    assert.equal(currentURL(), '/locations/sheffield');
    assert.equal(find('h1').text(), 'Sheffield');
  });
});
