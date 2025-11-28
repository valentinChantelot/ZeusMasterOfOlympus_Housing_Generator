import { Grid } from "./grid";
import { generalBuildings, commonHousing, hygieneAndSafetyBuildings } from "./data";
import { BlockGenerator } from "./block_generator";

export function generateOptimizedBlock() {
    const generator = new BlockGenerator();
    return generator.generate();
}
