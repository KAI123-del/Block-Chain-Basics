
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const weiAmount = (await deployer.getBalance()).toString();

  console.log("Account balance:", (await ethers.utils.formatEther(weiAmount)));

  
  const New_ERC20 = await ethers.getContractFactory("New_ERC20");
  const new_erc20 = await New_ERC20.deploy("Old_SchoolCoin","OSC",18,1000);

  console.log("Token address:", new_erc20.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});


