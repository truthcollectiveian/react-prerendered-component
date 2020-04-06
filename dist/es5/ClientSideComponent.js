"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var hoist_react_statics_1 = require("hoist-react-statics");
var PrerenderedControl_1 = require("./PrerenderedControl");
exports.ClientSideComponent = function (_a) {
    var children = _a.children;
    return (React.createElement(PrerenderedControl_1.PrerenderedControls, null, function (_a) {
        var isServer = _a.isServer, hydrated = _a.hydrated;
        return (isServer
            ? null
            : !hydrated && React.createElement(React.Fragment, null,
                "!",
                children,
                "!"));
    }));
};
function clientSideComponent(Component) {
    var C = Component;
    return hoist_react_statics_1.default(function (props) { return React.createElement(exports.ClientSideComponent, null,
        React.createElement(C, tslib_1.__assign({}, props))); }, Component);
}
exports.clientSideComponent = clientSideComponent;
