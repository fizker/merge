fmerge
======

fmerge is a simple tool for merging objects. It takes any number of parameters.
It even merges recursively. Arrays will just be replaced, though.

Example of use
--------------

    var merge = require('fmerge')

    console.log(merge(
      { a: 1, b: { c: 3, d: 4 }, [ 'entry', { e: 5 } ] }
    , { a: 2, b: { a: 1, c: 2 }, [ 'another entry', { a: 1 } ] }
    ))
    // { a: 2, b: { a: 1, c: 2, d: 4 }, [ 'another entry', { a: 1 } ] }
