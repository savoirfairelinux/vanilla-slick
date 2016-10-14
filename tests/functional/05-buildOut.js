define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');

    var initErrorLog = function() {
        window.__internErrors__ = [];
        window.onerror = function() {
            __internErrors__.push(Array.prototype.slice.call(arguments, 0));
        };
    };
    var returnErrorLog = function() {
        return window.__internErrors__;
    };
    var testErrorLog = function(errors) {
        assert.equal(0, errors.length,
            'The page buildOut sould not have javascript errors\n' + errors.join('\n') + "\n");
    };

    registerSuite({
        name: 'buildOut',

        'empty-slider': function () {
            return this.remote
                .get(require.toUrl('src/buildOut/index.html'))
                .setFindTimeout(1000)
                .execute(initErrorLog)
                .findByCssSelector('#empty-item .slick-list')
                .getAttribute('aria-live')
                .then(function (text) {
                    assert.strictEqual('polite', text,
                        'The slick list should be initialized with aria-live attribute set to "polite"');
                })
                .execute(returnErrorLog)
    			.then(testErrorLog);
        },

    });
});
