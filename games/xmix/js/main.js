(function (window, Game, GraphicsEngine, AssetPreloader) {
    'use strict';

    new AssetPreloader('images/asset-manifest.json').promiseAssets().then(function (evt, assetPreloader) {
        var graphicsEngine = new GraphicsEngine(document.getElementById('main_canvas'), assetPreloader);
        window.game = new Game(graphicsEngine);
    });

} (window, window.Game, window.GraphicsEngine, window.AssetPreloader));