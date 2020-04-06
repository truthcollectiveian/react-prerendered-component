"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
exports.sequenceParser = function (html, markers) {
    var position = Object.keys(markers).map(function (key) { return ({ key: key, value: markers[key] }); });
    var index;
    var _loop_1 = function () {
        var c = html[index];
        position = position.filter(function (position) { return position.value[index] === c; });
        if (position.length === 0) {
            return { value: false };
        }
        if (position.length === 1 && index === (position[0].value.length - 1)) {
            return "break";
        }
    };
    for (index = 0; index < html.length; index++) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
        if (state_1 === "break")
            break;
    }
    var blocks = [];
    var lastIndex = index + 1;
    var isOpen = '';
    var closing = false;
    var isBraceOpen = false;
    for (; index < html.length; index++) {
        var c = html[index];
        if (!isBraceOpen) {
            if (isOpen && c === '\\') {
                isBraceOpen = true;
            }
            if (c === '"' && !isOpen) {
                isOpen = c;
            }
            else if (c === isOpen && isOpen) {
                isOpen = '';
            }
            else if ((c === ' ' || (c === '>' || c === '}')) && !isOpen) {
                blocks.push(html.substring(lastIndex, index));
                lastIndex = index + 1;
            }
            else if (c === '/' && (html[index + 1] === '>' || html[index + 1] === '}') && !isOpen) {
                blocks.push(html.substring(lastIndex, index));
                lastIndex = index + 1;
                closing = true;
            }
        }
        else {
            isBraceOpen = false;
        }
    }
    return {
        key: position[0].key,
        blocks: blocks,
        closing: closing,
    };
};
exports.splitFirst = function (str, needle) {
    var position = str.indexOf(needle);
    return position >= 0
        ? [str.substr(0, position), str.substr(position + 1)]
        : [str];
};
exports.nextIndexOf = function (str, needles, index) {
    for (var i = index; i < str.length; ++i) {
        for (var j = 0; j < needles.length; ++j) {
            if (str[i] == needles[j]) {
                return i;
            }
        }
    }
    return -1;
};
exports.toTemplateVariables = function (variables) {
    if (variables.length === 1) {
        return {};
    }
    var result = {};
    variables.forEach(function (str, index) {
        if (index > 0) {
            var _a = exports.splitFirst(str, '='), key = _a[0], value = _a[1];
            result[key] = value ? value.substring(1, value.length - 1) : true;
        }
    });
    return result;
};
var lineVariables = function (variables) {
    var line = createLine();
    line.stack.push('*');
    line.cache['*'] = {
        variables: variables,
        buffer: '',
    };
    return line;
};
exports.restore = function (variables, chunk, cache) {
    return exports.process(chunk, lineVariables(variables), cache);
};
exports.process = function (chunk, line, cache) {
    var data = line.tail + chunk;
    var result = '';
    var tracking = line.scopes;
    var indexOpen = 0;
    var indexClose = 0;
    var braceIndexOpen = 0;
    var braceIndexClose = 0;
    var isOpen = true;
    var isBraceOpen = true;
    var tagPhase = 0;
    var bracePhase = 0;
    var push;
    var templatePush = '';
    function parseTag(tag) {
        indexOpen = indexClose = 0;
        isOpen = true;
        var stind = tag.indexOf('x-cached');
        if (stind <= 0) {
            return;
        }
        else if (stind === 1 || stind === 2) {
            var prefix = "x-cached" + (cache.seed || '');
            var cmd = exports.sequenceParser(tag, {
                isStoreOpen: "<" + prefix + "-store-",
                isStoreClose: "</" + prefix + "-store-",
                isRestoreOpen: "<" + prefix + "-restore-",
                isRestoreClose: "</" + prefix + "-restore-",
                isNotCacheOpen: "<" + prefix + "-do-not-cache",
                isNotCacheClose: "</" + prefix + "-do-not-cache",
                isPlaceholderOpen: "{" + prefix + "-placeholder-",
            });
            if (!cmd || !cmd.key) {
                // nope
            }
            else {
                push = "";
                switch (cmd.key) {
                    /// RESTORE
                    case 'isRestoreOpen': {
                        if (cmd.closing) {
                            var str = cache.get(+cmd.blocks[0]) || 'broken-cache';
                            push = exports.restore(exports.toTemplateVariables(cmd.blocks), String(str), cache);
                        }
                        else {
                            line.cache[+cmd.blocks[0]] = {
                                buffer: "",
                                variables: exports.toTemplateVariables(cmd.blocks),
                                noCache: false
                            };
                        }
                        break;
                    }
                    case 'isRestoreClose': {
                        var str = cache.get(+cmd.blocks[0]) || 'broken-cache';
                        push = exports.restore(line.cache[+cmd.blocks[0]].variables, String(str), cache);
                        break;
                    }
                    /// CACHE
                    case 'isStoreOpen': {
                        var key = +cmd.blocks[0];
                        line.cache[key] = {
                            buffer: "",
                            variables: exports.toTemplateVariables(cmd.blocks),
                            noCache: false
                        };
                        line.stack.push(key);
                        break;
                    }
                    case 'isStoreClose': {
                        var key = +cmd.blocks[0];
                        // store cache only if allowed
                        if (!line.doNoCache && !line.cache[key].noCache) {
                            cache.set(key, line.cache[key].buffer);
                        }
                        delete line.cache[key];
                        line.stack.pop();
                        break;
                    }
                    /// PLACEHOLDER
                    case 'isPlaceholderOpen': {
                        if (cmd.closing) {
                            var key = cmd.blocks[0];
                            push = line.cache[line.stack[line.stack.length - 1]].variables[key];
                            templatePush = tag;
                        }
                        break;
                    }
                    case 'isPlaceholderClose': {
                        var key = cmd.blocks[0];
                        push = line.cache[line.stack[line.stack.length - 1]].variables[key];
                        templatePush = tag;
                        break;
                    }
                    /// NO CACHE
                    case 'isNotCacheOpen': {
                        Object
                            .keys(line.cache)
                            .forEach(function (key) { return line.cache[key].noCache = true; });
                        line.doNoCache++;
                        break;
                    }
                    case 'isNotCacheClose': {
                        line.doNoCache--;
                        break;
                    }
                }
            }
        }
        else {
            templatePush = tag;
            push = tag[0] + exports.process(tag.substr(1, tag.length - 2), lineVariables(line.cache[line.stack[line.stack.length - 1]].variables), cache) + tag[tag.length - 1];
        }
    }
    for (var index = 0; index < data.length; index++) {
        var c = data[index];
        push = c;
        templatePush = '';
        if (c === '<') {
            tagPhase = 1;
            indexOpen = index;
            indexClose = 0;
            isOpen = false;
        }
        else if (c === '>') {
            tagPhase = 0;
            indexClose = index;
            push = data.substring(indexOpen, indexClose + 1);
            parseTag(push);
            isOpen = true;
        }
        else if (c === '{') {
            bracePhase = 1;
            braceIndexOpen = index;
            braceIndexClose = 0;
            isBraceOpen = false;
        }
        else if (c === '}') {
            bracePhase = 0;
            braceIndexClose = index;
            push = data.substring(braceIndexOpen, braceIndexClose + 1);
            parseTag(push);
            isBraceOpen = true;
        }
        else {
            var nextIndex = (tagPhase === 1
                ? data.indexOf('>', index)
                : (bracePhase === 1
                    ? data.indexOf('}', index)
                    : exports.nextIndexOf(data, ['<', '{'], index)));
            if (nextIndex > index) {
                push = data.substring(index, nextIndex);
                index = nextIndex - 1;
            }
        }
        if (isOpen && isBraceOpen) {
            result += push;
            Object
                .keys(line.cache)
                .forEach(function (key) {
                line.cache[key].buffer += templatePush || push;
            });
        }
    }
    if (!(isOpen && isBraceOpen)) {
        line.tail = data.substring(indexOpen, data.length);
    }
    line.scopes = tracking;
    return result;
};
var createLine = function () { return ({
    cache: {},
    scopes: [],
    stack: [],
    tail: '',
    doNoCache: 0,
}); };
exports.cacheRenderedToString = function (str, cache) { return (str.indexOf('x-cached') > 0
    ? exports.process(str, createLine(), cache)
    : str); };
exports.createCacheStream = function (cache) {
    var line = createLine();
    return new stream_1.Transform({
        // transform() is called with each chunk of data
        transform: function (chunk, _, callback) {
            callback(undefined, Buffer.from(exports.process(chunk.toString('utf-8'), line, cache), 'utf-8'));
        },
        flush: function (cb) {
            cb(undefined, line.tail);
        }
    });
};
