"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var PrerenderedControl_1 = require("./PrerenderedControl");
var hoist_react_statics_1 = require("hoist-react-statics");
exports.NotCacheable = function (_a) {
    var children = _a.children;
    return (React.createElement(PrerenderedControl_1.PrerenderedControls, null, function (state) { return (state.control
        ? (React.createElement(PrerenderedControl_1.PrerenderedContext.Provider, { value: tslib_1.__assign(tslib_1.__assign({}, state), { control: null }) }, React.createElement("x-cached" + state.control.seed + "-do-not-cache", null, children)))
        : children); }));
};
function notCacheable(Component) {
    var C = Component;
    return hoist_react_statics_1.default(function (props) { return React.createElement(exports.NotCacheable, null,
        React.createElement(C, tslib_1.__assign({}, props))); }, Component);
}
exports.notCacheable = notCacheable;
