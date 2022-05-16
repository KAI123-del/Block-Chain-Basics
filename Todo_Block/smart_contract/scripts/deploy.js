
const hre = require("hardhat");

async function main() {
  
  const TODO = await hre.ethers.getContractFactory("TODO");
  const todo = await TODO.deploy();

  await todo.deployed();

  console.log("TodoList deployed to:", todo.address);

  
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
