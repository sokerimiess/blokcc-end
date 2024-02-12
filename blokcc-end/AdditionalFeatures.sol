pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract AdditionalFeatures is ERC721Enumerable {
    address public nftContractAddress;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
    }

    function hasTopWeb3NFT(address _user) public view returns (bool) {
        return IERC721(nftContractAddress).balanceOf(_user) > 0;
    }

    modifier onlyTopWeb3Owner {
        require(hasTopWeb3NFT(msg.sender), "Must own TOPWEB3 NFT");
        _;
    }
    function additionalFunction() public onlyTopWeb3Owner {
       
    }
}
