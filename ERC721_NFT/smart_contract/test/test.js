const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("myNFT", function () {
  it("must create and execute market sales", async function () {
    const myNFT = await ethers.getContractFactory("myNFT");
    const mynft = await myNFT.deploy();
    await mynft.deployed();

    const address=mynft.address;
    

    await mynft.createToken()

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
