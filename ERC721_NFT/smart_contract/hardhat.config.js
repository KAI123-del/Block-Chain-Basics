require("@nomiclabs/hardhat-waffle");



module.exports = {
  solidity: "0.8.7",
 
  networks : {
    hardhat:{
      chainId:1337
    },
    mumbai: {
      url:'https://polygon-mumbai.g.alchemy.com/v2/FI5FcMHNzSlPfizSRHvoiTszdRGSh59G',
      accounts:['533e714cd20525e23691dd497ddffbd1fedf245d692499708d1755cf5531dcf1']

    },
    mainnet:{
      url:'https://eth-mainnet.alchemyapi.io/v2/cM5MnOGWAF6pY1bmkqERDuYrJ5LX1Idr',
      accounts:['533e714cd20525e23691dd497ddffbd1fedf245d692499708d1755cf5531dcf1']
    }
  
  },

};
