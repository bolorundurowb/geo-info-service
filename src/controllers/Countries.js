/**
 * Created by bolorundurowb on 2019-03-26
 */

const _ = require('lodash');

const countries = require('./../data/countries');
const currencies = require('./../data/currencies');
const dialingCodes = require('./../data/dialingCodes');
const countryStates = require('./../data/states');
const DateUtil = require('../config/DateUtil');

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
    res.set('Cache-Control', 'public');
    res.set('Expires', DateUtil.getExpiryDate());
    res.status(200).send(countries);
  }

  /**
   * @api {get} /countries/:code Request Country Information
   * @apiName GetCountry
   * @apiGroup Countries
   *
   * @apiParam {String} code
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
      res.set('Cache-Control', 'public');
      res.set('Expires', DateUtil.getExpiryDate());
      res.status(200).send(country);
    }
  }

  /**
   * @api {get} /countries/:code/states Request States or Provinces in Country
   * @apiName GetCountryCountries
   * @apiGroup Countries
   *
   * @apiParam {String} code
   *
   * @apiSuccess {States[]} statesOrProvinces Array of states or provinces in the country.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [{
   *       "name": "Abia",
   *       "country": "NG",
   *     },
   *     {
   *       "name": "Abuja",
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

    const country = _.find(countryStates, (country) => {
      return country.short === code;
    });

    if (!country) {
      res.status(404).send({
        message: `A country with the code ${code} was not found.`
      });
    } else {
      const matchedStates = country.states.map((state) => {
        return {
          name: state,
          country: code
        };
      });

      res.set('Cache-Control', 'public');
      res.set('Expires', DateUtil.getExpiryDate());
      res.status(200).send(matchedStates);
    }
  }

  /**
   * @api {get} /countries/:code/currency Request Currency for Country
   * @apiName GetCountryCurrency
   * @apiGroup Countries
   *
   * @apiParam {String} code
   *
   * @apiSuccess {object} currency An object describing the currency of the country.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "country": "NG",
   *       "currency": "NGN"
   *     }
   */
  static getCurrencyByCountry(req, res) {
    const code = req.params.code;

    if (code.length !== 2) {
      return res.status(400).send({
        message: 'The country code must be two letters only.'
      });
    }

    const currency = currencies[code];

    if (!currency) {
      res.status(404).send({
        message: `The currency for the country with code ${code} was not found.`
      });
    }

    res.set('Cache-Control', 'public');
    res.set('Expires', DateUtil.getExpiryDate());
    res.status(200).send({
      country: code,
      currency: currency
    });
  }

  /**
   * @api {get} /countries/:code/dialing-code Request Dialing Code for Country
   * @apiName GetCountryDialingCode
   * @apiGroup Countries
   *
   * @apiParam {String} code
   *
   * @apiSuccess {object} currency An object describing the dialing code of the country.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "name": "Kenya",
   *       "short": "KE",
   *       "flag": "🇰🇪",
   *       "dialCode": "+254"
   *     }
   */
  static getDialingCodeByCountry(req, res) {
    const code = req.params.code;

    if (code.length !== 2) {
      return res.status(400).send({
        message: 'The country code must be two letters only.'
      });
    }

    const dialingCode = _.find(dialingCodes, (dialingCode) => {
      return dialingCode.code === code;
    });

    if (!dialingCode) {
      res.status(404).send({
        message: `The dialing code for a country with the code ${code} was not found.`
      });
    } else {
      res.set('Cache-Control', 'public');
      res.set('Expires', DateUtil.getExpiryDate());
      res.status(200).send({
        name: dialingCode.name,
        short: dialingCode.code,
        flag: dialingCode.flag,
        dialCode: dialingCode.dial_code
      });
    }
  }
}

module.exports = Countries;
