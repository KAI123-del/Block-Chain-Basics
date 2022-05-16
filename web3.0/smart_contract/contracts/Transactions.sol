// SPDX-License-Identifier: UNLICENSED
pragma solidity^0.8.0;

contract Transactions{
    uint256 TransactionCount;

    event Transfer(address from, address receiver,uint amount, string message,uint256 timestamp );

    struct TransferStruct{
        address sender;
        address reciever;
        uint amount;
        string message;
        uint256 timestamp;
        
    }

    TransferStruct[] transactions;
    
    function AddToBlockChain(address payable reciever,uint amount,string memory message ) public {
        TransactionCount +=1;
        transactions.push(TransferStruct(msg.sender, reciever,amount,message,block.timestamp));

        emit Transfer(msg.sender, reciever,amount,message,block.timestamp);
        
    }
    function getAllTransactions() public view returns (TransferStruct[] memory){
        return transactions;
    }
    function getTransactionCount() public view returns (uint256){
        return TransactionCount;
    }



}