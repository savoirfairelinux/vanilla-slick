define(function(require) {
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
            'The page sould not have javascript errors\n' + errors.join('\n') + "\n");
    };

	registerSuite({
		name: 'addSlide',

		'addSlideAtEnd': function() {
			return this.remote
				.get(require.toUrl('src/addSlide/index.html'))
				.setFindTimeout(5000)
				.execute(initErrorLog)
				.findByCssSelector('.addSlideAtEnd .js-add-slide')
    				.click()
    				.end()
                .findByCssSelector('.addSlideAtEnd [data-slick-index="1"]')
                .getVisibleText()
				.then(function(text) {
					assert.strictEqual('2', text,
						'The slide 2 should be added');
				})
			    .execute(returnErrorLog)
				.then(testErrorLog)
				.end();
		},


	});
});
