/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */

/*
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/licenses/publicdomain/
 */
function fn() {
  return function (a, b, c) {
    ;
  };
}

testLenientAndStrict('var f = fn(); delete f.prototype', returns(false), raisesException(TypeError));
true;
reportCompare(true, true);
