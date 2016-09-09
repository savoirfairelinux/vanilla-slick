
define(function (require) {
    var registerSuite = require('intern!object');
    var assert = require('intern/chai!assert');

    registerSuite({
        name: 'errors',

        'onResise': function () {
                return this.remote
                  .get(require.toUrl('src/errors/index.html'))
                  .execute(function () {
                    window.__internErrors__ = [];
                    window.onerror = function () {
                      __internErrors__.push(Array.prototype.slice.call(arguments, 0));
                    };
                  })
                  .setWindowSize(320,500)
                  .sleep(500)
                  .setWindowSize(1280,800)
                  .sleep(500)
                  .execute(function () {
                    return window.__internErrors__;
                  })
                  .then(function (errors) {
                      assert.equal(0, errors.length,
                          'The page sould not have errors on resize\n' + errors.join('\n') + "\n");
                  })
                  .end();
        },


    });
});
