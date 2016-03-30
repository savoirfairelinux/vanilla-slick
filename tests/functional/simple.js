define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');

    registerSuite({
        name: 'simple',

        'no fail': function () {
            return this.remote
                .get(require.toUrl('src/sample/index.html'))
                .setFindTimeout(5000)
                .findById('slick-slide01')
                	.click()
                	.end()
                .findByClassName('slick-current')
                	.getVisibleText()
	                .then(function (text) {
	                    assert.strictEqual('2', text,
	                        'The second slide should be active');
	                });
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