/**
 * Created by bolorundurowb on 2019-06-08
 */

const currencies = require('./../data/currencies');

class Currencies {
  static getAllCurrencies(req, res) {
    const response = [];

    for (let key in currencies) {
      if (currencies.hasOwnProperty(key)) {
        response.push({
          country: key,
          currency: currencies[key]
        });
      }
    }
    res.status(200).send(response);
  }
}

module.exports = Currencies;
