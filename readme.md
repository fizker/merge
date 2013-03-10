fmerge
======

fmerge is a simple tool for merging objects. It is perfect for handling options
objects.

It takes any number of parameters. It even merges recursively. Arrays will just
be replaced, though.

It does require a browser that supports ES5 methods though, so for IE8 or
earlier, take a look at https://github.com/olivernn/augment.js.

Example of use
--------------

    var merge = require('fmerge')

    console.log(merge(
      { a: 1, b: { c: 3, d: 4 }, [ 'entry', { e: 5 } ] }
    , { a: 2, b: { a: 1, c: 2 }, [ 'another entry', { a: 1 } ] }
    ))
    // { a: 2, b: { a: 1, c: 2, d: 4 }, [ 'another entry', { a: 1 } ] }
