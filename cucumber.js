module.exports = {
  default: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["tests/features"],
    require: ["tests/steps/*.ts", "tests/support/*.ts"],
    requireModule: ["ts-node/register"],
    order: "defined"
  },
  
};