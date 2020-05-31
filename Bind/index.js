var slice = Array.prototype.slice;
function _bind() {
  var that = this;
  var args = slice.call(arguments, 1);
  var bond = arguments[0];
  return function () {
    var args2 = slice.call(arguments);
    var newArg = args.concat(args2);
    return that.apply(bond, newArg);
  };
}
if (!Function.prototype.bind) {
  Function.prototype.bind = _bind;
}
module.exports = _bind;
