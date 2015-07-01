(function (window, GraphicsHelper) {
    'use strict';


    /**
     * @constructor
     */
    var Scene = function (name, options) {
        var defaultOptions = {};
        this.name = name;
        this.container = new createjs.Container();
        if (options.background) {
            GraphicsHelper.setBackground(this.container, options.background);
        }
    };

    Scene.prototype.reset = function () {
    };

    window.Scene = Scene;
}(window, window.GraphicsHelper));