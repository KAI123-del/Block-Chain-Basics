const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TodoList", function () {
  it("Should create a task", async function () {
    const TodoList = await ethers.getContractFactory("TodoList");
    const todoList = await TodoList.deploy();
    await todoList.deployed();

    const task=await todoList.createTask("wake up");

    await task.wait();
     

     const {content,completed}=await await todoList.getTask(0);

    
  });

 
});
