import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const {ALCHEMY_SEPOLIA_API_KEY_URL,ETHERSCAN_API_KEY, ACCOUNT_PRIVATE_KEY}= process.env
const config: HardhatUserConfig = {
  solidity: "0.8.28", 
  networks: {
    hardhat: {
      accounts: {
        count: 25, 
      },
    },

    sepolia: {
      url: ALCHEMY_SEPOLIA_API_KEY_URL,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
    }, 
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
