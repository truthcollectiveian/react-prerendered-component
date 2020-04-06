"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var PrerenderedComponent_1 = require("./PrerenderedComponent");
var hoist_react_statics_1 = require("hoist-react-statics");
exports.ServerSideComponent = function (props) { return (React.createElement(PrerenderedComponent_1.PrerenderedComponent, tslib_1.__assign({}, props, { live: false, strict: true }))); };
function serverSideComponent(Component) {
    var C = Component;
    return hoist_react_statics_1.default(function (props) { return React.createElement(exports.ServerSideComponent, null,
        React.createElement(C, tslib_1.__assign({}, props))); }, Component);
}
exports.serverSideComponent = serverSideComponent;
