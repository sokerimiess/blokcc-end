pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Connections {
    mapping(address => mapping(address => bool)) public connections;
    address public nftContractAddress;

    function sendConnectionRequest(address _to) public {
        connections[msg.sender][_to] = true;
    }

    function getConnectionStatus(address _user1, address _user2) public view returns (bool) {
        return connections[_user1][_user2];
    }

    function acceptConnectionRequest(address _from) public onlyTopWeb3Owner {
        connections[msg.sender][_from] = true;
        connections[_from][msg.sender] = true;
    }

    function hasTopWeb3NFT(address _user) public view returns (bool) {
        return IERC721(nftContractAddress).balanceOf(_user) > 0;
    }

    modifier onlyTopWeb3Owner {
        require(hasTopWeb3NFT(msg.sender), "Must own TOPWEB3 NFT");
        _;
    }
}
