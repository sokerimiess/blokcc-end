pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract YourContract is ERC721Enumerable {
    struct Message {
        address author;
        string content;
        uint256[] comments;
    }

    mapping(uint256 => Message) public messages;
    uint256 public messageIdCounter;

    function hasTopWeb3NFT(address _user) public view returns (bool) {
       
        return balanceOf(_user) > 0;
    }

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function writeMessage(string memory _content) public onlyTopWeb3Owner {
        uint256 messageId = messageIdCounter++;
        messages[messageId] = Message(msg.sender, _content, new uint256[](0));
    }

    function commentMessage(uint256 _messageId, string memory _content) public onlyTopWeb3Owner {
        uint256 commentId = messageIdCounter++;
        messages[_messageId].comments.push(commentId);
        messages[commentId] = Message(msg.sender, _content, new uint256[](0));
    }

    modifier onlyTopWeb3Owner {
        require(hasTopWeb3NFT(msg.sender), "Must own TOPWEB3 NFT");
        _;
    }

}
