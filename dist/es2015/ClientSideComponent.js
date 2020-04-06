import { __assign } from "tslib";
import * as React from "react";
import hoistStat from 'hoist-react-statics';
import { PrerenderedControls } from "./PrerenderedControl";
export var ClientSideComponent = function (_a) {
    var children = _a.children;
    return (React.createElement(PrerenderedControls, null, function (_a) {
        var isServer = _a.isServer, hydrated = _a.hydrated;
        return (isServer
            ? null
            : !hydrated && React.createElement(React.Fragment, null,
                "!",
                children,
                "!"));
    }));
};
export function clientSideComponent(Component) {
    var C = Component;
    return hoistStat(function (props) { return React.createElement(ClientSideComponent, null,
        React.createElement(C, __assign({}, props))); }, Component);
}
