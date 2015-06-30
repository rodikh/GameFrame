(function (window, Deferred) {
    'use strict';

    /**
     * Loads images to be used by the game
     * @param manifest An array describing the assets, or a path to a json file
     * @param baseUrl A base url to prepend to all manifest urls, not used if url provided as manifest
     * @constructor
     */
    var AssetPreloader = function (manifest, baseUrl) {
        if (!baseUrl) {
            baseUrl = '';
        }

        this.dfr = new Deferred();

        this.queue = new createjs.LoadQueue(true, baseUrl);
        this.queue.on('complete', this.handleComplete, this);

        this.queue.loadManifest(manifest);
    };

    AssetPreloader.prototype.handleComplete = function (event) {
        // to show error for wrong manifest, check if files loaded are more than one.
        this.dfr.resolve(event, this);
    };

    AssetPreloader.prototype.promiseAssets = function () {
        return this.dfr.promise();
    };

    AssetPreloader.prototype.getAsset = function (args) {
        return this.queue.getResult(args);
    };

    window.AssetPreloader = AssetPreloader;

}(window, $.Deferred));