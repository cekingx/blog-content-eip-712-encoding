import { ethers } from "hardhat";

describe("Nested", function () {
  it("should generate same hash", async function () {
    const Nested = await ethers.getContractFactory("Nested");
    const nested = await Nested.deploy();

    const coder = ethers.AbiCoder.defaultAbiCoder();
    const trade = {
      seller: {
        owner: '0x437C9Fe9c8C85Dd704541384528559D43590efB6',
        productName: 'Water Bottle'
      },
      buyer: {
        owner: '0x459f3A0143A5798d511E0A644655F43AE1abD2f9',
        price: 1000
      },
      timestamp: 17370835505
    }

    // Encode Seller
    const sellerHashedProductName = ethers.keccak256(Buffer.from(trade.seller.productName))
    const sellerEncoded = coder.encode(
      ['address', 'bytes32'],
      [trade.seller.owner, sellerHashedProductName]
    )
    const sellerHash = ethers.keccak256(Buffer.from(sellerEncoded.slice(2), 'hex'))

    // Encode Buyer
    const buyerEncoded = coder.encode(
      ['address', 'uint256'],
      [trade.buyer.owner, trade.buyer.price]
    )
    const buyerHash = ethers.keccak256(Buffer.from(buyerEncoded.slice(2), 'hex'))

    // Encode Trade
    const typehash = ethers.keccak256(Buffer.from('Trade(Seller seller,Buyer buyer,uint256 timestamp)Buyer(address owner,string productName)Seller(address owner,uint256 price)'))
    const tradeEncoded = coder.encode(
      ['bytes32', 'bytes32', 'bytes32', 'uint256'],
      [typehash, sellerHash, buyerHash, trade.timestamp]
    )

    const hash = ethers.keccak256(Buffer.from(tradeEncoded.slice(2), 'hex'))
    const hash2 = await nested.hashTrade(trade)
    console.log('javascript', hash)
    console.log('solidity  ', hash2)
  })
})