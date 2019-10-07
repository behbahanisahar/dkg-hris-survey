require("dotenv").config();
const { whenDev } = require("@craco/craco");
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],
  babel: [
    {
      plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
    },
  ],
  devServer: whenDev(() => {
    const protocol = process.env.SPRestProxy_Protocol || "http";
    const hostname = process.env.SPRestProxy_Hostname || process.env.HOSTNAME || "localhost";
    const port = process.env.SPRestProxy_Port || 3001;
    return {
      proxy: [
        {
          context: ["/_api", "/_vti_bin"],
          target: `${protocol}://${hostname}:${port}`,
        },
      ],
    };
  }),
};
