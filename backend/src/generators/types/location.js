const { rand } = require("../../utils");

module.exports = (params) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let text = "";
  for (let i = 0; i < Math.floor(rand(10)); i++)
    text += possible.charAt(rand(possible.length));

  return text;
};
