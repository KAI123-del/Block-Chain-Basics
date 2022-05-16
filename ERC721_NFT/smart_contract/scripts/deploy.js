
const hre = require("hardhat");

async function main() {

  const myNFT = await hre.ethers.getContractFactory("myNFT");
  const mynft = await myNFT.deploy();

  await mynft.deployed();

  console.log("myNFT deployed to:", mynft.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
