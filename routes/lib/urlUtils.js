"use strict";

///////////////////// Utils for Project ////////////////////////
var urlUtils = {
	randomString: function (length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
	},
  extend: function(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
      for (var prop in source) {
        target[prop] = source[prop];
      }
    });
    return target;
  }
};

module.exports = urlUtils;
/////////////////////////////////////////////////////////////////
//Test script
if (require.main === module) {
  (function(){
    var a = {"nik":{"ran":1}};
    var b = {"qw":{"sad":2}};
    var c = urlUtils.extend({},a,b);
    console.log(c);
  })();
}
