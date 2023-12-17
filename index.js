"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const early_adopters_json_1 = __importDefault(require("./snapshots/early_adopters.json"));
const telosians_json_1 = __importDefault(require("./snapshots/telosians.json"));
const kongz_snapshot_json_1 = __importDefault(require("./snapshots/kongz_snapshot.json"));
const KONGZ_BY_PET = 5;
const PET_PER_TELOSIANS = 3;
const PET_PER_EARLY_ADOPTER = 1;
function getBeneficiaries() {
    const beneficiaries = {};
    // Add early adopters
    for (const earlyAdopter of early_adopters_json_1.default) {
        beneficiaries[earlyAdopter.address] = PET_PER_EARLY_ADOPTER;
    }
    // Add telosians
    for (const telosian of telosians_json_1.default) {
        const amount = Math.ceil(telosian.nfts / PET_PER_TELOSIANS);
        if (beneficiaries[telosian.address]) {
            beneficiaries[telosian.address] += amount;
        }
        else {
            beneficiaries[telosian.address] = amount;
        }
    }
    // Add kongz
    for (const kongz of kongz_snapshot_json_1.default) {
        const amount = Math.ceil(kongz.nfts / KONGZ_BY_PET);
        if (beneficiaries[kongz.address]) {
            beneficiaries[kongz.address] += amount;
        }
        else {
            beneficiaries[kongz.address] = amount;
        }
    }
    return beneficiaries;
}
function main() {
    const beneficiaries = getBeneficiaries();
    let totalNfts = Object.values(beneficiaries).reduce((a, b) => a + b, 0);
    let totalBeneficiaries = Object.keys(beneficiaries).length;
    console.log(`Total NFTs: ${totalNfts}`);
    console.log(`Total Beneficiaries: ${totalBeneficiaries}`);
}
