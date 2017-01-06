import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('restaurant-menu', 'Integration | Component | restaurant menu', {
    integration: true
});

test('it renders the restaurant menu', function(assert) {
    this.set('model', {menu: {displayTitle: "nice!"}});
    this.render(hbs`{{restaurant-menu menu-with-price-band=model}}`);

    assert.equal(this.$('.location__menu-title').text(), 'nice!');
});

test('it renders menu item variations', function(assert) {
    this.set('model', {priceBand: "L", menu: {displayTitle: "Dinner", submenus: [{displayTitle: "From the flames", menuItems:[{displayTitle: "Enchilada", menuItemVariation: [{displayTitle: "Roast butternut squash, red peppers, spinach and cheese", pricebandL: "12.95"}]}]}]}});
    this.render(hbs`{{restaurant-menu menu-with-price-band=model}}`);
    assert.equal(this.$('.location__menu-title').text(), 'Dinner');
    assert.equal(this.$('.menu-item-variation').first().text(), 'Roast butternut squash, red peppers, spinach and cheese');
    assert.equal(this.$('.menu-item-variation-price').first().text(), '12.95');

});
