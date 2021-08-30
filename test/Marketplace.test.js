const { assert } = require("chai");

const Marketplace = artifacts.require("./Marketplace.sol");

contract("Marketplace", ([deployer, seller, buyer]) => {
  let marketplace;

  before(async () => {
    marketplace = await Marketplace.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await marketplace.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });
  it("has a name", async () => {
    const name = await marketplace.name();
    assert.equal(name, "HashTag");
  });

  describe("products", async () => {});
  let result, productCount;
  before(async () => {
    result = await marketplace.createProduct(
      "Macbook Pro",
      web3.utils.toWei("1", "Ether"),
      { from: seller }
    );
    productCount = await marketplace.productCount();
  });

  it("creates products", async () => {
    assert.equal(productCount, 1);
    console.log(result.logs);
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), productCount.toNumber(), "id is correct");
    assert.equal(event.name, "Macbook Pro", "name is correct");
    assert.equal(event.price, "1000000000000000000", "price is correct");
    assert.equal(event.owner, seller, "owner is correct");
    assert.equal(event.purchased, false, "purchased is correct");
  });
});