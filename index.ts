import * as fs from "fs";
import earlyAdopters from "./snapshots/early_adopters.json";
import telosians from "./snapshots/__telosians.json";
import kongzSnapshot from "./snapshots/__kongz.json";
import { punksSnapshot } from "./snapshots/telosPunks";

const KONGZ_BY_PET = 10;
const PET_PER_TELOSIANS = 5;
const PET_PER_EARLY_ADOPTER = 1;
const PET_PER_PUNKS = 30;

function getBeneficiaries() {
  const beneficiaries: Record<string, number> = {};

  // Add early adopters
  for (const earlyAdopter of earlyAdopters) {
    beneficiaries[earlyAdopter.address] = PET_PER_EARLY_ADOPTER;
  }

  // Add telosians
  for (const telosian of telosians) {
    const amount = Math.ceil(telosian.nfts / PET_PER_TELOSIANS);
    if (beneficiaries[telosian.address]) {
      beneficiaries[telosian.address] += amount;
    } else {
      beneficiaries[telosian.address] = amount;
    }
  }

  // Add kongz
  for (const kongz of kongzSnapshot) {
    const amount = Math.ceil(kongz.nfts / KONGZ_BY_PET);
    if (beneficiaries[kongz.address]) {
      beneficiaries[kongz.address] += amount;
    } else {
      beneficiaries[kongz.address] = amount;
    }
  }

  // Add telos punks
  for (const punk of punksSnapshot) {
    const amount = Math.ceil(punk.nfts / PET_PER_PUNKS);
    if (beneficiaries[punk.address]) {
      beneficiaries[punk.address] += amount;
    } else {
      beneficiaries[punk.address] = amount;
    }
  }

  return beneficiaries;
}

function main() {
  const beneficiaries = getBeneficiaries();

  let totalNfts = Object.values(beneficiaries).reduce((a, b) => a + b, 0);
  let totalBeneficiaries = Object.keys(beneficiaries).length;

  fs.writeFileSync("final.json", JSON.stringify(beneficiaries, null, 2));

  console.log(beneficiaries);
  console.log(`Total NFTs: ${totalNfts}`);
  console.log(`Total Beneficiaries: ${totalBeneficiaries}`);
}
main();
