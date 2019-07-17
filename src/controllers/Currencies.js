/**
 * Created by bolorundurowb on 2019-06-08
 */

const currencies = require('./../data/currencies');
const DateUtil = require('../config/DateUtil');

class Currencies {
  /**
   * @api {get} /currencies Request All Currencies
   * @apiName GetCurrencies
   * @apiGroup Currencies
   *
   * @apiSuccess {Countries[]} currencies Array of the currencies.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [{
   *       "country": "NG",
   *       "currency": "NGN"
   *     },
   *     {
   *        "country": "US",
   *       "currency": "USD"
   *     },
   *     {
   *       "country": "TZ",
   *       "currency": "NZD"
   *     }]
   */
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
