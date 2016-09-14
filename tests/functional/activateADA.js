define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');

    registerSuite({
        name: 'activateADA',

        'active slide has aria-hidden false': function () {
            return this.remote
                .get(require.toUrl('src/activateADA/index.html'))
                .setFindTimeout(5000)
                .findByCssSelector('.slick-track .slick-active')
                .getAttribute('aria-hidden')
                .then(function (text) {
                        assert.strictEqual('false', text,
                            'Active slide should not be hidden');
                    });
        },
        
        'active slide has links tabable': function () {
            return this.remote
                .get(require.toUrl('src/activateADA/index.html'))
                .setFindTimeout(5000)
                .findByCssSelector('.slick-track .slick-active a')
	                .getAttribute('tabindex')
	                .then(function (tabindex) {
	                    assert.strictEqual('0', tabindex,
	                        '_a_ elements in the active slide should be tabable');
	                });
        },
        
        'NON-active slide has links NON-tabable': function () {
            return this.remote
                .get(require.toUrl('src/activateADA/index.html'))
                .setFindTimeout(5000)
                .findByCssSelector('button.slick-next')
                    .click() // the click will not change the tabindex immediately
                    .end()
//              .sleep(500) // this is an alternative to the following overspecific selector
                .findByCssSelector(".slick-track .slick-slide a[tabindex='-1']")  // the selector will wait till this element is available
                .getAttribute('tabindex')
	            .then(function (tabindex) {
	                assert.strictEqual('-1', tabindex,
	                    '_a_ elements in the NON-active slide should NOT be tabable');
	            });
        },
        

        'active slide has input tabable': function () {
            return this.remote
                .get(require.toUrl('src/activateADA/index.html'))
                .setFindTimeout(5000)
                .findByCssSelector('button.slick-next')
                    .click()
                    .end()
                .findByCssSelector(".slick-track .slick-active input[tabindex='0']")
	                .getAttribute('tabindex')
	                .then(function (tabindex) {
	                    assert.strictEqual('0', tabindex,
	                        '_input_ elements in the active slide should be tabable');
	                });
        },
        
        'NON-active slide has input NON-tabable': function () {
            return this.remote
                .get(require.toUrl('src/activateADA/index.html'))
                .setFindTimeout(5000)
                .findByCssSelector('.slick-track .slick-slide input')
	            .getAttribute('tabindex')
	            .then(function (tabindex) {
	                assert.strictEqual('-1', tabindex,
	                    '_input_ elements in the NON-active slide should NOT be tabable');
	            });
        },
        
        'active slide has button tabable': function () {
            return this.remote
                .get(require.toUrl('src/activateADA/index.html'))
                .setFindTimeout(5000)
                .findByCssSelector('button.slick-next')
                    .click()
                    .end()
                .findByCssSelector(".slick-track .slick-active input[tabindex='0']") // the first click is only done once the tabindex is set
                    .end()
                .findByCssSelector('button.slick-next')
                    .click()
                    .end()
                .findByCssSelector(".slick-track .slick-active button[tabindex='0']")
	                .getAttribute('tabindex')
	                .then(function (tabindex) {
	                    assert.strictEqual('0', tabindex,
	                        '_button_ elements in the active slide should be tabable');
	                });
        },
        
        'NON-active slide has button NON-tabable': function () {
            return this.remote
                .get(require.toUrl('src/activateADA/index.html'))
                .setFindTimeout(5000)
                .findByCssSelector('.slick-track .slick-slide button')
	            .getAttribute('tabindex')
	            .then(function (tabindex) {
	                assert.strictEqual('-1', tabindex,
	                    '_button_ elements in the NON-active slide should NOT be tabable');
	            });
        },
        
        'active slide has select tabable': function () {
            return this.remote
                .get(require.toUrl('src/activateADA/index.html'))
                .setFindTimeout(5000)
                .findByCssSelector('button.slick-next')
                    .click()
                    .end()
                .findByCssSelector(".slick-track .slick-active input[tabindex='0']") // the first click is only done once the tabindex is set
                    .end()
                .findByCssSelector('button.slick-next')
                    .click()
                    .end()
                .findByCssSelector(".slick-track .slick-active button[tabindex='0']") // the first click is only done once the tabindex is set
                    .end()
                .findByCssSelector('button.slick-next')
                    .click()
                    .end()
                .findByCssSelector(".slick-track .slick-active select[tabindex='0']")
	                .getAttribute('tabindex')
	                .then(function (tabindex) {
	                    assert.strictEqual('0', tabindex,
	                        '_select_ elements in the active slide should be tabable');
	                });
        },
        
        'NON-active slide has select NON-tabable': function () {
            return this.remote
                .get(require.toUrl('src/activateADA/index.html'))
                .setFindTimeout(5000)
                .findByCssSelector('.slick-track .slick-slide select')
	            .getAttribute('tabindex')
	            .then(function (tabindex) {
	                assert.strictEqual('-1', tabindex,
	                    '_select_ elements in the NON-active slide should NOT be tabable');
	            });
        },


    });
});
