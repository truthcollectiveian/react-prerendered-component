"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
// @ts-ignore
var nanoid = require("nanoid");
var react_uid_1 = require("react-uid");
var utils_1 = require("./utils");
exports.cacheControler = function (cache) {
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
    isServer: utils_1.isThisServer(),
    hydrated: false,
});
var PrerenderedControler = /** @class */ (function (_super) {
    tslib_1.__extends(PrerenderedControler, _super);
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
        var _a = this.props, children = _a.children, props = tslib_1.__rest(_a, ["children"]);
        return (React.createElement(react_uid_1.UIDReset, null,
            React.createElement(context.Provider, { value: tslib_1.__assign(tslib_1.__assign({ isServer: utils_1.isThisServer(), hydrated: false }, props), this.state) }, children)));
    };
    return PrerenderedControler;
}(React.Component));
exports.PrerenderedControler = PrerenderedControler;
;
exports.PrerenderedContext = context;
exports.PrerenderedControls = context.Consumer;
exports.TemplateControl = React.createContext({
    variables: {},
    isServer: true,
    seed: ''
});
