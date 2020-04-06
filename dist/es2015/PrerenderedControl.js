import { __assign, __extends, __rest } from "tslib";
import * as React from 'react';
// @ts-ignore
import * as nanoid from 'nanoid';
import { UIDReset } from 'react-uid';
import { isThisServer } from "./utils";
export var cacheControler = function (cache) {
    var counter = 0;
    var cachedValues = {};
    var cached = {};
    return {
        cache: cache,
        seed: nanoid().toLowerCase(),
        get: function (key) {
            return cachedValues[cached[key].key];
        },
        set: function (id, value) {
            var _a = cached[id], key = _a.key, ttl = _a.ttl;
            cache.set(key, value, ttl);
        },
        store: function (key, value) {
            cachedValues[key] = value;
            return this.assign(key, 0);
        },
        assign: function (key, ttl) {
            counter++;
            cached[counter] = { key: key, ttl: ttl };
            return counter;
        }
    };
};
var context = React.createContext({
    isServer: isThisServer(),
    hydrated: false,
});
var PrerenderedControler = /** @class */ (function (_super) {
    __extends(PrerenderedControler, _super);
    function PrerenderedControler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            hydrated: _this.props.hydrated || false,
        };
        return _this;
    }
    PrerenderedControler.prototype.componentDidMount = function () {
        if (this.props.hydrated) {
            this.setState({
                hydrated: false
            });
        }
    };
    PrerenderedControler.prototype.render = function () {
        var _a = this.props, children = _a.children, props = __rest(_a, ["children"]);
        return (React.createElement(UIDReset, null,
            React.createElement(context.Provider, { value: __assign(__assign({ isServer: isThisServer(), hydrated: false }, props), this.state) }, children)));
    };
    return PrerenderedControler;
}(React.Component));
export { PrerenderedControler };
;
export var PrerenderedContext = context;
export var PrerenderedControls = context.Consumer;
export var TemplateControl = React.createContext({
    variables: {},
    isServer: true,
    seed: ''
});
