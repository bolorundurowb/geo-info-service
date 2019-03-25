/**
 * Created by bolorundurowb on 2019-03-25
 */

const continents = require('./../data/continents');

class Continents {
  static getAllContinents(req, res) {
    res.status(200).send({
      continents
    });
  }
}

module.exports = Continents;
