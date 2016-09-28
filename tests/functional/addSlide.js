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
            'The page addSlide sould not have javascript errors\n' + errors.join('\n') + "\n");
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

        'addSlideDomAtEnd': function() {
            return this.remote
                .get(require.toUrl('src/addSlide/index.html'))
                .setFindTimeout(5000)
                .execute(initErrorLog)
                .findByCssSelector('.addSlideAtEnd .js-add-slide-dom')
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

		'addSlideCreateArrows': function() {
			return this.remote
				.get(require.toUrl('src/addSlide/index.html'))
				.setFindTimeout(5000)
				.execute(initErrorLog)
				.findByCssSelector('.addSlideAtEnd .js-add-slide')
					.click()
					.click()
					.click()
					.end()
				.findByCssSelector('.addSlideAtEnd .slick-next.slick-arrow')
				.then(function(elem) {
					assert.isOk(elem,
						'The next arrow should exist');
				})
				.execute(returnErrorLog)
				.then(testErrorLog)
				.end();
		},

		'addSlideCreateDots': function() {
			return this.remote
				.get(require.toUrl('src/addSlide/index.html'))
				.setFindTimeout(5000)
				.execute(initErrorLog)
				.findByCssSelector('.addSlideAtEnd .js-add-slide')
					.click()
					.click()
					.click()
					.end()
				.findByCssSelector('.addSlideAtEnd .slick-dots')
				.then(function(elem) {
					assert.isOk(elem,
						'The dots list should exist');
				})
				.execute(returnErrorLog)
				.then(testErrorLog)
				.end();
		},

		'addSlideCreateClone': function() {
			return this.remote
				.get(require.toUrl('src/addSlide/index.html'))
				.setFindTimeout(5000)
				.execute(initErrorLog)
				.findByCssSelector('.addSlideAtEnd .js-add-slide')
					.click()
					.click()
					.click()
					.end()
				.findByCssSelector('.addSlideAtEnd .slick-track .slick-slide.slick-cloned')
				.then(function(elem) {
					assert.isOk(elem,
						'Cloned slides should exist');
				})
				.execute(returnErrorLog)
				.then(testErrorLog)
				.end();
		},

        'addSlideIndexBefore': function() {
            return this.remote
                .get(require.toUrl('src/addSlide/index.html'))
                .setFindTimeout(5000)
                .execute(initErrorLog)
                .findByCssSelector('.addSlideAtIndex .js-add-slide-index-before')
                    .click()
                    .end()
                .findByCssSelector('.addSlideAtIndex [data-slick-index="1"]')
                .getVisibleText()
                .then(function(text) {
                    assert.strictEqual('1 before', text,
                        'The slide "1 before"  should be added');
                })
                .execute(returnErrorLog)
                .then(testErrorLog)
                .end();
        },

        'addSlideIndexAfter': function() {
            return this.remote
                .get(require.toUrl('src/addSlide/index.html'))
                .setFindTimeout(5000)
                .execute(initErrorLog)
                .findByCssSelector('.addSlideAtIndex .js-add-slide-index-after')
                    .click()
                    .end()
                .findByCssSelector('.addSlideAtIndex [data-slick-index="2"]')
                .getVisibleText()
                .then(function(text) {
                    assert.strictEqual('1 after', text,
                        'The slide "1 after"  should be added');
                })
                .execute(returnErrorLog)
                .then(testErrorLog)
                .end();
        },

        'addSlideWithFilter': function() {
            return this.remote
                .get(require.toUrl('src/addSlide/index.html'))
                .setFindTimeout(5000)
                .execute(initErrorLog)
                .findByCssSelector('.addSlideWithFilter .js-add-slide-filter')
                    .click()
                    .end()
                .findByCssSelector('.addSlideWithFilter .slick-next.slick-arrow')
                    .click()
                    .end()
                .sleep(500)
                .findByCssSelector('.addSlideWithFilter [data-slick-index="4"]')
                .getVisibleText()
                .then(function(text) {
                    assert.strictEqual('6', text,
                        'The slide "6" should be added');
                })
                .execute(returnErrorLog)
                .then(testErrorLog)
                .end();
        },


	});
});
