import { __assign } from "tslib";
import * as React from "react";
import { PrerenderedComponent } from "./PrerenderedComponent";
import hoistStat from "hoist-react-statics";
export var ServerSideComponent = function (props) { return (React.createElement(PrerenderedComponent, __assign({}, props, { live: false, strict: true }))); };
export function serverSideComponent(Component) {
    var C = Component;
    return hoistStat(function (props) { return React.createElement(ServerSideComponent, null,
        React.createElement(C, __assign({}, props))); }, Component);
}
