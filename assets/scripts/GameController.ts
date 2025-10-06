import { GameModel } from "./GameModel";

const { ccclass, property } = cc._decorator;

@ccclass
export class GameController extends cc.Component {
    private gameModel: GameModel = null;
    
    @property(cc.Prefab)
    private tilePrefab: cc.Prefab = null;
    
    @property(cc.Node)
    private boardNode: cc.Node = null; 
    
    @property(cc.Label)
    private scoreLabel: cc.Label = null;
    
    @property(cc.Label)
    private movesLabel: cc.Label = null;
    
    @property(cc.Node)
    private gameOverNode: cc.Node = null;
    
    @property(cc.Label)
    private gameOverLabel: cc.Label = null;

    @property([cc.SpriteFrame])
    private tileSprites: cc.SpriteFrame[] = [];

    @property({ type: cc.SpriteFrame })
    private rowBurnerSprite: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    private columnBurnerSprite: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    private radiusBurnerSprite: cc.SpriteFrame = null;

    @property({ type: cc.SpriteFrame })
    private fieldBurnerSprite: cc.SpriteFrame = null;

    @property
    private boardPadding: number = 50;

    @property
    private internalPadding: number = 20;
    
    private tileSize: number = 0;
    private isBoardReady: boolean = false;
    private tilesContainer: cc.Node = null;
    private isProcessingMove: boolean = false;
    private superTileConfig: any = null;

    onLoad() {
        this.gameModel = new GameModel();
        this.superTileConfig = this.gameModel.getSuperTileConfig();
        
        if (this.gameOverNode) {
            this.gameOverNode.active = false;
        }
        
        this.calculateBoardSize();
        this.createBoardView();
        this.updateUI();
        this.isBoardReady = true;

        cc.view.on('canvas-resize', this.onResize, this);
    }

    onDestroy() {
        cc.view.off('canvas-resize', this.onResize, this);
    }

    /**
     * Обработчик клика по тайлу
     */
    private async onTileClick(row: number, col: number, tileType: number): Promise<void> {
        if (!this.isBoardReady || this.isProcessingMove) return;
        
        this.isProcessingMove = true;
        
        try {
            console.log(`Клик по тайлу: row=${row}, col=${col}, type=${tileType}`);
            
            if (this.gameModel.isSuperTile(tileType)) {
                console.log("Активирован супер-тайл!");
                await this.processSuperTileActivation(row, col, tileType);
            } else {
                const group = this.gameModel.findTileGroup(row, col);
                
                if (group.length < 2) {
                    console.log("Группа слишком мала для сжигания");
                    this.animateNoMatch(row, col);
                    return;
                }
                
                await this.processNormalMove(group, row, col);
            }
            
        } catch (error) {
            console.error("Ошибка при обработке хода:", error);
        } finally {
            this.isProcessingMove = false;
        }
    }

    /**
     * Обрабатывает активацию супер-тайла
     */
    private async processSuperTileActivation(row: number, col: number, tileType: number): Promise<void> {
        await this.animateSuperTileActivation(row, col);
        
        const moveResult = this.gameModel.processMoveWithAnimations([], row, col);
        
        if (moveResult.activatedSuperTile) {
            await this.animateSuperTileBurn(moveResult.activatedSuperTile.burnedTiles, tileType);
            
            await this.animateFallingTiles(moveResult.activatedSuperTile.movements);
            await this.animateNewTiles(moveResult.activatedSuperTile.newTiles);
        } else {
            await this.animateFallingTiles(moveResult.movements);
            await this.animateNewTiles(moveResult.newTiles);
        }
        
        this.cleanupOldTiles();
        
        if (moveResult.activatedSuperTile) {
            this.animateScorePoints(moveResult.activatedSuperTile.points, row, col);
        } else {
            this.animateScorePoints(moveResult.points, row, col);
        }
        
        this.updateUI();
        this.checkGameStatus();
    }

    /**
     * Обрабатывает обычный ход
    */
    private async processNormalMove(group: {row: number, col: number}[], clickedRow: number, clickedCol: number): Promise<void> {
        await this.removeTilesVisual(group);
        
        const moveResult = this.gameModel.processMoveWithAnimations(group, clickedRow, clickedCol);
        
        // 🔥 СНАЧАЛА анимируем падение существующих тайлов
        await this.animateFallingTiles(moveResult.movements);
        
        // 🔥 ПОТОМ анимируем появление новых тайлов
        await this.animateNewTiles(moveResult.newTiles);
        
        // 🔥 И ТОЛЬКО ПОТОМ анимируем создание супер-тайла
        if (moveResult.createdSuperTile) {
            await this.animateSuperTileCreation(moveResult.createdSuperTile);
        }
        
        this.cleanupOldTiles();
        this.animateScorePoints(moveResult.points, clickedRow, clickedCol);
        this.updateUI();
        this.checkGameStatus();
    }

    /**
     * Анимирует создание супер-тайла
     */
    private async animateSuperTileCreation(superTile: {row: number, col: number, type: number}): Promise<void> {
        return new Promise((resolve) => {
            const tileNode = this.findTileNode(superTile.row, superTile.col);
            if (!tileNode) {
                console.log(`Не найден тайл для супер-тайла на позиции (${superTile.row}, ${superTile.col})`);
                resolve();
                return;
            }

            // 🔥 ИСПРАВЛЕНИЕ: Обновляем данные тайла перед анимацией
            tileNode['tileType'] = superTile.type;
            
            cc.tween(tileNode)
                .to(0.2, { scale: 1.5 })
                .call(() => {
                    this.setTileSprite(tileNode, superTile.type);
                })
                .to(0.2, { scale: 1 })
                .call(() => {
                    // 🔥 ИСПРАВЛЕНИЕ: Обновляем обработчик клика для нового типа тайла
                    tileNode.off(cc.Node.EventType.TOUCH_END);
                    tileNode.on(cc.Node.EventType.TOUCH_END, () => {
                        this.onTileClick(superTile.row, superTile.col, superTile.type);
                    });
                    resolve();
                })
                .start();
        });
    }

    /**
     * Анимирует активацию супер-тайла
     */
    private async animateSuperTileActivation(row: number, col: number): Promise<void> {
        return new Promise((resolve) => {
            const tileNode = this.findTileNode(row, col);
            if (!tileNode) {
                resolve();
                return;
            }

            cc.tween(tileNode)
                .parallel(
                    cc.tween().to(0.3, { scale: 3 }, { easing: 'backOut' }),
                    cc.tween().to(0.3, { opacity: 0 })
                )
                .call(() => {
                    tileNode.destroy();
                    resolve();
                })
                .start();
        });
    }

    /**
     * Анимирует сжигание тайлов супер-способностью
     */
    private async animateSuperTileBurn(burnedTiles: {row: number, col: number}[], superTileType: number): Promise<void> {
        return new Promise((resolve) => {
            if (burnedTiles.length === 0) {
                resolve();
                return;
            }

            let completedAnimations = 0;
            const effectColor = this.getSuperTileEffectColor(superTileType);

            for (const tile of burnedTiles) {
                const tileNode = this.findTileNode(tile.row, tile.col);
                if (tileNode) {
                    cc.tween(tileNode)
                        .to(0.2, { 
                            scale: 1.3,
                            color: effectColor
                        })
                        .to(0.2, { 
                            scale: 0,
                            opacity: 0
                        })
                        .call(() => {
                            tileNode.destroy();
                            completedAnimations++;
                            if (completedAnimations === burnedTiles.length) {
                                resolve();
                            }
                        })
                        .start();
                } else {
                    completedAnimations++;
                    if (completedAnimations === burnedTiles.length) {
                        resolve();
                    }
                }
            }
        });
    }

    /**
     * Получает цвет эффекта для супер-тайла
     */
    private getSuperTileEffectColor(superTileType: number): cc.Color {
        switch(superTileType) {
            case this.superTileConfig.types.ROW_BURNER:
                return cc.Color.RED;
            case this.superTileConfig.types.COLUMN_BURNER:
                return cc.Color.BLUE;
            case this.superTileConfig.types.RADIUS_BURNER:
                return cc.Color.ORANGE;
            case this.superTileConfig.types.FIELD_BURNER:
                return cc.Color.MAGENTA;
            default:
                return cc.Color.WHITE;
        }
    }

    /**
     * Устанавливает спрайт тайла
     */
    private setTileSprite(tileNode: cc.Node, tileType: number): void {
        const sprite = tileNode.getComponent(cc.Sprite);
        
        if (!sprite) return;

        if (this.gameModel.isSuperTile(tileType)) {
            switch(tileType) {
                case this.superTileConfig.types.ROW_BURNER:
                    if (this.rowBurnerSprite) sprite.spriteFrame = this.rowBurnerSprite;
                    break;
                case this.superTileConfig.types.COLUMN_BURNER:
                    if (this.columnBurnerSprite) sprite.spriteFrame = this.columnBurnerSprite;
                    break;
                case this.superTileConfig.types.RADIUS_BURNER:
                    if (this.radiusBurnerSprite) sprite.spriteFrame = this.radiusBurnerSprite;
                    break;
                case this.superTileConfig.types.FIELD_BURNER:
                    if (this.fieldBurnerSprite) sprite.spriteFrame = this.fieldBurnerSprite;
                    break;
            }
            tileNode.getComponent(cc.Sprite)['_sgNode']?.setState(cc.Sprite.State.GRAY);
        } 
        else if (this.tileSprites.length > tileType) {
            sprite.spriteFrame = this.tileSprites[tileType];
        } else {
            const colors = [
                cc.Color.RED,
                cc.Color.GREEN, 
                cc.Color.BLUE,
                cc.Color.YELLOW,
                cc.Color.MAGENTA
            ];
            sprite.node.color = colors[tileType] || cc.Color.WHITE;
        }
        
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    }

    /**
     * Вычисляет размер Board и тайлов
     */
    private calculateBoardSize(): void {
        const visibleSize = cc.view.getVisibleSize();
        const width = this.gameModel.getWidth();
        const height = this.gameModel.getHeight();
        
        const availableWidth = visibleSize.width - this.boardPadding * 2;
        const availableHeight = visibleSize.height - this.boardPadding * 2;

        const maxWidthTileSize = availableWidth / width;
        const maxHeightTileSize = availableHeight / height;

        this.tileSize = Math.min(maxWidthTileSize, maxHeightTileSize);

        const boardWidth = width * this.tileSize + this.internalPadding * 2;
        const boardHeight = height * this.tileSize + this.internalPadding * 2;

        this.boardNode.setContentSize(boardWidth, boardHeight);
        this.boardNode.setPosition(0, 0);
        this.setupBoardBorder();

        console.log(`Размер Board: ${boardWidth}x${boardHeight}`);
        console.log(`Размер тайла: ${this.tileSize}`);
        console.log(`Внутренние отступы: ${this.internalPadding}`);
    }

    /**
     * Обработчик изменения размера экрана
     */
    private onResize(): void {
        if (!this.isBoardReady) return;
        
        console.log("Адаптируем поле к новому размеру экрана...");
        this.scheduleOnce(() => {
            this.calculateBoardSize();
            this.recreateBoardView();
        }, 0.1);
    }

    /**
     * Создает визуальное представление игрового поля
     */
    private createBoardView(): void {
        const board = this.gameModel.getBoard();
        const width = this.gameModel.getWidth();
        const height = this.gameModel.getHeight();

        this.tilesContainer = new cc.Node('TilesContainer');
        this.tilesContainer.setPosition(0, 0);
        this.boardNode.addChild(this.tilesContainer);

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                this.createTile(row, col, board[row][col]);
            }
        }
    }

    /**
     * Создает один тайл на поле
     */
    private createTile(row: number, col: number, tileType: number): void {
        const tileNode = cc.instantiate(this.tilePrefab);
        
        const x = col * this.tileSize + this.tileSize / 2 - (this.gameModel.getWidth() * this.tileSize) / 2;
        const y = -row * this.tileSize - this.tileSize / 2 + (this.gameModel.getHeight() * this.tileSize) / 2;
        
        tileNode.setPosition(x, y);
        tileNode.setContentSize(this.tileSize, this.tileSize);
        
        this.tilesContainer.addChild(tileNode);

        this.setTileSprite(tileNode, tileType);

        this.animateTileAppearance(tileNode);

        tileNode.on(cc.Node.EventType.TOUCH_END, () => {
            this.onTileClick(row, col, tileType);
        });

        tileNode['tileRow'] = row;
        tileNode['tileCol'] = col;
        tileNode['tileType'] = tileType;
    }

    /**
     * Анимация появления тайла
     */
    private animateTileAppearance(tileNode: cc.Node): void {
        tileNode.scale = 0;
        cc.tween(tileNode)
            .to(0.2, { scale: 1 }, { easing: 'backOut' })
            .start();
    }

    /**
     * Анимирует падение тайлов
     */
    private animateFallingTiles(movements: {from: {row: number, col: number}, to: {row: number, col: number}}[]): Promise<void> {
        return new Promise((resolve) => {
            if (movements.length === 0) {
                resolve();
                return;
            }

            let completedAnimations = 0;
            
            for (const movement of movements) {
                const tileNode = this.findTileNode(movement.from.row, movement.from.col);
                if (tileNode) {
                    tileNode.off(cc.Node.EventType.TOUCH_END);
                    
                    tileNode['tileRow'] = movement.to.row;
                    tileNode['tileCol'] = movement.to.col;
                    
                    const newX = movement.to.col * this.tileSize + this.tileSize / 2 - (this.gameModel.getWidth() * this.tileSize) / 2;
                    const newY = -movement.to.row * this.tileSize - this.tileSize / 2 + (this.gameModel.getHeight() * this.tileSize) / 2;
                    
                    cc.tween(tileNode)
                        .to(0.3, { 
                            x: newX, 
                            y: newY 
                        }, { easing: 'sineOut' })
                        .call(() => {
                            const finalRow = movement.to.row;
                            const finalCol = movement.to.col;
                            const finalType = this.gameModel.getBoard()[finalRow][finalCol];
                            
                            tileNode.off(cc.Node.EventType.TOUCH_END); 
                            tileNode.on(cc.Node.EventType.TOUCH_END, () => {
                                this.onTileClick(finalRow, finalCol, finalType);
                            });
                            
                            completedAnimations++;
                            if (completedAnimations === movements.length) {
                                resolve();
                            }
                        })
                        .start();
                } else {
                    completedAnimations++;
                    if (completedAnimations === movements.length) {
                        resolve();
                    }
                }
            }
        });
    }

    /**
     * Анимирует появление новых тайлов
     */
    private animateNewTiles(newTiles: {row: number, col: number, type: number}[]): Promise<void> {
        return new Promise((resolve) => {
            if (newTiles.length === 0) {
                resolve();
                return;
            }

            let completedAnimations = 0;
            
            for (const tileInfo of newTiles) {
                const existingTile = this.findTileNode(tileInfo.row, tileInfo.col);
                if (existingTile) {
                    console.log(`Тайл уже существует: row=${tileInfo.row}, col=${tileInfo.col}`);
                    completedAnimations++;
                    if (completedAnimations === newTiles.length) {
                        resolve();
                    }
                    continue;
                }
                
                const tileNode = cc.instantiate(this.tilePrefab);
                
                const startX = tileInfo.col * this.tileSize + this.tileSize / 2 - (this.gameModel.getWidth() * this.tileSize) / 2;
                const startY = -(-1) * this.tileSize - this.tileSize / 2 + (this.gameModel.getHeight() * this.tileSize) / 2 + 100;
                
                const endX = tileInfo.col * this.tileSize + this.tileSize / 2 - (this.gameModel.getWidth() * this.tileSize) / 2;
                const endY = -tileInfo.row * this.tileSize - this.tileSize / 2 + (this.gameModel.getHeight() * this.tileSize) / 2;
                
                tileNode.setPosition(startX, startY);
                tileNode.setContentSize(this.tileSize, this.tileSize);
                
                this.tilesContainer.addChild(tileNode);
                this.setTileSprite(tileNode, tileInfo.type);

                tileNode['tileRow'] = tileInfo.row;
                tileNode['tileCol'] = tileInfo.col;
                tileNode['tileType'] = tileInfo.type;

                tileNode.on(cc.Node.EventType.TOUCH_END, () => {
                    this.onTileClick(tileInfo.row, tileInfo.col, tileInfo.type);
                });

                cc.tween(tileNode)
                    .to(0.4, { 
                        x: endX, 
                        y: endY 
                    }, { easing: 'backOut' })
                    .call(() => {
                        completedAnimations++;
                        if (completedAnimations === newTiles.length) {
                            resolve();
                        }
                    })
                    .start();
            }
        });
    }

    /**
     * Очищает старые тайлы которые больше не отображают актуальные данные
     */
    private cleanupOldTiles(): void {
        const currentBoard = this.gameModel.getBoard();
        const children = this.tilesContainer.children.slice();
        
        for (const child of children) {
            const row = child['tileRow'];
            const col = child['tileCol'];
            
            if (row >= 0 && row < this.gameModel.getHeight() && 
                col >= 0 && col < this.gameModel.getWidth()) {
                
                const actualType = currentBoard[row][col];
                const displayedType = child['tileType'];
                
                if (actualType === -1 || actualType !== displayedType) {
                    console.log(`Удаляем неактуальный тайл: (${row}, ${col}) displayed=${displayedType}, actual=${actualType}`);
                    child.destroy();
                }
            }
        }
    }

    /**
     * Анимация для случая когда нет совпадения
     */
    private animateNoMatch(row: number, col: number): void {
        const tileNode = this.findTileNode(row, col);
        if (tileNode) {
            cc.tween(tileNode)
                .to(0.1, { scale: 0.8 })
                .to(0.1, { scale: 1 })
                .start();
        }
    }

    /**
     * Анимация набора очков
     */
    private animateScorePoints(points: number, row: number, col: number): void {
        if (points <= 0) return;

        const scoreText = new cc.Node('ScoreText');
        const label = scoreText.addComponent(cc.Label);
        
        label.string = `+${points}`;
        label.fontSize = 24;
        
        const tileNode = this.findTileNode(row, col);
        if (tileNode) {
            const worldPos = tileNode.parent.convertToWorldSpaceAR(tileNode.position);
            const localPos = this.node.convertToNodeSpaceAR(worldPos);
            scoreText.setPosition(localPos.x, localPos.y + 50);
        } else {
            scoreText.setPosition(0, 0);
        }
        
        this.node.addChild(scoreText);
        
        cc.tween(scoreText)
            .by(0.5, { y: 100 })
            .by(0.3, { opacity: -255 })
            .call(() => {
                scoreText.destroy();
            })
            .start();
    }

    /**
     * Визуально удаляет тайлы с анимацией
     */
    private removeTilesVisual(group: {row: number, col: number}[]): Promise<void> {
        return new Promise((resolve) => {
            let completedAnimations = 0;
            const totalAnimations = group.length;

            if (totalAnimations === 0) {
                resolve();
                return;
            }

            for (const tile of group) {
                const tileNode = this.findTileNode(tile.row, tile.col);
                if (tileNode) {
                    cc.tween(tileNode)
                        .parallel(
                            cc.tween().to(0.2, { scale: 0 }, { easing: 'backIn' }),
                            cc.tween().by(0.2, { angle: 180 })
                        )
                        .call(() => {
                            tileNode.destroy();
                            completedAnimations++;
                            
                            if (completedAnimations === totalAnimations) {
                                resolve();
                            }
                        })
                        .start();
                } else {
                    completedAnimations++;
                    if (completedAnimations === totalAnimations) {
                        resolve();
                    }
                }
            }
        });
    }

    /**
     * Полностью пересоздает визуальное представление поля
    */
    private recreateBoardView(): void {
        if (this.tilesContainer) {
            this.tilesContainer.destroy();
        }
        this.createBoardView();
    }

    /**
     * Находит визуальный узел тайла по координатам
    */
    private findTileNode(row: number, col: number): cc.Node {
        if (!this.tilesContainer) return null;
        
        const children = this.tilesContainer.children;
        for (const child of children) {
            if (child['tileRow'] === row && child['tileCol'] === col) {
                if (child.isValid && child.active) {
                    return child;
                }
            }
        }
        return null;
    }

    /**
     * Обновляет UI счета и ходов
    */
    private updateUI(): void {
        if (this.scoreLabel) {
            this.scoreLabel.string = `${this.gameModel.getScore()}/1000`;

            cc.tween(this.scoreLabel.node)
                .to(0.1, { scale: 1.2 })
                .to(0.1, { scale: 1 })
                .start();
        }
        
        if (this.movesLabel) {
            this.movesLabel.string = `${this.gameModel.getMovesLeft()}`;
        }
    }

    /**
    * Настраивает существующие дочерние элементы Board как рамку
    */
    private setupBoardBorder(): void {
        const children = this.boardNode.children;
        const boardWidth = this.gameModel.getWidth() * this.tileSize + this.internalPadding * 2;
        const boardHeight = this.gameModel.getHeight() * this.tileSize + this.internalPadding * 2;
        
        for (const child of children) {
            if (child.name !== 'TilesContainer') {
                if (child.name.includes('border') || child.name.includes('frame')) {
                    child.setContentSize(boardWidth, boardHeight);
                }
            }
        }
    }

    /**
     * Проверяет условия победы/проигрыша
     */
    private checkGameStatus(): void {
        const status = this.gameModel.checkGameStatus();
        
        if (status !== 0 && this.gameOverNode) {
            if (status === 1) {
                this.gameOverLabel.string = "ПОБЕДА!";
            } else {
                this.gameOverLabel.string = "ПРОИГРЫШ";
            }
            
            this.gameOverNode.scale = 0;
            this.gameOverNode.active = true;
            
            cc.tween(this.gameOverNode)
                .to(0.3, { scale: 1 }, { easing: 'backOut' })
                .start();
        }
    }

    /**
     * Получает текущий размер тайла
     */
    public getTileSize(): number {
        return this.tileSize;
    }

    /**
     * Получает контейнер тайлов
     */
    public getTilesContainer(): cc.Node {
        return this.tilesContainer;
    }
}