//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;



contract Population {
     mapping(string=>uint256) public  popCount;
   

   constructor(){
       popCount["India"]=220;
       popCount["Ukraine"]=45;
       popCount["Russia"]=300;
   }

   function increment(string memory _country,uint256 _count) public view returns(uint){
       uint count;
       count+=popCount[_country]+_count;
       return count;
   }
   function decrement(string memory _country,uint256 _count) public view returns(uint){
       uint count;
       count+=popCount[_country]-_count;
       return count;
   }


}
