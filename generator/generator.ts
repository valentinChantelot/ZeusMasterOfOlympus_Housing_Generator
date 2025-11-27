import { Grid } from "./grid";
import { generalBuildings, commonHousing, hygieneAndSafetyBuildings } from "./data";

function getDims(sizeStr: string) {
    const [w, h] = sizeStr.replace("r", "").split("x").map(Number);
    return { w, h };
}

export function generateSimpleBlock() {
    const grid = new Grid(10, 10);
    const road = generalBuildings.find(b => b.name === "Road")!;
    const house = commonHousing.find(b => b.name === "House")!;

    const roadDims = getDims(road.size);
    const houseDims = getDims(house.size);

    // 1. Place Road at (4, 4)
    grid.place(4, 4, road.code, roadDims.w, roadDims.h);

    // 2. Try to place House next to it
    const candidates = [
        { x: 4 + roadDims.w, y: 4 }, // Right
        { x: 4 - houseDims.w, y: 4 }, // Left
        { x: 4, y: 4 + roadDims.h }, // Bottom
        { x: 4, y: 4 - houseDims.h }, // Top
    ];

    for (const pos of candidates) {
        if (grid.place(pos.x, pos.y, house.code, houseDims.w, houseDims.h)) {
            console.log(`Placed House at ${pos.x}, ${pos.y}`);
            break;
        }
    }

    return grid;
}

export function generateOptimizedBlock() {
    // 1. Setup Grid and Road
    // Road length 60 to allow plenty of space (27 range * 2 approx)
    const width = 80;
    const height = 20;
    const grid = new Grid(width, height);

    const road = generalBuildings.find(b => b.name === "Road")!;
    const house = commonHousing.find(b => b.name === "House")!;
    const fountain = hygieneAndSafetyBuildings.find(b => b.name === "Fountain")!;
    const maintenance = hygieneAndSafetyBuildings.find(b => b.name === "Maintenance Office")!;

    const roadY = 10;
    const roadStartX = 10;
    const roadLength = 60;

    // Place Road
    for (let i = 0; i < roadLength; i++) {
        grid.place(roadStartX + i, roadY, road.code, 1, 1);
    }

    // 2. Place Services near center
    // Center of road is approx x = 10 + 30 = 40.
    // Fountain (2x2) at (40, 8) (Top side of road)
    // Maintenance (2x2) at (42, 8) (Top side of road)

    // Note: Buildings need road access. If road is at Y=10.
    // Top side buildings should be at Y=10 - Height.
    // Fountain (2x2) -> Y = 10 - 2 = 8.
    // Maint (2x2) -> Y = 10 - 2 = 8.

    grid.place(40, 8, fountain.code, 2, 2);
    grid.place(42, 8, maintenance.code, 2, 2);

    // 3. Calculate Reachable Tiles
    // Fountain walker spawns at road adjacent to (40,8). 
    // Adjacent road tiles: (40,10) and (41,10). Let's pick (40,10).
    const fountainRange = fountain.walker!.tiles;
    const fountainReach = grid.getReachableTiles(40, 10, fountainRange);

    // Maint walker spawns at road adjacent to (42,8).
    // Adjacent road tiles: (42,10) and (43,10). Let's pick (42,10).
    const maintRange = maintenance.walker!.tiles;
    const maintReach = grid.getReachableTiles(42, 10, maintRange);

    // Intersection
    const safeRoadTiles = new Set<string>();
    for (const tile of fountainReach) {
        if (maintReach.has(tile)) {
            safeRoadTiles.add(tile);
        }
    }

    console.log(`Safe Road Tiles: ${safeRoadTiles.size}`);

    // 4. Place Houses along Safe Zone
    // Houses (2x2) can be placed on Top (Y=8) or Bottom (Y=11).
    // We iterate through the road tiles. If a road tile is safe, we check if we can place a house adjacent to it.
    // Note: A house needs ONE point of contact.

    // Strategy: Iterate all potential house spots along the road and check if they touch a safe road tile.

    let houseCount = 0;

    // Top side (Y=8)
    // We already have Fountain and Maint there.
    for (let x = roadStartX; x < roadStartX + roadLength; x++) {
        // Check if this spot can hold a house (2x2) at (x, 8)
        // And if it touches a safe road tile.
        // House at (x, 8) touches (x, 10) and (x+1, 10).
        // If either (x,10) or (x+1,10) is safe, it's valid.

        const touchesSafe = safeRoadTiles.has(`${x},10`) || safeRoadTiles.has(`${x + 1},10`);
        if (touchesSafe) {
            if (grid.place(x, 8, house.code, 2, 2)) {
                houseCount++;
                // Skip next x because we placed a 2-wide building? 
                // No, the loop increments by 1, but grid.place checks collision.
                // If we placed at x, then x+1 is occupied. Next iter x+1 will fail.
            }
        }
    }

    // Bottom side (Y=11)
    for (let x = roadStartX; x < roadStartX + roadLength; x++) {
        const touchesSafe = safeRoadTiles.has(`${x},10`) || safeRoadTiles.has(`${x + 1},10`);
        if (touchesSafe) {
            if (grid.place(x, 11, house.code, 2, 2)) {
                houseCount++;
            }
        }
    }

    console.log(`Total Houses Placed: ${houseCount}`);
    return grid;
}
