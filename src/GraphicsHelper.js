(function (window) {
    'use strict';

    window.GraphicsHelper = {
        setBackground: function (ctx, imageAsset) {
            var bgContainer = ctx.getChildByName('bg');
            if (!bgContainer) {
                bgContainer = new createjs.Container();
                this.addContainer(bgContainer, 'bg', ctx);
            }
            var image = imageAsset;
            var bitmap = new createjs.Bitmap(image);
            bgContainer.removeAllChildren();

            return bgContainer.addChild(bitmap);
        },
        addContainer: function (container, name, ctx) {
            if (!container) {
                container = new createjs.Container();
            }
            container.name = name;

            return ctx.addChild(container);
        }
    };

}(window));