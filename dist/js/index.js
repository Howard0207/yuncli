/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./index.tsx","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.tsx":
/*!*****************!*\
  !*** ./app.tsx ***!
  \*****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ \"./store/index.tsx\");\n/* harmony import */ var _src_page_main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src-page/main */ \"./src-page/main/index.tsx\");\nvar __extends = undefined && undefined.__extends || function () {\n  var _extendStatics = function extendStatics(d, b) {\n    _extendStatics = Object.setPrototypeOf || {\n      __proto__: []\n    } instanceof Array && function (d, b) {\n      d.__proto__ = b;\n    } || function (d, b) {\n      for (var p in b) {\n        if (b.hasOwnProperty(p)) d[p] = b[p];\n      }\n    };\n\n    return _extendStatics(d, b);\n  };\n\n  return function (d, b) {\n    _extendStatics(d, b);\n\n    function __() {\n      this.constructor = d;\n    }\n\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n  };\n}();\n\n\n\n\n\n\n\nvar App =\n/** @class */\nfunction (_super) {\n  __extends(App, _super);\n\n  function App() {\n    return _super !== null && _super.apply(this, arguments) || this;\n  }\n\n  App.prototype.render = function () {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"Provider\"], {\n      store: _store__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"BrowserRouter\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"nihao \"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Switch\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n      path: '/',\n      exact: true,\n      component: _src_page_main__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n    }))));\n  };\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./app.tsx?");

/***/ }),

/***/ "./index.tsx":
/*!*******************!*\
  !*** ./index.tsx ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./app.tsx\");\n\n\n\nObject(react_dom__WEBPACK_IMPORTED_MODULE_1__[\"render\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_app__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null), document.getElementById('app'));\n\n//# sourceURL=webpack:///./index.tsx?");

/***/ }),

/***/ "./src-page/main/index.tsx":
/*!*********************************!*\
  !*** ./src-page/main/index.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Main; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction Main() {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"main\");\n}\n\n//# sourceURL=webpack:///./src-page/main/index.tsx?");

/***/ }),

/***/ "./src-page/main/store/actionCreators.tsx":
/*!************************************************!*\
  !*** ./src-page/main/store/actionCreators.tsx ***!
  \************************************************/
/*! exports provided: getDetail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDetail\", function() { return getDetail; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src-page/main/store/constants.tsx\");\n\nvar getDetail = function getDetail(id) {\n  return function (dispatch) {\n    var result = {\n      title: 'a',\n      content: 'b'\n    };\n    dispatch(changeDetail(result));\n  };\n};\n\nvar changeDetail = function changeDetail(result) {\n  return {\n    type: _constants__WEBPACK_IMPORTED_MODULE_0__[\"CHANGE_DETAIL\"],\n    title: result.title,\n    content: result.content\n  };\n};\n\n//# sourceURL=webpack:///./src-page/main/store/actionCreators.tsx?");

/***/ }),

/***/ "./src-page/main/store/constants.tsx":
/*!*******************************************!*\
  !*** ./src-page/main/store/constants.tsx ***!
  \*******************************************/
/*! exports provided: CHANGE_DETAIL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CHANGE_DETAIL\", function() { return CHANGE_DETAIL; });\nvar CHANGE_DETAIL = 'detail/CHANGE_DETAIL';\n\n//# sourceURL=webpack:///./src-page/main/store/constants.tsx?");

/***/ }),

/***/ "./src-page/main/store/index.tsx":
/*!***************************************!*\
  !*** ./src-page/main/store/index.tsx ***!
  \***************************************/
/*! exports provided: reducer, constants, actionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducer */ \"./src-page/main/store/reducer.tsx\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"reducer\", function() { return _reducer__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _actionCreators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionCreators */ \"./src-page/main/store/actionCreators.tsx\");\n/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, \"actionCreators\", function() { return _actionCreators__WEBPACK_IMPORTED_MODULE_1__; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ \"./src-page/main/store/constants.tsx\");\n/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, \"constants\", function() { return _constants__WEBPACK_IMPORTED_MODULE_2__; });\n\n\n\n\n\n//# sourceURL=webpack:///./src-page/main/store/index.tsx?");

/***/ }),

/***/ "./src-page/main/store/reducer.tsx":
/*!*****************************************!*\
  !*** ./src-page/main/store/reducer.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ \"./node_modules/immutable/dist/immutable.es.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src-page/main/store/constants.tsx\");\n\n\nvar defaultState = Object(immutable__WEBPACK_IMPORTED_MODULE_0__[\"fromJS\"])({\n  title: '',\n  content: ''\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (state, action) {\n  if (state === void 0) {\n    state = defaultState;\n  }\n\n  switch (action.type) {\n    case _constants__WEBPACK_IMPORTED_MODULE_1__[\"CHANGE_DETAIL\"]:\n      return state.merge({\n        title: action.title,\n        content: action.content\n      });\n\n    default:\n      return state;\n  }\n});\n\n//# sourceURL=webpack:///./src-page/main/store/reducer.tsx?");

/***/ }),

/***/ "./store/index.tsx":
/*!*************************!*\
  !*** ./store/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/es/index.js\");\n/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducer */ \"./store/reducer.tsx\");\n\n\n\n/** ts-ignore */\n\nvar composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || redux__WEBPACK_IMPORTED_MODULE_0__[\"compose\"];\nvar store = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], composeEnhancers(Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"])(redux_thunk__WEBPACK_IMPORTED_MODULE_1__[\"default\"])));\n/* harmony default export */ __webpack_exports__[\"default\"] = (store);\n\n//# sourceURL=webpack:///./store/index.tsx?");

/***/ }),

/***/ "./store/reducer.tsx":
/*!***************************!*\
  !*** ./store/reducer.tsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux_immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-immutable */ \"./node_modules/redux-immutable/dist/index.js\");\n/* harmony import */ var redux_immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_immutable__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_page_main_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src-page/main/store */ \"./src-page/main/store/index.tsx\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(redux_immutable__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  main: _src_page_main_store__WEBPACK_IMPORTED_MODULE_1__[\"reducer\"]\n}));\n\n//# sourceURL=webpack:///./store/reducer.tsx?");

/***/ })

/******/ });