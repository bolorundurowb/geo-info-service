/**
 * Created by bolorundurowb on 2019-03-25
 */

const _ = require('lodash');
const continents = require('./../data/continents');

class Continents {
  static getAllContinents(req, res) {
    res.status(200).send({
      data: continents
    });
  }

  static getContinentByCode(req, res) {
    const code = req.params.code;

    if (code.length !== 2) {
      return res.status(400).send({
        message: 'The continent code must be two letters only.'
      });
    }

    const continent = _.find(continents, (continent) => { return continent.short.toLowerCase() === code.toLowerCase(); });

    if (!continent) {
      res.status(404).send({
        message: `A continent with the code ${code} was not found.`
      });
    } else {
      res.status(200).send({
        data: continent
      });
    }
  }
}

module.exports = Continents;
