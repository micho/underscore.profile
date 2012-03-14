/**
 * Underscore profile
 *
 * Benchmark your functions.
 *
 * Usage: Wrap your functions with _.profile and call them normally.
 *
 *     your_function = _.profile("Your Function Description", your_function);
 *
 * Whenever you want to see results, you can call:
 *
 *     _.profileResults();
 *
 * It will give you something like this:
 *
 *     Thread.render: Called 18 times, average of 16 ms. Total: 0.304 s.
 *
 */


/**
 * Obtain a wrapped function with performance benchmarking
 *
 * @param {String} Name for this function. Will be used by the reports
 * @param {Function} Original function to be wrapped
 *
 * @return {Function} Wrapped function, which works just like the original one
 */
_.profile = function (name, func) {
  _._profile_results = _._profile_results || {};
  _._profile_results[name] = _._profile_results[name] || {
    times_called: 0,
    ms_total: 0
  };

  return _.wrap(func, function (f, a) {
    var result, start;
    start = Date.now();
    result = f.apply(this, arguments);
    _._profile_results[name].times_called += 1;
    _._profile_results[name].ms_total += Date.now() - start;
    return result;
  });
};

/**
 * Display results from profiled functions.
 */
_.profileResults = function () {
  _(_._profile_results).each(function (results, name) {
    console.log(
      name + ": " +
      "Called " + results.times_called + " times, " +
      "average of " + Math.floor(results.ms_total / results.times_called) + " ms. " +
      "Total: " + (results.ms_total / 1000).toFixed(3) + " s."
     );
  });
};
