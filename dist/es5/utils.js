"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var isNode = require("detect-node");
var isServerSide = isNode;
exports.thisIsServer = function () { return isServerSide = true; };
exports.isThisServer = function () { return isServerSide; };
