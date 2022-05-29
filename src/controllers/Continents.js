/**
 * Created by bolorundurowb on 2019-03-25
 */

const _ = require('lodash');
const continents = require('./../data/continents');
const countries = require('./../data/countries');
const DateUtil = require('./../config/DateUtil');

class Continents {
  /**
   * @api {get} /continents Request All Continent Information
   * @apiName getAllContinents
   * @apiGroup Continents
   *
   * @apiSuccess {Continents[]} continents Array of the continents.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [{
   *       "name": "Asia",
   *       "short": "AS"
   *       }]
   */
  static getAllContinents(req, res) {
    res.set('Cache-Control', 'public');
    res.set('Expires', DateUtil.getExpiryDate());
    res.status(200).send(continents);
  }

  /**
   * @api {get} /continents/:code Request Continent Information
   * @apiName getContinentByCode
   * @apiGroup Continents
   *
   * @apiParam {String} code
   *
   * @apiSuccess {String} name Name of the continent.
   * @apiSuccess {String} short  Two letter unique short code used to refer to the continent.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "name": "Asia",
   *       "short": "AS"
   *     }
   *
   * @apiError NotFound The continent with the specified code was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "NotFound"
   *     }
   */
  static getContinentByCode(req, res) {
    const code = req.params.code;

    if (code.length !== 2) {
      return res.status(400).send({
        message: 'The continent code must be two letters only.'
      });
    }

    const continent = _.find(continents, (continent) => {
      return continent.short.toLowerCase() === code.toLowerCase();
    });

    if (!continent) {
      res.status(404).send({
        message: `A continent with the code ${code} was not found.`
      });
    } else {
      res.set('Cache-Control', 'public');
      res.set('Expires', DateUtil.getExpiryDate());
      res.status(200).send(continent);
    }
  }

  /**
   * @api {get} /continents/:code/countries Request Countries in Continent
   * @apiName getCountriesByContinent
   * @apiGroup Continents
   *
   * @apiParam {String} code
   *
   * @apiSuccess {Country[]} countries Array of countries in the continent.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [{
   *       "name": "Nigeria",
   *       "short": "NG",
   *       "continent": "AF",
   *     },
   *     {
   *       "name": "Kenya",
   *       "short": "KE",
   *       "continent": "AF"
   *     }]
   */
  static getCountriesByContinent(req, res) {
    let code = req.params.code;
    code = code.toUpperCase();

    if (code.length !== 2) {
      return res.status(400).send({
        message: 'The continent code must be two letters only.'
      });
    }

    const continent = _.find(continents, (continent) => {
      return continent.short === code;
    });

    if (!continent) {
      res.status(404).send({
        message: `A continent with the code ${code} was not found.`
      });
    } else {
      const matchedCountries = countries.filter((country) => {
        if (country.continent === code) {
          return country;
        }
      });

      res.set('Cache-Control', 'public');
      res.set('Expires', DateUtil.getExpiryDate());
      res.status(200).send(matchedCountries);
    }
  }
}

module.exports = Continents;
