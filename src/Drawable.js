(function (window) {
    'use strict';


    /**
     * An extender for unit objects that handles graphics containers.
     * @param {Unit} object the Unit to extend
     * @constructor
     */
    var Drawable = function (object) {
        this.object = object;
        this.container = new createjs.Container();

        this.unitBitmap = this.createBitmap(object.model);
        if (this.factionColors && object.faction) {
            this.unitBitmap.filters = [this.factionColors[object.faction]];
        }
        this.unitBitmap.cache(0, 0, this.unitBitmap.image.width, this.unitBitmap.image.height);

        if (this.drawHpLines && object.hp) {
            this.hpLine = this.createShape();
            this.updateHp();
        }

        this.selected = this.object.selected;
        this.selectionBox = this.createShape();
        this.updateSelection();

        var hitArea = this.createShape(null, false);
        hitArea.graphics.beginFill("#000").drawRect(0, 0, this.unitBitmap.image.width, this.unitBitmap.image.height);
        this.unitBitmap.hitArea = hitArea;
    };

    Drawable.prototype.assetPreloader = null;

    Drawable.prototype.on = function (type, cb) {
        this.container.addEventListener(type, cb);
    };

    Drawable.prototype.off = function (type, cb) {
        if (!cb) {
            return this.container.removeAllListeners(type);
        }
        this.container.removeEventListener(type, cb);
    };

    /**
     * Sync the graphics to the logic
     */
    Drawable.prototype.update = function () {
        this.container.x = this.object.x;
        this.container.y = this.object.y;
        this.unitBitmap.rotation = this.object.rot + 90;

        if (this.lastHP != this.object.hp) {
            this.updateHp();
        }

        if (this.selected !== this.object.selected) {
            this.updateSelection();
        }
    };

    Drawable.prototype.updateHp = function () {
        this.hpLine.visible = this.object.hp != this.object.maxHp;
        if (!this.hpLine.visible) {
            return;
        }

        var color = "rgba(0,255,0,1)";
        if (this.object.hp / this.object.maxHp < 0.25) {
            color = "rgba(255,0,0,1)";
        }

        this.hpLine.graphics.setStrokeStyle(2).beginStroke("rgba(0,0,0, 1)");
        this.hpLine.graphics.moveTo(0, 0);
        this.hpLine.graphics.lineTo(this.unitBitmap.image.width, 0);

        this.hpLine.graphics.setStrokeStyle(1).beginStroke(color);
        this.hpLine.graphics.moveTo(0, 0);
        this.hpLine.graphics.lineTo(this.unitBitmap.image.width * (this.object.hp / this.object.maxHp), 0);
        this.hpLine.graphics.endStroke();

        this.lastHP = this.object.hp;
    };

    Drawable.prototype.updateSelection = function () {
        this.selectionBox.visible = this.object.selected;

        var color = "rgba(0,255,0,1)";
        this.selectionBox.graphics.setStrokeStyle(1).beginStroke(color);
        this.selectionBox.graphics.moveTo(0, 0);
        this.selectionBox.graphics.lineTo(this.unitBitmap.image.width, 0);
        this.selectionBox.graphics.lineTo(this.unitBitmap.image.width, this.unitBitmap.image.height);
        this.selectionBox.graphics.lineTo(0, this.unitBitmap.image.height);
        this.selectionBox.graphics.lineTo(0, 0);
        this.selectionBox.graphics.endStroke();

        this.selected = this.object.selected;
    };

    Drawable.prototype.drawHpLines = true;
    Drawable.prototype.factionColors = {
        'red': new createjs.ColorFilter(1, .2, .2, 1),
        'blue': new createjs.ColorFilter(.2, .2, 1, 1)
    };

    Drawable.prototype.createBitmap = function (model) {
        var image = this.assetPreloader.getAsset(model);
        var bitmap = new createjs.Bitmap(image);
        bitmap.regX = bitmap.image.width / 2;
        bitmap.regY = bitmap.image.height / 2;
        this.container.addChild(bitmap);

        return bitmap;
    };

    Drawable.prototype.createShape = function (ctx, offset) {
        if (ctx === undefined) {
            ctx = this.container;
        }

        var shape = new createjs.Shape();
        if (offset !== false) {
            shape.regX = this.unitBitmap.image.width / 2;
            shape.regY = this.unitBitmap.image.height / 2;
        }

        if (ctx !== null) {
            ctx.addChild(shape);
        }
        return shape;
    };


    window.Drawable = Drawable;
}(window));