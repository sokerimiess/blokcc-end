pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract UserRegistry {
    struct UserProfile {
        string name;
        string biography;
        string profilePicture;
    }

    mapping(address => UserProfile) public users;
    address public nftContractAddress; // Объявление переменной для адреса контракта NFT

    constructor(address _nftContractAddress) {
        nftContractAddress = _nftContractAddress;
    }

    function registerUser(string memory _name, string memory _biography, string memory _profilePicture) public {
        require(bytes(users[msg.sender].name).length == 0, "User already registered");
        users[msg.sender] = UserProfile(_name, _biography, _profilePicture);
    }

    function hasTopWeb3NFT(address _user) public view returns (bool) {
        // Проверка владения NFT TOPWEB3
        return IERC721(nftContractAddress).balanceOf(_user) > 0;
    }

    // Добавление проверки в функции, требующие NFT
    modifier onlyTopWeb3Owner {
        require(hasTopWeb3NFT(msg.sender), "Must own TOPWEB3 NFT");
        _;
    }
}
