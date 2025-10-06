window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  GameController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f659b62Nl5OC79FdebFp/BN", "GameController");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GameController = void 0;
    var GameModel_1 = require("./GameModel");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameController = function(_super) {
      __extends(GameController, _super);
      function GameController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.gameModel = null;
        _this.tilePrefab = null;
        _this.boardNode = null;
        _this.scoreLabel = null;
        _this.movesLabel = null;
        _this.gameOverNode = null;
        _this.gameOverLabel = null;
        _this.tileSprites = [];
        _this.rowBurnerSprite = null;
        _this.columnBurnerSprite = null;
        _this.radiusBurnerSprite = null;
        _this.fieldBurnerSprite = null;
        _this.boardPadding = 50;
        _this.internalPadding = 20;
        _this.tileSize = 0;
        _this.isBoardReady = false;
        _this.tilesContainer = null;
        _this.isProcessingMove = false;
        _this.superTileConfig = null;
        return _this;
      }
      GameController.prototype.onLoad = function() {
        this.gameModel = new GameModel_1.GameModel();
        this.superTileConfig = this.gameModel.getSuperTileConfig();
        this.gameOverNode && (this.gameOverNode.active = false);
        this.calculateBoardSize();
        this.createBoardView();
        this.updateUI();
        this.isBoardReady = true;
        cc.view.on("canvas-resize", this.onResize, this);
      };
      GameController.prototype.onDestroy = function() {
        cc.view.off("canvas-resize", this.onResize, this);
      };
      GameController.prototype.onTileClick = function(row, col, tileType) {
        return __awaiter(this, void 0, Promise, function() {
          var group, error_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!this.isBoardReady || this.isProcessingMove) return [ 2 ];
              this.isProcessingMove = true;
              _a.label = 1;

             case 1:
              _a.trys.push([ 1, 6, 7, 8 ]);
              console.log("\u041a\u043b\u0438\u043a \u043f\u043e \u0442\u0430\u0439\u043b\u0443: row=" + row + ", col=" + col + ", type=" + tileType);
              if (!this.gameModel.isSuperTile(tileType)) return [ 3, 3 ];
              console.log("\u0410\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d \u0441\u0443\u043f\u0435\u0440-\u0442\u0430\u0439\u043b!");
              return [ 4, this.processSuperTileActivation(row, col, tileType) ];

             case 2:
              _a.sent();
              return [ 3, 5 ];

             case 3:
              group = this.gameModel.findTileGroup(row, col);
              if (group.length < 2) {
                console.log("\u0413\u0440\u0443\u043f\u043f\u0430 \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u043c\u0430\u043b\u0430 \u0434\u043b\u044f \u0441\u0436\u0438\u0433\u0430\u043d\u0438\u044f");
                this.animateNoMatch(row, col);
                return [ 2 ];
              }
              return [ 4, this.processNormalMove(group, row, col) ];

             case 4:
              _a.sent();
              _a.label = 5;

             case 5:
              return [ 3, 8 ];

             case 6:
              error_1 = _a.sent();
              console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0435 \u0445\u043e\u0434\u0430:", error_1);
              return [ 3, 8 ];

             case 7:
              this.isProcessingMove = false;
              return [ 7 ];

             case 8:
              return [ 2 ];
            }
          });
        });
      };
      GameController.prototype.processSuperTileActivation = function(row, col, tileType) {
        return __awaiter(this, void 0, Promise, function() {
          var moveResult;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.animateSuperTileActivation(row, col) ];

             case 1:
              _a.sent();
              moveResult = this.gameModel.processMoveWithAnimations([], row, col);
              if (!moveResult.activatedSuperTile) return [ 3, 5 ];
              return [ 4, this.animateSuperTileBurn(moveResult.activatedSuperTile.burnedTiles, tileType) ];

             case 2:
              _a.sent();
              return [ 4, this.animateFallingTiles(moveResult.activatedSuperTile.movements) ];

             case 3:
              _a.sent();
              return [ 4, this.animateNewTiles(moveResult.activatedSuperTile.newTiles) ];

             case 4:
              _a.sent();
              return [ 3, 8 ];

             case 5:
              return [ 4, this.animateFallingTiles(moveResult.movements) ];

             case 6:
              _a.sent();
              return [ 4, this.animateNewTiles(moveResult.newTiles) ];

             case 7:
              _a.sent();
              _a.label = 8;

             case 8:
              this.cleanupOldTiles();
              moveResult.activatedSuperTile ? this.animateScorePoints(moveResult.activatedSuperTile.points, row, col) : this.animateScorePoints(moveResult.points, row, col);
              this.updateUI();
              this.checkGameStatus();
              return [ 2 ];
            }
          });
        });
      };
      GameController.prototype.processNormalMove = function(group, clickedRow, clickedCol) {
        return __awaiter(this, void 0, Promise, function() {
          var moveResult;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.removeTilesVisual(group) ];

             case 1:
              _a.sent();
              moveResult = this.gameModel.processMoveWithAnimations(group, clickedRow, clickedCol);
              return [ 4, this.animateFallingTiles(moveResult.movements) ];

             case 2:
              _a.sent();
              return [ 4, this.animateNewTiles(moveResult.newTiles) ];

             case 3:
              _a.sent();
              if (!moveResult.createdSuperTile) return [ 3, 5 ];
              return [ 4, this.animateSuperTileCreation(moveResult.createdSuperTile) ];

             case 4:
              _a.sent();
              _a.label = 5;

             case 5:
              this.cleanupOldTiles();
              this.animateScorePoints(moveResult.points, clickedRow, clickedCol);
              this.updateUI();
              this.checkGameStatus();
              return [ 2 ];
            }
          });
        });
      };
      GameController.prototype.animateSuperTileCreation = function(superTile) {
        return __awaiter(this, void 0, Promise, function() {
          var _this = this;
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(resolve) {
              var tileNode = _this.findTileNode(superTile.row, superTile.col);
              if (!tileNode) {
                console.log("\u041d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d \u0442\u0430\u0439\u043b \u0434\u043b\u044f \u0441\u0443\u043f\u0435\u0440-\u0442\u0430\u0439\u043b\u0430 \u043d\u0430 \u043f\u043e\u0437\u0438\u0446\u0438\u0438 (" + superTile.row + ", " + superTile.col + ")");
                resolve();
                return;
              }
              tileNode["tileType"] = superTile.type;
              cc.tween(tileNode).to(.2, {
                scale: 1.5
              }).call(function() {
                _this.setTileSprite(tileNode, superTile.type);
              }).to(.2, {
                scale: 1
              }).call(function() {
                tileNode.off(cc.Node.EventType.TOUCH_END);
                tileNode.on(cc.Node.EventType.TOUCH_END, function() {
                  _this.onTileClick(superTile.row, superTile.col, superTile.type);
                });
                resolve();
              }).start();
            }) ];
          });
        });
      };
      GameController.prototype.animateSuperTileActivation = function(row, col) {
        return __awaiter(this, void 0, Promise, function() {
          var _this = this;
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(resolve) {
              var tileNode = _this.findTileNode(row, col);
              if (!tileNode) {
                resolve();
                return;
              }
              cc.tween(tileNode).parallel(cc.tween().to(.3, {
                scale: 3
              }, {
                easing: "backOut"
              }), cc.tween().to(.3, {
                opacity: 0
              })).call(function() {
                tileNode.destroy();
                resolve();
              }).start();
            }) ];
          });
        });
      };
      GameController.prototype.animateSuperTileBurn = function(burnedTiles, superTileType) {
        return __awaiter(this, void 0, Promise, function() {
          var _this = this;
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(resolve) {
              if (0 === burnedTiles.length) {
                resolve();
                return;
              }
              var completedAnimations = 0;
              var effectColor = _this.getSuperTileEffectColor(superTileType);
              var _loop_1 = function(tile) {
                var tileNode = _this.findTileNode(tile.row, tile.col);
                if (tileNode) cc.tween(tileNode).to(.2, {
                  scale: 1.3,
                  color: effectColor
                }).to(.2, {
                  scale: 0,
                  opacity: 0
                }).call(function() {
                  tileNode.destroy();
                  completedAnimations++;
                  completedAnimations === burnedTiles.length && resolve();
                }).start(); else {
                  completedAnimations++;
                  completedAnimations === burnedTiles.length && resolve();
                }
              };
              for (var _i = 0, burnedTiles_1 = burnedTiles; _i < burnedTiles_1.length; _i++) {
                var tile = burnedTiles_1[_i];
                _loop_1(tile);
              }
            }) ];
          });
        });
      };
      GameController.prototype.getSuperTileEffectColor = function(superTileType) {
        switch (superTileType) {
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
      };
      GameController.prototype.setTileSprite = function(tileNode, tileType) {
        var _a;
        var sprite = tileNode.getComponent(cc.Sprite);
        if (!sprite) return;
        if (this.gameModel.isSuperTile(tileType)) {
          switch (tileType) {
           case this.superTileConfig.types.ROW_BURNER:
            this.rowBurnerSprite && (sprite.spriteFrame = this.rowBurnerSprite);
            break;

           case this.superTileConfig.types.COLUMN_BURNER:
            this.columnBurnerSprite && (sprite.spriteFrame = this.columnBurnerSprite);
            break;

           case this.superTileConfig.types.RADIUS_BURNER:
            this.radiusBurnerSprite && (sprite.spriteFrame = this.radiusBurnerSprite);
            break;

           case this.superTileConfig.types.FIELD_BURNER:
            this.fieldBurnerSprite && (sprite.spriteFrame = this.fieldBurnerSprite);
          }
          null === (_a = tileNode.getComponent(cc.Sprite)["_sgNode"]) || void 0 === _a ? void 0 : _a.setState(cc.Sprite.State.GRAY);
        } else if (this.tileSprites.length > tileType) sprite.spriteFrame = this.tileSprites[tileType]; else {
          var colors = [ cc.Color.RED, cc.Color.GREEN, cc.Color.BLUE, cc.Color.YELLOW, cc.Color.MAGENTA ];
          sprite.node.color = colors[tileType] || cc.Color.WHITE;
        }
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
      };
      GameController.prototype.calculateBoardSize = function() {
        var visibleSize = cc.view.getVisibleSize();
        var width = this.gameModel.getWidth();
        var height = this.gameModel.getHeight();
        var availableWidth = visibleSize.width - 2 * this.boardPadding;
        var availableHeight = visibleSize.height - 2 * this.boardPadding;
        var maxWidthTileSize = availableWidth / width;
        var maxHeightTileSize = availableHeight / height;
        this.tileSize = Math.min(maxWidthTileSize, maxHeightTileSize);
        var boardWidth = width * this.tileSize + 2 * this.internalPadding;
        var boardHeight = height * this.tileSize + 2 * this.internalPadding;
        this.boardNode.setContentSize(boardWidth, boardHeight);
        this.boardNode.setPosition(0, 0);
        this.setupBoardBorder();
        console.log("\u0420\u0430\u0437\u043c\u0435\u0440 Board: " + boardWidth + "x" + boardHeight);
        console.log("\u0420\u0430\u0437\u043c\u0435\u0440 \u0442\u0430\u0439\u043b\u0430: " + this.tileSize);
        console.log("\u0412\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u0438\u0435 \u043e\u0442\u0441\u0442\u0443\u043f\u044b: " + this.internalPadding);
      };
      GameController.prototype.onResize = function() {
        var _this = this;
        if (!this.isBoardReady) return;
        console.log("\u0410\u0434\u0430\u043f\u0442\u0438\u0440\u0443\u0435\u043c \u043f\u043e\u043b\u0435 \u043a \u043d\u043e\u0432\u043e\u043c\u0443 \u0440\u0430\u0437\u043c\u0435\u0440\u0443 \u044d\u043a\u0440\u0430\u043d\u0430...");
        this.scheduleOnce(function() {
          _this.calculateBoardSize();
          _this.recreateBoardView();
        }, .1);
      };
      GameController.prototype.createBoardView = function() {
        var board = this.gameModel.getBoard();
        var width = this.gameModel.getWidth();
        var height = this.gameModel.getHeight();
        this.tilesContainer = new cc.Node("TilesContainer");
        this.tilesContainer.setPosition(0, 0);
        this.boardNode.addChild(this.tilesContainer);
        for (var row = 0; row < height; row++) for (var col = 0; col < width; col++) this.createTile(row, col, board[row][col]);
      };
      GameController.prototype.createTile = function(row, col, tileType) {
        var _this = this;
        var tileNode = cc.instantiate(this.tilePrefab);
        var x = col * this.tileSize + this.tileSize / 2 - this.gameModel.getWidth() * this.tileSize / 2;
        var y = -row * this.tileSize - this.tileSize / 2 + this.gameModel.getHeight() * this.tileSize / 2;
        tileNode.setPosition(x, y);
        tileNode.setContentSize(this.tileSize, this.tileSize);
        this.tilesContainer.addChild(tileNode);
        this.setTileSprite(tileNode, tileType);
        this.animateTileAppearance(tileNode);
        tileNode.on(cc.Node.EventType.TOUCH_END, function() {
          _this.onTileClick(row, col, tileType);
        });
        tileNode["tileRow"] = row;
        tileNode["tileCol"] = col;
        tileNode["tileType"] = tileType;
      };
      GameController.prototype.animateTileAppearance = function(tileNode) {
        tileNode.scale = 0;
        cc.tween(tileNode).to(.2, {
          scale: 1
        }, {
          easing: "backOut"
        }).start();
      };
      GameController.prototype.animateFallingTiles = function(movements) {
        var _this = this;
        return new Promise(function(resolve) {
          if (0 === movements.length) {
            resolve();
            return;
          }
          var completedAnimations = 0;
          var _loop_2 = function(movement) {
            var tileNode = _this.findTileNode(movement.from.row, movement.from.col);
            if (tileNode) {
              tileNode.off(cc.Node.EventType.TOUCH_END);
              tileNode["tileRow"] = movement.to.row;
              tileNode["tileCol"] = movement.to.col;
              var newX = movement.to.col * _this.tileSize + _this.tileSize / 2 - _this.gameModel.getWidth() * _this.tileSize / 2;
              var newY = -movement.to.row * _this.tileSize - _this.tileSize / 2 + _this.gameModel.getHeight() * _this.tileSize / 2;
              cc.tween(tileNode).to(.3, {
                x: newX,
                y: newY
              }, {
                easing: "sineOut"
              }).call(function() {
                var finalRow = movement.to.row;
                var finalCol = movement.to.col;
                var finalType = _this.gameModel.getBoard()[finalRow][finalCol];
                tileNode.off(cc.Node.EventType.TOUCH_END);
                tileNode.on(cc.Node.EventType.TOUCH_END, function() {
                  _this.onTileClick(finalRow, finalCol, finalType);
                });
                completedAnimations++;
                completedAnimations === movements.length && resolve();
              }).start();
            } else {
              completedAnimations++;
              completedAnimations === movements.length && resolve();
            }
          };
          for (var _i = 0, movements_1 = movements; _i < movements_1.length; _i++) {
            var movement = movements_1[_i];
            _loop_2(movement);
          }
        });
      };
      GameController.prototype.animateNewTiles = function(newTiles) {
        var _this = this;
        return new Promise(function(resolve) {
          if (0 === newTiles.length) {
            resolve();
            return;
          }
          var completedAnimations = 0;
          var _loop_3 = function(tileInfo) {
            var existingTile = _this.findTileNode(tileInfo.row, tileInfo.col);
            if (existingTile) {
              console.log("\u0422\u0430\u0439\u043b \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442: row=" + tileInfo.row + ", col=" + tileInfo.col);
              completedAnimations++;
              completedAnimations === newTiles.length && resolve();
              return "continue";
            }
            var tileNode = cc.instantiate(_this.tilePrefab);
            var startX = tileInfo.col * _this.tileSize + _this.tileSize / 2 - _this.gameModel.getWidth() * _this.tileSize / 2;
            var startY = 1 * _this.tileSize - _this.tileSize / 2 + _this.gameModel.getHeight() * _this.tileSize / 2 + 100;
            var endX = tileInfo.col * _this.tileSize + _this.tileSize / 2 - _this.gameModel.getWidth() * _this.tileSize / 2;
            var endY = -tileInfo.row * _this.tileSize - _this.tileSize / 2 + _this.gameModel.getHeight() * _this.tileSize / 2;
            tileNode.setPosition(startX, startY);
            tileNode.setContentSize(_this.tileSize, _this.tileSize);
            _this.tilesContainer.addChild(tileNode);
            _this.setTileSprite(tileNode, tileInfo.type);
            tileNode["tileRow"] = tileInfo.row;
            tileNode["tileCol"] = tileInfo.col;
            tileNode["tileType"] = tileInfo.type;
            tileNode.on(cc.Node.EventType.TOUCH_END, function() {
              _this.onTileClick(tileInfo.row, tileInfo.col, tileInfo.type);
            });
            cc.tween(tileNode).to(.4, {
              x: endX,
              y: endY
            }, {
              easing: "backOut"
            }).call(function() {
              completedAnimations++;
              completedAnimations === newTiles.length && resolve();
            }).start();
          };
          for (var _i = 0, newTiles_1 = newTiles; _i < newTiles_1.length; _i++) {
            var tileInfo = newTiles_1[_i];
            _loop_3(tileInfo);
          }
        });
      };
      GameController.prototype.cleanupOldTiles = function() {
        var currentBoard = this.gameModel.getBoard();
        var children = this.tilesContainer.children.slice();
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
          var child = children_1[_i];
          var row = child["tileRow"];
          var col = child["tileCol"];
          if (row >= 0 && row < this.gameModel.getHeight() && col >= 0 && col < this.gameModel.getWidth()) {
            var actualType = currentBoard[row][col];
            var displayedType = child["tileType"];
            if (-1 === actualType || actualType !== displayedType) {
              console.log("\u0423\u0434\u0430\u043b\u044f\u0435\u043c \u043d\u0435\u0430\u043a\u0442\u0443\u0430\u043b\u044c\u043d\u044b\u0439 \u0442\u0430\u0439\u043b: (" + row + ", " + col + ") displayed=" + displayedType + ", actual=" + actualType);
              child.destroy();
            }
          }
        }
      };
      GameController.prototype.animateNoMatch = function(row, col) {
        var tileNode = this.findTileNode(row, col);
        tileNode && cc.tween(tileNode).to(.1, {
          scale: .8
        }).to(.1, {
          scale: 1
        }).start();
      };
      GameController.prototype.animateScorePoints = function(points, row, col) {
        if (points <= 0) return;
        var scoreText = new cc.Node("ScoreText");
        var label = scoreText.addComponent(cc.Label);
        label.string = "+" + points;
        label.fontSize = 24;
        var tileNode = this.findTileNode(row, col);
        if (tileNode) {
          var worldPos = tileNode.parent.convertToWorldSpaceAR(tileNode.position);
          var localPos = this.node.convertToNodeSpaceAR(worldPos);
          scoreText.setPosition(localPos.x, localPos.y + 50);
        } else scoreText.setPosition(0, 0);
        this.node.addChild(scoreText);
        cc.tween(scoreText).by(.5, {
          y: 100
        }).by(.3, {
          opacity: -255
        }).call(function() {
          scoreText.destroy();
        }).start();
      };
      GameController.prototype.removeTilesVisual = function(group) {
        var _this = this;
        return new Promise(function(resolve) {
          var completedAnimations = 0;
          var totalAnimations = group.length;
          if (0 === totalAnimations) {
            resolve();
            return;
          }
          var _loop_4 = function(tile) {
            var tileNode = _this.findTileNode(tile.row, tile.col);
            if (tileNode) cc.tween(tileNode).parallel(cc.tween().to(.2, {
              scale: 0
            }, {
              easing: "backIn"
            }), cc.tween().by(.2, {
              angle: 180
            })).call(function() {
              tileNode.destroy();
              completedAnimations++;
              completedAnimations === totalAnimations && resolve();
            }).start(); else {
              completedAnimations++;
              completedAnimations === totalAnimations && resolve();
            }
          };
          for (var _i = 0, group_1 = group; _i < group_1.length; _i++) {
            var tile = group_1[_i];
            _loop_4(tile);
          }
        });
      };
      GameController.prototype.recreateBoardView = function() {
        this.tilesContainer && this.tilesContainer.destroy();
        this.createBoardView();
      };
      GameController.prototype.findTileNode = function(row, col) {
        if (!this.tilesContainer) return null;
        var children = this.tilesContainer.children;
        for (var _i = 0, children_2 = children; _i < children_2.length; _i++) {
          var child = children_2[_i];
          if (child["tileRow"] === row && child["tileCol"] === col && child.isValid && child.active) return child;
        }
        return null;
      };
      GameController.prototype.updateUI = function() {
        if (this.scoreLabel) {
          this.scoreLabel.string = this.gameModel.getScore() + "/1000";
          cc.tween(this.scoreLabel.node).to(.1, {
            scale: 1.2
          }).to(.1, {
            scale: 1
          }).start();
        }
        this.movesLabel && (this.movesLabel.string = "" + this.gameModel.getMovesLeft());
      };
      GameController.prototype.setupBoardBorder = function() {
        var children = this.boardNode.children;
        var boardWidth = this.gameModel.getWidth() * this.tileSize + 2 * this.internalPadding;
        var boardHeight = this.gameModel.getHeight() * this.tileSize + 2 * this.internalPadding;
        for (var _i = 0, children_3 = children; _i < children_3.length; _i++) {
          var child = children_3[_i];
          "TilesContainer" !== child.name && (child.name.includes("border") || child.name.includes("frame")) && child.setContentSize(boardWidth, boardHeight);
        }
      };
      GameController.prototype.checkGameStatus = function() {
        var status = this.gameModel.checkGameStatus();
        if (0 !== status && this.gameOverNode) {
          this.gameOverLabel.string = 1 === status ? "\u041f\u041e\u0411\u0415\u0414\u0410!" : "\u041f\u0420\u041e\u0418\u0413\u0420\u042b\u0428";
          this.gameOverNode.scale = 0;
          this.gameOverNode.active = true;
          cc.tween(this.gameOverNode).to(.3, {
            scale: 1
          }, {
            easing: "backOut"
          }).start();
        }
      };
      GameController.prototype.getTileSize = function() {
        return this.tileSize;
      };
      GameController.prototype.getTilesContainer = function() {
        return this.tilesContainer;
      };
      __decorate([ property(cc.Prefab) ], GameController.prototype, "tilePrefab", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "boardNode", void 0);
      __decorate([ property(cc.Label) ], GameController.prototype, "scoreLabel", void 0);
      __decorate([ property(cc.Label) ], GameController.prototype, "movesLabel", void 0);
      __decorate([ property(cc.Node) ], GameController.prototype, "gameOverNode", void 0);
      __decorate([ property(cc.Label) ], GameController.prototype, "gameOverLabel", void 0);
      __decorate([ property([ cc.SpriteFrame ]) ], GameController.prototype, "tileSprites", void 0);
      __decorate([ property({
        type: cc.SpriteFrame
      }) ], GameController.prototype, "rowBurnerSprite", void 0);
      __decorate([ property({
        type: cc.SpriteFrame
      }) ], GameController.prototype, "columnBurnerSprite", void 0);
      __decorate([ property({
        type: cc.SpriteFrame
      }) ], GameController.prototype, "radiusBurnerSprite", void 0);
      __decorate([ property({
        type: cc.SpriteFrame
      }) ], GameController.prototype, "fieldBurnerSprite", void 0);
      __decorate([ property ], GameController.prototype, "boardPadding", void 0);
      __decorate([ property ], GameController.prototype, "internalPadding", void 0);
      GameController = __decorate([ ccclass ], GameController);
      return GameController;
    }(cc.Component);
    exports.GameController = GameController;
    cc._RF.pop();
  }, {
    "./GameModel": "GameModel"
  } ],
  GameModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bc5c5Ea5clDH6+5MNURKXLu", "GameModel");
    "use strict";
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GameModel = void 0;
    var GameModel = function() {
      function GameModel() {
        this.width = 8;
        this.height = 8;
        this.tileColors = 5;
        this.score = 0;
        this.movesLeft = 20;
        this.targetScore = 1e3;
        this.superTileThreshold = 8;
        this.superTileSpawnChance = .02;
        this.superTileTypes = {
          ROW_BURNER: 5,
          COLUMN_BURNER: 6,
          RADIUS_BURNER: 7,
          FIELD_BURNER: 8
        };
        this.burnRadius = 1;
        this.board = [];
        this.initBoard();
      }
      GameModel.prototype.initBoard = function() {
        this.board = [];
        for (var row = 0; row < this.height; row++) {
          this.board[row] = [];
          for (var col = 0; col < this.width; col++) Math.random() < this.superTileSpawnChance ? this.board[row][col] = this.getRandomSuperTileType() : this.board[row][col] = Math.floor(Math.random() * this.tileColors);
        }
      };
      GameModel.prototype.getRandomSuperTileType = function() {
        var superTileTypes = Object.values(this.superTileTypes);
        return superTileTypes[Math.floor(Math.random() * superTileTypes.length)];
      };
      GameModel.prototype.isSuperTile = function(tileType) {
        return tileType >= this.superTileTypes.ROW_BURNER;
      };
      GameModel.prototype.getSuperTileInfo = function(tileType) {
        switch (tileType) {
         case this.superTileTypes.ROW_BURNER:
          return {
            name: "\u0423\u043d\u0438\u0447\u0442\u043e\u0436\u0438\u0442\u0435\u043b\u044c \u0441\u0442\u0440\u043e\u043a",
            description: "\u0421\u0436\u0438\u0433\u0430\u0435\u0442 \u0432\u0441\u044e \u0441\u0442\u0440\u043e\u043a\u0443"
          };

         case this.superTileTypes.COLUMN_BURNER:
          return {
            name: "\u0423\u043d\u0438\u0447\u0442\u043e\u0436\u0438\u0442\u0435\u043b\u044c \u0441\u0442\u043e\u043b\u0431\u0446\u043e\u0432",
            description: "\u0421\u0436\u0438\u0433\u0430\u0435\u0442 \u0432\u0435\u0441\u044c \u0441\u0442\u043e\u043b\u0431\u0435\u0446"
          };

         case this.superTileTypes.RADIUS_BURNER:
          return {
            name: "\u0412\u0437\u0440\u044b\u0432\u043d\u043e\u0439",
            description: "\u0421\u0436\u0438\u0433\u0430\u0435\u0442 \u0442\u0430\u0439\u043b\u044b \u0432 \u0440\u0430\u0434\u0438\u0443\u0441\u0435 " + this.burnRadius
          };

         case this.superTileTypes.FIELD_BURNER:
          return {
            name: "\u0410\u043f\u043e\u043a\u0430\u043b\u0438\u043f\u0441\u0438\u0441",
            description: "\u0421\u0436\u0438\u0433\u0430\u0435\u0442 \u0432\u0441\u0451 \u043f\u043e\u043b\u0435"
          };

         default:
          return {
            name: "\u041e\u0431\u044b\u0447\u043d\u044b\u0439 \u0442\u0430\u0439\u043b",
            description: ""
          };
        }
      };
      GameModel.prototype.activateSuperTile = function(row, col, tileType) {
        var burnedTiles = [];
        var originalBoard = this.copyBoard();
        switch (tileType) {
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
        }
        if (-1 !== this.board[row][col]) {
          burnedTiles.push({
            row: row,
            col: col
          });
          this.board[row][col] = -1;
        }
        var movements = this.processGravity();
        var newTiles = this.fillEmptyTiles();
        var points = 15 * burnedTiles.length;
        this.score += points;
        this.movesLeft--;
        return {
          burnedTiles: burnedTiles,
          movements: movements,
          newTiles: newTiles,
          points: points
        };
      };
      GameModel.prototype.copyBoard = function() {
        return this.board.map(function(row) {
          return __spreadArrays(row);
        });
      };
      GameModel.prototype.burnRow = function(row) {
        var burnedTiles = [];
        for (var col = 0; col < this.width; col++) if (-1 !== this.board[row][col]) {
          burnedTiles.push({
            row: row,
            col: col
          });
          this.board[row][col] = -1;
        }
        return burnedTiles;
      };
      GameModel.prototype.burnColumn = function(col) {
        var burnedTiles = [];
        for (var row = 0; row < this.height; row++) if (-1 !== this.board[row][col]) {
          burnedTiles.push({
            row: row,
            col: col
          });
          this.board[row][col] = -1;
        }
        return burnedTiles;
      };
      GameModel.prototype.burnRadiusTiles = function(centerRow, centerCol) {
        var burnedTiles = [];
        for (var row = centerRow - this.burnRadius; row <= centerRow + this.burnRadius; row++) for (var col = centerCol - this.burnRadius; col <= centerCol + this.burnRadius; col++) if (row >= 0 && row < this.height && col >= 0 && col < this.width && -1 !== this.board[row][col]) {
          burnedTiles.push({
            row: row,
            col: col
          });
          this.board[row][col] = -1;
        }
        return burnedTiles;
      };
      GameModel.prototype.burnEntireField = function() {
        var burnedTiles = [];
        for (var row = 0; row < this.height; row++) for (var col = 0; col < this.width; col++) if (-1 !== this.board[row][col]) {
          burnedTiles.push({
            row: row,
            col: col
          });
          this.board[row][col] = -1;
        }
        return burnedTiles;
      };
      GameModel.prototype.createSuperTile = function(row, col, superTileType) {
        this.board[row][col] = superTileType;
      };
      GameModel.prototype.processMoveWithAnimations = function(group, clickedRow, clickedCol) {
        if (void 0 !== clickedRow && void 0 !== clickedCol && this.isSuperTile(this.board[clickedRow][clickedCol])) {
          var superTileResult = this.activateSuperTile(clickedRow, clickedCol, this.board[clickedRow][clickedCol]);
          return {
            points: superTileResult.points,
            movements: superTileResult.movements,
            newTiles: superTileResult.newTiles,
            activatedSuperTile: superTileResult
          };
        }
        if (group.length < 2) return {
          points: 0,
          movements: [],
          newTiles: []
        };
        var targetRow = clickedRow;
        var targetCol = clickedCol;
        this.removeTileGroup(group);
        var movements = this.processGravity();
        var newTiles = this.fillEmptyTiles();
        var createdSuperTile;
        if (group.length >= this.superTileThreshold && void 0 !== targetRow && void 0 !== targetCol) if (targetRow >= 0 && targetRow < this.height && targetCol >= 0 && targetCol < this.width && -1 !== this.board[targetRow][targetCol]) {
          var superTileType = this.getRandomSuperTileType();
          this.createSuperTile(targetRow, targetCol, superTileType);
          createdSuperTile = {
            row: targetRow,
            col: targetCol,
            type: superTileType
          };
          console.log("\u0421\u043e\u0437\u0434\u0430\u043d \u0441\u0443\u043f\u0435\u0440-\u0442\u0430\u0439\u043b \u0442\u0438\u043f\u0430 " + superTileType + " \u043d\u0430 \u043f\u043e\u0437\u0438\u0446\u0438\u0438 (" + targetRow + ", " + targetCol + ")");
        } else console.log("\u041f\u043e\u0437\u0438\u0446\u0438\u044f (" + targetRow + ", " + targetCol + ") \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0430 \u0434\u043b\u044f \u0441\u0443\u043f\u0435\u0440-\u0442\u0430\u0439\u043b\u0430");
        var basePoints = 10 * group.length;
        var bonusPoints = group.length > 3 ? 5 * (group.length - 3) : 0;
        var totalPoints = basePoints + bonusPoints;
        this.score += totalPoints;
        this.movesLeft--;
        return {
          points: totalPoints,
          movements: movements,
          newTiles: newTiles,
          createdSuperTile: createdSuperTile
        };
      };
      GameModel.prototype.getBoard = function() {
        return this.board;
      };
      GameModel.prototype.getWidth = function() {
        return this.width;
      };
      GameModel.prototype.getHeight = function() {
        return this.height;
      };
      GameModel.prototype.findTileGroup = function(startRow, startCol) {
        var targetType = this.board[startRow][startCol];
        if (-1 === targetType) return [];
        var visited = [];
        for (var i = 0; i < this.height; i++) visited[i] = new Array(this.width).fill(false);
        var group = [];
        this.floodFill(startRow, startCol, targetType, visited, group);
        return group;
      };
      GameModel.prototype.floodFill = function(row, col, targetType, visited, group) {
        if (row < 0 || row >= this.height || col < 0 || col >= this.width) return;
        if (visited[row][col]) return;
        if (this.board[row][col] !== targetType) return;
        visited[row][col] = true;
        group.push({
          row: row,
          col: col
        });
        this.floodFill(row - 1, col, targetType, visited, group);
        this.floodFill(row + 1, col, targetType, visited, group);
        this.floodFill(row, col - 1, targetType, visited, group);
        this.floodFill(row, col + 1, targetType, visited, group);
      };
      GameModel.prototype.removeTileGroup = function(group) {
        for (var _i = 0, group_1 = group; _i < group_1.length; _i++) {
          var tile = group_1[_i];
          this.board[tile.row][tile.col] = -1;
        }
      };
      GameModel.prototype.processGravity = function() {
        var movements = [];
        for (var col = 0; col < this.width; col++) movements.push.apply(movements, this.processColumnGravity(col));
        return movements;
      };
      GameModel.prototype.processColumnGravity = function(col) {
        var movements = [];
        var writeIndex = this.height - 1;
        for (var row = this.height - 1; row >= 0; row--) if (-1 !== this.board[row][col]) {
          if (writeIndex !== row) {
            movements.push({
              from: {
                row: row,
                col: col
              },
              to: {
                row: writeIndex,
                col: col
              }
            });
            this.board[writeIndex][col] = this.board[row][col];
            this.board[row][col] = -1;
          }
          writeIndex--;
        }
        return movements;
      };
      GameModel.prototype.fillEmptyTiles = function() {
        var newTiles = [];
        for (var col = 0; col < this.width; col++) for (var row = 0; row < this.height; row++) if (-1 === this.board[row][col]) {
          var tileType = Math.random() < this.superTileSpawnChance ? this.getRandomSuperTileType() : Math.floor(Math.random() * this.tileColors);
          this.board[row][col] = tileType;
          newTiles.push({
            row: row,
            col: col,
            type: tileType
          });
        }
        return newTiles;
      };
      GameModel.prototype.checkGameStatus = function() {
        if (this.score >= this.targetScore) return 1;
        if (this.movesLeft <= 0) return -1;
        if (!this.hasValidMoves()) return -1;
        return 0;
      };
      GameModel.prototype.hasValidMoves = function() {
        for (var row = 0; row < this.height; row++) for (var col = 0; col < this.width; col++) {
          var group = this.findTileGroup(row, col);
          if (group.length >= 2) return true;
        }
        return false;
      };
      GameModel.prototype.getScore = function() {
        return this.score;
      };
      GameModel.prototype.getMovesLeft = function() {
        return this.movesLeft;
      };
      GameModel.prototype.getTargetScore = function() {
        return this.targetScore;
      };
      GameModel.prototype.getSuperTileConfig = function() {
        return {
          types: this.superTileTypes,
          threshold: this.superTileThreshold,
          radius: this.burnRadius
        };
      };
      return GameModel;
    }();
    exports.GameModel = GameModel;
    cc._RF.pop();
  }, {} ]
}, {}, [ "GameController", "GameModel" ]);