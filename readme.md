fmerge
======

fmerge is a simple tool for merging objects. It is perfect for handling options
objects.

It takes any number of parameters. It even merges recursively. Arrays will just
be replaced, though.

It does require a browser that supports ES5 methods though, so for IE8 or
earlier, take a look at https://github.com/olivernn/augment.js.


Installing
----------

Installing is easy. It automatically detects the environment among the three
supported types ([node.js](http://nodejs.org), [require.js](http://requirejs.org)
and normal browser version).

- In `node`, simply use `npm install fmerge`.
- The module is `require.js`-aware, so you can link it directly through `require.js`
  as well.
    - To make the `require.js` version, either install through `npm` or check out
      from git and run `node install.js`.
- For normal browsers, it creates a global function `fmerge`.


Example of use
--------------

    var merge = require('fmerge')

    console.log(merge(
      { a: 1, b: { c: 3, d: 4 }, c: [ 'entry', { e: 5 } ] }
    , { a: 2, b: { a: 1, c: 2 }, c: [ 'another entry', { a: 1 } ] }
    ))
    // { a: 2, b: { a: 1, c: 2, d: 4 }, c: [ 'another entry', { a: 1 } ] }


Circular ref detection
----------------------

The default function have built-in circular ref detection, but this comes at a
performance cost. If you think that you don't need this, then you can skip it by
calling `merge.skipCircularGuard()` instead of `merge()`.

    var merge = require('fmerge')

    // with circular detection
    merge(first, second)

    // without circular detection
    merge.skipCircularGuard(first, second)
