//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
var e = 8;

function x() {
  throw 7;
}

function y() {
  var i;

  for (i = 0; i < 10; i++) {
    try {
      if (i % 2 == 0) {
        try {
          x();
        } catch (e) {
          print("Inner catch: " + e);

          if (i % 3) {
            throw e;
          }

          if (i % 5) {
            return e;
          }
        } finally {
          print("Finally: " + i);
          continue;
        }
      }
    } catch (e) {
      print("Outer catch: " + e);
    } finally {
      print("Outer finally: " + i);

      if (++i % 9 == 0) {
        return e;
      }
    }
  }
}

print(y());
