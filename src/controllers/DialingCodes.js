/**
 * Created by bolorundurowb on 2019-06-08
 */

const dialingCodes = require('./../data/dialingCodes');

class DialingCodes {
  /**
   * @api {get} /dialing-codes Request All Dialing Codes
   * @apiName GetDialingCodes
   * @apiGroup DialingCodes
   *
   * @apiSuccess {DialingCodes[]} currencies Array of the dialing codes.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [{
   *       "name": "Nigeria",
   *       "short": "NG",
   *       "dialCode": "+234",
   *     },
   *     {
   *       "name": "Kenya",
   *       "short": "KE",
   *       "dialCode": "+254"
   *     },
   *     {
   *       "name": "United States of America",
   *       "short": "US",
   *       "dialCode": "+1"
   *     }]
   */
  static getAllCurrencies(req, res) {
    const response = dialingCodes.map((dialingCode) => {
      return {
        name: dialingCode.name,
        short: dialingCode.code,
        dialCode: dialingCode.dial_code
      };
    });

    res.status(200).send(response);
  }
}

module.exports = DialingCodes;
