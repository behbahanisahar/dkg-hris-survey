export default class Utilities {
  public static getQueryStringValue = (key: string) => {
    return decodeURIComponent(
      window.location.search.replace(
        new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"),
        "$1",
      ),
    );
  };
}
