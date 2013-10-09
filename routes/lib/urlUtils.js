"use strict";

///////////////////// Utils for Project ////////////////////////
var urlUtils = {
	randomString: function (length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
	}
};

module.exports = urlUtils;
/////////////////////////////////////////////////////////////////
  