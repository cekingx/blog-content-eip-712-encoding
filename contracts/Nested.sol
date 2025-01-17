// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Nested {
  struct Seller {
    address owner;
    string productName;
  }

  struct Buyer {
    address owner;
    uint256 price;
  }

  struct Trade {
    Seller seller;
    Buyer buyer;
    uint256 timestamp;
  }

  function hashTrade(Trade memory trade) external pure returns(bytes32) {
    bytes32 TRADE_TYPEHASH = keccak256(bytes('Trade(Seller seller,Buyer buyer,uint256 timestamp)Buyer(address owner,string productName)Seller(address owner,uint256 price)'));

    bytes memory encodedSeller = abi.encode(
      trade.seller.owner,
      keccak256(bytes(trade.seller.productName))
    );

    bytes memory encodedBuyer = abi.encode(
      trade.buyer.owner,
      trade.buyer.price
    );

    bytes memory encodedTrade = abi.encode(
      TRADE_TYPEHASH,
      keccak256(encodedSeller),
      keccak256(encodedBuyer),
      trade.timestamp
    );

    return keccak256(encodedTrade);
  }
}