/**
 * Created by bolorundurowb on 2019-03-26
 */

const _ = require('lodash');
const countries = require('./../data/countries');
const statesOrProvinces = require('provinces');

class Countries {
  /**
   * @api {get} /countries Request All Country Information
   * @apiName GetCountries
   * @apiGroup Countries
   *
   * @apiSuccess {Countries[]} countries Array of the countries.
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
   *     },
   *     {
   *       "name": "United States of America",
   *       "short": "US",
   *       "continent": "NA"
   *     }]
   */
  static getAllCountries(req, res) {
    res.status(200).send(countries);
  }

  /**
   * @api {get} /countries/:code Request Country Information
   * @apiName GetCountry
   * @apiGroup Countries
   *
   * @apiSuccess {String} name Name of the country.
   * @apiSuccess {String} short  Two letter unique short code used to refer to the country.
   * @apiSuccess {String} continent  Two letter unique short code used to refer to the continent the country is located in.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "name": "Nigeria",
   *       "short": "NG",
   *       "continent": "AF",
   *     }
   *
   * @apiError NotFound The country with the specified code was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "NotFound"
   *     }
   */
  static getCountryByCode(req, res) {
    const code = req.params.code;

    if (code.length !== 2) {
      return res.status(400).send({
        message: 'The country code must be two letters only.'
      });
    }

    const country = _.find(countries, (country) => {
      return country.short.toLowerCase() === code.toLowerCase();
    });

    if (!country) {
      res.status(404).send({
        message: `A country with the code ${code} was not found.`
      });
    } else {
      res.status(200).send(country);
    }
  }

  /**
   * @api {get} /countries/:code/states Request States or Provinces in Country
   * @apiName GetCountryCountries
   * @apiGroup Countries
   *
   * @apiSuccess {States[]} statesOrProvinces Array of states or provinces in the country.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [{
   *       "name": "Abia",
   *       "short": "AB",
   *       "country": "NG",
   *     },
   *     {
   *       "name": "Abuja",
   *       "short": "FC",
   *       "country": "NG"
   *     }]
   */
  static getStateOrProvincesByCountry(req, res) {
    let code = req.params.code;
    code = code.toUpperCase();

    if (code.length !== 2) {
      return res.status(400).send({
        message: 'The country code must be two letters only.'
      });
    }

    const country = _.find(countries, (country) => {
      return country.short === code;
    });

    if (!country) {
      res.status(404).send({
        message: `A country with the code ${code} was not found.`
      });
    } else {
      const matchedStates = statesOrProvinces.filter((state) => {
        if (state.country === code) {
          return state;
        }
      });

      res.status(200).send(matchedStates);
    }
  }
}

module.exports = Countries;
