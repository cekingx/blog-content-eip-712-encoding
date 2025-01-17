// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Single {
  struct Offer {
    address owner;
    string name;
    uint256 price;
  }

  function hashOffer(Offer memory offer) external pure returns(bytes32) {
    bytes32 OFFER_TYPEHASH = keccak256(bytes('Offer(address owner,string name,uint256 price)'));

    bytes memory encoded = abi.encode(
      OFFER_TYPEHASH,
      offer.owner,
      keccak256(bytes(offer.name)),
      offer.price
    );

    return keccak256(encoded);
  }
}