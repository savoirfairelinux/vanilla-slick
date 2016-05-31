define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');

    registerSuite({
        name: 'simple',

        'simple-item-goto-2': function () {
            return this.remote
                .get(require.toUrl('src/sample/index.html'))
                .setFindTimeout(5000)
                .findById('single-item')
                .findByCssSelector('[aria-controls="navigation01"]')
                	.click()
                	.end()
                .findById('single-item')
                .findByClassName('slick-current')
                	.getVisibleText()
	                .then(function (text) {
	                    assert.strictEqual('2', text,
	                        'The second slide should be active');
	                });
        },

        'simple-item-goto-5': function () {
            return this.remote
                .get(require.toUrl('src/sample/index.html'))
                .setFindTimeout(5000)
                .findById('single-item')
                .findByCssSelector('[aria-controls="navigation04"]')
                    .click()
                    .end()
                .findById('single-item')
                .findByClassName('slick-current')
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
                .findById('single-item')
                .findByCssSelector('.slick-prev.slick-arrow')
                    .click()
                    .end()
                .findById('single-item')
                .findByClassName('slick-current')
                    .sleep(300)
                    .getVisibleText()
                    .then(function (text) {
                        assert.strictEqual('6', text,
                            'The slide 6 should be active');
                    });
        },

        // 'adaptive height': function () {
        //     return this.remote
        //         .get(require.toUrl('src/sample/index.html'))
        //         .setFindTimeout(5000)
        //         .findById('adaptiveHeight')
        //         .findByCssSelector('.slick-next.slick-arrow')
        //             .click()
        //             .end()
        //         .findById('adaptiveHeight')
        // },



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
