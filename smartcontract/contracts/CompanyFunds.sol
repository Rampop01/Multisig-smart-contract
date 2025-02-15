// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract CompanyFunds {
    address public owner;
    address[] public boardMembers; // Store board members
    mapping(address => bool) public isBoardMember;
    mapping(address => bool) public approvals;
    uint256 public approvalCount;
    bool public fundsReleased;
    uint256 public budgetAmount;

    event BudgetProposed(uint256 amount);
    event Approved(address indexed member);
    event FundsReleased(uint256 amount);

    modifier onlyBoardMember() {
        require(isBoardMember[msg.sender], "Not a board member");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(address[] memory _boardMembers) {
        require(_boardMembers.length == 20, "Exactly 20 board members required");
        owner = msg.sender;
        boardMembers = _boardMembers; // Store board members

        for (uint i = 0; i < _boardMembers.length; i++) {
            isBoardMember[_boardMembers[i]] = true;
        }
    }

    function proposeBudget(uint256 amount) external onlyOwner {
        require(amount > 0, "Budget must be greater than zero");
        require(!fundsReleased, "Funds already released");

        budgetAmount = amount;
        approvalCount = 0;

        for (uint i = 0; i < boardMembers.length; i++) {
            approvals[boardMembers[i]] = false; // Reset approvals
        }

        emit BudgetProposed(amount);
    }

    function signApproval() external onlyBoardMember {
        require(!approvals[msg.sender], "Already signed");
        require(!fundsReleased, "Funds already released");

        approvals[msg.sender] = true;
        approvalCount++;

        emit Approved(msg.sender);
    }

    function releaseFunds() external onlyOwner {
        require(approvalCount == 20, "Not all members have signed");
        require(!fundsReleased, "Funds already released");

        fundsReleased = true;
        emit FundsReleased(budgetAmount);
    }
}
