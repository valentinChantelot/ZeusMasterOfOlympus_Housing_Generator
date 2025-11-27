import { Grid } from "./grid";
import { generalBuildings, commonHousing } from "./data";

export function generateSimpleBlock() {
    const grid = new Grid(10, 10);
    const road = generalBuildings.find(b => b.name === "Road")!;
    const house = commonHousing.find(b => b.name === "House")!;

    // Parse sizes (assuming "WxH" format)
    const getDims = (sizeStr: string) => {
        const [w, h] = sizeStr.replace("r", "").split("x").map(Number);
        return { w, h };
    };

    const roadDims = getDims(road.size);
    const houseDims = getDims(house.size);

    // 1. Place Road at (4, 4)
    grid.place(4, 4, road.code, roadDims.w, roadDims.h);

    // 2. Try to place House next to it
    // Simple approach: check 4 sides
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
