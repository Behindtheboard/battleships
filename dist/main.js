/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `/* --------------------- NORMALIZE --------------------- */\nhtml {\n  line-height: 1.15; /* 1 */\n}\n\nbody {\n  margin: 0;\n}\n\nmain {\n  display: block;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\na {\n  background-color: transparent;\n}\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\nimg {\n  border-style: none;\n}\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\nbutton,\nselect {\n  text-transform: none;\n}\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\nprogress {\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n[type=\"search\"] {\n  outline-offset: -2px; /* 2 */\n}\n\ndetails {\n  display: block;\n}\n\nsummary {\n  display: list-item;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none;\n}\n\nbutton {\n  border: none;\n}\n\nul {\n  list-style: none;\n}\n\n/* --------------------- CUSTOM --------------------- */\n\n#container,\n#boards-container {\n  display: flex;\n}\n\n#container {\n  flex-direction: column;\n  align-items: center;\n}\n\n#left-box,\n#right-box {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr);\n  min-width: 450px;\n  min-height: 450px;\n  width: 30vw;\n  height: 30vw;\n  border: solid 2px grey;\n  border-radius: 1rem;\n  margin: 40px;\n}\n\n#left-box div,\n#right-box div {\n  display: grid;\n  justify-content: center;\n  align-items: center;\n  border: 1px solid lightgrey;\n  width: 100%;\n  height: 100%;\n}\n\n#left-row,\n#right-row {\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: 1fr;\n  grid-row: 1;\n  grid-column: 2 / span 10;\n}\n\n#left-col,\n#right-col {\n  grid-template-rows: repeat(10, 1fr);\n  grid-template-columns: 1fr;\n  grid-row: 2 / span 10;\n  grid-column: 1;\n}\n\n#left-board,\n#right-board {\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n  grid-row: 2 / span 10;\n  grid-column: 2 / span 10;\n}\n\n/* Dialog */\n\n#button-container {\n  display: flex;\n  justify-content: space-evenly;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleships/./src/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://battleships/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleships/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleships/./src/styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleships/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleships/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleships/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleships/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleships/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleships/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/game */ \"./src/modules/game.js\");\n\n\n\n(0,_modules_game__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\n\n\n//# sourceURL=webpack://battleships/./src/index.js?");

/***/ }),

/***/ "./src/modules/computerLogic.js":
/*!**************************************!*\
  !*** ./src/modules/computerLogic.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ computerLogic)\n/* harmony export */ });\nconst hits = [];\nconst hitShips = [];\n\nfunction computerLogic(opponentBoard) {\n  const oppBoard = opponentBoard.board;\n  function checkMissed(coordinate) {\n    const [row, col] = coordinate.split(\"\").map((n) => Number(n));\n    // console.log(\"checkmissed \" + oppBoard[row][col]);\n    // console.log(\"checkmissed \" + coordinate);\n    if (oppBoard[row][col] === \"missed\") {\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  function addIfHit(coordinate) {\n    const [row, col] = coordinate.split(\"\").map((n) => Number(n));\n    const coord = oppBoard[row][col];\n    // console.log(\"addifhit \" + oppBoard[row][col]);\n    // console.log(\"addifhit \" + coordinate);\n    if (coord !== \"missed\" && coord !== \"hit\" && coord !== null) {\n      hits.push(coordinate);\n      hitShips.push(coord);\n    }\n  }\n\n  function generateCoordinate() {\n    let i = 0;\n    while (i < 1) {\n      const row = Math.floor(Math.random() * 10).toString();\n      const col = Math.floor(Math.random() * 10).toString();\n      const coord = row + col;\n      if (!checkMissed(coord) && !hits.includes(coord)) {\n        addIfHit(coord);\n        return coord;\n      }\n    }\n  }\n\n  function checkIsSunk(coordinate) {\n    const [row, col] = coordinate.split(\"\").map((n) => Number(n));\n    const lastHitShip = hitShips[hitShips.length - 1];\n    // console.log(lastHitShip.isSunk());\n    lastHitShip.isSunk() ? true : false;\n  }\n\n  function winCheat() {\n    for (let rindex = 0; rindex < oppBoard.length; rindex++) {\n      const row = oppBoard[rindex];\n      for (let cindex = 0; cindex < row.length; cindex++) {\n        const col = row[cindex];\n        if (\n          col !== \"missed\" &&\n          col !== \"hit\" &&\n          col !== null &&\n          !hits.includes(`${rindex}${cindex}`)\n        ) {\n          hits.push(`${rindex}${cindex}`);\n          const nc = `${rindex}${cindex}`;\n          return nc;\n        }\n      }\n    }\n  }\n\n  return winCheat();\n\n  if (hits.length === 0) {\n    return generateCoordinate();\n  }\n\n  const hitsArrLength = hits.length - 1;\n  const lastHit = hits[hitsArrLength];\n\n  if (checkIsSunk(lastHit)) {\n    return generateCoordinate();\n  }\n\n  return generateCoordinate();\n\n  // const [row, col] = lastHit.split(\"\").map((n) => Number(n));\n\n  // let j;\n  // let minusLength;\n  // let newRow = row;\n  // let newCol = col;\n\n  // if (row + 1 > 0 && row + 1 < 10 && !checkMissed([row + 1] + [col])) {\n  //   newRow = row + 1;\n  // }\n  // if (row - 1 > 0 && row - 1 < 10 && !checkMissed([row - 1] + [col])) {\n  //   newRow = row - 1;\n  // }\n  // if (col + 1 > 0 && col + 1 < 10 && !checkMissed([row] + [col + 1])) {\n  //   newCol = col + 1;\n  // }\n  // if (col - 1 > 0 && col - 1 < 10 && !checkMissed([row] + [col - 1])) {\n  //   newCol = col - 1;\n  // }\n\n  // if (!hits.includes([newRow] + [newCol])) {\n  //   addIfHit([newRow] + [newCol]);\n  //   return [newRow] + [newCol];\n  // }\n}\n\n\n//# sourceURL=webpack://battleships/./src/modules/computerLogic.js?");

/***/ }),

/***/ "./src/modules/game.js":
/*!*****************************!*\
  !*** ./src/modules/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _objects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects */ \"./src/modules/objects.js\");\n/* harmony import */ var _computerLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./computerLogic */ \"./src/modules/computerLogic.js\");\n/* harmony import */ var _renderUI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderUI */ \"./src/modules/renderUI.js\");\n\n\n\n\n(0,_renderUI__WEBPACK_IMPORTED_MODULE_2__.renderUI)();\n\nlet restart = 0;\nlet person;\nlet computer;\n\nfunction win(wonPlayer) {\n  (0,_renderUI__WEBPACK_IMPORTED_MODULE_2__.renderWin)(wonPlayer);\n  const dialog = document.getElementById(\"modal\");\n  document.getElementById(\"button-container\").addEventListener(\"click\", (e) => {\n    if (e.target.id === \"left-btn\") {\n      e.preventDefault();\n      (0,_renderUI__WEBPACK_IMPORTED_MODULE_2__.replaceRightBoard)();\n      restart++;\n      dialog.close();\n      dialog.remove();\n      return init();\n    }\n  });\n}\n\nfunction initComputerGame() {\n  if (restart === 0) {\n    person = new _objects__WEBPACK_IMPORTED_MODULE_0__.Player(\"person\", true);\n    computer = new _objects__WEBPACK_IMPORTED_MODULE_0__.Player(\"computer\", false);\n  } else {\n    person.reset();\n    computer.reset();\n  }\n\n  person.placeCarrier(\"00\", false);\n  person.placeBattleship(\"22\", true);\n  person.placeDestroyer(\"67\", false);\n  person.placeSubmarine(\"46\", false);\n  person.placePatrol(\"96\", false);\n\n  computer.placeCarrier(\"01\", false);\n  computer.placeBattleship(\"32\", true);\n  computer.placeDestroyer(\"63\", false);\n  computer.placeSubmarine(\"36\", false);\n  computer.placePatrol(\"86\", false);\n\n  (0,_renderUI__WEBPACK_IMPORTED_MODULE_2__.renderBoard)(person);\n  (0,_renderUI__WEBPACK_IMPORTED_MODULE_2__.renderBoard)(computer);\n\n  document.getElementById('right-board').addEventListener(\"click\", (e) => {\n    if (person.turn) {\n      const coordinate = e.target.id;\n      computer.board.receiveAttack(coordinate);\n      (0,_renderUI__WEBPACK_IMPORTED_MODULE_2__.renderBoard)(computer);\n      if (computer.board.fleetSunk()) {\n        return win(person);\n      }\n      computer.turn = true;\n      person.turn = false;\n    }\n    setTimeout(() => {\n      if (computer.turn) {\n        const coordinate = (0,_computerLogic__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(person.board);\n        // person.board.receiveAttack(coordinate);\n        // renderBoard(person);\n        autoWin();\n\n        (0,_renderUI__WEBPACK_IMPORTED_MODULE_2__.renderBoard)(person);\n\n        if (person.board.fleetSunk()) {\n          return win(computer);\n        }\n        person.turn = true;\n        computer.turn = false;\n      }\n    }, 200);\n  });\n}\n\nfunction init() {\n  function renderStartHandler() {\n    const dialog = document.getElementById(\"modal\");\n\n    document\n      .getElementById(\"button-container\")\n      .addEventListener(\"click\", (e) => {\n        if (e.target.id === \"left-btn\") {\n          e.preventDefault();\n          dialog.close();\n          dialog.remove();\n          document.getElementById(\"modal-overlay\").remove();\n          return initComputerGame();\n        }\n\n        if (e.target.id === \"right-btn\") {\n          e.preventDefault();\n          return console.log(\"computer game only available\");\n        }\n      });\n  }\n\n  (0,_renderUI__WEBPACK_IMPORTED_MODULE_2__.renderStart)(renderStartHandler);\n}\n\nfunction autoWin() {\n  const hits = [];\n  person.board.board.forEach((row, rindex) => {\n    row.forEach((col, cindex) => {\n      if (\n        col !== \"missed\" &&\n        col !== \"hit\" &&\n        col !== null &&\n        !hits.includes(`${rindex}${cindex}`)\n      ) {\n        hits.push(`${rindex}${cindex}`);\n        const nc = `${rindex}${cindex}`;\n        person.board.receiveAttack(`${rindex}${cindex}`);\n      }\n    });\n  });\n}\n\n\n//# sourceURL=webpack://battleships/./src/modules/game.js?");

/***/ }),

/***/ "./src/modules/objects.js":
/*!********************************!*\
  !*** ./src/modules/objects.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard),\n/* harmony export */   Player: () => (/* binding */ Player),\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(name, isVertical) {\n    this.name = name;\n    this.length = this.calcLength();\n    this.isVertical = isVertical;\n    this.damage = 0;\n  }\n\n  calcLength() {\n    switch (this.name) {\n      case \"carrier\":\n        return 5;\n      case \"battleship\":\n        return 4;\n      case \"destroyer\":\n        return 3;\n      case \"submarine\":\n        return 3;\n      case \"patrol\":\n        return 2;\n    }\n  }\n\n  isSunk() {\n    return this.length === this.damage;\n  }\n\n  hit() {\n    if (!this.isSunk()) {\n      this.damage++;\n      this.isSunk();\n    }\n  }\n}\n\nclass Gameboard {\n  constructor() {\n    this.board = this.createBoard(10);\n    this.fleet = [];\n  }\n\n  createBoard(n) {\n    return [...Array(n)].map((row) => Array(n).fill(null));\n  }\n\n  placeShip(coordinate, ship) {\n    const [row, col] = coordinate.split(\"\").map((n) => Number(n));\n    const length = ship.length;\n\n    let ob;\n    ship.isVertical ? (ob = row + length) : (ob = col + length);\n\n    if (ob > 10) {\n      throw new Error(\"out of bounds\");\n    }\n\n    let r = row;\n    let c = col;\n    for (let i = 0; i < length; i++) {\n      ship.isVertical ? (r = row + i) : (c = col + i);\n      if (this.board[r][c] !== null) {\n        throw new Error(\"ship already there\");\n      }\n    }\n\n    for (let i = 0; i < length; i++) {\n      ship.isVertical ? (r = row + i) : (c = col + i);\n      this.board[r][c] = ship;\n    }\n\n    this.fleet.push(ship);\n  }\n\n  receiveAttack(coordinate) {\n    const hitBox = this.board[coordinate[0]][coordinate[1]];\n    if (hitBox === null) {\n      return (this.board[coordinate[0]][coordinate[1]] = \"missed\");\n    }\n    if (hitBox === \"hit\" || hitBox === \"missed\") {\n      throw new Error(`already attacked ${coordinate}`);\n    }\n    hitBox.hit();\n    this.board[coordinate[0]][coordinate[1]] = `hit`;\n    return this.fleetSunk();\n  }\n\n  fleetSunk() {\n    return this.fleet.every((ship) => {\n      return ship.isSunk() === true;\n    });\n  }\n}\n\nclass Player {\n  constructor(name, turn) {\n    this.name = name;\n    this.board = new Gameboard();\n    this.turn = turn;\n  }\n\n  placeCarrier(coordinate, isVertical) {\n    const carrier = new Ship(\"carrier\", isVertical);\n    this.board.placeShip(coordinate, carrier);\n  }\n\n  resetCarrier() {\n    const carrier = null;\n  }\n\n  placeBattleship(coordinate, isVertical) {\n    const battleship = new Ship(\"battleship\", isVertical);\n    this.board.placeShip(coordinate, battleship);\n  }\n\n  placeDestroyer(coordinate, isVertical) {\n    const destroyer = new Ship(\"destroyer\", isVertical);\n    this.board.placeShip(coordinate, destroyer);\n  }\n\n  placeSubmarine(coordinate, isVertical) {\n    const submarine = new Ship(\"submarine\", isVertical);\n    this.board.placeShip(coordinate, submarine);\n  }\n\n  placePatrol(coordinate, isVertical) {\n    const patrol = new Ship(\"patrol\", isVertical);\n    this.board.placeShip(coordinate, patrol);\n  }\n\n  reset() {\n    this.board = new Gameboard();\n    this.resetCarrier();\n    // console.log(this.board.board);\n  }\n}\n\n// module.exports = { Ship, Gameboard, Player };\n\n\n//# sourceURL=webpack://battleships/./src/modules/objects.js?");

/***/ }),

/***/ "./src/modules/renderUI.js":
/*!*********************************!*\
  !*** ./src/modules/renderUI.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderBoard: () => (/* binding */ renderBoard),\n/* harmony export */   renderStart: () => (/* binding */ renderStart),\n/* harmony export */   renderUI: () => (/* binding */ renderUI),\n/* harmony export */   renderWin: () => (/* binding */ renderWin),\n/* harmony export */   replaceRightBoard: () => (/* binding */ replaceRightBoard)\n/* harmony export */ });\nfunction createDialog(titleTxt, leftbtn, rightbtn) {\n  const modalContainer = document.getElementById(\"modal-container\");\n\n  const dialog = document.createElement(\"dialog\");\n  dialog.id = \"modal\";\n  dialog.style.zIndex = \"1000\";\n  dialog.style.padding = \"20px\";\n  dialog.style.borderRadius = \"10px\";\n  dialog.style.width = \"300px\";\n  dialog.style.textAlign = \"center\";\n\n  const title = document.createElement(\"h2\");\n  title.id = \"modal-title\";\n  title.textContent = `${titleTxt}`;\n  dialog.appendChild(title);\n\n  const buttonContainer = document.createElement(\"div\");\n  buttonContainer.id = \"button-container\";\n  buttonContainer.style.textAlign = \"center\";\n  buttonContainer.style.marginTop = \"20px\";\n\n  const leftBtn = document.createElement(\"button\");\n  leftBtn.id = \"left-btn\";\n  leftBtn.textContent = `${leftbtn}`;\n\n  if (rightbtn !== \"No\") {\n    const rightBtn = document.createElement(\"button\");\n    rightBtn.id = \"right-btn\";\n    rightBtn.textContent = `${rightbtn}`;\n    buttonContainer.appendChild(rightBtn);\n  }\n\n  buttonContainer.appendChild(leftBtn);\n\n  dialog.appendChild(buttonContainer);\n\n  modalContainer.appendChild(dialog);\n\n  dialog.showModal();\n}\n\nfunction createOverlay() {\n  const overlay = document.createElement(\"div\");\n  overlay.id = \"modal-overlay\";\n  overlay.style.position = \"fixed\";\n  overlay.style.top = \"0\";\n  overlay.style.left = \"0\";\n  overlay.style.width = \"100vw\";\n  overlay.style.height = \"100vh\";\n  overlay.style.backgroundColor = \"rgba(255, 255, 255)\";\n  overlay.style.zIndex = \"999\";\n  document.body.appendChild(overlay);\n}\n\nfunction renderUI() {\n  const leftRow = document.querySelector(\"div#left-row\");\n  const rightRow = document.querySelector(\"div#right-row\");\n  const row = [...\"ABCDEFGHIJ\"];\n  row.forEach((letter) => {\n    const letterDiv = document.createElement(\"div\");\n    letterDiv.textContent = letter;\n    letterDiv.style.display = \"flex\";\n    letterDiv.style.justifyContent = \"center\";\n    letterDiv.style.alignItems = \"center\";\n    leftRow.appendChild(letterDiv);\n    rightRow.appendChild(letterDiv.cloneNode(true));\n  });\n\n  const leftCol = document.querySelector(\"div#left-col\");\n  const rightCol = document.querySelector(\"div#right-col\");\n  const col = [...\"123456789\", \"10\"];\n  col.forEach((letter) => {\n    const letterDiv = document.createElement(\"div\");\n    letterDiv.textContent = letter;\n    letterDiv.style.display = \"flex\";\n    letterDiv.style.justifyContent = \"center\";\n    letterDiv.style.alignItems = \"center\";\n    leftCol.appendChild(letterDiv);\n    rightCol.appendChild(letterDiv.cloneNode(true));\n  });\n}\n\nfunction renderStart(handler) {\n  createDialog(\"Computer or 1v1?\", \"Computer\", \"1v1\");\n  createOverlay();\n  handler();\n}\n\nfunction renderBoard(player) {\n  const leftBoard = document.getElementById(\"left-board\");\n  const rightBoard = document.getElementById(\"right-board\");\n\n  const board = player.board.board;\n  let computer;\n\n  if (player.name === \"computer\") {\n    computer = true;\n    rightBoard.innerHTML = \"\";\n  } else {\n    computer = false;\n    leftBoard.innerHTML = \"\";\n  }\n\n  board.forEach((row, rindex) => {\n    row.forEach((col, cindex) => {\n      const boxDiv = document.createElement(\"div\");\n\n      if (col === null) {\n        boxDiv.style.backgroundColor = \"grey\";\n      }\n      if (col === \"hit\") {\n        boxDiv.style.backgroundColor = \"red\";\n      }\n      if (col === \"missed\") {\n        boxDiv.textContent = \"X\";\n      }\n      if (col !== null && col !== \"hit\" && col !== \"missed\") {\n        computer\n          ? (boxDiv.style.backgroundColor = \"grey\")\n          : (boxDiv.style.backgroundColor = \"green\");\n      }\n      if (computer) {\n        boxDiv.id = `${rindex}${cindex}`;\n        rightBoard.appendChild(boxDiv);\n      } else {\n        leftBoard.appendChild(boxDiv);\n      }\n    });\n  });\n}\n\nfunction renderWin(wonPlayer) {\n  createDialog(`${wonPlayer.name} wins! Start new game?`, \"Yes!\", \"No\");\n}\n\nfunction replaceRightBoard() {\n  document.getElementById(\"right-board\").remove();\n  const rightBox = document.getElementById(\"right-box\");\n  const newBoard = document.createElement(\"div\");\n  newBoard.id = \"right-board\";\n  rightBox.appendChild(newBoard);\n}\n\n\n//# sourceURL=webpack://battleships/./src/modules/renderUI.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;