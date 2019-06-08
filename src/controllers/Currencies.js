/**
 * Created by bolorundurowb on 2019-06-08
 */

const currencies = require('./../data/currencies');

class Currencies {
  static getAllCurrencies(req, res) {
    const response = [];

    for (var key in currencies) {
      if (currencies.hasOwnProperty(key)) {
        response.push({
          country: key,
          currency: currencies[key]
        });
      }
    }
    res.status(200).send(response);
  }

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
        message: `A currency for the country with code ${code} was not found.`
      });
    }

    res.status(200).send({
      country: code,
      currency: currency
    });
  }
}

module.exports = Currencies;
