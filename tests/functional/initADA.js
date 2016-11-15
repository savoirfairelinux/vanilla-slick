define(function(require) {
	var registerSuite = require('intern!object');
	var assert = require('intern/chai!assert');

	registerSuite({
		name: 'initADA',

		'slides should have aria-hidden attribute': function() {
			return this.remote
				.get(require.toUrl('src/initADA/index.html'))
				.setFindTimeout(5000)
				.findAllByCssSelector('.slick-track .slick-slide')
				.getAttribute('aria-hidden')
				.then(function(ArrayAttr) {
					assert.notInclude(ArrayAttr, null,
						'All slides should have aria-hidden attribute');
				});
		},

		'slide track should have role listbox': function() {
			return this.remote
				.get(require.toUrl('src/initADA/index.html'))
				.setFindTimeout(5000)
				.findByCssSelector('.slick-track')
				.getAttribute('role')
				.then(function(text) {
					assert.strictEqual('listbox', text,
						'SlideTrack should have role listbox attribute');
				});
		},

		'slides cloned should not have role option': function() {
			return this.remote
				.get(require.toUrl('src/initADA/index.html'))
				.setFindTimeout(5000)
				.findAllByCssSelector('.slick-track .slick-cloned')
				.getAttribute('role')
				.then(function(ArrayAttr) {
					assert.strictEqual(true, ArrayAttr.every(function(elem){return elem === null}),
						'slides cloned should not have role option');
				});
		},

		'dots div parent should have role toolbar': function() {
			return this.remote
				.get(require.toUrl('src/initADA/index.html'))
				.setFindTimeout(5000)
				.findByCssSelector('.single-item')
				.getAttribute('role')
				.then(function(text) {
					assert.strictEqual('toolbar', text,
						'dots div parent should have role toolbar attribute');
				});
		},

	});
});
