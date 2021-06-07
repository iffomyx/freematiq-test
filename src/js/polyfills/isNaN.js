/* Polyfill service v3.104.0
 * For detailed credits and licence information see https://github.com/financial-times/polyfill-service.
 *
 * Features requested: Number.isNaN
 *
 * - _ESAbstract.CreateMethodProperty, License: CC0 (required by "Number.isNaN")
 * - _ESAbstract.Type, License: CC0 (required by "Number.isNaN")
 * - Number.isNaN, License: MIT */

(function(self, undefined) {

// _ESAbstract.CreateMethodProperty
// 7.3.5. CreateMethodProperty ( O, P, V )
  function CreateMethodProperty(O, P, V) { // eslint-disable-line no-unused-vars
                                           // 1. Assert: Type(O) is Object.
                                           // 2. Assert: IsPropertyKey(P) is true.
                                           // 3. Let newDesc be the PropertyDescriptor{[[Value]]: V, [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: true}.
    var newDesc = {
      value: V,
      writable: true,
      enumerable: false,
      configurable: true
    };
    // 4. Return ? O.[[DefineOwnProperty]](P, newDesc).
    Object.defineProperty(O, P, newDesc);
  }

// _ESAbstract.Type
// "Type(x)" is used as shorthand for "the type of x"...
  function Type(x) { // eslint-disable-line no-unused-vars
    switch (typeof x) {
      case 'undefined':
        return 'undefined';
      case 'boolean':
        return 'boolean';
      case 'number':
        return 'number';
      case 'string':
        return 'string';
      case 'symbol':
        return 'symbol';
      default:
        // typeof null is 'object'
        if (x === null) return 'null';
        // Polyfill.io - This is here because a Symbol polyfill will have a typeof `object`.
        if ('Symbol' in self && (x instanceof self.Symbol || x.constructor === self.Symbol)) return 'symbol';

        return 'object';
    }
  }

// Number.isNaN
  /* global CreateMethodProperty, Type */
  (function () {
    var that = self;
    // 20.1.2.4. Number.isNaN ( number )
    CreateMethodProperty(Number, 'isNaN', function isNaN(number) {
      // 1. If Type(number) is not Number, return false.
      if (Type(number) !== 'number') {
        return false;
      }
      // 2. If number is NaN, return true.
      if (that.isNaN(number)) {
        return true;
      }
      // 3. Otherwise, return false.
      return false;
    });
  }());
})
('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
