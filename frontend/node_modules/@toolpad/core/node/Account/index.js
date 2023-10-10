"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Account = require("./Account");
Object.keys(_Account).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Account[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Account[key];
    }
  });
});