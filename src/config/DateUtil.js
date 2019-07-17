class DateUtil {
  static getExpiryDate() {
    const date = new Date();
    return date.setTime(date.getTime() + (60 * 60 * 1000));
  }
}

module.exports = DateUtil;
