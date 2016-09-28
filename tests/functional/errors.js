
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


    registerSuite({
        name: 'errors',

        'onResise': function () {
                return this.remote
                  .get(require.toUrl('src/errors/index.html'))
                  .execute(initErrorLog)
                  .setWindowSize(320,500)
                  .sleep(500)
                  .setWindowSize(1280,800)
                  .sleep(500)
                  .execute(returnErrorLog)
                  .then(function (errors) {
                      assert.equal(0, errors.length,
                          'The page sould not have errors on resize\n' + errors.join('\n') + "\n");
                  })
                  .end();
        },


    });
});
