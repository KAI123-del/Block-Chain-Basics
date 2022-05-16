
const hre = require("hardhat");

async function main() {
 
  const Population = await hre.ethers.getContractFactory("Population");
  const population = await Population.deploy();


  await population.deployed();

  console.log("Population deployed to:", population.address);
}

const runMain = async()=>{
 try {
   await main();
   process.exit(0);
 } catch (error) {
   console.log(error)
   process.exit(1)
 }
}

runMain();
