//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract myNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    address payable owner;

    mapping(uint256=>marketItem) private marketItemId;

    struct marketItem{
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price ;
        bool sold;

    }

    event MarketCreated (
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      bool sold
    );

    constructor() ERC721("OldSchool","OSC") {
        owner=payable(msg.sender);
    }


    // ================ mint and list in marketPlace =============== //

    function createToken( string memory tokenURI,uint256 price)
        public payable
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        createMarketItem(newItemId,price);
         
        return newItemId;
    }

    function createMarketItem(uint256 _tokenId,uint256 _price) private{
        require(_price>0);
        marketItemId[_tokenId]= marketItem(
         _tokenId,
         payable(msg.sender),
         payable (address(this)),
         _price ,
         false

        );

        _transfer(msg.sender,address this , _tokenId);
        emit MarketCreated (
            _tokenId,
            msg.sender,
            address(this),
            _price,
            false
        )

    }

    function resellToken(uint256 _tokenId, uint256 _price) public payable {
        require(marketItemId[_tokenId].owner==msg.sender);
        marketItemId[_tokenId].seller=payable(msg.sender),
        marketItemId[_tokenId].owner=payable(address(this)),
        marketItemId[_tokenId].price=_price,
        marketItemId[_tokenId].sold=false,
        _itemsSold.decrement();

        _transfer(msg.sender,address(this),_tokenId);


    }

    function marketSale(uint256 _tokenId )public payable{
        uint256 _price=marketItemId[_tokenId].price;
        require(msg.value==_price);
        marketItemId[_tokenId].owner=payable(msg.sender);
        marketItemId[_tokenId].seller=payable(address(0));
         marketItemId[_tokenId].sold=true,
         _itemsSold.increment();
         _transfer(address(this), msg.sender, _tokenId);
         payable(marketItemId[_tokenId].seller).transfer(msg.value);

    }


    function fetchMarketItems()public view returns (marketItem[] memory){
        uint itemCount =_tokenIds.current();
        uint unsoldItemCount=_tokenIds.current()-_itemsSold.current();
        uint currentIndex=0;

        marketItem[] memory items =new MarketItem[](unsoldItemCount);
        for(uint i=0;i<itemCount;i++){
            if(marketItemId[i+1].owner==address(this)){
                uint currentId=i+1;
                marketItem storage currentItem = marketItemId[currentId];
                items[currentIndex]=currentItem;
                currentIndex +=1;
            }
        }
        return items;
    }

    function fetchMyNFT() public view returns (marketItem[] memory){
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i=0;i<totalItemCount;i++){
            if(marketItemId[i+1].owner==msg.sender){
                itemCount+=1;}
            
            marketItem[] memory items = new marketItem[](itemCount);
            for(uint i=0,i< totalItemCount,i++){
            if(marketItemId[i+1].owner==msg.sender){
            uint currentId=i+1;
            marketItem storage currentItem = marketItemId[currentId];
            items[currentIndex]=currentItem;
            currentIndex +=1;
            }
        }
        return items;
    }


}
