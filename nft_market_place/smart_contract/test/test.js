
const { ethers } = require("hardhat");

describe("myNFT", function () {
  it("Should create and execute market sales", async function () {
    const myNFT = await ethers.getContractFactory("myNFT");
    const mynft = await myNFT.deploy();
    await mynft.deployed();
    const auctionPrice = ethers.utils.parseUnits("0.1","ether");
 
    console.log("1")
    await mynft.createToken("https://www.mytokenlocation.com",auctionPrice);
    console.log("2")
    await mynft.createToken("https://www.mytokenlocation2.com",auctionPrice);
    
    const [_,buyerAddress]= await ethers.getSigners();
    
    console.log("3")
    await mynft.connect(buyerAddress).createMarketSale(1,{value:auctionPrice});
    console.log("4")
    await mynft.connect(buyerAddress).resellToken(1,auctionPrice)


    items=await mynft.fetchMarketItems();
    items= await Promise.all(items.map(async i=>{
      const tokenUri=await mynft.tokenURI(i.tokenId);
      let item={
        price:i.price.toString(),
        tokenId:i.tokenId.toString(),
        seller:i.seller,
        owner:i.owner,
        tokenUri

      }
      return item
    }))
    console.log('items : ',items)
  });
});
