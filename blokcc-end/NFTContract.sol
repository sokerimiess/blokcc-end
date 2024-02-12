pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFTContract is ERC721Enumerable {
    constructor() ERC721("MyNFT", "NFT") {}

    function mintNFT(address _to, uint256 _tokenId) external {
        _safeMint(_to, _tokenId);
    }
}