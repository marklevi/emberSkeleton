import { test } from 'qunit';
import moduleForAcceptance from 'cdg-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | user can see location');

test('visiting /user-can-see-location', function(assert) {
  visit('/locations/manchester');

  andThen(function() {
    assert.equal(currentURL(), '/locations/manchester');
    assert.equal(find('h1').text(), 'Manchester');
  });
});
