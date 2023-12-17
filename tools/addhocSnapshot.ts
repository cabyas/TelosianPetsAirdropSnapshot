import * as fs from "fs";
import { ethers } from "ethers";
import { ERC721_ABI } from "./erc721.abi";

// kongz
const KONGZ_CONTRACT_ADDRESS = "0x27f4e87Fc4e5Ec6f1102a48B13B62877Ff306bDE";

// telosians
const TELOSIANS_CONTRACT_ADDRESS = "0x61F1B98e15B4715Ac0c096bd887cc650E5361797";

async function createSnapshot(
  contractAddress: string,
  file: string,
  supply: number
) {
  const provider = new ethers.JsonRpcProvider("https://mainnet.telos.net/evm");
  const contract = new ethers.Contract(contractAddress, ERC721_ABI, provider);

  const ownerMap: Record<string, number> = {};

  for (let id = 1; id <= supply; id++) {
    const address = await contract.ownerOf(id);
    if (ownerMap[address]) {
      ownerMap[address] += 1;
    } else {
      ownerMap[address] = 1;
    }
  }

  // Convert the map to an array of addresses
  const ownerSnapshot = Array.from(Object.entries(ownerMap))
    .map((element) => ({
      address: element[0],
      nfts: element[1],
    }))
    .sort((a, b) => b.nfts - a.nfts);

  fs.writeFileSync(file, JSON.stringify(ownerSnapshot, null, 2));
}

createSnapshot(KONGZ_CONTRACT_ADDRESS, "./snapshots/__kongz.json", 500);
createSnapshot(
  TELOSIANS_CONTRACT_ADDRESS,
  "./snapshots/__telosians.json",
  2500
);
