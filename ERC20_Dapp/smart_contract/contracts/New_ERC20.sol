//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract New_ERC20 {

     uint256 totalSupply_ ;
     string   name ;
     string   symbol ;
     uint   decimal;


     event Transfer(address indexed from,address indexed to,uint tokens);
     event Approval(address indexed tokenOwner,address indexed spender,uint tokens);

     

     mapping(address=>uint256) balances;
     mapping(address=>mapping(address=>uint256)) allowed;


     constructor(string memory _name,string memory _symbol,uint8 _decimal,uint256 _totalSupply){
         totalSupply_=_totalSupply;
         name=_name;
         symbol=_symbol;
         decimal=_decimal;
         balances[msg.sender]=totalSupply_;
     }


     function totalSupply()public view returns(uint256 ){
         return totalSupply_;
     }


     function balanceOf(address tokenOwner) public view returns(uint){
       return balances[tokenOwner];
     }


     function transfer(address reciever,uint _tokens)public returns(bool){
         require(_tokens<=balances[msg.sender]);
         balances[msg.sender]-=_tokens;
         balances[reciever]+=_tokens;

         emit Transfer(msg.sender,reciever,_tokens);
         return true;

     }


     function approve(address delegate,uint _tokens)public returns(bool){
         allowed[msg.sender][delegate]=_tokens;

         emit Approval(msg.sender,delegate,_tokens);
         return true;
     }


     function allowance(address owner,address delegate)public view returns(uint){
         return allowed[owner][delegate];
     }

     function mint(uint _qty)public returns(uint){
         return totalSupply_+=_qty;

     }

     function burn(uint qty)public returns(uint){
         require(totalSupply_>=qty);
         return totalSupply_-=qty;
     }


     function transferFrom(address owner,address buyer,uint _tokens)public returns(bool){
         require(_tokens<=balances[owner]);
         require(_tokens<=allowed[owner][msg.sender]);
         balances[owner]-=_tokens;
         allowed[owner][msg.sender]-=_tokens;
         balances[buyer]+=_tokens;
         emit Transfer(owner,buyer,_tokens);
         return true;

     }


 }
