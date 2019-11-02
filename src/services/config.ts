import Context from "../utilities/context";
export default class Config {
  public Endpoint: string =
    Context.siteServerRelativeUrl === "/"
      ? Context.siteServerRelativeUrl + "_layouts/api"
      : Context.siteServerRelativeUrl + "/_layouts/api";
  public headers = { "Content-Type": "application/json" };
}
