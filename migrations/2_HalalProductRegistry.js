const HalalProductRegistry = artifacts.require("HalalProductRegistry");
 
module.exports = function (deployer) {
  deployer.deploy(HalalProductRegistry);
};