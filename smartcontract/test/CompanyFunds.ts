import { expect } from "chai";
import { ethers } from "hardhat";

describe("CompanyFunds", function () {
    let companyFunds: any;
    let owner: any;
    let boardMembers: any[];

    beforeEach(async function () {
      [owner, ...boardMembers] = await ethers.getSigners();
  
      // Ensure we have at least 20 board members
      if (boardMembers.length < 20) {
          throw new Error("Test environment must have at least 21 accounts (1 owner + 20 board members)");
      }
  
      // Deploy the contract with exactly 20 board members
      companyFunds = await (await ethers.getContractFactory("CompanyFunds")).deploy(
          boardMembers.slice(0, 20).map(member => member.address)
      );
  });

    it("Should set the correct owner", async function () {
        expect(await companyFunds.owner()).to.equal(owner.address);
    });

    it("Should allow the owner to propose a budget", async function () {
        await companyFunds.proposeBudget(1000);
        expect(await companyFunds.budgetAmount()).to.equal(1000);
    });

    it("Should allow board members to approve the budget", async function () {
        await companyFunds.proposeBudget(1000);

        await companyFunds.connect(boardMembers[0]).signApproval();
        expect(await companyFunds.approvals(boardMembers[0].address)).to.equal(true);
    });

    it("Should release funds only after all members have signed", async function () {
        await companyFunds.proposeBudget(1000);

        // Let all board members approve
        for (let i = 0; i < 20; i++) {
            await companyFunds.connect(boardMembers[i]).signApproval();
        }

        await companyFunds.releaseFunds();
        expect(await companyFunds.fundsReleased()).to.equal(true);
    });

    it("Should prevent releasing funds if not all members approve", async function () {
        await companyFunds.proposeBudget(1000);

        // Only 19 out of 20 sign
        for (let i = 0; i < 19; i++) {
            await companyFunds.connect(boardMembers[i]).signApproval();
        }

        await expect(companyFunds.releaseFunds()).to.be.revertedWith("Not all members have signed");
    });
});
