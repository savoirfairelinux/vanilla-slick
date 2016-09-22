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
			'The page filterSlide sould not have javascript errors\n' + errors.join('\n') + "\n");
	};

	registerSuite({
		name: 'filterSlide',

		'filterByCssSelector': function() {
			return this.remote
				.get(require.toUrl('src/filterSlide/index.html'))
				.execute(initErrorLog)
				.setFindTimeout(5000)
				.findByCssSelector('#radio-css')
    				.click()
    				.end()
				.findByCssSelector('.filter .js-filter')
    				.click()
    				.end()
				.sleep(100)
                .findAllByCssSelector('.slick-active')
				.getVisibleText()
				.then(function(arrayText) {
					assert.deepEqual(['2','4','6','8'], arrayText,
						'The pair number slide should be displayed');
				})
    			.execute(returnErrorLog)
    				.then(testErrorLog)
    				.end();
		},

        'filterByCssSelectorAndUnfilter': function() {
            return this.remote
                .get(require.toUrl('src/filterSlide/index.html'))
                .execute(initErrorLog)
                .setFindTimeout(5000)
                .findByCssSelector('#radio-css')
                    .click()
                    .end()
                .findByCssSelector('.filter .js-filter')
                    .click()
                    .end()
                .sleep(100)
                .findByCssSelector('.filter .js-filter')
                    .click()
                    .end()
                .sleep(100)
                .findAllByCssSelector('.slick-slide:not(.slick-cloned)')
                .getVisibleText()
                .then(function(arrayText) {
                    assert.deepEqual(['1','2','3','4','','','','','','','',''], arrayText,
                        'All the slide should be present and the first 4 displayed');
                })
                .execute(returnErrorLog)
                    .then(testErrorLog)
                    .end();
        },

        'filterByNode': function() {
            return this.remote
                .get(require.toUrl('src/filterSlide/index.html'))
                .execute(initErrorLog)
                .setFindTimeout(5000)
                .findByCssSelector('#radio-node')
                    .click()
                    .end()
                .findByCssSelector('.filter .js-filter')
                    .click()
                    .end()
                .sleep(100)
                .findAllByCssSelector('.slick-active')
                .getVisibleText()
                .then(function(arrayText) {
                    assert.deepEqual(['3'], arrayText,
                        'Only the defined node (3) should be displayed');
                })
                .execute(returnErrorLog)
                    .then(testErrorLog)
                    .end();
        },

        'filterByNodeAndUnfilter': function() {
            return this.remote
                .get(require.toUrl('src/filterSlide/index.html'))
                .execute(initErrorLog)
                .setFindTimeout(5000)
                .findByCssSelector('#radio-node')
                    .click()
                    .end()
                .findByCssSelector('.filter .js-filter')
                    .click()
                    .end()
                .sleep(100)
                .findByCssSelector('.filter .js-filter')
                    .click()
                    .end()
                .sleep(100)
                .findAllByCssSelector('.slick-slide:not(.slick-cloned)')
                .getVisibleText()
                .then(function(arrayText) {
                    assert.deepEqual(['1','2','3','4','','','','','','','',''], arrayText,
                        'All the slide should be present and the first 4 displayed');
                })
                .execute(returnErrorLog)
                    .then(testErrorLog)
                    .end();
        },

        'filterByFunction': function() {
            return this.remote
                .get(require.toUrl('src/filterSlide/index.html'))
                .execute(initErrorLog)
                .setFindTimeout(5000)
                .findByCssSelector('#radio-function')
                    .click()
                    .end()
                .findByCssSelector('.filter .js-filter')
                    .click()
                    .end()
                .sleep(100)
                .findAllByCssSelector('.slick-active')
                .getVisibleText()
                .then(function(arrayText) {
                    assert.deepEqual(['3','6','9','12'], arrayText,
                        'Only the multiples of 3 should be displayed');
                })
                .execute(returnErrorLog)
                    .then(testErrorLog)
                    .end();
        },

        'filterByFunctionAndUnfilter': function() {
            return this.remote
                .get(require.toUrl('src/filterSlide/index.html'))
                .execute(initErrorLog)
                .setFindTimeout(5000)
                .findByCssSelector('#radio-function')
                    .click()
                    .end()
                .findByCssSelector('.filter .js-filter')
                    .click()
                    .end()
                .sleep(100)
                .findByCssSelector('.filter .js-filter')
                    .click()
                    .end()
                .sleep(100)
                .findAllByCssSelector('.slick-slide:not(.slick-cloned)')
                .getVisibleText()
                .then(function(arrayText) {
                    assert.deepEqual(['1','2','3','4','','','','','','','',''], arrayText,
                        'All the slide should be present and the first 4 displayed');
                })
                .execute(returnErrorLog)
                    .then(testErrorLog)
                    .end();
        },


	});
});
