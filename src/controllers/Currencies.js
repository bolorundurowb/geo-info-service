/**
 * Created by bolorundurowb on 2019-06-08
 */

const currencies = require('./../data/currencies');
const DateUtil = require('../config/DateUtil');

class Currencies {
  /**
   * @api {get} /currencies Request All Currencies
   * @apiName getAllCurrencies
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
      response.push({
        country: key,
        currency: currencies[key]
      });
    }

    res.set('Cache-Control', 'public');
    res.set('Expires', DateUtil.getExpiryDate());
    res.status(200).send(response);
  }
}

module.exports = Currencies;
