// Overrides create-react-app webpack configs without ejecting
// https://github.com/timarney/react-app-rewired

const path = require("node:path");
const {
  addPostcssPlugins,
  addWebpackAlias,
  override,
  useBabelRc,
} = require("customize-cra");
module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src"),
  }),
  addPostcssPlugins([
    require("postcss-preset-mantine")(),
    require("postcss-simple-vars")({
      variables: {
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-xl": "88em",
        "mantine-breakpoint-xs": "36em",
      },
    }),
  ]),
);
