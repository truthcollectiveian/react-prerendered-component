import { __assign, __extends } from "tslib";
import * as React from 'react';
import { UIDFork, UIDConsumer } from "react-uid";
import { PrerenderedControls } from "./PrerenderedControl";
var getInnerHTML = function (id) {
    var element = typeof document !== 'undefined' && document.getElementById(id);
    return element ? element.innerHTML : null;
};
var PrerenderedWrapper = /** @class */ (function (_super) {
    __extends(PrerenderedWrapper, _super);
    function PrerenderedWrapper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            html: getInnerHTML(_this.props.id)
        };
        return _this;
    }
    PrerenderedWrapper.prototype.componentDidMount = function () {
        var _a = this.props, live = _a.live, dehydrate = _a.dehydrate, id = _a.id;
        if (!live) {
            var element = document.getElementById(id);
            if (element) {
                dehydrate(element);
            }
        }
    };
    PrerenderedWrapper.prototype.render = function () {
        var _a = this.props, children = _a.children, live = _a.live, strict = _a.strict, id = _a.id, className = _a.className, style = _a.style;
        var html = this.state.html;
        var props = { id: id, className: className, style: style, 'data-prerendered-border': true };
        var WrapperTag = "" + (this.props.wrapperTag || 'div');
        return (live || (!html && !strict))
            ? React.createElement(WrapperTag, __assign({}, props), children)
            : React.createElement(WrapperTag, __assign({}, props, { dangerouslySetInnerHTML: { __html: html || '' } }));
    };
    return PrerenderedWrapper;
}(React.Component));
var isBooleanFlag = function (flag) { return (!flag || typeof flag === 'boolean' || !flag.then); };
var PrerenderedComponent = /** @class */ (function (_super) {
    __extends(PrerenderedComponent, _super);
    function PrerenderedComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            state: null,
            live: false,
        };
        _this.awaitingFor = undefined;
        _this.dehydrate = function (el) {
            if (_this.props.restore) {
                var store = el.querySelector("script[type=\"text/store-" + el.id + "\"]");
                Promise
                    .resolve(_this.props.restore(el, JSON.parse((store ? store.textContent : '') || '{}')))
                    .then(function (state) { return _this.setState({ live: true, state: state }); });
            }
        };
        return _this;
    }
    PrerenderedComponent.getDerivedStateFromProps = function (props, state) {
        if (isBooleanFlag(props.live) && props.live !== state.live) {
            return {
                live: props.live
            };
        }
        return null;
    };
    PrerenderedComponent.prototype.componentDidMount = function () {
        this.checkLive();
    };
    PrerenderedComponent.prototype.componentDidUpdate = function () {
        this.checkLive();
    };
    PrerenderedComponent.prototype.checkLive = function () {
        if (!isBooleanFlag(this.props.live)) {
            this.awaitForLive(this.props.live);
        }
    };
    PrerenderedComponent.prototype.awaitForLive = function (live) {
        var _this = this;
        if (this.awaitingFor !== live) {
            this.awaitingFor = live;
            Promise
                .resolve(live)
                .then(function (value) { return _this.props.live === live && _this.setState({ live: !!value }); });
        }
    };
    PrerenderedComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, style = _a.style, children = _a.children, store = _a.store, wrapperTag = _a.wrapperTag, _b = _a.strict, strict = _b === void 0 ? false : _b;
        var live = this.state.live;
        return (React.createElement(PrerenderedControls, null, function (_a) {
            var isServer = _a.isServer;
            return (React.createElement(UIDFork, null,
                React.createElement(UIDConsumer, null, function (uid) { return (React.createElement(PrerenderedWrapper, { id: "prc-" + uid, className: className, style: style, live: !!(live || isServer), strict: strict, dehydrate: _this.dehydrate, wrapperTag: wrapperTag },
                    store &&
                        React.createElement("script", { type: "text/store-prc-" + uid, dangerouslySetInnerHTML: { __html: JSON.stringify(store) } }),
                    children)); })));
        }));
    };
    return PrerenderedComponent;
}(React.Component));
export { PrerenderedComponent };
