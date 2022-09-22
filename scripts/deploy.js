const {ethers} = require("hardhat");

async function main()
{
  const whiteListContractFactory = await ethers.getContractFactory("WhiteList");

  const deployedWhiteListContract = whiteListContractFactory.deploy(10);

  (await deployedWhiteListContract).deployed();

  console.log("deploed contract address", (await deployedWhiteListContract).address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.log(error);
process.exit(1);
});