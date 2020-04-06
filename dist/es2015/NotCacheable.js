import { __assign } from "tslib";
import * as React from "react";
import { PrerenderedControls, PrerenderedContext } from "./PrerenderedControl";
import hoistStat from "hoist-react-statics";
export var NotCacheable = function (_a) {
    var children = _a.children;
    return (React.createElement(PrerenderedControls, null, function (state) { return (state.control
        ? (React.createElement(PrerenderedContext.Provider, { value: __assign(__assign({}, state), { control: null }) }, React.createElement("x-cached" + state.control.seed + "-do-not-cache", null, children)))
        : children); }));
};
export function notCacheable(Component) {
    var C = Component;
    return hoistStat(function (props) { return React.createElement(NotCacheable, null,
        React.createElement(C, __assign({}, props))); }, Component);
}
