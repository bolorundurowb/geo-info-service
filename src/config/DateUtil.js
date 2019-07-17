class DateUtil {
  static getExpiryDate() {
    const date = new Date();
    return new Date(date.setHours(date.getHours() + 1));
  }
}

module.exports = DateUtil;
