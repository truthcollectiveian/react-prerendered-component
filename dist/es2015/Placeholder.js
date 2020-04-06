import * as React from "react";
import { TemplateControl } from "./PrerenderedControl";
export var Placeholder = function (_a) {
    var name = _a.name;
    return (React.createElement(TemplateControl.Consumer, null, function (_a) {
        var variables = _a.variables, isServer = _a.isServer, seed = _a.seed;
        return (isServer
            ? "{x-cached" + seed + "-placeholder-" + name + "/}"
            : (variables[name] || '{empty}'));
    }));
};
export var WithPlaceholder = function (_a) {
    var children = _a.children;
    return (React.createElement(TemplateControl.Consumer, null, function (_a) {
        var variables = _a.variables, isServer = _a.isServer, seed = _a.seed;
        return (children(function (name) { return (isServer
            ? "{x-cached" + seed + "-placeholder-" + name + "/}"
            : String((variables[name] || '{empty}'))); }));
    }));
};
