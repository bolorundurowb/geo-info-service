/**
 * Created by bolorundurowb on 2019-03-26
 */

const countries = require('./../data/countries');

class Countries {
  static getAllCountries(req, res) {
    res.status(200).send({
      data: countries
    });
  }
}

module.exports = Countries;
