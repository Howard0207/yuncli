(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["EventHub"] = factory();
	else
		root["EventHub"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
	 * 2016-11-21 William
	 * Publish/Subscribe
	 * 用于解决组件间的通信耦合
	 */
var EventHub = (function () {
    // 页面加载完成事件
    var EVENT_RENDER_COMPLETE = 'EVENT_RENDER_COMPLETE';

    var _handlers = {};

    /**
     * 添加订阅事件,返回事件对象
     * @param {string} e 事件
     * @param {function} fn 回调函数
     * @return {Object} event_object 事件类型
     */
    var _on = function (e, fn) {
        if (!(e in _handlers)) {
            _handlers[e] = [];
        }
        var _event_object = {
            fn: fn,
            e: e
        };
        _handlers[e].push(_event_object);
        return _event_object;
    };

    /**
     * 发布消息
     * @param {string} e 事件类型
     */
    var _emit = function (e) {
        if (!_handlers[e]) {return;}
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < _handlers[e].length; i++) {
            (function () {
                var _handlerFn = _handlers[e][i].fn;
                // var _handler = function() {
                _handlerFn.apply(this, args);
                // }.bind(this);
                // setTimeout(_handler, 0);
            })();
        }
    };

    /**
     * 取消订阅
     * @param {Object} event_object
     */
    var _off = function (event_object) {
        if (_handlers[event_object]) {
            for (var i = _handlers[event_object].length - 1; i > -1; i--) {
                if (event_object === _handlers[event_object][i].e) {
                    _handlers[event_object].splice(i, 1);
                }
            }
        }
    };

    var _ready = function (fn) {
        _on(EVENT_RENDER_COMPLETE, fn);
    };

    return {
        PLATFORM_AJAX_STATUS:'PLATFORM_AJAX_STATUS',//Ajax请求状态事件
        PLATFORM_LOADING:'PLATFORM_LOADING',//Ajax请求加载事件

        /**
         * 添加订阅事件,返回事件对象
         * @param {string} e 事件
         * @param {function} fn 回调函数
         * @return {Object} event_object 事件类型
         */
        on: _on,

        /**
         * 发布消息
         * @param {string} e 事件类型
         */
        emit: _emit,

        /**
         * 取消订阅
         * @param {Object} event_object
         */
        off: _off,

        /**
         * 页面完成加载
         */
        ready: _ready
    };
})();

module.exports = EventHub;


/***/ })
/******/ ]);
});