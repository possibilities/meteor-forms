_.extend(TestCaseResults.prototype, {
  hasElement: function (htmlFrag, selector, expectedCount) {
    expectedCount = _.isUndefined(expectedCount) ? 1 : expectedCount;

    // Wrap it up so we can use find() on fragment
    $html = $('<div>' + htmlFrag + '</div>');
    
    var actualCount = $html.find(selector).length;
    var message = 'expected: ' + expectedCount + ', actual: ' + actualCount + ', selector: ' + selector;

    if (actualCount !== expectedCount)
      this.fail({ type: 'html', message: message });
    else
      this.ok(message);

  }
});
