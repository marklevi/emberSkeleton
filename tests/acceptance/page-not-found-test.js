import { test } from 'qunit';
import moduleForAcceptance from 'cdg-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | page not found');

test('visiting /page-not-found', function(assert) {
  visit('/page-not-found');

  andThen(function() {
    assert.equal(currentURL(), '/page-not-found');
    assert.equal(find('h1').text(), '404');
  });
});
