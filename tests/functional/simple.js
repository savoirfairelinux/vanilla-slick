define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');

    registerSuite({
        name: 'simple',

        'simple-item-goto-5': function () {
            return this.remote
                .get(require.toUrl('src/sample/index.html'))
                .setFindTimeout(5000)
                .findByCssSelector('#single-item [aria-controls="navigation04"]')
                    .click()
                    .end()
                .findByCssSelector('#single-item .slick-current')
                    .sleep(300)
                    .getVisibleText()
                    .then(function (text) {
                        assert.strictEqual('5', text,
                            'The slide 5 should be active');
                    });
        },

        'simple-item-back-6': function () {
            return this.remote
                .get(require.toUrl('src/sample/index.html'))
                .setFindTimeout(5000)
                .findByCssSelector('#single-item .slick-prev.slick-arrow')
                    .click()
                    .end()
                .findByCssSelector('#single-item .slick-current')
                    .sleep(300)
                    .getVisibleText()
                    .then(function (text) {
                        assert.strictEqual('6', text,
                            'The slide 6 should be active');
                    });
        },

        'adaptive height': function () {
            var initialHeight = 0;
            return this.remote
                .get(require.toUrl('src/sample/index.html'))
                .setFindTimeout(5000)
                .findByCssSelector('#adaptiveHeight .slick-list')
                .getSize()
                .then(function(sizeObj) {
                    initialHeight = sizeObj.height;
                })
                .end()
                .findByCssSelector('#adaptiveHeight .slick-next.slick-arrow')
                    .click()
                    .end()
                .sleep(300)
                .findByCssSelector('#adaptiveHeight .slick-list')
                .getSize()
                .then(function(sizeObj) {
                    assert.notEqual(initialHeight, sizeObj.height,
                        'The slick-list height should be diffrent');
                })
                .end()
                .findByCssSelector('#adaptiveHeight .slick-prev.slick-arrow')
                    .click()
                    .end()
                .sleep(300)
                .findByCssSelector('#adaptiveHeight .slick-list')
                .getSize()
                .then(function(sizeObj) {
                    assert.equal(initialHeight, sizeObj.height,
                        'The slick-list height should be the same');
                });
        },

        'slideSync': function () {
            var arrayEqual = function(arrayText){
                return !!arrayText.reduce(function(a, b){ return (a === b) ? a : NaN; })
            };
            return this.remote
                .get(require.toUrl('src/sample/index.html'))
                .setFindTimeout(5000)

                .findAllByCssSelector('#slideSync .slider .slick-current')
                .getVisibleText()
                .then(function (arrayText) {
                    assert.isOk(arrayEqual(arrayText),
                        'Slide current should same at begining - [' + arrayText + ']');
                })
                .end()
                .findByCssSelector('#slideSync .slider-nav .slick-next.slick-arrow')
                    .click()
                    .end()
                .sleep(300)
                .findAllByCssSelector('#slideSync .slider .slick-current')
                .getVisibleText()
                .then(function (arrayText) {
                    assert.isOk(arrayEqual(arrayText),
                        'Slide current should be synced - [' + arrayText + ']');
                })
                .end();
        },




//        'fail': function () {
//            return this.remote
//                .get(require.toUrl('src/sample/index.html'))
//                .then(function () {
//                    assert.fail('1', '0',
//                        'This should always fail!');
//                });
//        }
    });
});
