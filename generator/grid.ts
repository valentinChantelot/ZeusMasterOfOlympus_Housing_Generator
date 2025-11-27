export class Grid {
    private width: number;
    private height: number;
    private grid: string[][];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.grid = Array(height).fill(null).map(() => Array(width).fill(" "));
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
        console.log(this.grid.map(row => row.join("")).join("\n"));
    }

    get(x: number, y: number): string | null {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            return null;
        }
        return this.grid[y][x];
    }
}
