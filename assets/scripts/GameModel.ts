export class GameModel {
    private width: number = 8;
    private height: number = 8;
    private board: number[][];
    private readonly tileColors: number = 5;

    private score: number = 0;
    private movesLeft: number = 20;
    private targetScore: number = 1000;

    private superTileThreshold: number = 8;
    private superTileSpawnChance: number = 0.02;
    private readonly superTileTypes = {
        ROW_BURNER: 5,
        COLUMN_BURNER: 6,
        RADIUS_BURNER: 7,
        FIELD_BURNER: 8
    };

    private readonly burnRadius: number = 1;

    constructor() {
        this.board = [];
        this.initBoard();
    }

    

    private initBoard(): void {
        this.board = [];
        
        for (let row = 0; row < this.height; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.width; col++) {
                if (Math.random() < this.superTileSpawnChance) {
                    this.board[row][col] = this.getRandomSuperTileType();
                } else {
                    this.board[row][col] = Math.floor(Math.random() * this.tileColors);
                }
            }
        }
        
    }

    private getRandomSuperTileType(): number {
        const superTileTypes = Object.values(this.superTileTypes);
        return superTileTypes[Math.floor(Math.random() * superTileTypes.length)];
    }

    public isSuperTile(tileType: number): boolean {
        return tileType >= this.superTileTypes.ROW_BURNER;
    }

    public getSuperTileInfo(tileType: number): { name: string, description: string } {
        switch(tileType) {
            case this.superTileTypes.ROW_BURNER:
                return { name: "Уничтожитель строк", description: "Сжигает всю строку" };
            case this.superTileTypes.COLUMN_BURNER:
                return { name: "Уничтожитель столбцов", description: "Сжигает весь столбец" };
            case this.superTileTypes.RADIUS_BURNER:
                return { name: "Взрывной", description: `Сжигает тайлы в радиусе ${this.burnRadius}` };
            case this.superTileTypes.FIELD_BURNER:
                return { name: "Апокалипсис", description: "Сжигает всё поле" };
            default:
                return { name: "Обычный тайл", description: "" };
        }
    }

    /**
     * Обрабатывает активацию супер-тайла и возвращает ВСЕ изменения
     */
    public activateSuperTile(row: number, col: number, tileType: number): {
        burnedTiles: {row: number, col: number}[],
        movements: {from: {row: number, col: number}, to: {row: number, col: number}}[],
        newTiles: {row: number, col: number, type: number}[],
        points: number
    } {
        let burnedTiles: {row: number, col: number}[] = [];

        const originalBoard = this.copyBoard();

        switch(tileType) {
            case this.superTileTypes.ROW_BURNER:
                burnedTiles = this.burnRow(row);
                break;
            case this.superTileTypes.COLUMN_BURNER:
                burnedTiles = this.burnColumn(col);
                break;
            case this.superTileTypes.RADIUS_BURNER:
                burnedTiles = this.burnRadiusTiles(row, col);
                break;
            case this.superTileTypes.FIELD_BURNER:
                burnedTiles = this.burnEntireField();
                break;
        }

        if (this.board[row][col] !== -1) {
            burnedTiles.push({ row, col });
            this.board[row][col] = -1;
        }

        const movements = this.processGravity();
        const newTiles = this.fillEmptyTiles();

        // Начисляем очки
        const points = burnedTiles.length * 15;
        this.score += points;
        this.movesLeft--;

        return {
            burnedTiles,
            movements,
            newTiles,
            points
        };
    }

    /**
     * Копирует текущее состояние доски
     */
    private copyBoard(): number[][] {
        return this.board.map(row => [...row]);
    }

    private burnRow(row: number): {row: number, col: number}[] {
        const burnedTiles: {row: number, col: number}[] = [];
        
        for (let col = 0; col < this.width; col++) {
            if (this.board[row][col] !== -1) {
                burnedTiles.push({ row, col });
                this.board[row][col] = -1;
            }
        }
        
        return burnedTiles;
    }

    private burnColumn(col: number): {row: number, col: number}[] {
        const burnedTiles: {row: number, col: number}[] = [];
        
        for (let row = 0; row < this.height; row++) {
            if (this.board[row][col] !== -1) {
                burnedTiles.push({ row, col });
                this.board[row][col] = -1;
            }
        }
        
        return burnedTiles;
    }

    private burnRadiusTiles(centerRow: number, centerCol: number): {row: number, col: number}[] {
        const burnedTiles: {row: number, col: number}[] = [];
        
        for (let row = centerRow - this.burnRadius; row <= centerRow + this.burnRadius; row++) {
            for (let col = centerCol - this.burnRadius; col <= centerCol + this.burnRadius; col++) {
                if (row >= 0 && row < this.height && col >= 0 && col < this.width && 
                    this.board[row][col] !== -1) {
                    burnedTiles.push({ row, col });
                    this.board[row][col] = -1;
                }
            }
        }
        
        return burnedTiles;
    }

    private burnEntireField(): {row: number, col: number}[] {
        const burnedTiles: {row: number, col: number}[] = [];
        
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                if (this.board[row][col] !== -1) {
                    burnedTiles.push({ row, col });
                    this.board[row][col] = -1;
                }
            }
        }
        
        return burnedTiles;
    }

    public createSuperTile(row: number, col: number, superTileType: number): void {
        this.board[row][col] = superTileType;
    }

    /**
     * Упрощенный метод обработки хода
     */
    public processMoveWithAnimations(group: {row: number, col: number}[], clickedRow?: number, clickedCol?: number): {
        points: number;
        movements: {from: {row: number, col: number}, to: {row: number, col: number}}[];
        newTiles: {row: number, col: number, type: number}[];
        createdSuperTile?: {row: number, col: number, type: number};
        activatedSuperTile?: {
            burnedTiles: {row: number, col: number}[],
            movements: {from: {row: number, col: number}, to: {row: number, col: number}}[],
            newTiles: {row: number, col: number, type: number}[],
            points: number
        };
    } {
        if (clickedRow !== undefined && clickedCol !== undefined && 
            this.isSuperTile(this.board[clickedRow][clickedCol])) {
            
            const superTileResult = this.activateSuperTile(clickedRow, clickedCol, this.board[clickedRow][clickedCol]);
            
            return {
                points: superTileResult.points,
                movements: superTileResult.movements,
                newTiles: superTileResult.newTiles,
                activatedSuperTile: superTileResult
            };
        }

        if (group.length < 2) {
            return { points: 0, movements: [], newTiles: [] };
        }

        const targetRow = clickedRow;
        const targetCol = clickedCol;

        this.removeTileGroup(group);
        
        const movements = this.processGravity();
        
        const newTiles = this.fillEmptyTiles();
        
        let createdSuperTile: {row: number, col: number, type: number} | undefined;
        if (group.length >= this.superTileThreshold && targetRow !== undefined && targetCol !== undefined) {
            if (targetRow >= 0 && targetRow < this.height && 
                targetCol >= 0 && targetCol < this.width &&
                this.board[targetRow][targetCol] !== -1) {
                
                const superTileType = this.getRandomSuperTileType();
                this.createSuperTile(targetRow, targetCol, superTileType);
                createdSuperTile = { 
                    row: targetRow, 
                    col: targetCol, 
                    type: superTileType 
                };
                
                console.log(`Создан супер-тайл типа ${superTileType} на позиции (${targetRow}, ${targetCol})`);
            } else {
                console.log(`Позиция (${targetRow}, ${targetCol}) недоступна для супер-тайла`);
            }
        }
        
        // Начисляем очки
        const basePoints = group.length * 10;
        const bonusPoints = group.length > 3 ? (group.length - 3) * 5 : 0;
        const totalPoints = basePoints + bonusPoints;
        
        this.score += totalPoints;
        this.movesLeft--;
        
        return {
            points: totalPoints,
            movements: movements,
            newTiles: newTiles,
            createdSuperTile: createdSuperTile
        };
    }

    public getBoard(): number[][] {
        return this.board;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public findTileGroup(startRow: number, startCol: number): {row: number, col: number}[] {
        const targetType = this.board[startRow][startCol];
        
        if (targetType === -1) {
            return [];
        }

        const visited: boolean[][] = [];
        for (let i = 0; i < this.height; i++) {
            visited[i] = new Array(this.width).fill(false);
        }

        const group: {row: number, col: number}[] = [];
        this.floodFill(startRow, startCol, targetType, visited, group);
        
        return group;
    }

    private floodFill(
        row: number, 
        col: number, 
        targetType: number, 
        visited: boolean[][], 
        group: {row: number, col: number}[]
    ): void {
        if (row < 0 || row >= this.height || col < 0 || col >= this.width) {
            return;
        }
        
        if (visited[row][col]) {
            return;
        }
        
        if (this.board[row][col] !== targetType) {
            return;
        }
        
        visited[row][col] = true;
        group.push({ row, col });
        
        this.floodFill(row - 1, col, targetType, visited, group);
        this.floodFill(row + 1, col, targetType, visited, group);
        this.floodFill(row, col - 1, targetType, visited, group);
        this.floodFill(row, col + 1, targetType, visited, group);
    }

    public removeTileGroup(group: {row: number, col: number}[]): void {
        for (const tile of group) {
            this.board[tile.row][tile.col] = -1;
        }
    }

    public processGravity(): {from: {row: number, col: number}, to: {row: number, col: number}}[] {
        const movements: {from: {row: number, col: number}, to: {row: number, col: number}}[] = [];
        
        for (let col = 0; col < this.width; col++) {
            movements.push(...this.processColumnGravity(col));
        }
        
        return movements;
    }

    private processColumnGravity(col: number): {from: {row: number, col: number}, to: {row: number, col: number}}[] {
        const movements: {from: {row: number, col: number}, to: {row: number, col: number}}[] = [];
        let writeIndex = this.height - 1;
        
        for (let row = this.height - 1; row >= 0; row--) {
            if (this.board[row][col] !== -1) {
                if (writeIndex !== row) {
                    movements.push({
                        from: { row, col },
                        to: { row: writeIndex, col }
                    });
                    
                    this.board[writeIndex][col] = this.board[row][col];
                    this.board[row][col] = -1;
                }
                writeIndex--;
            }
        }
        
        return movements;
    }

    public fillEmptyTiles(): {row: number, col: number, type: number}[] {
        const newTiles: {row: number, col: number, type: number}[] = [];
        
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                // Заполняем только действительно пустые клетки
                if (this.board[row][col] === -1) {
                    const tileType = Math.random() < this.superTileSpawnChance 
                        ? this.getRandomSuperTileType()
                        : Math.floor(Math.random() * this.tileColors);
                    
                    this.board[row][col] = tileType;
                    newTiles.push({ row, col, type: tileType });
                }
            }
        }
        
        return newTiles;
    }

    public checkGameStatus(): number {
        if (this.score >= this.targetScore) {
            return 1;
        }
        
        if (this.movesLeft <= 0) {
            return -1;
        }
        
        if (!this.hasValidMoves()) {
            return -1;
        }
        
        return 0;
    }

    private hasValidMoves(): boolean {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                const group = this.findTileGroup(row, col);
                if (group.length >= 2) {
                    return true;
                }
            }
        }
        return false;
    }

    public getScore(): number {
        return this.score;
    }

    public getMovesLeft(): number {
        return this.movesLeft;
    }

    public getTargetScore(): number {
        return this.targetScore;
    }

    public getSuperTileConfig(): any {
        return {
            types: this.superTileTypes,
            threshold: this.superTileThreshold,
            radius: this.burnRadius
        };
    }
}