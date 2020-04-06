"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PrerenderedControl_1 = require("./PrerenderedControl");
exports.Placeholder = function (_a) {
    var name = _a.name;
    return (React.createElement(PrerenderedControl_1.TemplateControl.Consumer, null, function (_a) {
        var variables = _a.variables, isServer = _a.isServer, seed = _a.seed;
        return (isServer
            ? "{x-cached" + seed + "-placeholder-" + name + "/}"
            : (variables[name] || '{empty}'));
    }));
};
exports.WithPlaceholder = function (_a) {
    var children = _a.children;
    return (React.createElement(PrerenderedControl_1.TemplateControl.Consumer, null, function (_a) {
        var variables = _a.variables, isServer = _a.isServer, seed = _a.seed;
        return (children(function (name) { return (isServer
            ? "{x-cached" + seed + "-placeholder-" + name + "/}"
            : String((variables[name] || '{empty}'))); }));
    }));
};
