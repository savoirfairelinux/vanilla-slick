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
			'The page centerDemo sould not have javascript errors\n' + errors.join('\n') + "\n");
	};

	registerSuite({
		name: 'centerDemo',

		'centerDemoClickRight': function() {
			return this.remote
				.get(require.toUrl('src/centerDemo/index.html'))
				.execute(initErrorLog)
				.setFindTimeout(5000)
				.findByCssSelector('.slick-next')
					.click()
					.end()
				.sleep(500)
				.findByCssSelector('.slick-next')
					.click()
					.end()
				.sleep(500)
				.findAllByCssSelector('.slick-center')
				.getVisibleText()
				.then(function(text) {
					assert.equal('3', text,
						'Center element should be 3');
				})
				.execute(returnErrorLog)
					.then(testErrorLog)
					.end();
		},

		'centerDemoClickLeft': function() {
			return this.remote
				.get(require.toUrl('src/centerDemo/index.html'))
				.execute(initErrorLog)
				.setFindTimeout(5000)
				.findByCssSelector('.slick-prev')
					.click()
					.end()
				.sleep(500)
				.findByCssSelector('.slick-prev')
					.click()
					.end()
				.sleep(500)
				.findAllByCssSelector('.slick-center')
				.getVisibleText()
				.then(function(text) {
					assert.equal('5', text,
						'Center element should be 5');
				})
				.execute(returnErrorLog)
					.then(testErrorLog)
					.end();
		},

	});
});
