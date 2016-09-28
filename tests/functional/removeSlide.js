define(function(require) {
	var registerSuite = require('intern!object');
	var assert = require('intern/chai!assert');
	//var pollUntil = require('leadfoot/helpers/pollUntil');

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
		name: 'removeSlide',


		'removeSlideRemoveArrows': function() {
			return this.remote
				.get(require.toUrl('src/addSlide/index.html'))
				.setFindTimeout(500)
				.execute(initErrorLog)
				.findByCssSelector('.addSlideAtEnd .js-add-slide')
					.click()
					.click()
					.click()
					.end()
				.findByCssSelector('.addSlideAtEnd .js-remove-slide')
					.click()
					.end()
				.findByCssSelector('.addSlideAtEnd .slick-next.slick-arrow')
				.then(function (elementA) {
			        assert.fail(elementA, "", "Arrows next should not exist");
			    }, function (error) {
			        assert.equal(error.name, "NoSuchElement", "Arrows next should not exist");
			    })
				.execute(returnErrorLog)
				.then(testErrorLog)
				.end();
		},

		'removeSlideRemoveDots': function() {
			return this.remote
				.get(require.toUrl('src/addSlide/index.html'))
				.setFindTimeout(500)
				.execute(initErrorLog)
				.findByCssSelector('.addSlideAtEnd .js-add-slide')
					.click()
					.click()
					.click()
					.end()
				.findByCssSelector('.addSlideAtEnd .js-remove-slide')
					.click()
					.end()
				.findByCssSelector('.addSlideAtEnd .slick-dots')
				.then(function (elementA) {
			        assert.fail(elementA, "", "Dots list should not exist");
			    }, function (error) {
			        assert.equal(error.name, "NoSuchElement", "Dots list should not exist");
			    })
				.execute(returnErrorLog)
				.then(testErrorLog)
				.end();
		},

		'removeSlideRemoveClone': function() {
			return this.remote
				.get(require.toUrl('src/addSlide/index.html'))
				.setFindTimeout(500)
				.execute(initErrorLog)
				.findByCssSelector('.addSlideAtEnd .js-add-slide')
					.click()
					.click()
					.click()
					.end()
				.findByCssSelector('.addSlideAtEnd .js-remove-slide')
					.click()
					.end()
				.findByCssSelector(".addSlideAtEnd .slick-track .slick-slide.slick-cloned")
			    .then(function (elementA) {
			        assert.fail(elementA, "", "Cloned slides should not exist");
			    }, function (error) {
			        assert.equal(error.name, "NoSuchElement", "Cloned slides should not exist");
			    })
				.execute(returnErrorLog)
				.then(testErrorLog)
				.end();
		},



	});
});
