import { Grid } from "./grid";
import {
    generalBuildings,
    commonHousing,
    hygieneAndSafetyBuildings,
    distributionBuildings,
    cultureBuildings,
    numberOfPeopleInMaximisedCommonHouse
} from "./data";

export class BlockGenerator {
    private bestGrid: Grid | null = null;
    private bestScore: number = -Infinity;

    constructor() { }

    public generate(): Grid {
        // Try different road loop sizes
        // Min size for a loop with stuff inside: 4x4 (2 road, 2 inside) -> too small
        // Let's try sizes from 10x10 to 30x30

        // For now, let's try a few fixed sizes to find something that works
        const sizes = [
            { w: 12, h: 12 },
            { w: 16, h: 16 },
            { w: 20, h: 10 },
            { w: 10, h: 20 },
            { w: 18, h: 18 },
        ];

        for (const size of sizes) {
            const grid = this.tryLayout(size.w, size.h);
            if (grid) {
                const score = this.evaluate(grid);
                if (score > this.bestScore) {
                    this.bestScore = score;
                    this.bestGrid = grid;
                }
            }
        }

        if (!this.bestGrid) {
            console.error("Failed to generate any valid block");
            return new Grid(10, 10); // Return empty grid on failure
        }

        return this.bestGrid;
    }

    private tryLayout(width: number, height: number): Grid | null {
        const padding = 6;
        const gridWidth = width + padding * 2;
        const gridHeight = height + padding * 2;
        const grid = new Grid(gridWidth, gridHeight);

        const roadStartX = padding;
        const roadStartY = padding;

        // 1. Place Road Loop
        const roadTiles: { x: number, y: number }[] = [];
        const road = generalBuildings.find(b => b.name === "Road")!;

        // Top and Bottom
        for (let x = 0; x < width; x++) {
            this.placeRoad(grid, roadStartX + x, roadStartY, road.code, roadTiles);
            this.placeRoad(grid, roadStartX + x, roadStartY + height - 1, road.code, roadTiles);
        }
        // Left and Right (excluding corners already placed)
        for (let y = 1; y < height - 1; y++) {
            this.placeRoad(grid, roadStartX, roadStartY + y, road.code, roadTiles);
            this.placeRoad(grid, roadStartX + width - 1, roadStartY + y, road.code, roadTiles);
        }

        // 2. Place Services
        // We need to cover the road loop with walkers from:
        // - Fountain (Water)
        // - Maintenance (Fire/Damage)
        // - Agora (Food/Basic Needs)
        // - Podium (Philosopher)
        // - Gym (Athlete)
        // - Theater (Actor)

        const servicesToPlace = [
            { name: "Fountain", type: "water" },
            { name: "Maintenance Office", type: "fire" }, // Covers damage too
            { name: "Agora", type: "basicNeeds" },
            { name: "Podium", type: "philosopher" },
            { name: "Gymnasium", type: "athlete" },
            { name: "Theater", type: "actor" },
        ];

        for (const service of servicesToPlace) {
            let buildingData;
            if (service.name === "Agora") {
                buildingData = distributionBuildings.find(b => b.name === "Agora");
            } else if (["Podium", "Gymnasium", "Theater"].includes(service.name)) {
                buildingData = cultureBuildings.find(b => b.name === service.name);
            } else {
                buildingData = hygieneAndSafetyBuildings.find(b => b.name === service.name);
            }

            if (!buildingData) {
                console.error(`Building ${service.name} not found`);
                continue;
            }

            if (!this.coverRoadWithService(grid, roadTiles, buildingData)) {
                // If we can't cover the road with essential services, this layout fails.
                // For now, we continue but it will get a low score or be invalid.
                // console.log(`Failed to fully cover with ${service.name}`);
            }
        }

        // Place College (No walker, just needs to be present)
        const college = cultureBuildings.find(b => b.name === "College")!;
        this.placeOneBuilding(grid, roadTiles, college);

        // 3. Place Houses
        const house = commonHousing.find(b => b.name === "House")!;
        // Try to place houses in all remaining valid spots adjacent to road
        // We scan the grid for spots that touch the road

        for (let y = 0; y < grid.getHeight(); y++) {
            for (let x = 0; x < grid.getWidth(); x++) {
                // Optimization: Check if near road first?
                // Just try to place.
                if (this.isAdjacentToRoad(grid, x, y, 2, 2)) { // House is 2x2
                    grid.place(x, y, house.code, 2, 2);
                }
            }
        }

        return grid;
    }

    private placeRoad(grid: Grid, x: number, y: number, code: string, roadTiles: { x: number, y: number }[]) {
        if (grid.get(x, y) !== code) {
            grid.place(x, y, code, 1, 1);
            roadTiles.push({ x, y });
        }
    }

    private coverRoadWithService(grid: Grid, roadTiles: { x: number, y: number }[], building: any): boolean {
        const coveredTiles = new Set<string>();
        const roadSet = new Set(roadTiles.map(t => `${t.x},${t.y}`));

        // Safety break to prevent infinite loops
        let attempts = 0;
        while (coveredTiles.size < roadSet.size && attempts < 10) {
            attempts++;

            // Find best spot to place building to maximize NEW coverage
            let bestSpot = null;
            let maxNewCoverage = -1;

            // Iterate all potential placement spots
            // Optimization: Only check spots adjacent to UNCOVERED road tiles?
            // Or just scan grid.

            for (let y = 0; y < grid.getHeight(); y++) {
                for (let x = 0; x < grid.getWidth(); x++) {
                    const [w, h] = building.size.split('x').map(Number); // Handle "3xn r" ? No, these are fixed size
                    // Handle "3x6"

                    // Check if valid placement
                    // Must be adjacent to road
                    if (!this.isAdjacentToRoad(grid, x, y, w, h)) continue;

                    // Must not collide (grid.place check, but we don't want to place yet)
                    if (!this.canPlace(grid, x, y, w, h)) continue;

                    // Calculate coverage
                    // We need to know WHERE it connects to the road.
                    // Simplified: Assume it connects to ALL adjacent road tiles.
                    // And walker spawns from one of them.
                    // Let's pick the first adjacent road tile as spawn point.
                    const spawn = this.getSpawnPoint(grid, x, y, w, h);
                    if (!spawn) continue;

                    const range = building.walker ? building.walker.tiles : 0;
                    const reach = grid.getReachableTiles(spawn.x, spawn.y, range);

                    // Count new covered road tiles
                    let newCovered = 0;
                    for (const t of reach) {
                        if (roadSet.has(t) && !coveredTiles.has(t)) {
                            newCovered++;
                        }
                    }

                    if (newCovered > maxNewCoverage) {
                        maxNewCoverage = newCovered;
                        bestSpot = { x, y, w, h, reach };
                    }
                }
            }

            if (bestSpot && maxNewCoverage > 0) {
                grid.place(bestSpot.x, bestSpot.y, building.code, bestSpot.w, bestSpot.h);
                for (const t of bestSpot.reach) {
                    if (roadSet.has(t)) coveredTiles.add(t);
                }
            } else {
                // Cannot cover more
                break;
            }
        }

        return coveredTiles.size === roadSet.size;
    }

    private placeOneBuilding(grid: Grid, roadTiles: { x: number, y: number }[], building: any) {
        const [w, h] = building.size.split('x').map(Number);
        for (let y = 0; y < grid.getHeight(); y++) {
            for (let x = 0; x < grid.getWidth(); x++) {
                if (this.isAdjacentToRoad(grid, x, y, w, h)) {
                    if (grid.place(x, y, building.code, w, h)) return;
                }
            }
        }
    }

    private canPlace(grid: Grid, x: number, y: number, w: number, h: number): boolean {
        if (x < 0 || y < 0 || x + w > grid.getWidth() || y + h > grid.getHeight()) return false;
        for (let i = 0; i < h; i++) {
            for (let j = 0; j < w; j++) {
                if (grid.get(x + j, y + i) !== ' ') return false;
            }
        }
        return true;
    }

    private getSpawnPoint(grid: Grid, x: number, y: number, w: number, h: number): { x: number, y: number } | null {
        // Return first adjacent road tile
        // Top
        for (let i = 0; i < w; i++) if (grid.get(x + i, y - 1) === '-') return { x: x + i, y: y - 1 };
        // Bottom
        for (let i = 0; i < w; i++) if (grid.get(x + i, y + h) === '-') return { x: x + i, y: y + h };
        // Left
        for (let i = 0; i < h; i++) if (grid.get(x - 1, y + i) === '-') return { x: x - 1, y: y + i };
        // Right
        for (let i = 0; i < h; i++) if (grid.get(x + w, y + i) === '-') return { x: x + w, y: y + i };
        return null;
    }

    private isAdjacentToRoad(grid: Grid, x: number, y: number, w: number, h: number): boolean {
        // Check perimeter
        // Top edge
        for (let i = 0; i < w; i++) if (grid.get(x + i, y - 1) === '-') return true;
        // Bottom edge
        for (let i = 0; i < w; i++) if (grid.get(x + i, y + h) === '-') return true;
        // Left edge
        for (let i = 0; i < h; i++) if (grid.get(x - 1, y + i) === '-') return true;
        // Right edge
        for (let i = 0; i < h; i++) if (grid.get(x + w, y + i) === '-') return true;

        return false;
    }

    private evaluate(grid: Grid): number {
        // Count houses
        let houses = 0;
        const h = grid.getHeight();
        const w = grid.getWidth();
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                if (grid.get(x, y) === 'Ho') houses++;
            }
        }
        // Each house is 4 cells (2x2).
        // But grid.get returns 'Ho' for ALL 4 cells? 
        // grid.place sets all cells.
        // So we count 'Ho' cells and divide by 4.
        const numHouses = houses / 4;

        // Score = Total People
        return numHouses * numberOfPeopleInMaximisedCommonHouse;
    }
}
