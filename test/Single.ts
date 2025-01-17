import { ethers } from "hardhat";

describe("Single", function () {
  it("should generate same hash", async function () {
    const Single = await ethers.getContractFactory("Single");
    const single = await Single.deploy();

    const typehash = ethers.keccak256(Buffer.from('Offer(address owner,string name,uint256 price)'))
    const offer = {
      owner: '0x16f750B6bb0eeF814358773197812f2989efEEe2',
      name: 'Water Bottle',
      price: 1000
    }

    const hashedName = ethers.keccak256(Buffer.from(offer.name))

    const coder = ethers.AbiCoder.defaultAbiCoder();
    const encoded = coder.encode(
      ['bytes32', 'address', 'bytes32', 'uint256'],
      [typehash, offer.owner, hashedName, offer.price]
    )

    const hash = ethers.keccak256(Buffer.from(encoded.slice(2), 'hex'))
    const hash2 = await single.hashOffer(offer)
    console.log('javascript', hash)
    console.log('solidity  ', hash2)
  })
})