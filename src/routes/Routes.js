/**
 * Created by bolorundurowb on 2019-03-25
 */

const continentsCtrl = require('./../controllers/Continents');
const countriesCtrl = require('./../controllers/Countries');
const currenciesCtrl = require('./../controllers/Currencies');

class Routes {
  static route(router) {
    // continents
    router.route('/continents')
      .get(continentsCtrl.getAllContinents);

    router.route('/continents/:code')
      .get(continentsCtrl.getContinentByCode);

    router.route('/continents/:code/countries')
      .get(continentsCtrl.getCountriesByContinent);

    // countries
    router.route('/countries')
      .get(countriesCtrl.getAllCountries);

    router.route('/countries/:code')
      .get(countriesCtrl.getCountryByCode);

    router.route('/countries/:code/states')
      .get(countriesCtrl.getStateOrProvincesByCountry);

    router.route('/countries/:code/currency')
      .get(countriesCtrl.getCurrencyByCountry);

    // currencies
    router.route('/currencies')
      .get(currenciesCtrl.getAllCurrencies);
  }
}

module.exports = Routes;
