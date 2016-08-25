define(function (require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');
  console.log('FUNC');

  registerSuite({
    name: 'index',

    'greeting form': function () {
      console.log('FUNCTOWN');

      return this.remote
      .get(require.toUrl('index.html'))
      .setFindTimeout(5000)
      .findByCssSelector('body.loaded')
      .findById('nameField')
      .click()
      .type('Elaine')
      .end()
      .findByCssSelector('#loginForm input[type=submit]')
      .click()
      .end()
      .findById('greeting')
      .getVisibleText()
      .then(function (text) {
        assert.strictEqual(text, 'Hello, Elaine!',
          'Greeting should be displayed when the form is submitted');
      });
    }
  });
});