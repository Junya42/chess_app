class Tiles {
    private tileColors: string[][];
    private originalColors: string[][];
  
    constructor() {
      // Initialize the tile colors and original colors
      this.tileColors = Array.from(Array(8), (row, i) =>
        Array.from(Array(8), (col, j) => (i + j) % 2 === 0 ? 'black' : 'white')
      );
      this.originalColors = Array.from(this.tileColors, row => [...row]);
    }
  
    public getColor(row: number, col: number): string {
        if (row < 0 || row > 7)
            return "";
      return this.tileColors[row][col];
    }
  
    public setAvailable(row: number, col: number): void {
        if (row < 0 || row > 7)
            return ;
        const color = this.getColor(row, col);
        
        if (color === 'black')
            this.tileColors[row][col] = 'ablack';
        else
        this.tileColors[row][col] = 'awhite';
    }
  
    public setAttacked(row: number, col: number): void {
        if (row < 0 || row > 7)
            return ;
        this.tileColors[row][col] = 'attack';
    }

    public setEnPassant(row: number, col: number): void {
        if (row < 0 || row > 7)
            return ;
        this.tileColors[row][col] = 'enpassant';
    }

    public setStart(row: number, col: number): void {
        if (row < 0 || row > 7)
            return ;
        this.tileColors[row][col] = 'start';
    }

    public reset(): void {
      this.tileColors = Array.from(this.originalColors, row => [...row]);
    }
  }
  
  export default Tiles;