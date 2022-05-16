// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;
import "@openzeppelin/contracts/utils/Counters.sol";

contract TODO 
{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => Task) private tasks;
    event TaskCreated(
        address  owner,
        string  content,
        bool status
    );
    struct Task {
        address  owner;
        string  content;
        bool status;
    }
    function createtask(
        string memory content
    ) public returns (uint256) {
        
        uint256 newItemId = _tokenIds.current();  
        tasks[newItemId] = Task(msg.sender,content,false);
        _tokenIds.increment();
        emit TaskCreated(
            msg.sender,
            content,
            false
        );
        return newItemId;
    }

    

    function fetchMyTasks() public view returns (Task[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;
        for (uint256 i = 0; i <= totalItemCount; i++) {
            if (tasks[i].owner == msg.sender) {
                itemCount += 1;
            }
        }

        Task[] memory items = new Task[](itemCount);
        for (uint256 i = 0; i <= totalItemCount; i++) {
            if (tasks[i].owner == msg.sender) {
                uint256 currentId = i;
                Task storage currentItem = tasks[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchTaskById(uint256 id) public view returns (Task memory) {
        require (
            tasks[id].owner == msg.sender , "NOT THE OWNER"
        );
        return tasks[id];
    }
    function deleteTasksById(uint256 id) public  returns (bool) {
        require (
            tasks[id].owner == msg.sender , "NOT THE OWNER"
        );
        delete tasks[id];
        return true;
    }

    function toggleStatus(uint256 id) public  returns (bool) {
        require (
            tasks[id].owner == msg.sender , "NOT THE OWNER"
        );
        tasks[id].status = !tasks[id].status ;
        return true;
    }

       function updateTaskById(uint256 id, string memory content) public  returns (bool) {
        require (
            tasks[id].owner == msg.sender , "NOT THE OWNER"
        );
        tasks[id].content = content ;
        return true;
    }

}
