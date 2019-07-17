/**
 * Created by bolorundurowb on 2019-06-08
 */

const dialingCodes = require('./../data/dialingCodes');
const DateUtil = require('../config/DateUtil');

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
   *       "flag": "🇳🇬",
   *       "dialCode": "+234",
   *     },
   *     {
   *       "name": "Kenya",
   *       "short": "KE",
   *       "flag": "🇰🇪",
   *       "dialCode": "+254"
   *     },
   *     {
   *       "name": "United States of America",
   *       "short": "US",
   *       "flag": "🇺🇸",
   *       "dialCode": "+1"
   *     }]
   */
  static getAllDialingCodes(req, res) {
    const response = dialingCodes.map((dialingCode) => {
      return {
        name: dialingCode.name,
        short: dialingCode.code,
        flag: dialingCode.flag,
        dialCode: dialingCode.dial_code
      };
    });

    res.status(200).send(response);
  }
}

module.exports = DialingCodes;
