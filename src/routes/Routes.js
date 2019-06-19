/**
 * Created by bolorundurowb on 2019-03-25
 */

const continentsCtrl = require('./../controllers/Continents');
const countriesCtrl = require('./../controllers/Countries');
const currenciesCtrl = require('./../controllers/Currencies');
const dialingCodesCtrl = require('./../controllers/DialingCodes');

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

    router.route('/countries/:code/dialing-code')
      .get(countriesCtrl.getDialingCodeByCountry);

    // currencies
    router.route('/currencies')
      .get(currenciesCtrl.getAllCurrencies);

    // dialing-codes
    router.route('/dialing-codes')
      .get(dialingCodesCtrl.getAllDialingCodes);
  }
}

module.exports = Routes;
