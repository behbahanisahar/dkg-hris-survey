require("dotenv").config();
const { whenDev } = require("@craco/craco");
const CracoRawLoaderPlugin = require("@baristalabs/craco-raw-loader");
const ChangeCssFilename = require("@navikt/craco-plugins");
const ChangeJsFilename = require("@navikt/craco-plugins");

module.exports = {
  webpack: {
    hashFilenames: false,
    extractText: {
      filename: "myTest.css"
    },
    extra: {
      output: {
        filename: "MyTest.js",
        chunkFilename: "MyTest.js"
      }
    }
  },
  plugins: [
    {
      plugin: CracoRawLoaderPlugin,
      options: {
        test: /\.foo$/
      }
    },
    {
      plugin: ChangeCssFilename,
      options: {
        filename: "mytest.css"
      }
    },
    {
      plugin: ChangeJsFilename,
      options: {
        filename: "mytest.js" // optional, default filename: static/js/[name].js
      }
    }
  ],
  babel: [
    {
      plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
    }
  ],
  devServer: whenDev(() => {
    const protocol = process.env.SPRestProxy_Protocol || "http";
    const hostname =
      process.env.SPRestProxy_Hostname || process.env.HOSTNAME || "localhost";
    const port = process.env.SPRestProxy_Port || 3001;
    return {
      proxy: [
        {
          context: ["/_api", "/_vti_bin"],
          target: `${protocol}://${hostname}:${port}`
        }
      ]
    };
  })
};
