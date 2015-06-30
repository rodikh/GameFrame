(function (window) {
    'use strict';

    /**
     * Game manager
     * @constructor
     */
    var Game = function (graphicsEngine) {
        this.graphics = graphicsEngine;
         menuScene.apply(this);
    };

    /**
     * Reset the game data to a new game state
     */
    Game.prototype.reset = function () {
        console.log('Game: Resetting');
        this.units = [];
    };

    /**
     * Loop that only deals with rendering
     */

    Game.prototype.graphicLoop = function (evt) {
        //var updated = this.logicLoop(evt);
        this.graphics.stage.update();
    };

    window.Game = Game;

    /**
     * Creates the game stage and containers for a new game
     */
    function gameScene() {
        this.reset();

        this.graphics.stage.removeAllChildren();
        this.gameContainer = new createjs.Container();
        this.graphics.setBackground(this.gameContainer, 'bg-menu');
        this.graphics.addContainer(this.gameContainer, 'game');
        this.graphics.resetTicker();
        this.graphics.registerLoop(this.graphicLoop, this);
        this.graphics.update();
    }

    function menuScene() {
        this.menuContainer = new createjs.Container();
        this.graphics.setBackground(this.menuContainer, 'bg-menu');
        this.graphics.addContainer(this.menuContainer, 'menu-page');
        this.graphics.stage.enableMouseOver();

        var data = {
            images: [this.graphics.assetPreloader.getAsset("x")],
            frames: { width: 64, height: 64},
            animations: { normal: [0], hover: [1], clicked: [2] }
        };
        var spriteSheet = new createjs.SpriteSheet(data);
        var button = new createjs.Sprite(spriteSheet);
        this.graphics.addContainer(button, "button1", this.menuContainer);
        var helper = new createjs.ButtonHelper(button, "normal");

        // the code block in this helper.addEventListener (It works with button.addEventListener)
        console.log('helper', helper);
        button.addEventListener("click", function () {
            console.log('clickedbutton');
        });
        button.x = 100;
        button.y = 100;
        button.gotoAndStop("normal");
        this.graphics.stage.update();

    }

}(window));