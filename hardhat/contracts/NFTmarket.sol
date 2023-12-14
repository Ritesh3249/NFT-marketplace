// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTmarket is ERC721URIStorage {
    uint256 private _nextTokenId = 0;
    event TokenEvents(uint256 uid);
    constructor() ERC721("MYNFT", "MNFT") {}

    function createNft(string calldata tokenURI) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        emit TokenEvents(tokenId);
        return tokenId;
    }

    function listNFT(uint tokenId,uint price) public   {
        require(price >0,"Price is not valis");
        approve(msg.sender,tokenId); // gives permission to transfer the nft
    }
}
