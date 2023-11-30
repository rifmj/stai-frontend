// Overrides create-react-app webpack configs without ejecting
// https://github.com/timarney/react-app-rewired

const path = require("node:path");
const { addWebpackAlias, override, useBabelRc } = require("customize-cra");
module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src"),
  }),
);
