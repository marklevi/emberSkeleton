import Ember from 'ember';

export function priceResolver(params) {
  let menuItem = params[0];
  let priceBand = params[1].title;

  let priceMapper = {"L": "pricebandL", "ROW": "pricebandRow", "Centerparcs": "pricebandCenterparcs"};

  let selectedPriceBand = priceMapper[priceBand];
  return menuItem[selectedPriceBand];
}

export default Ember.Helper.helper(priceResolver);
