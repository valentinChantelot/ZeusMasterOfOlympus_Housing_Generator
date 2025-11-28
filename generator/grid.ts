export class Grid {
    private width: number;
    private height: number;
    private grid: string[][];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.grid = Array(height).fill(null).map(() => Array(width).fill(" "));
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    place(x: number, y: number, code: string, width: number, height: number): boolean {
        if (x < 0 || y < 0 || x + width > this.width || y + height > this.height) {
            return false;
        }

        // Check collision
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (this.grid[y + i][x + j] !== " ") {
                    return false;
                }
            }
        }

        // Place
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                this.grid[y + i][x + j] = code;
            }
        }

        return true;
    }

    print() {
        console.log(this.grid.map(row => row.map(cell => cell.padEnd(2, " ")).join("")).join("\n"));
    }

    get(x: number, y: number): string | null {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return null;
        }
        return this.grid[y][x];
    }

    getReachableTiles(startX: number, startY: number, maxDist: number): Set<string> {
        const visited = new Set<string>();
        const queue: { x: number; y: number; dist: number }[] = [];

        // Start point must be a road or adjacent to road?
        // The walker spawns on the road. So startX, startY should be a road tile.
        if (this.get(startX, startY) !== "-") {
            return visited;
        }

        queue.push({ x: startX, y: startY, dist: 0 });
        visited.add(`${startX},${startY}`);

        while (queue.length > 0) {
            const { x, y, dist } = queue.shift()!;

            if (dist >= maxDist) continue;

            const neighbors = [
                { x: x + 1, y },
                { x: x - 1, y },
                { x, y: y + 1 },
                { x, y: y - 1 },
            ];

            for (const n of neighbors) {
                const key = `${n.x},${n.y}`;
                if (!visited.has(key)) {
                    const tile = this.get(n.x, n.y);
                    // Walkers can only walk on Road ("-")
                    if (tile === "-") {
                        visited.add(key);
                        queue.push({ x: n.x, y: n.y, dist: dist + 1 });
                    }
                }
            }
        }
        return visited;
    }

}
