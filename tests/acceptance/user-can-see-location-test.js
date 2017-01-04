import {test} from "qunit";
import moduleForAcceptance from "cdg-frontend/tests/helpers/module-for-acceptance";

moduleForAcceptance('Acceptance | user can see location');

test('visiting valid url displays location info', function (assert) {
    visit('/locations/sheffield');

    andThen(function () {
        assert.equal(currentURL(), '/locations/sheffield');
        assert.equal(find('.location__hero').attr('style'), 'background-image: url(\'//images.contentful.com/nibrxe5ozouo/3F6Omuv9e0yc8IQSeGCEMK/ab2ac32b58d90b15fbc0f0c4920db35c/20160727-_JMC7377.jpg\')');
        assert.equal(find('h1').text(), 'Sheffield');
        assert.equal(find('.location__description').text(), 'The heart of Bloomsbury in central London is home to a slice of Latin life at Las Iguanas, with a wide selection delicious of fresh South American food on offer alongside a legendary cocktail menu. Close to Russell Square tube station, it’s easy to get to and the perfect place for a tasty lunch with friends, family-friendly meals out, cosy corners for two or celebrating with friends into the evening. Happy Hour is on all day every day with 2FOR1 on the best cocktails and coolers for extra sparkle!');
        assert.equal(find('.location__opening-hours').text(), 'Monday to Friday 10am - 10pm\nSaturday 10am - 12pm\nSunday 12am - 9pm');
        assert.equal(find('.location__address-text').text(), '1 Restaurant Boulevard, London, W1 1AB');
        assert.ok(find('.ember-cli-g-map').length);
    });
});

test('should display menus', function (assert) {
    visit('/locations/sheffield');

    andThen(function () {
        assert.equal(find('.location__menu-title').text(), "Christmas");
        assert.equal($(find('.location__submenu-title')[0]).text(), "tapas & starters");
        assert.equal($(find('.location__submenu-title')[1]).text(), "F r o m t h e flames ");
        assert.equal(find('.menu-item').length, 4);
        assert.equal($(find('.menu-item')[0]).text(), "Blazing Bird");
        assert.equal($(find('.price-item')[0]).text(), "Half 12.95 Whole 17.95");

    });
});


test('visiting invalid location returns an error', function (assert) {
    visit('/locations/invalid');

    andThen(function () {
        assert.equal(currentURL(), '/locations/invalid');
        assert.equal(find('h1').text(), '404');
    });
});
