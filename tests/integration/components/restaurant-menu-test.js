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
