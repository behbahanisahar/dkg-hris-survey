import axios from "axios";
import Config from "./config";
import { sp } from "@pnp/sp";
export default class ServiceBase {
  protected config: Config;
  constructor() {
    this.config = new Config();
    sp.setup({
      sp: {
        headers: {
          Accept: "application/json; odata=verbose",
        },
      },
    });
  }

  protected get = async (operation: string) => {
    return await axios.get(`${this.config.Endpoint}/${operation}`, {
      headers: this.config.headers,
    });
  };

  protected post = async (operation: string, params: any) => {
    return await axios.post(`${this.config.Endpoint}/${operation}`, JSON.parse(JSON.stringify(params)), {
      headers: this.config.headers,
    });
  };
  protected put = async (operation: string, params: any) => {
    return await axios.put(`${this.config.Endpoint}/${operation}`, JSON.parse(JSON.stringify(params)), {
      headers: this.config.headers,
    });
  };

  protected postPDF = async (operation: string, params: any) => {
    return await axios.post(`${this.config.Endpoint}/${operation}`, JSON.parse(JSON.stringify(params)), {
      headers: this.config.headers,
      method: "POST",
      responseType: "blob",
    });
  };
}
