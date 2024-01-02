// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct NFTlisting {
    uint256 price;
    address seller;
}

contract NFTmarket is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId = 0;
    event TokenEvents(uint256 uid);
    event NFTTransfer(
        uint256 tokenId,
        address from,
        address to,
        string tokenURI,
        uint256 price
    );
    mapping(uint256 => NFTlisting) _listings;

    constructor() Ownable(msg.sender) ERC721("MYNFT", "MNFT") {}

    function createNft(string calldata tokenURI) public returns (uint256) {
        uint256 tokenId = ++_nextTokenId;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit TokenEvents(tokenId);
        emit NFTTransfer(tokenId,address(0), msg.sender, tokenURI, 0);

        return tokenId;
    }

    function listNFT(uint tokenId, uint price) public {
        require(price > 0, "Price is not valid");
        approve(address(this), tokenId); // gives permission to transfer the nft to the contract
        transferFrom(msg.sender, address(this), tokenId); //transfring the nft from user to the contract
        _listings[tokenId] = NFTlisting(price, msg.sender);
        emit NFTTransfer(tokenId,msg.sender, address(this), "", price);
    }

    function buyNFT(uint tokenId) public payable {
        NFTlisting memory listing = _listings[tokenId];
        require(listing.price > 0, "NFTMarker:nft not listed for sale");
        require(msg.value == listing.price, "NFTMarker:incorrect value");
        transferFrom(address(this), msg.sender, tokenId);
        clearListing(tokenId);
        emit NFTTransfer(tokenId,address(this), msg.sender, "", 0);

        payable(listing.seller).transfer((listing.price * 95) / 100);
    }

    function cancleListing(uint256 tokenId) public {
        NFTlisting memory listing = _listings[tokenId];
        require(listing.price > 0, "NFTMarket: NFT not for sale");
        require(
            listing.seller == msg.sender,
            "NFTMarket: You are not the owner"
        ); 
        transferFrom(address(this), msg.sender, tokenId);
        emit NFTTransfer(tokenId,address(this),  msg.sender, "", 0);
        clearListing(tokenId);
    }

    function withDraw() public onlyOwner {
        uint balance = address(this).balance;
        require(balance >0,"NFTMarket: Balance is zero");
        payable(owner()).transfer(balance);
    }

    function clearListing(uint256 tokenId) private {
        _listings[tokenId].price = 0;
        _listings[tokenId].seller = address(0);
    }
}
