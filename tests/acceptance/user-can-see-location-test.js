import {test} from "qunit";
import moduleForAcceptance from "cdg-frontend/tests/helpers/module-for-acceptance";

moduleForAcceptance('Acceptance | user can see location');

test('visiting valid url displays location info', function (assert) {
    visit('/locations/sheffield');

    andThen(function () {
        assert.equal(currentURL(), '/locations/sheffield');
        assert.equal(find('h1').text(), 'Sheffield');
        assert.equal(find('.location__description').text(), 'The best drinks in the UK');
        assert.equal(find('.location__hero-image').attr('src'), '//images.contentful.com/nibrxe5ozouo/ArkWQeO7NQQeECSI6Gg0K/22586360ec8d17ffa432ebba16112194/qxg5lqvdyy5.jpg');
    });
});


test('visiting invalid location returns an error', function (assert) {
    visit('/locations/invalid');

    andThen(function () {
        assert.equal(currentURL(), '/locations/invalid');
        assert.equal(find('h1').text(), '404');
    });
});