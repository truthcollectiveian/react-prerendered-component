// @ts-ignore
import * as isNode from 'detect-node';
var isServerSide = isNode;
export var thisIsServer = function () { return isServerSide = true; };
export var isThisServer = function () { return isServerSide; };
