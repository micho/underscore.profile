Underscore profile
==================

Benchmark your functions.

Usage
-----

Wrap your functions with _.profile and call them normally.

    your_function = _.profile("Your Function Description", your_function);

Whenever you want to see results, you can call:

    _.profileResults();

It will give you something like this:

    Thread.render: Called 6 times. Avg: 23 ms. Max: 46 ms. Total: 0.141 s.

Attributions
------------

Made by Pablo Villalba ([@micho](http://twitter.com/micho)) for [Teambox](http://teambox.com)
