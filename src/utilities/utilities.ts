export default class Utilities {
  public getQueryStringValue = (key: string) => {
    console.log(window.location);
    return decodeURIComponent(
      window.location.search.replace(
        new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"),
        "$1",
      ),
    );
  };
}
