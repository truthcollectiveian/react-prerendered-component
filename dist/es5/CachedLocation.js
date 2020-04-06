"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_uid_1 = require("react-uid");
var PrerenderedControl_1 = require("./PrerenderedControl");
var Uncached = function (_a) {
    var cacheId = _a.cacheId, variables = _a.variables, seed = _a.seed, children = _a.children;
    return (React.createElement("x-cached" + seed + "-store-" + cacheId, variables, children));
};
exports.ServedCachedLocation = function (_a) {
    var cacheKey = _a.cacheKey, control = _a.control, refresh = _a.refresh, _b = _a.ttl, ttl = _b === void 0 ? Infinity : _b, children = _a.children, variables = _a.variables;
    var cached = control.cache.get(cacheKey);
    var seed = control.seed;
    if (cached && !refresh) {
        return React.createElement("x-cached" + control.seed + "-restore-" + control.store(cacheKey, cached), variables);
    }
    else {
        return React.createElement(Uncached, { cacheId: control.assign(cacheKey, ttl), variables: variables, seed: seed }, children);
    }
};
var ClientCachedLocation = /** @class */ (function (_super) {
    tslib_1.__extends(ClientCachedLocation, _super);
    function ClientCachedLocation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: _this.props.control.cache.get(_this.props.cacheKey),
            hydrated: false
        };
        _this.onSetRef = function (ref) {
            if (ref) {
                var _a = _this.props, control = _a.control, cacheKey = _a.cacheKey, _b = _a.ttl, ttl = _b === void 0 ? 0 : _b;
                var value = ref.innerHTML;
                control.cache.set(cacheKey, value, ttl);
                _this.setState({
                    value: value,
                    hydrated: true
                });
            }
        };
        return _this;
    }
    ClientCachedLocation.prototype.componentDidMount = function () {
        if (this.props.rehydrate) {
            // this should/could be a low priority update
            this.setState({
                hydrated: true,
            });
        }
    };
    ClientCachedLocation.prototype.render = function () {
        var _a = this.state, hydrated = _a.hydrated, value = _a.value;
        var _b = this.props, className = _b.className, children = _b.children, _c = _b.as, Tag = _c === void 0 ? 'div' : _c, variables = _b.variables;
        if (!hydrated && value) {
            return React.createElement(Tag, { dangerouslySetInnerHTML: { __html: value } });
        }
        if (variables) {
            return (React.createElement(Tag, { className: className },
                React.createElement(PrerenderedControl_1.TemplateControl.Consumer, null, function (oldState) {
                    return React.createElement(PrerenderedControl_1.TemplateControl.Provider, { value: tslib_1.__assign({ variables: tslib_1.__assign(tslib_1.__assign({}, oldState.variables), variables) }, oldState) }, children);
                })));
        }
        return (React.createElement(Tag, { className: className, ref: this.onSetRef }, children));
    };
    return ClientCachedLocation;
}(React.Component));
exports.ClientCachedLocation = ClientCachedLocation;
exports.CachedLocation = function (_a) {
    var cacheKey = _a.cacheKey, noCache = _a.noCache, _b = _a.ttl, ttl = _b === void 0 ? Infinity : _b, refresh = _a.refresh, children = _a.children, variables = _a.variables, clientCache = _a.clientCache, className = _a.className, as = _a.as, rehydrate = _a.rehydrate;
    return (React.createElement(react_uid_1.UIDFork, null,
        React.createElement(PrerenderedControl_1.PrerenderedControls, null, function (_a) {
            var control = _a.control, isServer = _a.isServer;
            if (!isServer && !clientCache || noCache || !control || !control.cache) {
                return children;
            }
            if (isServer) {
                return (React.createElement(exports.ServedCachedLocation, { control: control, cacheKey: cacheKey, refresh: refresh, ttl: ttl, variables: variables }, children));
            }
            if (clientCache) {
                return (React.createElement(ClientCachedLocation, { control: control, cacheKey: cacheKey, refresh: refresh, className: className, ttl: ttl, as: as, rehydrate: rehydrate, variables: variables }, children));
            }
            return children;
        })));
};
