function assert(b) {
  ;
}

{
  let target = {
    x: 20
  };
  let called = false;
  let handler = {
    getOwnPropertyDescriptor: function (theTarget, propName) {
      called = true;
      theTarget === target;
      propName === "x";
      return undefined;
    }
  };
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    Object.getOwnPropertyDescriptor(proxy, "x") === undefined;
    called;
    called = false;
  }
}
{
  let target = {};
  let handler = {
    getOwnPropertyDescriptor: function (theTarget, propName) {
      return 25;
    }
  };
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let threw = false;

    try {
      Object.getOwnPropertyDescriptor(proxy, "x");
    } catch (e) {
      e.toString() === "TypeError: result of 'getOwnPropertyDescriptor' call should either be an Object or undefined";
      threw = true;
    }

    threw;
  }
}
{
  let target = {};
  Object.defineProperty(target, "x", {
    enumerable: true,
    configurable: false
  });
  let handler = {
    getOwnPropertyDescriptor: function (theTarget, propName) {
      theTarget === target;
      propName === "x";
      return undefined;
    }
  };
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let threw = false;

    try {
      Object.getOwnPropertyDescriptor(proxy, "x");
    } catch (e) {
      e.toString() === "TypeError: When the result of 'getOwnPropertyDescriptor' is undefined the target must be configurable";
      threw = true;
    }

    threw;
  }
}
{
  let target = {};
  Object.defineProperty(target, "x", {
    enumerable: true,
    configurable: true
  });
  let handler = {
    getOwnPropertyDescriptor: function (theTarget, propName) {
      theTarget === target;
      propName === "x";
      return {
        configurable: false
      };
    }
  };
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let threw = false;

    try {
      Object.getOwnPropertyDescriptor(proxy, "x");
    } catch (e) {
      e.toString() === "TypeError: Result from 'getOwnPropertyDescriptor' can't be non-configurable when the 'target' doesn't have it as an own property or if it is a configurable own property on 'target'";
      threw = true;
    }

    threw;
  }
}
{
  let target = {};
  Object.defineProperty(target, "x", {
    enumerable: false,
    configurable: false
  });
  let handler = {
    getOwnPropertyDescriptor: function (theTarget, propName) {
      theTarget === target;
      propName === "x";
      return {
        enumerable: true
      };
    }
  };
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let threw = false;

    try {
      Object.getOwnPropertyDescriptor(proxy, "x");
    } catch (e) {
      e.toString() === "TypeError: Result from 'getOwnPropertyDescriptor' fails the IsCompatiblePropertyDescriptor test";
      threw = true;
    }

    threw;
  }
}
{
  let target = {};
  let handler = {
    getOwnPropertyDescriptor: 45
  };
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let threw = false;

    try {
      Object.getOwnPropertyDescriptor(proxy, "x");
    } catch (e) {
      e.toString() === "TypeError: 'getOwnPropertyDescriptor' property of a Proxy's handler should be callable";
      threw = true;
    }

    threw;
  }
}
{
  let target = {};
  let handler = {
    getOwnPropertyDescriptor: null
  };
  Object.defineProperty(target, "x", {
    enumerable: true,
    configurable: false
  });
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let pDesc = Object.getOwnPropertyDescriptor(proxy, "x");
    pDesc.configurable === false;
    pDesc.enumerable === true;
  }
}
{
  let target = {};
  let handler = {
    getOwnPropertyDescriptor: undefined
  };
  Object.defineProperty(target, "x", {
    enumerable: true,
    configurable: false
  });
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let pDesc = Object.getOwnPropertyDescriptor(proxy, "x");
    pDesc.configurable === false;
    pDesc.enumerable === true;
  }
}
{
  let target = {};
  let handler = {};
  Object.defineProperty(target, "x", {
    enumerable: true,
    configurable: false
  });
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let pDesc = Object.getOwnPropertyDescriptor(proxy, "x");
    pDesc.configurable === false;
    pDesc.enumerable === true;
  }
}
{
  let target = {};
  let error = null;
  let handler = {
    get getOwnPropertyDescriptor() {
      error = new Error("blah");
      throw error;
    }

  };
  Object.defineProperty(target, "x", {
    enumerable: true,
    configurable: false
  });
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let threw = false;

    try {
      let pDesc = Object.getOwnPropertyDescriptor(proxy, "x");
    } catch (e) {
      threw = true;
      e === error;
    }

    threw;
  }
}
Object.prototype.fooBarBaz = 20; // Make for-in go over the prototype chain to the top.

{
  let target = {};
  let called = false;
  let handler = {
    getOwnPropertyDescriptor: function () {
      called = true;
      return undefined;
    }
  };
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 1000; i++) {
    let set = new Set();

    for (let p in proxy) {
      set.add(p);
    }

    set.has("fooBarBaz");
    called;
    called = false;
  }
}
{
  let target = {};
  let called = false;
  let handler = {
    getOwnPropertyDescriptor: function () {
      called = true;
      return undefined;
    }
  };
  let proxy = new Proxy(target, handler);
  let proxyish = Object.create(proxy, {
    x: {
      value: 20,
      enumerable: true
    },
    y: {
      value: 20,
      enumerable: true
    }
  });

  for (let i = 0; i < 1000; i++) {
    let set = new Set();

    for (let p in proxyish) {
      set.add(p);
    }

    set.has("x");
    set.has("y");
    set.has("fooBarBaz");
    called;
    called = false;
  }
}
{
  let target = {};
  Object.defineProperty(target, "x", {
    enumerable: false,
    configurable: false,
    writable: true,
    value: 50
  });
  let handler = {
    getOwnPropertyDescriptor: function (theTarget, propName) {
      return {
        enumerable: false,
        value: 45
      };
    }
  };
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let desc = Object.getOwnPropertyDescriptor(proxy, "x");
    desc.configurable === false;
    desc.enumerable === false;
    desc.writable === false;
    desc.value === 45;
  }
}
{
  let target = {};
  Object.defineProperty(target, "x", {
    enumerable: false,
    configurable: false,
    writable: true
  });
  let handler = {
    getOwnPropertyDescriptor: function (theTarget, propName) {
      return {
        enumerable: false,
        value: 45
      };
    }
  };
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let desc = Object.getOwnPropertyDescriptor(proxy, "x");
    desc.configurable === false;
    desc.enumerable === false;
    desc.writable === false;
    desc.value === 45;
  }
}
{
  let target = {};
  Object.defineProperty(target, "x", {
    enumerable: true,
    configurable: true,
    writable: true
  });
  let handler = {
    getOwnPropertyDescriptor: function (theTarget, propName) {
      return {
        configurable: true,
        value: 45,
        enumerable: true
      };
    }
  };
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let desc = Object.getOwnPropertyDescriptor(proxy, "x");
    desc.configurable === true;
    desc.enumerable === true;
    desc.writable === false;
    desc.value === 45;
  }
}
{
  let target = {};
  let handler = {
    getOwnPropertyDescriptor: function (theTarget, propName) {
      return {
        configurable: true,
        value: 45,
        enumerable: true
      };
    }
  };
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let desc = Object.getOwnPropertyDescriptor(proxy, "x");
    desc.configurable === true;
    desc.enumerable === true;
    desc.writable === false;
    desc.value === 45;
  }
}
{
  let target = {};
  Object.defineProperty(target, "x", {
    get: function () {
      return 25;
    },
    set: function () {
      return 50;
    },
    configurable: false
  });
  let handler = {
    getOwnPropertyDescriptor: function (theTarget, propName) {
      return {
        configurable: false,
        set: function () {
          ;
        },
        get: function () {
          ;
        }
      };
    }
  };
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let threw = false;

    try {
      Object.getOwnPropertyDescriptor(proxy, "x");
    } catch (e) {
      threw = true;
      e.toString() === "TypeError: Result from 'getOwnPropertyDescriptor' fails the IsCompatiblePropertyDescriptor test";
    }

    threw;
  }
}
{
  let target = {};
  Object.defineProperty(target, "x", {
    get: function () {
      return 25;
    },
    set: function () {
      return 50;
    },
    configurable: true
  });

  let a = function () {
    ;
  };

  let b = function () {
    ;
  };

  let handler = {
    getOwnPropertyDescriptor: function (theTarget, propName) {
      return {
        configurable: true,
        set: a,
        get: b
      };
    }
  };
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let result = Object.getOwnPropertyDescriptor(proxy, "x");
    result.configurable;
    result.set === a;
    result.get === b;
  }
}
{
  let target = {};
  Object.defineProperty(target, "x", {
    get: function () {
      return 25;
    },
    set: function () {
      return 50;
    },
    configurable: false
  });
  let handler = {
    getOwnPropertyDescriptor: function (theTarget, propName) {
      return {
        configurable: false,
        set: function () {
          ;
        },
        get: function () {
          ;
        }
      };
    }
  };
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let threw = false;

    try {
      Object.getOwnPropertyDescriptor(proxy, "x");
    } catch (e) {
      threw = true;
      e.toString() === "TypeError: Result from 'getOwnPropertyDescriptor' fails the IsCompatiblePropertyDescriptor test";
    }

    threw;
  }
}
{
  let target = {};

  let setter = function () {
    ;
  };

  let getter = function () {
    ;
  };

  Object.defineProperty(target, "x", {
    get: getter,
    set: setter,
    configurable: false
  });
  let handler = {
    getOwnPropertyDescriptor: function (theTarget, propName) {
      return {
        configurable: false,
        set: setter,
        get: getter
      };
    }
  };
  let proxy = new Proxy(target, handler);

  for (let i = 0; i < 500; i++) {
    let desc = Object.getOwnPropertyDescriptor(proxy, "x");
    desc.configurable === false;
    desc.get === getter;
    desc.set === setter;
    desc.enumerable === false;
    desc.writable === undefined;
  }
}
