pragma solidity ^0.8.0;

contract Authentication {
    address public loggedInUser;

    function connectWallet() public {
        loggedInUser = msg.sender;
    }
}