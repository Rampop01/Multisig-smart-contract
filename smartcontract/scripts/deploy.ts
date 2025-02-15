import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Generate 20 random board member addresses
  const boardMembers: string[] = Array.from({ length: 20 }, () => ethers.Wallet.createRandom().address);
  console.log("Board Members:", boardMembers);

  // Deploy the CompanyFunds contract
  const CompanyFunds = await ethers.getContractFactory("CompanyFunds");
  const companyFunds = await CompanyFunds.deploy(boardMembers);

  await companyFunds.waitForDeployment(); // ✅ Correct method in Hardhat Ethers v6
  console.log("CompanyFunds deployed at:", await companyFunds.getAddress());
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
