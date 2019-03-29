/**
 * Created by bolorundurowb on 2019-03-26
 */

const _ = require('lodash');
const countries = require('./../data/countries');
const statesOrProvinces = require('provinces');

class Countries {
  static getAllCountries(req, res) {
    res.status(200).send({
      data: countries
    });
  }

  static getCountryByCode(req, res) {
    const code = req.params.code;

    if (code.length !== 2) {
      return res.status(400).send({
        message: 'The country code must be two letters only.'
      });
    }

    const country = _.find(countries, (country) => { return country.short.toLowerCase() === code.toLowerCase(); });

    if (!country) {
      res.status(404).send({
        message: `A country with the code ${code} was not found.`
      });
    } else {
      res.status(200).send({
        data: country
      });
    }
  }

  static getStateOrProvincesByCountry(req, res) {
    let code = req.params.code;
    code = code.toUpperCase();

    if (code.length !== 2) {
      return res.status(400).send({
        message: 'The country code must be two letters only.'
      });
    }

    const country = _.find(countries, (country) => { return country.short === code; });

    if (!country) {
      res.status(404).send({
        message: `A country with the code ${code} was not found.`
      });
    } else {
      const matchedProvinces = statesOrProvinces.filter((province) => {
        if (province.country === code) {
          return province;
        }
      });

      res.status(200).send({
        data:  matchedProvinces
      });
    }
  }
}

module.exports = Countries;
