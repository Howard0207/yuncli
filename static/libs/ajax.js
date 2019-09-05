(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Ajax"] = factory();
	else
		root["Ajax"] = factory();
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
 * 2016-12-01 William
 * 通讯模块
 * 用于解决前端与后端的通信
 */
var Ajax = (function () {
    var glob_config = {
    	delay: 2000,
        method: 'get',
        url: '',
        data: '',
        async: true,
        cache: false,
        processData: true,
        contentType: 'application/x-www-form-urlencoded',//application/x-www-form-urlencoded
        showLoading: true,
        beforeSend: null,
        success: function () {},
        error: function () {}
    };
    var _beforeSendReq = {};
    var reqArr = 0;
    var loadSetTimeout;
    var _ajaxSetup = function (conf) {
        for (var key in conf) {
            glob_config[key] = conf[key];
        }
    };

    if(typeof WConfig != "undefined" && typeof WConfig.AjaxSetup !="undefined"){
        _ajaxSetup(WConfig.AjaxSetup);
    }

    // 请求，参数为一个字面直接量对象
    var _ajax = function (conf) {
        // 定义XHR对象
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var config = {};
        for (var key in glob_config) {
            config[key] = glob_config[key];
        }
        for (var key in conf) {
            config[key] = conf[key];
        }
        config.showLoading && reqArr++;
        if (loadSetTimeout) {
            clearTimeout(loadSetTimeout);
        }
        loadSetTimeout = setTimeout(function () {
            if (config.showLoading && reqArr > 0) {
                if(typeof EventHub != "undefined"){
                    EventHub.emit(EventHub.PLATFORM_LOADING,'show');
                }
            }
        }, config.delay);


        // 通过使用JS随机字符串解决IE浏览器第二次默认获取缓存的问题
        if (!config.cache) {
            config.url += config.url.indexOf('?') == -1 ? '?' + 'rand=' + Math.random() : '&' + 'rand=' + Math.random();
        }
        if (config.contentType === 'application/json') {
            config.data = JSON.stringify(config.data);
        } else {
            if (config.processData) {
                config.data = _translateParams(config.data); // 通过_translateParams()将名值对转换成字符串
            }
        }
        config.method = config.method.toLowerCase();
        // 若是GET请求，则将数据加到url后面
        if (config.method === 'get') {
            if(config.data != '' && config.data != undefined){
                config.url += config.url.indexOf('?') == -1 ? '?' + config.data : '&' + config.data;
            }
        }
        var _callback = function () {
            if(typeof EventHub != "undefined"){
                EventHub.emit(EventHub.PLATFORM_AJAX_STATUS,xhr.status);
            }
            if (xhr.status == 401) { 
                return;
            }
            var resText = xhr.responseText;
            var jsonObj='';
            if(resText != undefined && resText !=''){
                if (typeof (JSON) === 'undefined') {
                    jsonObj = eval('(' + resText + ')');
                } else {
                    jsonObj = JSON.parse(resText);
                }
            }
            if (xhr.status == 200) { // 判断http的交互是否成功，200表示成功
                config.success(jsonObj); // 回调传递参数
            } else {
                config.error(xhr.status, xhr.statusText, jsonObj);
            }

            if (config.statusCode) {
                for (var key in config.statusCode) {
                    if (xhr.status == key) {
                        config.statusCode[key](xhr.status, xhr.statusText, jsonObj, xhr);
                    }
                }
            }
            config.showLoading && reqArr--;
            if (config.showLoading) {
                if (reqArr <= 0) {
                    if(typeof EventHub != "undefined"){
                        EventHub.emit(EventHub.PLATFORM_LOADING,'hide');
                    }
                }
            }
        };
        // 在使用XHR对象时，必须先调用open()方法，
        // 它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
        xhr.open(config.method, config.url, config.async);
        // 新增 beforeSend() 方法，发送请求前可修改 XMLHttpRequest 对象的函数，如添加自定义 HTTP 头
        _beforeSendReq = {
            setRequestHeader: function (e, t) {
                xhr.setRequestHeader(e, t);
            }
        };
        if (config.beforeSend && config.beforeSend(_beforeSendReq) == false) {
            _callback();
            return;
        }

        if (config.method === 'post') {
            // post方式需要自己设置http的请求头，来模仿表单提交。
            // 放在open方法之后，send方法之前。
            if (config.contentType !== false) {
                xhr.setRequestHeader('Content-Type', config.contentType);
            }
            xhr.send(config.data); // post方式将数据放在send()方法里
        } else {
            xhr.send(null); // get方式则填null
        }
        // console.log(config.async)
        if (config.async === true) { // true表示异步，false表示同步
            // 使用异步调用的时候，需要触发readystatechange 事件
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) { // 判断对象的状态是否交互完成
                    _callback(); // 回调
                }
            };
        } else { // 同步
            _callback();// 回调
        }
    };
    // 名值对转换为字符串
    var _translateParams = function (data) {
        var arr = [];
        for (var i in data) {
            // 特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
        return arr.join('&');
    };

    return {
        ajax: function (config) {
            _ajax(config);
        },
        get: function (config) {
            config.method = 'get';
            _ajax(config);
        },
        post: function (config) {
            config.method = 'post';
            _ajax(config);
        },
        ajaxSetup: function (config) {
            _ajaxSetup(config);
        }
    };
})();

module.exports = Ajax;


/***/ })
/******/ ]);
});