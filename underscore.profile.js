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
 * Will give you something like this:
 *
 *     Thread.render: Called 6 times. Avg: 26 ms. Max: 78 ms. Total: 0.157 s.
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
    ms_max: 0,
    ms_total: 0
  };

  return _.wrap(func, function (f, a) {
    var result, start, elapsed;
    start = new Date().getTime();
    result = f.apply(this, arguments);
    elapsed = new Date().getTime() - start;
    _._profile_results[name].times_called += 1;
    _._profile_results[name].ms_total += elapsed;
    if (elapsed > _._profile_results[name].ms_max) {
      _._profile_results[name].ms_max = elapsed;
    }
    return result;
  });
};

/**
 * Display results from profiled functions.
 */
_.profileResults = function () {
  _(_._profile_results)
    .chain()
    .sortBy(function (results, name) {
      results.name = name;
      return -results.ms_total;
    }).each(function (results) {
      console.log(
        results.name + ": " +
        "Called " + results.times_called + " times. " +
        "Avg: " + Math.floor(results.ms_total / results.times_called) + " ms. " +
        "Max: " + results.ms_max + " ms. " +
        "Total: " + (results.ms_total / 1000).toFixed(3) + " s."
       );
    });
};
