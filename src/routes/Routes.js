/**
 * Created by bolorundurowb on 2019-03-25
 */

const continentsCtrl = require('./../controllers/Continents');

class Routes {
  static route(router) {
    // continents
    router.route('/continents')
      .get(continentsCtrl.getAllContinents);

    router.route('/continents/:code')
      .get(continentsCtrl.getContinentByCode);
  }
}

module.exports = Routes;
