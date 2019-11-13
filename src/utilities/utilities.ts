export default class Utilities {
  public static getQueryStringValue = (key: string) => {
    return decodeURIComponent(
      window.location.search.replace(
        new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"),
        "$1",
      ),
    );
  };
  public static toPersianNumber(value: string) {
    if (!value) {
      return "";
    }

    const numbersMap = new Map([
      ["١", "۱"],
      ["٢", "۲"],
      ["٣", "۳"],
      ["٤", "۴"],
      ["٥", "۵"],
      ["٦", "۶"],
      ["٧", "۷"],
      ["٨", "۸"],
      ["٩", "۹"],
      ["٠", "۰"],
      ["1", "۱"],
      ["2", "۲"],
      ["3", "۳"],
      ["4", "۴"],
      ["5", "۵"],
      ["6", "۶"],
      ["7", "۷"],
      ["8", "۸"],
      ["9", "۹"],
      ["0", "۰"],
    ]);

    let newValue = "";

    for (const chr of value) {
      numbersMap.has(chr) ? (newValue += numbersMap.get(chr)) : (newValue += chr);
    }

    return newValue;
  }
}
