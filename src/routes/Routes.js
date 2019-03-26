/**
 * Created by bolorundurowb on 2019-03-25
 */

const continentsCtrl = require('./../controllers/Continents');
const countriesCtrl = require('./../controllers/Countries');

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
  }
}

module.exports = Routes;
