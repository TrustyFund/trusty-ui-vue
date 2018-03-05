webpackJsonp([1,2],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./vuex-bitshares/src/mutations.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var WS_CONNECTED = exports.WS_CONNECTED = 'WS_CONNECTED';
var WS_DISCONNECTED = exports.WS_DISCONNECTED = 'WS_DISCONNECTED';
var WS_ERROR = exports.WS_ERROR = 'WS_ERROR';

var FETCH_USER_REQUEST = exports.FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
var FETCH_USER_COMPLETE = exports.FETCH_USER_COMPLETE = 'FETCH_USER_COMPLETE';
var FETCH_USER_ERROR = exports.FETCH_USER_ERROR = 'FETCH_USER_ERROR';

var WALLET_CREATED = exports.WALLET_CREATED = 'WALLET_CREATED';
var WALLET_CREATE_ERROR = exports.WALLET_CREATE_ERROR = 'WALLET_CREATE_ERROR';
var WALLET_BRAINKEY_BACKUP = exports.WALLET_BRAINKEY_BACKUP = 'WALLET_BRAINKEY_BACKUP';
var WALLET_LOCK = exports.WALLET_LOCK = 'WALLET_LOCK';
var WALLET_UNLOCK = exports.WALLET_UNLOCK = 'WALLET_UNLOCK';

var FETCH_ASSETS_REQUEST = exports.FETCH_ASSETS_REQUEST = 'FETCH_ASSETS_REQUEST';
var FETCH_ASSETS_COMPLETE = exports.FETCH_ASSETS_COMPLETE = 'FETCH_ASSETS_COMPLETE';
var FETCH_ASSETS_ERROR = exports.FETCH_ASSETS_ERROR = 'FETCH_ASSETS_ERROR';
var SAVE_DEFAULT_ASSETS_IDS = exports.SAVE_DEFAULT_ASSETS_IDS = 'SAVE_DEFAULT_ASSETS_IDS';

var FETCH_PORTFOLIO_ASSET_REQUEST = exports.FETCH_PORTFOLIO_ASSET_REQUEST = 'FETCH_PORTFOLIO_ASSET_REQUEST';
var FETCH_PORTFOLIO_ASSET_ERROR = exports.FETCH_PORTFOLIO_ASSET_ERROR = 'FETCH_PORTFOLIO_ASSET_ERROR';
var FETCH_PORTFOLIO_ASSET_COMPLETE = exports.FETCH_PORTFOLIO_ASSET_COMPLETE = 'FETCH_PORTFOLIO_ASSET_COMPLETE';
var RESET_PORTFOLIO_STATE = exports.RESET_PORTFOLIO_STATE = 'RESET_PORTFOLIO_STATE';

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/* unknown exports provided */
/* exports used: default */
/*!***************************************!*\
  !*** ./client/components/UI/icon.vue ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader?sourceMap&-autoprefixer!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-3d5118ab","scoped":false,"hasInlineConfig":false}!sass-loader?sourceMap!../../../~/vue-loader/lib/selector?type=styles&index=0!./icon.vue */ 170)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 3)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./icon.vue */ 114),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-3d5118ab"}!../../../~/vue-loader/lib/template-compiler/preprocessor?raw&engine=pug!../../../~/vue-loader/lib/selector?type=template&index=0!./icon.vue */ 228),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 19 */,
/* 20 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./vuex-bitshares/src/services/api.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Assets = exports.User = exports.initApis = undefined;

var _bitsharesjsWs = __webpack_require__(/*! bitsharesjs-ws */ 5);

var _user = __webpack_require__(/*! ./user */ 103);

var _user2 = _interopRequireDefault(_user);

var _assets = __webpack_require__(/*! ./assets */ 102);

var _assets2 = _interopRequireDefault(_assets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Initializes bitshares apis
 * @param {function} statusCallback - callback function for status update
 */
var initApis = exports.initApis = function initApis(statusCallback) {
  var wsString = 'wss://bitshares.openledger.info/ws';
  _bitsharesjsWs.Apis.setRpcConnectionStatusCallback(statusCallback);
  return _bitsharesjsWs.Apis.instance(wsString, true).init_promise;
};

exports.User = _user2.default;
exports.Assets = _assets2.default;

/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/* unknown exports provided */
/* exports used: default */
/*!*********************************************!*\
  !*** ./client/components/UI/form/input.vue ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader?sourceMap&-autoprefixer!../../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-475f571e","scoped":false,"hasInlineConfig":false}!sass-loader?sourceMap!../../../../~/vue-loader/lib/selector?type=styles&index=0!./input.vue */ 172)

var Component = __webpack_require__(/*! ../../../../~/vue-loader/lib/component-normalizer */ 3)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../../~/vue-loader/lib/selector?type=script&index=0!./input.vue */ 113),
  /* template */
  __webpack_require__(/*! !../../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-475f571e"}!../../../../~/vue-loader/lib/template-compiler/preprocessor?raw&engine=pug!../../../../~/vue-loader/lib/selector?type=template&index=0!./input.vue */ 230),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 25 */,
/* 26 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./vuex-bitshares/src/utils/index.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Return object with keys = id of each element of array (element.id)
 * @param {Array} array - array of data elements
 */
var arrayToObject = exports.arrayToObject = function arrayToObject(array) {
  var obj = {};
  array.forEach(function (item) {
    obj[item.id] = item;
  });
  return obj;
};

/**
 * Returns array containing first and last history prices of asset.
 * @param {Array} history - array with asset's history data
 */
var getPrices = exports.getPrices = function getPrices(history) {
  if (!history.length) return { first: 0, last: 0 };
  var startElem = history[0];
  var endElem = history[history.length - 1];
  var startPrice = startElem.open_base / startElem.open_quote;
  var endPrice = endElem.close_base / endElem.close_quote;
  return { first: startPrice, last: endPrice };
};

/**
 * Returns formatted prices for array calculated taking precision щf assets into account
 * @param {Object} prices - object with asset's history prices
 * @param {number} prices.first - first price of asset history
 * @param {number} prices.last - last price of asset history (current)
 * @param {Object} base - base asset object
 * @param {Object} quote - quote asset object
 */
var formatPrices = exports.formatPrices = function formatPrices(prices, base, quote) {
  var precisionDiff = base.precision - quote.precision;

  if (precisionDiff > 0) {
    prices.first /= precisionDiff * 10;
    prices.last /= precisionDiff * 10;
  } else if (precisionDiff < 0) {
    prices.first = prices.first * 10 * precisionDiff;
    prices.last = prices.last * 10 * precisionDiff;
  }

  prices.change = Math.floor(prices.last / prices.first * 100 - 100);
  prices.first = Math.abs(prices.first).toFixed(4);
  prices.last = Math.abs(prices.last).toFixed(4);
  return prices;
};

/**
 * Returns amount of change by percent, calculated by prices history and exchange multiplier
 * @param {Object} object.prices - object with asset's history prices
 * @param {number} object.prices.first - first price of asset history
 * @param {number} object.prices.last - last price of asset history (current)
 * @param {Object} object.multiplier - object with base -> fiat exchange rates
 * @param {number} object.multiplier.first - multiplier for first history price
 * @param {number} object.multiplier.last - multiplier for last history price (current)
 */
var calcPercentChange = exports.calcPercentChange = function calcPercentChange(prices, multiplier) {
  return (prices.last * multiplier.last / (prices.first * multiplier.first) * 100 - 100).toFixed(2);
};

/**
 * Returns object with balance in base currency, balance in fiat currency
  and change by percent
 * @param {Object} object - object containing data for calculation
 * @param {number} object.balance - balance of asset
 * @param {Object} object.assetPrices - object with asset's history prices
 * @param {number} object.assetPrices.first - first price of asset history
 * @param {number} object.assetPrices.last - last price of asset history (current)
 * @param {Object} object.fiatMultiplier - object with base -> fiat exchange rates
 * @param {number} object.fiatMultiplier.first - multiplier for first history price
 * @param {number} object.fiatMultiplier.last - multiplier for last history price (current)
 * @param {Boolean} object.isBase - the asset for calculation is base asset
 * @param {Boolean} object.isFiat - the asset for calculation is fiat asset
 */
var calcPortfolioData = exports.calcPortfolioData = function calcPortfolioData(_ref) {
  var balance = _ref.balance,
      assetPrices = _ref.assetPrices,
      fiatMultiplier = _ref.fiatMultiplier,
      isBase = _ref.isBase,
      isFiat = _ref.isFiat;

  var multiplier = fiatMultiplier;
  var prices = assetPrices;
  if (isFiat) multiplier = { first: 1, last: 1 };
  if (isBase) prices = { first: 1, last: 1 };
  var balanceBase = balance * prices.last;
  var balanceFiat = balanceBase * multiplier.last;
  var change = calcPercentChange(prices, multiplier);
  if (prices.last === prices.first && !isBase) change = 0;
  return { balanceBase: balanceBase, balanceFiat: balanceFiat, change: change };
};

/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/* unknown exports provided */
/* exports used: default */
/*!*****************************************************!*\
  !*** ./client/components/Auth/confirm-password.vue ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader?sourceMap&-autoprefixer!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-46681b74","scoped":false,"hasInlineConfig":false}!sass-loader?sourceMap!../../../~/vue-loader/lib/selector?type=styles&index=0!./confirm-password.vue */ 171)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 3)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./confirm-password.vue */ 105),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-46681b74"}!../../../~/vue-loader/lib/template-compiler/preprocessor?raw&engine=pug!../../../~/vue-loader/lib/selector?type=template&index=0!./confirm-password.vue */ 229),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 75 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./client/style/pixel-glass.js ***!
  \*************************************/
/***/ (function(module, exports) {

/* eslint-disable */
function pixelGlass() {

  'use strict';

  var doc = document;
  var controlsPanel = void 0;
  var bodyContentWrapper = void 0;
  var panelClass = 'controls-panel';
  var canBeDisabled = [];

  var prefix = 'pg';
  var filtersList = ['none', 'invert'];
  var statesList = ['off', 'on'];

  var currents = {
    state: getCurrent('state', statesList[1]),
    filter: getCurrent('filter', filtersList[0]),
    opacity: getCurrent('opacity', 0.5)
  };

  var targets = {
    state: {
      elem: doc.documentElement,
      attr: 'data'
    },
    filter: {
      elem: doc.body,
      attr: 'data'
    },
    opacity: {
      elem: doc.body,
      attr: 'style'
    }
  };

  // States switcher params
  var paramsStates = {
    elemTag: 'button',
    elemText: 'on',
    listName: 'states',
    itemName: 'state',
    target: targets.state,
    type: 'button',
    list: statesList,
    canDisableAll: true,
    attrs: {
      tabindex: 1
    }
  };

  // Filters switcher params
  var paramsFilters = {
    elemTag: 'button',
    elemText: 'invert',
    listName: 'filters',
    itemName: 'filter',
    target: targets.filter,
    type: 'button',
    list: filtersList,
    attrs: {
      tabindex: 2
    }
  };

  // Opacity range params
  var paramsOpacity = {
    itemName: 'opacity',
    type: 'number',
    target: targets.opacity,
    setAttr: 'style',
    attrs: {
      min: 0,
      max: 1,
      step: 0.1,
      tabindex: 3
    }
  };

  //---------------------------------------------

  init();

  //---------------------------------------------

  function init() {
    createContolsPanel();
    applyCurrentData();

    if (currents.state === 'on') {
      applyCurrentStyles();
    }
  }

  //---------------------------------------------

  function createContolsPanel() {
    var targetElem = doc.documentElement;

    if (hasData(doc.body, 'has-sticky-point')) {
      var stickyPoint = doc.querySelector('.sticky-point');

      if (stickyPoint && !localStorage['pg-released']) {
        targetElem = stickyPoint;
      }
      // Override defaults for demo page
      currents.state = 'off';
    }

    controlsPanel = doc.createElement('div');
    controlsPanel.classList.add(panelClass);
    targetElem.appendChild(controlsPanel);
    var sides = ['top', 'right', 'bottom', 'left'];

    sides.forEach(function (item) {
      var itemVal = getCurrent(item, '');
      if (itemVal) {
        controlsPanel.style[item] = itemVal;
      }
    });

    initControls();
  }

  //---------------------------------------------

  function initControls() {
    createButton(paramsStates);
    createButton(paramsFilters);
    createInputNumber(paramsOpacity);

    createDragButton();
  }

  //---------------------------------------------

  function createButton(params) {
    var listName = params.listName;
    var itemName = params.itemName;
    var elemTag = params.elemTag;
    var elemText = params.elemText;
    var type = params.type;
    var list = params.list;
    var action = params.action;
    var currentVal = currents[itemName];
    var attrs = params.attrs;
    var currentNum = list.indexOf(currentVal);
    var canDisableAll = params.canDisableAll;

    var id = itemName;
    var input = doc.createElement(elemTag);
    setClasses(input, [panelClass + '__control', panelClass + '__control--' + type]);
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    setData(input, 'state-num', currentNum);

    if (attrs) {
      for (var attr in attrs) {
        input.setAttribute(attr, attrs[attr]);
      }
    }

    if (elemTag === 'button') {
      input.innerHTML = elemText;
    }

    if (!canDisableAll) {
      canBeDisabled.push(input);
    }

    controlsPanel.appendChild(input);

    input.onclick = function () {
      if (!params.target) {
        return;
      }

      currentNum = +!currentNum;
      currentVal = list[currentNum];

      setData(input, 'state-num', currentNum);
      setData(params.target.elem, itemName, currentVal);

      saveLocalStorage(itemName, currentVal);

      if (canDisableAll && canDisableAll === true) {
        if (currentVal === 'off') {
          removeCurrentStyles();
          disableInputs();
        } else {
          applyCurrentStyles();
          enableInputs();
        }
      }
    };
  }

  //---------------------------------------------

  function createInputNumber(params) {
    var itemName = params.itemName;
    var attrs = params.attrs;
    var type = params.type;
    var setAttr = params.setAttr;
    var canDisableAll = params.canDisableAll;

    var id = itemName;
    var input = doc.createElement('input');
    setClasses(input, [panelClass + '__control', panelClass + '__control--' + type]);
    input.setAttribute('type', type);
    input.setAttribute('id', id);

    for (var attr in attrs) {
      input.setAttribute(attr, attrs[attr]);
    }
    input.setAttribute('value', currents[itemName]);

    if (!canDisableAll) {
      canBeDisabled.push(input);
    }

    controlsPanel.appendChild(input);

    input.oninput = function () {
      if (setAttr === 'style') {
        params.target.elem.style[itemName] = this.value;
        saveLocalStorage(itemName, this.value);
      }
    };
  }

  //---------------------------------------------

  function createDragButton() {
    var input = doc.createElement('button');
    setClasses(input, [panelClass + '__control', panelClass + '__control--drag-n-drop']);
    input.setAttribute('type', 'button');
    input.innerHTML = ' ';

    controlsPanel.appendChild(input);

    input.onmousedown = function () {
      //Place it here to get real sizes after
      // external styles has been loaded
      var offsetTop = this.offsetTop;
      var offsetLeft = controlsPanel.clientWidth - this.clientWidth;
      var styles = getComputedStyle(controlsPanel);

      controlsPanel.style.top = styles.top;
      controlsPanel.style.left = styles.left;
      controlsPanel.style.right = 'auto';
      controlsPanel.style.bottom = 'auto';

      doc.onmousemove = function (ev) {
        var x = ev.clientX - offsetLeft + 'px';
        var y = ev.clientY + 'px';

        controlsPanel.style.left = x;
        controlsPanel.style.top = y;
      };
    };

    input.onmouseup = function () {
      var styles = getComputedStyle(controlsPanel);
      var left = +styles.left.replace(/px/, '');
      var right = +styles.right.replace(/px/, '');
      var top = +styles.top.replace(/px/, '');
      var bottom = +styles.bottom.replace(/px/, '');

      if (left > right) {
        saveLocalStorage('left', 'auto');
        saveLocalStorage('right', styles.right);

        controlsPanel.style.right = styles.right;
        controlsPanel.style.left = 'auto';
      } else {
        saveLocalStorage('left', styles.left);
        saveLocalStorage('right', 'auto'); //'auto' needs to override default position;
      }
      if (top > bottom) {
        saveLocalStorage('top', 'auto');
        saveLocalStorage('bottom', styles.bottom);

        controlsPanel.style.bottom = styles.bottom;
        controlsPanel.style.top = 'auto';
      } else {
        saveLocalStorage('top', styles.top);
        saveLocalStorage('bottom', 'auto');
      }

      doc.onmousemove = null;
    };
  }

  //---------------------------------------------

  function disableInputs() {
    canBeDisabled.forEach(function (item) {
      item.setAttribute('disabled', '');
    });
  }

  //---------------------------------------------

  function enableInputs() {
    canBeDisabled.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  }

  //---------------------------------------------

  function getCurrent(name, defaultValue) {
    var itemName = [prefix, name].join('-');
    var localStorageVal = localStorage[itemName];
    return localStorageVal ? localStorageVal : defaultValue;
  }

  //---------------------------------------------

  function saveLocalStorage(name, value) {
    var itemName = [prefix, name].join('-');
    localStorage[itemName] = value;
  }

  //---------------------------------------------

  // Not used
  function getBodyOpacity() {
    var opacityStr = getComputedStyle(doc.body).opacity;
    return +opacityStr;
  }

  //---------------------------------------------

  // Not used
  function addExternalCSS() {
    var styleElem = doc.createElement('style');
    var cssLink = doc.createElement('link');
    cssLink.setAttribute('rel', 'stylesheet');
    cssLink.setAttribute('href', '../pixel-glass-js/styles.css');

    doc.head.appendChild(cssLink);
  }

  //---------------------------------------------

  function applyCurrentData() {
    for (var key in targets) {
      var target = targets[key];
      var current = currents[key];

      if (target.attr === 'data') {
        setData(target.elem, key, current);
      }
    }

    if (currents.state === 'off') {
      disableInputs();
    }
  }
  //---------------------------------------------

  function applyCurrentStyles() {
    for (var key in targets) {
      var target = targets[key];
      var current = currents[key];

      if (target.attr === 'style') {
        target.elem.style[key] = current;
      }
    }
  }

  //---------------------------------------------

  function removeCurrentStyles() {
    for (var key in targets) {
      var target = targets[key];

      if (target.attr === 'style') {
        target.elem.style[key] = '';
      }
    }
  }

  //---------------------------------------------

  // Made for IE10, it doesn't support dataset

  function hasData(elem, dataName) {
    if (!elem) {
      return false;
    }

    dataName = 'data-' + dataName;

    if (elem.getAttribute(dataName) !== undefined && elem.getAttribute(dataName) !== null) {
      return true;
    }

    return false;
  }

  //---------------------------------------------

  function setData(elem, dataName, dataVal) {
    if (!elem) {
      return;
    }

    dataName = 'data-' + dataName;
    elem.setAttribute(dataName, dataVal);
  }

  //---------------------------------------------

  // Made for IE10, it doesn't support
  // multiply classes for classList.add

  function setClasses(elem, classes) {
    if (!elem) {
      return;
    }

    if (classes.length > 0) {
      classes.forEach(function (className) {
        elem.classList.add(className);
      });
    }
  }

  //---------------------------------------------
}

window.onload = function () {
  pixelGlass();
};

/***/ }),
/* 76 */
/* exports provided: app, router, store */
/* exports used: app */
/*!***********************!*\
  !*** ./client/app.js ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(/*! vue */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex_router_sync__ = __webpack_require__(/*! vuex-router-sync */ 237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuex_router_sync__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__root__ = __webpack_require__(/*! ./root */ 83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router__ = __webpack_require__(/*! ./router */ 84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store__ = __webpack_require__(/*! ./store */ 85);
/* unused harmony reexport router */
/* unused harmony reexport store */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return app; });






__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex_router_sync__["sync"])(__WEBPACK_IMPORTED_MODULE_4__store__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */]);

var app = new __WEBPACK_IMPORTED_MODULE_0_vue__["default"](Object.assign({
  router: __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */],
  store: __WEBPACK_IMPORTED_MODULE_4__store__["a" /* default */]
}, __WEBPACK_IMPORTED_MODULE_2__root__["a" /* default */]));



/***/ }),
/* 77 */
/* unknown exports provided */
/*!************************************!*\
  !*** ./client/promise-polyfill.js ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise_polyfill__ = __webpack_require__(/*! promise-polyfill */ 181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_promise_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_promise_polyfill__);


window.Promise = window.Promise || __WEBPACK_IMPORTED_MODULE_0_promise_polyfill___default.a;

/***/ }),
/* 78 */
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** ./client/pwa.js ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_offline_plugin_runtime__ = __webpack_require__(/*! offline-plugin/runtime */ 180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_offline_plugin_runtime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_offline_plugin_runtime__);


__WEBPACK_IMPORTED_MODULE_0_offline_plugin_runtime___default.a.install({
  // When an update is ready, tell ServiceWorker to take control immediately:
  onUpdateReady: function onUpdateReady() {
    console.log('update ready');
    __WEBPACK_IMPORTED_MODULE_0_offline_plugin_runtime___default.a.applyUpdate();
  },


  // Reload to get the new version:
  onUpdated: function onUpdated() {
    console.log('updated');
    location.reload(); // eslint-disable-line
  }
});

/***/ }),
/* 79 */
/* exports provided: default */
/* exports used: default */
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var config = {
  pixel: false,
  html: true
};

/* harmony default export */ __webpack_exports__["a"] = config;

/***/ }),
/* 80 */
/* unknown exports provided */
/* all exports used */
/*!***************************************!*\
  !*** ./client/style/pixel-glass.scss ***!
  \***************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 81 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./client/style/icons ^\.\/.*\.svg$ ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./full_minus.svg": 182,
	"./full_plus.svg": 183,
	"./mf_minus.svg": 184,
	"./mf_plus.svg": 185,
	"./trusty-logo-text.svg": 186,
	"./trusty_arrow.svg": 187,
	"./trusty_arrow_back.svg": 188,
	"./trusty_arrow_down.svg": 189,
	"./trusty_arrow_down_landing.svg": 190,
	"./trusty_fund_logo.svg": 191,
	"./trusty_input_close.svg": 192,
	"./trusty_minus.svg": 193,
	"./trusty_options.svg": 194,
	"./trusty_owl_small_logo.svg": 195,
	"./trusty_plus.svg": 196,
	"./trusty_portfolio_arrow_right.svg": 197
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 81;


/***/ }),
/* 82 */,
/* 83 */
/* exports provided: default */
/* exports used: default */
/*!************************!*\
  !*** ./client/root.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_scss__ = __webpack_require__(/*! ./style/index.scss */ 163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_index_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_header___ = __webpack_require__(/*! ./components/header/ */ 221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_header____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_header___);



/* harmony default export */ __webpack_exports__["a"] = {
  components: { Header: __WEBPACK_IMPORTED_MODULE_1__components_header____default.a },
  beforeMount: function beforeMount() {
    var _this = this;

    this.$store.dispatch('initApis', function () {
      return _this.$store.dispatch('assets/fetchDefaultAssets');
    });
  },
  render: function render() {
    var h = arguments[0];

    // eslint-disable-next-line
    var app = this.connected ? h('router-view', null) : h(
      'h4',
      null,
      ['Connecting']
    );
    return h(
      'div',
      {
        attrs: { id: 'app' }
      },
      [h(__WEBPACK_IMPORTED_MODULE_1__components_header____default.a, null), app]
    );
  },

  computed: {
    connected: function connected() {
      return this.$store.state.apis.connected;
    }
  }
};

/***/ }),
/* 84 */
/* exports provided: default */
/* exports used: default */
/*!********************************!*\
  !*** ./client/router/index.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(/*! vue */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(/*! vue-router */ 235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Transfer__ = __webpack_require__(/*! @/components/Transfer */ 219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Transfer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Transfer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Home_Home_vue__ = __webpack_require__(/*! @/components/Home/Home.vue */ 214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Home_Home_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Home_Home_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_User_User_vue__ = __webpack_require__(/*! @/components/User/User.vue */ 220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_User_User_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_User_User_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Auth_signup_vue__ = __webpack_require__(/*! @/components/Auth/signup.vue */ 213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Auth_signup_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_Auth_signup_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Auth_Auth_vue__ = __webpack_require__(/*! @/components/Auth/Auth.vue */ 212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Auth_Auth_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_Auth_Auth_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Portfolio_ManagePortfolio_vue__ = __webpack_require__(/*! @/components/Portfolio/ManagePortfolio.vue */ 215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Portfolio_ManagePortfolio_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_Portfolio_ManagePortfolio_vue__);









__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  mode: 'history',
  routes: [{
    name: 'home',
    path: '/',
    component: __WEBPACK_IMPORTED_MODULE_3__components_Home_Home_vue___default.a
  }, {
    path: '/home',
    component: __WEBPACK_IMPORTED_MODULE_3__components_Home_Home_vue___default.a
  }, {
    name: 'user',
    path: '/user/:name',
    component: __WEBPACK_IMPORTED_MODULE_4__components_User_User_vue___default.a,
    props: true
  }, {
    name: 'login',
    path: '/login',
    component: __WEBPACK_IMPORTED_MODULE_6__components_Auth_Auth_vue___default.a
  }, {
    name: 'signup',
    path: '/signup',
    component: __WEBPACK_IMPORTED_MODULE_5__components_Auth_signup_vue___default.a
  }, {
    name: 'deposit',
    path: '/deposit',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Transfer___default.a
  }, {
    name: 'withdraw',
    path: '/withdraw',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Transfer___default.a
  }, {
    name: 'manage',
    path: '/manage',
    component: __WEBPACK_IMPORTED_MODULE_7__components_Portfolio_ManagePortfolio_vue___default.a
  }]
});

/***/ }),
/* 85 */
/* exports provided: default */
/* exports used: default */
/*!*******************************!*\
  !*** ./client/store/index.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(/*! vue */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(/*! vuex */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lib_src__ = __webpack_require__(/*! lib/src */ 96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lib_src___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lib_src__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__transfer__ = __webpack_require__(/*! ./transfer */ 86);


// eslint-disable-next-line



__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* default */]);

var store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* default */].Store({
  modules: {
    transfer: __WEBPACK_IMPORTED_MODULE_3__transfer__["a" /* default */]
  }
});
__WEBPACK_IMPORTED_MODULE_2_lib_src___default()(store);

/* harmony default export */ __webpack_exports__["a"] = store;

/***/ }),
/* 86 */
/* exports provided: default */
/* exports used: default */
/*!**********************************!*\
  !*** ./client/store/transfer.js ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CHANGE_TRANSFER_ACTION = 'CHANGE_TRANSFER_ACTION';
var CHANGE_TRANSFER_COIN_TYPE = 'CHANGE_TRANSFER_COIN_TYPE';
var CHANGE_TRANSFER_DEPOSIT_ADDRESS = 'CHANGE_TRANSFER_DEPOSIT_ADDRESS';
var CHANGE_TRANSFER_SERVICE = 'CHANGE_TRANSFER_SERVICE';
var CHANGE_TRANSFER_AMOUNT = 'CHANGE_TRANSFER_AMOUNT';

var actions = {
  setDepositAddress: function setDepositAddress(_ref, val) {
    var commit = _ref.commit;

    commit(CHANGE_TRANSFER_DEPOSIT_ADDRESS, val);
  },
  setTransferService: function setTransferService(_ref2, val) {
    var commit = _ref2.commit;

    commit(CHANGE_TRANSFER_SERVICE, val);
  },
  changeCoinType: function changeCoinType(_ref3, val) {
    var commit = _ref3.commit;

    commit(CHANGE_TRANSFER_COIN_TYPE, val);
  },
  changeTransferAction: function changeTransferAction(_ref4, val) {
    var commit = _ref4.commit;

    commit(CHANGE_TRANSFER_ACTION, val);
  },
  changeTransferAmount: function changeTransferAmount(_ref5, val) {
    var commit = _ref5.commit;

    commit(CHANGE_TRANSFER_AMOUNT, val);
  }
};

var getters = {
  transferAmount: function transferAmount(state) {
    return state.amount;
  },
  transferCoin: function transferCoin(state) {
    return state.coinType;
  },
  transferService: function transferService(state) {
    return state.service;
  },
  transferDepositAddress: function transferDepositAddress(state) {
    return state.depositAddress;
  }
};

var mutations = (_mutations = {}, _defineProperty(_mutations, CHANGE_TRANSFER_ACTION, function (state, val) {
  state.action = val;
}), _defineProperty(_mutations, CHANGE_TRANSFER_COIN_TYPE, function (state, val) {
  state.coinType = val;
}), _defineProperty(_mutations, CHANGE_TRANSFER_DEPOSIT_ADDRESS, function (state, val) {
  state.depositAddress = val;
}), _defineProperty(_mutations, CHANGE_TRANSFER_SERVICE, function (state, val) {
  state.service = val;
}), _defineProperty(_mutations, CHANGE_TRANSFER_AMOUNT, function (state, val) {
  state.amount = val;
}), _mutations);

var state = {
  amount: 0,
  coinType: 'BTC',
  depositAddress: '',
  service: 'blocktrades',
  action: 'withdraw'
};

/* harmony default export */ __webpack_exports__["a"] = {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};

/***/ }),
/* 87 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./vuex-bitshares/src/actions/apis.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initApis = undefined;

var _api = __webpack_require__(/*! ../services/api */ 20);

var apis = _interopRequireWildcard(_api);

var _mutations = __webpack_require__(/*! ../mutations */ 7);

var types = _interopRequireWildcard(_mutations);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Inits main APIs
 * @param {function} callback - callback for status update
 */
var initApis = exports.initApis = function initApis(_ref, callback) {
  var commit = _ref.commit;

  var connectionStatus = function connectionStatus(status) {
    switch (status) {
      case 'closed':
        commit(types.WS_DISCONNECTED);
        break;
      case 'error':
        commit(types.WS_ERROR);
        break;
      default:
    }
  };

  apis.initApis(connectionStatus).then(function () {
    commit(types.WS_CONNECTED);
    callback();
  });
};

/***/ }),
/* 88 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./vuex-bitshares/src/actions/assets.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchDefaultAssets = exports.fetchAssets = undefined;

var _mutations = __webpack_require__(/*! ../mutations */ 7);

var types = _interopRequireWildcard(_mutations);

var _api = __webpack_require__(/*! ../services/api */ 20);

var _utils = __webpack_require__(/*! ../utils */ 26);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Fetches assets objects from bitsharesjs-ws
 * @param {Array} assets - list of assets ids/symbold to fetch
 */
var fetchAssets = exports.fetchAssets = async function fetchAssets(_ref, assets) {
  var commit = _ref.commit;

  commit(types.FETCH_ASSETS_REQUEST);
  var result = await _api.Assets.fetch(assets);
  if (result) {
    var composedResult = (0, _utils.arrayToObject)(result);
    commit(types.FETCH_ASSETS_COMPLETE, { assets: composedResult });
    return composedResult;
  }
  commit(types.FETCH_ASSETS_ERROR);
  return null;
};

/**
 * Fetches default assets objects via fetchAssets function
 to save default assets ids
 */
var fetchDefaultAssets = exports.fetchDefaultAssets = async function fetchDefaultAssets(_ref2) {
  var commit = _ref2.commit,
      getters = _ref2.getters;

  var defaultAssetsNames = getters.getDefaultAssetsNames;
  var assets = await fetchAssets({ commit: commit }, defaultAssetsNames);
  if (assets) {
    var ids = Object.keys(assets);
    commit(types.SAVE_DEFAULT_ASSETS_IDS, { ids: ids });
  }
};

/***/ }),
/* 89 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./vuex-bitshares/src/actions/portfolio.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPortfolioState = exports.fetchPortfolioData = undefined;

var _mutations = __webpack_require__(/*! ../mutations */ 7);

var types = _interopRequireWildcard(_mutations);

var _api = __webpack_require__(/*! ../services/api */ 20);

var _utils = __webpack_require__(/*! ../utils */ 26);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Fetches and processes data for portfolio
 * @param {Object} balances - object with balances by key as id of asset
 */
var fetchPortfolioData = exports.fetchPortfolioData = async function fetchPortfolioData(_ref, _ref2) {
  var commit = _ref.commit,
      rootGetters = _ref.rootGetters;
  var balances = _ref2.balances,
      baseId = _ref2.baseId,
      fiatId = _ref2.fiatId,
      days = _ref2.days;

  var assets = rootGetters['assets/getAssets'];
  var defaultAssetsIds = rootGetters['assets/getDefaultAssetsIds'];
  var baseAsset = assets[baseId];
  var fiatAsset = assets[fiatId];
  var userAssetsIds = Object.keys(balances);

  // balance + default assets without duplication
  var filteredAssetsIdsList = userAssetsIds.concat(defaultAssetsIds.filter(function (id) {
    return userAssetsIds.indexOf(id) < 0;
  }));

  // fetch currency asset prices history first to calc multiplier
  // (to calculate fiat value of each asset)
  var fiatPrices = await _api.Assets.fetchPriceHistory(baseAsset, fiatAsset, days);
  var fiatMultiplier = {
    first: 1 / fiatPrices.first,
    last: 1 / fiatPrices.last
  };

  // fetch and calculate prices for each asset
  return Promise.all(filteredAssetsIdsList.map(async function (id) {
    var balance = balances[id] && balances[id].balance || 0;
    balance = balance / 10 ** assets[id].precision;
    var name = assets[id].symbol;
    commit(types.FETCH_PORTFOLIO_ASSET_REQUEST, { id: id, name: assets[id].symbol, balance: balance });

    var prices = await _api.Assets.fetchPriceHistory(baseAsset, assets[id], 7);
    if (prices) {
      var _utils$calcPortfolioD = utils.calcPortfolioData({
        balance: balance,
        assetPrices: prices,
        fiatMultiplier: fiatMultiplier,
        isBase: id === baseId,
        isFiat: id === fiatId
      }),
          balanceBase = _utils$calcPortfolioD.balanceBase,
          balanceFiat = _utils$calcPortfolioD.balanceFiat,
          change = _utils$calcPortfolioD.change;

      commit(types.FETCH_PORTFOLIO_ASSET_COMPLETE, {
        id: id,
        data: {
          name: name, balance: balance, balanceBase: balanceBase, balanceFiat: balanceFiat, change: change
        }
      });
    } else {
      commit(types.FETCH_PORTFOLIO_ASSET_ERROR, { id: id });
    }
  }));
};

/**
 * Resets portfolio state to initial
 */
var resetPortfolioState = exports.resetPortfolioState = function resetPortfolioState(_ref3) {
  var commit = _ref3.commit;

  commit(types.RESET_PORTFOLIO_STATE);
};

/***/ }),
/* 90 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./vuex-bitshares/src/actions/user.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUser = undefined;

var _mutations = __webpack_require__(/*! ../mutations */ 7);

var types = _interopRequireWildcard(_mutations);

var _api = __webpack_require__(/*! ../services/api */ 20);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Function to convert array of balances to object with keys as assets ids
 * @param {Array} balancesArr - array of balance objects
 */
var balancesToObject = function balancesToObject(balancesArr) {
  var obj = {};
  balancesArr.forEach(function (item) {
    obj[item.asset_type] = item;
  });
  return obj;
};

/**
 * Fetches users objects from bitsharesjs-ws
 * @param {string} username - name of user to fetch
 */
var fetchUser = exports.fetchUser = async function fetchUser(_ref, username) {
  var commit = _ref.commit;

  commit(types.FETCH_USER_REQUEST);
  var result = await _api.User.Get(username);
  if (result) {
    var user = result[0][1];
    user.balances = balancesToObject(user.balances);
    commit(types.FETCH_USER_COMPLETE, user);
    return user;
  }
  commit(types.FETCH_USER_ERROR);
  return null;
};

/***/ }),
/* 91 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./vuex-bitshares/src/actions/wallet.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lockWallet = exports.unlockWallet = exports.createWallet = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _bitsharesjs = __webpack_require__(/*! bitsharesjs */ 54);

var _bitsharesjsWs = __webpack_require__(/*! bitsharesjs-ws */ 5);

var _mutations = __webpack_require__(/*! ../mutations */ 7);

var types = _interopRequireWildcard(_mutations);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var createWallet = exports.createWallet = function createWallet(_ref, _ref2) {
  var commit = _ref.commit;
  var brainkey = _ref2.brainkey,
      password = _ref2.password;

  var passwordAes = _bitsharesjs.Aes.fromSeed(password);
  var encryptionBuffer = _bitsharesjs.key.get_random_key().toBuffer();
  var encryptionKey = passwordAes.encryptToHex(encryptionBuffer);
  var aesPrivate = _bitsharesjs.Aes.fromSeed(encryptionBuffer);

  var normalizedBrainkey = _bitsharesjs.key.normalize_brainKey(brainkey);
  // const brainkeyPrivate = PrivateKey.fromSeed(normalizedBrainkey);
  var encryptedBrainkey = aesPrivate.encryptToHex(normalizedBrainkey);
  var passwordPrivate = _bitsharesjs.PrivateKey.fromSeed(password);
  var passwordPubkey = passwordPrivate.toPublicKey().toPublicKeyString();

  // getting user id
  var ownerKeyIndex = 1;
  var ownerKey = _bitsharesjs.key.get_brainPrivateKey(normalizedBrainkey, ownerKeyIndex);
  var ownerPubkey = ownerKey.toPublicKey().toPublicKeyString();

  var keys = {
    passwordPubkey: passwordPubkey,
    encryptionKey: encryptionKey,
    encryptedBrainkey: encryptedBrainkey,
    aesPrivate: aesPrivate
  };

  return _bitsharesjsWs.Apis.instance().db_api().exec('get_key_references', [[ownerPubkey]]).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
        _ref4$ = _slicedToArray(_ref4[0], 1),
        userId = _ref4$[0];

    if (userId) {
      commit(types.WALLET_CREATED, { keys: keys, userId: userId });
    } else {
      commit(types.WALLET_CREATE_ERROR);
    }
  });
};

var unlockWallet = exports.unlockWallet = function unlockWallet(_ref5, password) {
  var commit = _ref5.commit,
      state = _ref5.state;

  var passwordAes = _bitsharesjs.Aes.fromSeed(password);
  var encryptionPlainbuffer = passwordAes.decryptHexToBuffer(state.encryption_key);
  var aesPrivate = _bitsharesjs.Aes.fromSeed(encryptionPlainbuffer);
  commit(types.WALLET_UNLOCK, aesPrivate);
};

var lockWallet = exports.lockWallet = function lockWallet(_ref6) {
  var commit = _ref6.commit;

  commit(types.WALLET_LOCK);
};

/***/ }),
/* 92 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./vuex-bitshares/src/getters/assets.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAssets = getAssets;
exports.getDefaultAssetsNames = getDefaultAssetsNames;
exports.getDefaultAssetsIds = getDefaultAssetsIds;
exports.getAssetById = getAssetById;
/**
 * Returns object with all assets
 */
function getAssets(_ref) {
  var assets = _ref.assets;

  return assets || {};
}

/**
 * Returns array with default assets names
 */
function getDefaultAssetsNames(_ref2) {
  var defaultAssetsNames = _ref2.defaultAssetsNames;

  return defaultAssetsNames;
}

/**
 * Returns array with default assets ids
 */
function getDefaultAssetsIds(_ref3) {
  var defaultAssetsIds = _ref3.defaultAssetsIds;

  return defaultAssetsIds;
}

/**
 * Returns function to get asset by id
 */
function getAssetById(_ref4) {
  var assets = _ref4.assets;

  return function (id) {
    return assets && assets[id] ? assets[id] : false;
  };
}

/***/ }),
/* 93 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./vuex-bitshares/src/getters/portfolio.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPortfolioList = getPortfolioList;
/**
 * Returns object with all portfolio items
 */
function getPortfolioList(_ref) {
  var list = _ref.list;

  return list;
}

/***/ }),
/* 94 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./vuex-bitshares/src/getters/user.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserName = getUserName;
exports.getAccountObject = getAccountObject;
exports.getBalances = getBalances;
/**
 * Returns current user's name string
 */
function getUserName(_ref) {
  var account = _ref.account;

  return account && account.name;
}

/**
 * Returns current user's account object
 */
function getAccountObject(_ref2) {
  var account = _ref2.account;

  return account;
}

/**
 * Returns current users's balances object
 */
function getBalances(_ref3) {
  var balances = _ref3.balances;

  return balances;
}

/***/ }),
/* 95 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./vuex-bitshares/src/getters/wallet.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLocked = exports.isValidPassword = exports.getKeys = exports.getBrainkey = undefined;

var _bitsharesjs = __webpack_require__(/*! bitsharesjs */ 54);

var ACTIVE_KEY_INDEX = 0;
var OWNER_KEY_INDEX = 1;

var getBrainkey = exports.getBrainkey = function getBrainkey(state) {
  return state.aes_private && state.aes_private.decryptHexToText(state.encrypted_brainkey) || '';
};

var getKeys = exports.getKeys = function getKeys(state) {
  var brainKey = getBrainkey(state);
  return {
    active: _bitsharesjs.key.get_brainPrivateKey(brainKey, ACTIVE_KEY_INDEX),
    owner: _bitsharesjs.key.get_brainPrivateKey(brainKey, OWNER_KEY_INDEX)
  };
};

var isValidPassword = exports.isValidPassword = function isValidPassword(state) {
  return function (password) {
    var passwordPrivate = _bitsharesjs.PrivateKey.fromSeed(password);
    var passwordPubkey = passwordPrivate.toPublicKey().toPublicKeyString();
    return passwordPubkey === state.password_pubkey;
  };
};

var isLocked = exports.isLocked = function isLocked(state) {
  return state.aes_private == null;
};

/***/ }),
/* 96 */
/* unknown exports provided */
/* exports used: default */
/*!*************************************!*\
  !*** ./vuex-bitshares/src/index.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _apis = __webpack_require__(/*! ./modules/apis */ 97);

var _apis2 = _interopRequireDefault(_apis);

var _user = __webpack_require__(/*! ./modules/user */ 100);

var _user2 = _interopRequireDefault(_user);

var _assets = __webpack_require__(/*! ./modules/assets */ 98);

var _assets2 = _interopRequireDefault(_assets);

var _wallet = __webpack_require__(/*! ./modules/wallet */ 101);

var _wallet2 = _interopRequireDefault(_wallet);

var _portfolio = __webpack_require__(/*! ./modules/portfolio */ 99);

var _portfolio2 = _interopRequireDefault(_portfolio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(store) {
  store.registerModule('apis', _apis2.default);
  store.registerModule('user', _user2.default);
  store.registerModule('assets', _assets2.default);
  store.registerModule('wallet', _wallet2.default);
  store.registerModule('portfolio', _portfolio2.default);
}

/***/ }),
/* 97 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./vuex-bitshares/src/modules/apis.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mutations;

var _mutations2 = __webpack_require__(/*! ../mutations */ 7);

var types = _interopRequireWildcard(_mutations2);

var _apis = __webpack_require__(/*! ../actions/apis */ 87);

var actions = _interopRequireWildcard(_apis);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  connected: false
};

var mutations = (_mutations = {}, _defineProperty(_mutations, types.WS_CONNECTED, function (state) {
  state.connected = true;
}), _defineProperty(_mutations, types.WS_DISCONNECTED, function (state) {
  state.connected = false;
}), _defineProperty(_mutations, types.WS_ERROR, function (state) {
  state.connected = false;
}), _mutations);

exports.default = {
  state: initialState,
  actions: actions,
  mutations: mutations
};

/***/ }),
/* 98 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./vuex-bitshares/src/modules/assets.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mutations;

var _vue = __webpack_require__(/*! vue */ 19);

var _vue2 = _interopRequireDefault(_vue);

var _mutations2 = __webpack_require__(/*! ../mutations */ 7);

var types = _interopRequireWildcard(_mutations2);

var _assets = __webpack_require__(/*! ../actions/assets */ 88);

var actions = _interopRequireWildcard(_assets);

var _assets2 = __webpack_require__(/*! ../getters/assets */ 92);

var getters = _interopRequireWildcard(_assets2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  defaultAssetsNames: ['BTS', 'OPEN.EOS', 'USD', 'OPEN.OMG', 'CNY', 'OPEN.LTC', 'TRFND', 'OPEN.BTC', 'ARISTO', 'ARCOIN'],
  defaultAssetsIds: [],
  assets: {},
  pending: false
};

var mutations = (_mutations = {}, _defineProperty(_mutations, types.FETCH_ASSETS_REQUEST, function (state) {
  state.pending = true;
}), _defineProperty(_mutations, types.FETCH_ASSETS_COMPLETE, function (state, _ref) {
  var assets = _ref.assets;

  Object.keys(assets).forEach(function (id) {
    _vue2.default.set(state.assets, id, assets[id]);
  });
  state.pending = false;
}), _defineProperty(_mutations, types.FETCH_ASSETS_ERROR, function (state) {
  state.pending = false;
}), _defineProperty(_mutations, types.SAVE_DEFAULT_ASSETS_IDS, function (state, _ref2) {
  var ids = _ref2.ids;

  state.defaultAssetsIds = ids;
}), _mutations);

exports.default = {
  state: initialState,
  actions: actions,
  mutations: mutations,
  getters: getters,
  namespaced: true
};

/***/ }),
/* 99 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./vuex-bitshares/src/modules/portfolio.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mutations;

var _vue = __webpack_require__(/*! vue */ 19);

var _vue2 = _interopRequireDefault(_vue);

var _mutations2 = __webpack_require__(/*! ../mutations */ 7);

var types = _interopRequireWildcard(_mutations2);

var _portfolio = __webpack_require__(/*! ../actions/portfolio */ 89);

var actions = _interopRequireWildcard(_portfolio);

var _portfolio2 = __webpack_require__(/*! ../getters/portfolio */ 93);

var getters = _interopRequireWildcard(_portfolio2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  list: {}
};

var mutations = (_mutations = {}, _defineProperty(_mutations, types.FETCH_PORTFOLIO_ASSET_REQUEST, function (state, _ref) {
  var id = _ref.id,
      name = _ref.name,
      balance = _ref.balance;

  _vue2.default.set(state.list, id, {
    name: name,
    balance: balance,
    balanceBase: 0,
    balanceFiat: 0,
    change: 0,
    fetching: true
  });
}), _defineProperty(_mutations, types.FETCH_PORTFOLIO_ASSET_ERROR, function (state, _ref2) {
  var id = _ref2.id;

  _vue2.default.set(state.list[id], 'fetching', false);
  _vue2.default.set(state.list[id], 'error', true);
}), _defineProperty(_mutations, types.FETCH_PORTFOLIO_ASSET_COMPLETE, function (state, _ref3) {
  var id = _ref3.id,
      data = _ref3.data;

  _vue2.default.set(state.list, id, data);
}), _defineProperty(_mutations, types.RESET_PORTFOLIO_STATE, function (state) {
  state.list = {};
}), _mutations);

exports.default = {
  state: initialState,
  actions: actions,
  mutations: mutations,
  getters: getters,
  namespaced: true
};

/***/ }),
/* 100 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./vuex-bitshares/src/modules/user.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mutations;

var _mutations2 = __webpack_require__(/*! ../mutations */ 7);

var types = _interopRequireWildcard(_mutations2);

var _user = __webpack_require__(/*! ../actions/user */ 90);

var actions = _interopRequireWildcard(_user);

var _user2 = __webpack_require__(/*! ../getters/user */ 94);

var getters = _interopRequireWildcard(_user2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  account: null,
  balances: [],
  pending: false,
  error: false
};

var mutations = (_mutations = {}, _defineProperty(_mutations, types.FETCH_USER_REQUEST, function (state) {
  state.pending = true;
  state.error = false;
}), _defineProperty(_mutations, types.FETCH_USER_COMPLETE, function (state, result) {
  state.account = result.account;
  state.balances = result.balances;
  state.pending = false;
}), _defineProperty(_mutations, types.FETCH_USER_ERROR, function (state) {
  state.pending = false;
  state.error = true;
}), _mutations);

exports.default = {
  state: initialState,
  actions: actions,
  getters: getters,
  mutations: mutations,
  namespaced: true
};

/***/ }),
/* 101 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./vuex-bitshares/src/modules/wallet.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mutations;

var _wallet = __webpack_require__(/*! ../actions/wallet */ 91);

var actions = _interopRequireWildcard(_wallet);

var _mutations2 = __webpack_require__(/*! ../mutations */ 7);

var types = _interopRequireWildcard(_mutations2);

var _wallet2 = __webpack_require__(/*! ../getters/wallet */ 95);

var getters = _interopRequireWildcard(_wallet2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  //  for password validation
  password_pubkey: null,
  encrypted_brainkey: null,
  brainkey_backup_date: null,
  encryption_key: null,
  created: null,
  aes_private: null,
  user_id: null,
  valid: false
};

var mutations = (_mutations = {}, _defineProperty(_mutations, types.WALLET_CREATED, function (state, _ref) {
  var keys = _ref.keys,
      userId = _ref.userId;

  state.password_pubkey = keys.passwordPubkey;
  state.encrypted_brainkey = keys.encryptedBrainkey;
  state.encryption_key = keys.encryptionKey;
  state.aes_private = keys.aesPrivate;
  state.created = new Date();
  state.user_id = userId;
  state.valid = true;
}), _defineProperty(_mutations, types.WALLET_CREATE_ERROR, function (state) {
  state.valid = false;
}), _defineProperty(_mutations, types.WALLET_BRAINKEY_BACKUP, function (state) {
  state.brainkey_backup_date = Date();
}), _defineProperty(_mutations, types.WALLET_LOCK, function (state) {
  state.aes_private = null;
}), _defineProperty(_mutations, types.WALLET_UNLOCK, function (state, aesPrivate) {
  state.aes_private = aesPrivate;
}), _mutations);

exports.default = {
  state: initialState,
  mutations: mutations,
  actions: actions,
  getters: getters,
  namespaced: true
};

/***/ }),
/* 102 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./vuex-bitshares/src/services/assets.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bitsharesjsWs = __webpack_require__(/*! bitsharesjs-ws */ 5);

var _utils = __webpack_require__(/*! ../utils */ 26);

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Fetches array of assets from bitsharesjs-ws
 */
var fetch = async function fetch(assets) {
  try {
    var result = await _bitsharesjsWs.Apis.instance().db_api().exec('lookup_asset_symbols', [assets]);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * Returns prices bistory between base and quote assets from the last specified number of days
 * @param {Object} base - base asset object
 * @param {Object} quote - quote asset object
 * @param {number} days - number of days
 */
var fetchPriceHistory = async function fetchPriceHistory(base, quote, days) {
  try {
    var bucketSize = 3600;
    var endDate = new Date();
    var startDate = new Date(endDate - 1000 * 60 * 60 * 24 * days);
    var endDateISO = endDate.toISOString().slice(0, -5);
    var startDateISO = startDate.toISOString().slice(0, -5);
    var history = await _bitsharesjsWs.Apis.instance().history_api().exec('get_market_history', [base.id, quote.id, bucketSize, startDateISO, endDateISO]);
    var prices = utils.formatPrices(utils.getPrices(history), base, quote);
    return prices;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.default = {
  fetch: fetch,
  fetchPriceHistory: fetchPriceHistory
};

/***/ }),
/* 103 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./vuex-bitshares/src/services/user.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bitsharesjsWs = __webpack_require__(/*! bitsharesjs-ws */ 5);

/**
 * Fetches user by name from bitsharesjs-ws
 * @param {string} username - name of user to fetch
 */
var Get = async function Get(username) {
  try {
    var user = await _bitsharesjsWs.Apis.instance().db_api().exec('get_full_accounts', [[username], false]);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.default = {
  Get: Get
};

/***/ }),
/* 104 */
/* exports provided: default */
/* all exports used */
/*!*****************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./client/components/Auth/Auth.vue ***!
  \*****************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_UI_form_input__ = __webpack_require__(/*! @/components/UI/form/input */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_UI_form_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_UI_form_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_UI_icon__ = __webpack_require__(/*! @/components/UI/icon */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_UI_icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_UI_icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__confirm_password__ = __webpack_require__(/*! ./confirm-password */ 74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__confirm_password___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__confirm_password__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = {
  components: { trustyInput: __WEBPACK_IMPORTED_MODULE_0__components_UI_form_input___default.a, iconComponent: __WEBPACK_IMPORTED_MODULE_1__components_UI_icon___default.a, confirmPassword: __WEBPACK_IMPORTED_MODULE_2__confirm_password___default.a }
};

/***/ }),
/* 105 */
/* exports provided: default */
/* all exports used */
/*!*****************************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./client/components/Auth/confirm-password.vue ***!
  \*****************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_UI_form_input___ = __webpack_require__(/*! @/components/UI/form/input/ */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_UI_form_input____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_UI_form_input___);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = {
  components: { trustyInput: __WEBPACK_IMPORTED_MODULE_0__components_UI_form_input____default.a },
  props: {
    onValid: {
      type: Function
    }
  },

  data: function data() {
    return {
      password: '',
      confirm: '',
      error_length: '',
      error_match: '',
      valid: false
    };
  },


  methods: {
    purgeErrors: function purgeErrors() {
      this.error_match = '';
      this.error_length = '';
    },
    validate: function validate() {
      var password = this.password,
          confirm = this.confirm;

      confirm = confirm.trim();
      password = password.trim();
      if (password.length !== 0 && password.length < 8) {
        this.error_length = 'Password must be 8 characters or more';
      } else {
        this.error_length = '';
      }
      if (password !== '' && confirm !== '' && password !== confirm) {
        this.error_match = 'Passwords do not match';
      } else {
        this.error_match = '';
      }
      this.valid = password.length >= 8 && password === confirm;
      if (this.valid) this.purgeErrors();
    }
  }
};

/***/ }),
/* 106 */
/* exports provided: default */
/* all exports used */
/*!*******************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./client/components/Auth/signup.vue ***!
  \*******************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_UI_form_input__ = __webpack_require__(/*! @/components/UI/form/input */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_UI_form_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_UI_form_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_UI_icon__ = __webpack_require__(/*! @/components/UI/icon */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_UI_icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_UI_icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__confirm_password__ = __webpack_require__(/*! ./confirm-password */ 74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__confirm_password___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__confirm_password__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = {
  components: { trustyInput: __WEBPACK_IMPORTED_MODULE_0__components_UI_form_input___default.a, iconComponent: __WEBPACK_IMPORTED_MODULE_1__components_UI_icon___default.a, confirmPassword: __WEBPACK_IMPORTED_MODULE_2__confirm_password___default.a }
};

/***/ }),
/* 107 */
/* exports provided: default */
/* all exports used */
/*!*****************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./client/components/Home/Home.vue ***!
  \*****************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = {
  data: function data() {
    return {
      username: ''
    };
  }
};

/***/ }),
/* 108 */
/* exports provided: default */
/* all exports used */
/*!*********************************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./client/components/Portfolio/ManagePortfolio.vue ***!
  \*********************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ManagePortfolioTab_vue__ = __webpack_require__(/*! ./ManagePortfolioTab.vue */ 216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ManagePortfolioTab_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ManagePortfolioTab_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
  components: { ManagePortfolioTab: __WEBPACK_IMPORTED_MODULE_0__ManagePortfolioTab_vue___default.a }
};

/***/ }),
/* 109 */
/* exports provided: default */
/* all exports used */
/*!************************************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./client/components/Portfolio/ManagePortfolioTab.vue ***!
  \************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_UI_icon__ = __webpack_require__(/*! @/components/UI/icon */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_UI_icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_UI_icon__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = {
  components: { iconComponent: __WEBPACK_IMPORTED_MODULE_0__components_UI_icon___default.a },
  data: function data() {
    return {
      portfolio: [{
        asset: 'BTS',
        percentage: 90
      }, {
        asset: 'DASH',
        percentage: 10
      }]
    };
  }
};

/***/ }),
/* 110 */
/* exports provided: default */
/* all exports used */
/*!***************************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./client/components/Portfolio/Portfolio.vue ***!
  \***************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(/*! vuex */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PortfolioBalance_vue__ = __webpack_require__(/*! ./PortfolioBalance.vue */ 218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PortfolioBalance_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__PortfolioBalance_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = {
  props: {
    balances: {
      required: true,
      type: Object,
      default: {}
    },
    baseId: {
      required: true,
      type: String,
      default: '1.3.0'
    },
    fiatId: {
      required: true,
      type: String,
      default: '1.3.121'
    },
    days: {
      required: true,
      type: Number,
      default: 7
    }
  },
  components: {
    PortfolioBalance: __WEBPACK_IMPORTED_MODULE_1__PortfolioBalance_vue___default.a
  },
  computed: Object.assign({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapGetters */])({
    items: 'portfolio/getPortfolioList'
  }), {
    totalBaseValue: function totalBaseValue() {
      var _this = this;

      return Object.keys(this.items).reduce(function (result, id) {
        return result + _this.items[id].balanceBase;
      }, 0);
    }
  }),
  methods: Object.assign({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapActions */])({
    fetchAssets: 'assets/fetchAssets',
    fetchPortfolioData: 'portfolio/fetchPortfolioData',
    resetPortfolioState: 'portfolio/resetPortfolioState'
  })),
  beforeMount: function beforeMount() {
    var _this2 = this;

    var assetsIds = Object.keys(this.balances);
    this.fetchAssets(assetsIds).then(function () {
      _this2.fetchPortfolioData({
        balances: _this2.balances,
        baseId: _this2.baseId,
        fiatId: _this2.fiatId,
        days: _this2.days
      });
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.resetPortfolioState();
  }
};

/***/ }),
/* 111 */
/* exports provided: default */
/* all exports used */
/*!**********************************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./client/components/Portfolio/PortfolioBalance.vue ***!
  \**********************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = {
  props: {
    item: {
      type: Object,
      required: true,
      default: {}
    },
    totalBaseValue: {
      type: Number,
      required: true,
      default: 1
    }
  },
  data: function data() {
    return {};
  },

  computed: {
    share: function share() {
      return this.item.balanceBase / this.totalBaseValue * 100;
    },
    formattedChange: function formattedChange() {
      return parseInt(this.item.change, 10).toFixed(0);
    }
  }
};

/***/ }),
/* 112 */
/* exports provided: default */
/* all exports used */
/*!**********************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./client/components/Transfer/index.vue ***!
  \**********************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(/*! vuex */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_UI_form_input__ = __webpack_require__(/*! @/components/UI/form/input */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_UI_form_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_UI_form_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_UI_icon__ = __webpack_require__(/*! @/components/UI/icon */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_UI_icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_UI_icon__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = {
  components: { trustyInput: __WEBPACK_IMPORTED_MODULE_1__components_UI_form_input___default.a, iconComponent: __WEBPACK_IMPORTED_MODULE_2__components_UI_icon___default.a },
  watch: {
    amount: function amount(val) {
      this.changeTransferAmount(val);
    },
    service: function service(val) {
      this.setTransferService(val);
    },
    coin: function coin(val) {
      this.changeCoinType(val);
    }
  },
  mounted: function mounted() {
    this.changeCoinType('BTC');
    this.setTransferService('blocktrades');
  },

  methods: Object.assign({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapActions */])('transfer', ['changeCoinType', 'setTransferService', 'changeTransferAmount'])),
  computed: {
    transferServices: function transferServices() {
      return this.isTrustyTransfer ? ['SBERBANK', 'ALIPAY', 'TINKOFF'] : ['blocktrades', 'openledger'];
    },
    isTrustyTransfer: function isTrustyTransfer() {
      return this.coin === 'USD' || this.coin === 'RUB';
    },
    isDeposit: function isDeposit() {
      return this.$route.name === 'deposit';
    },
    depositAddress: function depositAddress() {
      var exists = this.$store.state.transfer.depositAddress;
      var address = exists ? exists.address : null;
      if (address) {
        var firstCount = Math.floor(address.length / 2) - 1;
        var start = address.slice(0, firstCount);
        var end = address.slice(firstCount);
        return '<span>' + start + '</span><br/><span>' + end + '</span>';
      }
      return '<span>no address</span>';
    }
  },
  data: function data() {
    return {
      coin: 'BTC',
      service: 'blocktrades',
      amount: ''
    };
  }
};

/***/ }),
/* 113 */
/* exports provided: default */
/* all exports used */
/*!*********************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./client/components/UI/form/input.vue ***!
  \*********************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_listener__ = __webpack_require__(/*! event-listener */ 162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_listener___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_event_listener__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {

  props: {
    className: {
      type: String,
      default: 'default'
    },
    styleSheet: {
      default: function _default() {
        return {};
      },
      type: Object
    },
    label: {
      default: 'label',
      type: String
    },
    type: {
      default: 'text',
      type: String
    },
    isOpen: {
      default: false,
      type: Boolean
    }
  },

  watch: {
    opened: function opened(val) {
      var _this = this;

      if (val) {
        var current = this.type === 'textarea' ? 'textarea' : 'input';
        var target = this.$refs.input_space.querySelector(current);
        if (target) {
          target.focus();
          this.blur = __WEBPACK_IMPORTED_MODULE_0_event_listener___default()(target, 'blur', function () {
            if (!target.value.length) _this.opened = false;
          });
        }
      }
    }
  },

  mounted: function mounted() {
    if (this.isOpen) this.opened = true;

    var select = this.$refs.right_space.querySelector('select');

    function resize() {
      var fake = this.$refs.right_space.querySelector('.fake_option_width');
      var selected = select.options[select.selectedIndex];
      fake.textContent = selected.text;
      select.style.width = fake.offsetWidth + 25 + 'px';
    }

    if (select) {
      resize.call(this);
      this.resizeSelect = __WEBPACK_IMPORTED_MODULE_0_event_listener___default()(select, 'change', resize.bind(this));
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.blur) this.blur.remove();
    if (this.resizeSelect) this.resizeSelect.remove();
  },
  data: function data() {
    return {
      opened: false
    };
  },


  computed: {
    classes: function classes() {
      return _defineProperty({
        text_area: this.type === 'textarea',
        opened_text_area: this.opened && this.type === 'textarea',
        select_input: this.type === 'select'
      }, this.className, true);
    }
  }
};

/***/ }),
/* 114 */
/* exports provided: default */
/* all exports used */
/*!***************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./client/components/UI/icon.vue ***!
  \***************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

var names = ['trusty-logo-text', 'trusty_arrow', 'trusty_arrow_back', 'trusty_options', 'trusty_arrow_down', 'trusty_arrow_down_landing', 'trusty_input_close', 'trusty_portfolio_arrow_right', 'trusty_owl_small_logo', 'trusty_plus', 'trusty_minus', 'mf_minus', 'mf_plus', 'full_plus', 'full_minus', 'trusty_fund_logo'];

var icons = {};
names.forEach(function (name) {
  icons[name] = __webpack_require__(/*! @/style/icons */ 81)("./" + name + '.svg'); // eslint-disable-line global-require
});

/* harmony default export */ __webpack_exports__["default"] = {

  props: {
    name: {
      default: '',
      type: String
    },
    className: {
      default: '',
      typy: String
    }
  },

  data: function data() {
    return {
      icons: icons
    };
  },

  computed: {
    classes: function classes() {
      return this.name + ' ' + this.className;
    }
  }

};

/***/ }),
/* 115 */
/* exports provided: default */
/* all exports used */
/*!*****************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./client/components/User/User.vue ***!
  \*****************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(/*! vuex */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Portfolio_Portfolio_vue__ = __webpack_require__(/*! ../Portfolio/Portfolio.vue */ 217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Portfolio_Portfolio_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Portfolio_Portfolio_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = {
  name: 'user',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  components: {
    Portfolio: __WEBPACK_IMPORTED_MODULE_1__Portfolio_Portfolio_vue___default.a
  },
  data: function data() {
    return {};
  },

  computed: Object.assign({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapGetters */])({
    account: 'user/getAccountObject',
    userBalances: 'user/getBalances'
  })),
  methods: Object.assign({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapActions */])({
    fetchUser: 'user/fetchUser'
  })),
  beforeMount: function beforeMount() {
    this.fetchUser(this.name);
  }
};

/***/ }),
/* 116 */
/* exports provided: default */
/* all exports used */
/*!********************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vue-loader/lib/selector.js?type=script&index=0!./client/components/header/index.vue ***!
  \********************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_UI_icon__ = __webpack_require__(/*! @/components/UI/icon */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_UI_icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_UI_icon__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
  components: {
    iconComponent: __WEBPACK_IMPORTED_MODULE_0__components_UI_icon___default.a
  },
  data: function data() {
    return {
      titles: {
        signup: 'signup',
        login: 'login',
        deposit: 'deposit details',
        withdraw: 'withdraw',
        manage: 'manage fund'
      }
    };
  },

  methods: {
    backAction: function backAction() {
      this.$router.push({ name: 'home' });
    }
  },
  computed: {
    isProfilePage: function isProfilePage() {
      return this.$route.path.indexOf('home') !== -1 || this.$route.name === 'home';
    },
    getTitle: function getTitle() {
      return this.titles[this.$route.name];
    }
  }
};

/***/ }),
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** ./~/bigi/package.json ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = {"_from":"bigi@^1.4.2","_id":"bigi@1.4.2","_inBundle":false,"_integrity":"sha1-nGZalfiLiwj8Bc/XMfVhhZ1yWCU=","_location":"/bigi","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"bigi@^1.4.2","name":"bigi","escapedName":"bigi","rawSpec":"^1.4.2","saveSpec":null,"fetchSpec":"^1.4.2"},"_requiredBy":["/bitsharesjs","/ecurve"],"_resolved":"https://registry.npmjs.org/bigi/-/bigi-1.4.2.tgz","_shasum":"9c665a95f88b8b08fc05cfd731f561859d725825","_spec":"bigi@^1.4.2","_where":"/home/roman/work/trusty/trusty-ui-vue/node_modules/bitsharesjs","bugs":{"url":"https://github.com/cryptocoinjs/bigi/issues"},"bundleDependencies":false,"dependencies":{},"deprecated":false,"description":"Big integers.","devDependencies":{"coveralls":"^2.11.2","istanbul":"^0.3.5","jshint":"^2.5.1","mocha":"^2.1.0","mochify":"^2.1.0"},"homepage":"https://github.com/cryptocoinjs/bigi#readme","keywords":["cryptography","math","bitcoin","arbitrary","precision","arithmetic","big","integer","int","number","biginteger","bigint","bignumber","decimal","float"],"main":"./lib/index.js","name":"bigi","repository":{"url":"git+https://github.com/cryptocoinjs/bigi.git","type":"git"},"scripts":{"browser-test":"mochify --wd -R spec","coverage":"istanbul cover ./node_modules/.bin/_mocha -- --reporter list test/*.js","coveralls":"npm run-script coverage && node ./node_modules/.bin/coveralls < coverage/lcov.info","jshint":"jshint --config jshint.json lib/*.js ; true","test":"_mocha -- test/*.js","unit":"mocha"},"testling":{"files":"test/*.js","harness":"mocha","browsers":["ie/9..latest","firefox/latest","chrome/latest","safari/6.0..latest","iphone/6.0..latest","android-browser/4.2..latest"]},"version":"1.4.2"}

/***/ }),
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** ./~/ecurve/lib/curves.json ***!
  \**********************************/
/***/ (function(module, exports) {

module.exports = {"secp128r1":{"p":"fffffffdffffffffffffffffffffffff","a":"fffffffdfffffffffffffffffffffffc","b":"e87579c11079f43dd824993c2cee5ed3","n":"fffffffe0000000075a30d1b9038a115","h":"01","Gx":"161ff7528b899b2d0c28607ca52c5b86","Gy":"cf5ac8395bafeb13c02da292dded7a83"},"secp160k1":{"p":"fffffffffffffffffffffffffffffffeffffac73","a":"00","b":"07","n":"0100000000000000000001b8fa16dfab9aca16b6b3","h":"01","Gx":"3b4c382ce37aa192a4019e763036f4f5dd4d7ebb","Gy":"938cf935318fdced6bc28286531733c3f03c4fee"},"secp160r1":{"p":"ffffffffffffffffffffffffffffffff7fffffff","a":"ffffffffffffffffffffffffffffffff7ffffffc","b":"1c97befc54bd7a8b65acf89f81d4d4adc565fa45","n":"0100000000000000000001f4c8f927aed3ca752257","h":"01","Gx":"4a96b5688ef573284664698968c38bb913cbfc82","Gy":"23a628553168947d59dcc912042351377ac5fb32"},"secp192k1":{"p":"fffffffffffffffffffffffffffffffffffffffeffffee37","a":"00","b":"03","n":"fffffffffffffffffffffffe26f2fc170f69466a74defd8d","h":"01","Gx":"db4ff10ec057e9ae26b07d0280b7f4341da5d1b1eae06c7d","Gy":"9b2f2f6d9c5628a7844163d015be86344082aa88d95e2f9d"},"secp192r1":{"p":"fffffffffffffffffffffffffffffffeffffffffffffffff","a":"fffffffffffffffffffffffffffffffefffffffffffffffc","b":"64210519e59c80e70fa7e9ab72243049feb8deecc146b9b1","n":"ffffffffffffffffffffffff99def836146bc9b1b4d22831","h":"01","Gx":"188da80eb03090f67cbf20eb43a18800f4ff0afd82ff1012","Gy":"07192b95ffc8da78631011ed6b24cdd573f977a11e794811"},"secp256k1":{"p":"fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f","a":"00","b":"07","n":"fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141","h":"01","Gx":"79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","Gy":"483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8"},"secp256r1":{"p":"ffffffff00000001000000000000000000000000ffffffffffffffffffffffff","a":"ffffffff00000001000000000000000000000000fffffffffffffffffffffffc","b":"5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b","n":"ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551","h":"01","Gx":"6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296","Gy":"4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"}}

/***/ }),
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */
/* unknown exports provided */
/*!*********************************!*\
  !*** ./client/style/index.scss ***!
  \*********************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 164 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader?sourceMap&-autoprefixer!./~/vue-loader/lib/style-compiler?{"id":"data-v-05e9da12","scoped":false,"hasInlineConfig":false}!./~/sass-loader/lib/loader.js?sourceMap!./~/vue-loader/lib/selector.js?type=styles&index=0!./client/components/Portfolio/ManagePortfolioTab.vue ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 165 */
/* unknown exports provided */
/* all exports used */
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader?sourceMap&-autoprefixer!./~/vue-loader/lib/style-compiler?{"id":"data-v-1ea95387","scoped":false,"hasInlineConfig":false}!./~/sass-loader/lib/loader.js?sourceMap!./~/vue-loader/lib/selector.js?type=styles&index=0!./client/components/Transfer/index.vue ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 166 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader?sourceMap&-autoprefixer!./~/vue-loader/lib/style-compiler?{"id":"data-v-2185f866","scoped":false,"hasInlineConfig":false}!./~/sass-loader/lib/loader.js?sourceMap!./~/vue-loader/lib/selector.js?type=styles&index=0!./client/components/Home/Home.vue ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 167 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader?sourceMap&-autoprefixer!./~/vue-loader/lib/style-compiler?{"id":"data-v-2aa1abe6","scoped":false,"hasInlineConfig":false}!./~/sass-loader/lib/loader.js?sourceMap!./~/vue-loader/lib/selector.js?type=styles&index=0!./client/components/User/User.vue ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 168 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader?sourceMap&-autoprefixer!./~/vue-loader/lib/style-compiler?{"id":"data-v-2b913e06","scoped":false,"hasInlineConfig":false}!./~/sass-loader/lib/loader.js?sourceMap!./~/vue-loader/lib/selector.js?type=styles&index=0!./client/components/Auth/Auth.vue ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 169 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader?sourceMap&-autoprefixer!./~/vue-loader/lib/style-compiler?{"id":"data-v-3377a633","scoped":false,"hasInlineConfig":false}!./~/sass-loader/lib/loader.js?sourceMap!./~/vue-loader/lib/selector.js?type=styles&index=0!./client/components/Portfolio/ManagePortfolio.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 170 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader?sourceMap&-autoprefixer!./~/vue-loader/lib/style-compiler?{"id":"data-v-3d5118ab","scoped":false,"hasInlineConfig":false}!./~/sass-loader/lib/loader.js?sourceMap!./~/vue-loader/lib/selector.js?type=styles&index=0!./client/components/UI/icon.vue ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 171 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader?sourceMap&-autoprefixer!./~/vue-loader/lib/style-compiler?{"id":"data-v-46681b74","scoped":false,"hasInlineConfig":false}!./~/sass-loader/lib/loader.js?sourceMap!./~/vue-loader/lib/selector.js?type=styles&index=0!./client/components/Auth/confirm-password.vue ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 172 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader?sourceMap&-autoprefixer!./~/vue-loader/lib/style-compiler?{"id":"data-v-475f571e","scoped":false,"hasInlineConfig":false}!./~/sass-loader/lib/loader.js?sourceMap!./~/vue-loader/lib/selector.js?type=styles&index=0!./client/components/UI/form/input.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 173 */
/* unknown exports provided */
/* all exports used */
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader?sourceMap&-autoprefixer!./~/vue-loader/lib/style-compiler?{"id":"data-v-5ded8758","scoped":false,"hasInlineConfig":false}!./~/sass-loader/lib/loader.js?sourceMap!./~/vue-loader/lib/selector.js?type=styles&index=0!./client/components/Portfolio/PortfolioBalance.vue ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 174 */
/* unknown exports provided */
/* all exports used */
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader?sourceMap&-autoprefixer!./~/vue-loader/lib/style-compiler?{"id":"data-v-a7bb186e","scoped":false,"hasInlineConfig":false}!./~/sass-loader/lib/loader.js?sourceMap!./~/vue-loader/lib/selector.js?type=styles&index=0!./client/components/header/index.vue ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 175 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!./~/vue-style-loader!./~/css-loader?sourceMap&-autoprefixer!./~/vue-loader/lib/style-compiler?{"id":"data-v-b77adcd0","scoped":false,"hasInlineConfig":false}!./~/sass-loader/lib/loader.js?sourceMap!./~/vue-loader/lib/selector.js?type=styles&index=0!./client/components/Portfolio/Portfolio.vue ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./client/style/icons/full_minus.svg ***!
  \*******************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<!-- Creator: CorelDRAW X7 -->\n<svg xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" width=\"14.6404mm\" height=\"14.6404mm\" version=\"1.1\" style=\"shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd\"\nviewBox=\"0 0 75 75\"\n xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n <defs>\n  <style type=\"text/css\">\n   <![CDATA[\n    .fil0 {fill:#FEFEFE}\n   ]]>\n  </style>\n </defs>\n <g id=\"Слой_x0020_1\">\n  <metadata id=\"CorelCorpID_0Corel-Layer\"/>\n  <path class=\"fil0\" d=\"M11 35l50 0 0 2 -50 0 0 -2zm25 -35c-20,0 -36,16 -36,36 0,20 16,36 36,36 20,0 36,-16 36,-36 0,-20 -16,-36 -36,-36z\"/>\n </g>\n</svg>\n"

/***/ }),
/* 183 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./client/style/icons/full_plus.svg ***!
  \******************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<!-- Creator: CorelDRAW X7 -->\n<svg xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" width=\"14.6404mm\" height=\"14.6404mm\" version=\"1.1\" style=\"shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd\"\nviewBox=\"0 0 2466 2466\"\n xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n <defs>\n  <style type=\"text/css\">\n   <![CDATA[\n    .fil0 {fill:#FEFEFE}\n   ]]>\n  </style>\n </defs>\n <g id=\"Слой_x0020_1\">\n  <metadata id=\"CorelCorpID_0Corel-Layer\"/>\n  <path class=\"fil0\" d=\"M1922 1173l-749 0 0 749 -80 0 0 -749 -749 0 0 -80 749 0 0 -749 80 0 0 749 749 0 0 80zm-789 -1173c-625,0 -1133,508 -1133,1133 0,625 508,1133 1133,1133 625,0 1133,-508 1133,-1133 0,-625 -508,-1133 -1133,-1133z\"/>\n </g>\n</svg>\n"

/***/ }),
/* 184 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./client/style/icons/mf_minus.svg ***!
  \*****************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t width=\"39.202px\" height=\"2px\" viewBox=\"8.899 27.5 39.202 2\" enable-background=\"new 8.899 27.5 39.202 2\" xml:space=\"preserve\">\n<rect x=\"8.899\" y=\"27.5\" fill=\"#FFFFFF\" width=\"39.202\" height=\"2\"/>\n</svg>\n"

/***/ }),
/* 185 */
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./client/style/icons/mf_plus.svg ***!
  \****************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t width=\"39.201px\" height=\"39.2px\" viewBox=\"8.902 8.9 39.201 39.2\" enable-background=\"new 8.902 8.9 39.201 39.2\"\n\t xml:space=\"preserve\">\n<g id=\"Layer_4\">\n</g>\n<polygon fill=\"none\" points=\"29.502,27.5 29.502,8.9 27.502,8.9 27.502,27.5 8.902,27.5 8.902,29.5 27.502,29.5 27.502,48.1 \n\t29.502,48.1 29.502,29.5 48.103,29.5 48.103,27.5 \"/>\n</svg>\n"

/***/ }),
/* 186 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./client/style/icons/trusty-logo-text.svg ***!
  \*************************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t width=\"260.046px\" height=\"23.779px\" viewBox=\"0 0 260.046 23.779\" enable-background=\"new 0 0 260.046 23.779\"\n\t xml:space=\"preserve\">\n<g>\n\t<path d=\"M0,0h20.29v3.375h-8.381v20.29H8.306V3.375H0V0z\"/>\n\t<path d=\"M41.679,23.665l-6.561-12.895h4.285c0.48,0,0.897-0.114,1.251-0.341s0.645-0.518,0.873-0.872\n\t\tc0.228-0.354,0.392-0.746,0.493-1.176c0.101-0.43,0.152-0.834,0.152-1.213c0-0.404-0.07-0.828-0.208-1.271\n\t\tc-0.139-0.442-0.329-0.854-0.569-1.232c-0.241-0.379-0.538-0.689-0.891-0.929c-0.354-0.24-0.759-0.36-1.214-0.36H28.633v20.29\n\t\th-3.565V0h14.715c0.834,0,1.618,0.184,2.351,0.55c0.733,0.367,1.378,0.873,1.935,1.517c0.556,0.645,0.999,1.41,1.327,2.294\n\t\tc0.328,0.885,0.493,1.833,0.493,2.844c0,0.834-0.133,1.638-0.398,2.408c-0.265,0.772-0.632,1.473-1.1,2.105\n\t\tc-0.468,0.632-1.018,1.157-1.65,1.574c-0.632,0.417-1.315,0.688-2.048,0.815l4.854,9.557H41.679z\"/>\n\t<path d=\"M50.477,0h3.603v12.971c0.126,1.011,0.442,1.959,0.948,2.844c0.505,0.886,1.138,1.656,1.896,2.313\n\t\tc0.758,0.658,1.618,1.176,2.579,1.555c0.96,0.38,1.972,0.569,3.034,0.569s2.073-0.189,3.034-0.569\n\t\tc0.96-0.379,1.813-0.896,2.56-1.555c0.746-0.657,1.365-1.428,1.858-2.313c0.493-0.885,0.802-1.833,0.929-2.844V0h3.641v11.908\n\t\tc0,1.644-0.316,3.186-0.948,4.627c-0.632,1.441-1.486,2.699-2.56,3.773c-1.075,1.075-2.345,1.922-3.812,2.541\n\t\tc-1.466,0.62-3.034,0.93-4.703,0.93c-1.668,0-3.236-0.31-4.703-0.93c-1.467-0.619-2.744-1.466-3.831-2.541\n\t\tc-1.087-1.074-1.947-2.332-2.579-3.773c-0.632-1.441-0.948-2.983-0.948-4.627V0z\"/>\n\t<path d=\"M99.589,3.375H86.164c-1.138,0-1.985,0.322-2.541,0.967c-0.557,0.645-0.834,1.46-0.834,2.446\n\t\tc0,0.885,0.228,1.618,0.683,2.2c0.455,0.582,1.188,0.974,2.2,1.176v3.375c-0.885,0-1.726-0.177-2.522-0.531\n\t\tc-0.796-0.354-1.492-0.84-2.086-1.459c-0.594-0.62-1.062-1.34-1.403-2.162c-0.341-0.821-0.512-1.688-0.512-2.598\n\t\tc0-1.011,0.158-1.934,0.474-2.769c0.316-0.834,0.745-1.548,1.29-2.143c0.543-0.594,1.188-1.056,1.934-1.384\n\t\tC83.591,0.165,84.381,0,85.216,0h14.374V3.375z M79.527,20.29h13.387c1.138,0,1.984-0.322,2.541-0.968\n\t\tc0.556-0.645,0.834-1.46,0.834-2.445c0-0.859-0.228-1.58-0.683-2.162c-0.455-0.581-1.188-0.973-2.199-1.176v-3.413\n\t\tc0.884,0,1.726,0.177,2.522,0.531c0.796,0.354,1.491,0.841,2.085,1.46c0.594,0.62,1.068,1.34,1.422,2.161\n\t\tc0.354,0.822,0.531,1.688,0.531,2.599c0,1.011-0.165,1.934-0.493,2.769c-0.329,0.834-0.765,1.549-1.309,2.143\n\t\tc-0.544,0.594-1.188,1.056-1.934,1.384c-0.746,0.329-1.536,0.493-2.37,0.493H79.527V20.29z\"/>\n\t<path d=\"M104.443,0h20.29v3.375h-8.381v20.29h-3.603V3.375h-8.306V0z\"/>\n\t<path d=\"M138.233,23.665v-8.268L127.994,0h4.438l7.547,11.226L147.791,0h4.398l-10.314,15.208v8.457H138.233z\"/>\n\t<path d=\"M150.142,21.238c0-0.733,0.228-1.334,0.683-1.802s1.049-0.702,1.783-0.702c0.732,0,1.34,0.234,1.82,0.702\n\t\tc0.479,0.468,0.721,1.068,0.721,1.802s-0.241,1.333-0.721,1.801c-0.48,0.469-1.088,0.702-1.82,0.702\n\t\tc-0.734,0-1.328-0.233-1.783-0.702C150.369,22.571,150.142,21.972,150.142,21.238z\"/>\n\t<path d=\"M159.319,0h18.014v3.375h-14.449v20.29h-3.564V0z M177.067,14.146h-11.832v-3.375h11.832V14.146z\"/>\n\t<path d=\"M182.226,0h3.603v12.971c0.126,1.011,0.442,1.959,0.948,2.844c0.505,0.886,1.138,1.656,1.896,2.313\n\t\tc0.758,0.658,1.617,1.176,2.578,1.555c0.961,0.38,1.973,0.569,3.034,0.569s2.073-0.189,3.034-0.569\n\t\tc0.96-0.379,1.813-0.896,2.56-1.555c0.746-0.657,1.365-1.428,1.858-2.313c0.493-0.885,0.803-1.833,0.93-2.844V0h3.641v11.908\n\t\tc0,1.644-0.316,3.186-0.948,4.627c-0.633,1.441-1.485,2.699-2.561,3.773c-1.074,1.075-2.345,1.922-3.811,2.541\n\t\tc-1.467,0.62-3.034,0.93-4.703,0.93s-3.236-0.31-4.702-0.93c-1.467-0.619-2.744-1.466-3.831-2.541\n\t\tc-1.087-1.074-1.947-2.332-2.579-3.773s-0.947-2.983-0.947-4.627V0z\"/>\n\t<path d=\"M214.765,4.361v19.304H211.2V0h5.006l13.425,19.228V0h3.641v23.665h-4.816L214.765,4.361z\"/>\n\t<path d=\"M238.164,23.665V0h9.897c1.669,0,3.23,0.31,4.685,0.929c1.453,0.62,2.724,1.473,3.811,2.56\n\t\tc1.087,1.087,1.94,2.351,2.561,3.792c0.619,1.441,0.929,2.983,0.929,4.626c0,1.644-0.341,3.18-1.023,4.608\n\t\ts-1.581,2.674-2.693,3.735s-2.383,1.896-3.811,2.503c-1.429,0.606-2.89,0.91-4.381,0.91H238.164z M241.729,3.451v16.801h6.333\n\t\tc1.063,0,2.099-0.221,3.11-0.664c1.011-0.441,1.915-1.043,2.712-1.801c0.796-0.759,1.44-1.644,1.934-2.655\n\t\tc0.493-1.011,0.739-2.072,0.739-3.186c0-1.138-0.228-2.219-0.683-3.243s-1.068-1.921-1.839-2.692\n\t\tc-0.771-0.771-1.669-1.39-2.692-1.858c-1.024-0.467-2.105-0.702-3.243-0.702H241.729z\"/>\n</g>\n</svg>\n"

/***/ }),
/* 187 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./client/style/icons/trusty_arrow.svg ***!
  \*********************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background=\"new 0 0 32 32\" height=\"32px\" id=\"Слой_1\" version=\"1.1\" viewBox=\"0 0 32 32\" width=\"32px\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><path clip-rule=\"evenodd\" d=\"M21.698,15.286l-9.002-8.999  c-0.395-0.394-1.035-0.394-1.431,0c-0.395,0.394-0.395,1.034,0,1.428L19.553,16l-8.287,8.285c-0.395,0.394-0.395,1.034,0,1.429  c0.395,0.394,1.036,0.394,1.431,0l9.002-8.999C22.088,16.325,22.088,15.675,21.698,15.286z\" fill=\"#ffffff\" fill-rule=\"evenodd\" id=\"Chevron_Right\"/><g/><g/><g/><g/><g/><g/></svg>"

/***/ }),
/* 188 */
/* unknown exports provided */
/* all exports used */
/*!**************************************************!*\
  !*** ./client/style/icons/trusty_arrow_back.svg ***!
  \**************************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t width=\"23.529px\" height=\"40.001px\" viewBox=\"0 0 23.529 40.001\" enable-background=\"new 0 0 23.529 40.001\" xml:space=\"preserve\">\n<polygon fill=\"#FFFFFF\" points=\"23.529,3.619 19.928,0 0,20 19.928,40.001 23.529,36.382 7.209,20 \"/>\n</svg>\n"

/***/ }),
/* 189 */
/* unknown exports provided */
/* all exports used */
/*!**************************************************!*\
  !*** ./client/style/icons/trusty_arrow_down.svg ***!
  \**************************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t width=\"28px\" height=\"16.47px\" viewBox=\"0 0 28 16.47\" enable-background=\"new 0 0 28 16.47\" xml:space=\"preserve\">\n<polygon points=\"2.533,0 0,2.521 14,16.47 28,2.521 25.467,0 14,11.425 \"/>\n</svg>\n"

/***/ }),
/* 190 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************!*\
  !*** ./client/style/icons/trusty_arrow_down_landing.svg ***!
  \**********************************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t width=\"62.178px\" height=\"32.18px\" viewBox=\"0 0 62.178 32.18\" enable-background=\"new 0 0 62.178 32.18\" xml:space=\"preserve\">\n<g id=\"bgr\">\n</g>\n<g id=\"Layer_2\">\n\t<polygon points=\"58.876,0.004 31.04,25.353 3.295,0 0,3.829 31.067,32.18 62.178,3.828 \t\"/>\n</g>\n</svg>\n"

/***/ }),
/* 191 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./client/style/icons/trusty_fund_logo.svg ***!
  \*************************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t width=\"260.046px\" height=\"23.779px\" viewBox=\"0 0 260.046 23.779\" enable-background=\"new 0 0 260.046 23.779\"\n\t xml:space=\"preserve\">\n<g>\n\t<path d=\"M0,0h20.29v3.375h-8.381v20.29H8.306V3.375H0V0z\"/>\n\t<path d=\"M41.679,23.665l-6.561-12.895h4.285c0.48,0,0.897-0.114,1.251-0.341s0.645-0.518,0.873-0.872\n\t\tc0.228-0.354,0.392-0.746,0.493-1.176c0.101-0.43,0.152-0.834,0.152-1.213c0-0.404-0.07-0.828-0.208-1.271\n\t\tc-0.139-0.442-0.329-0.854-0.569-1.232c-0.241-0.379-0.538-0.689-0.891-0.929c-0.354-0.24-0.759-0.36-1.214-0.36H28.633v20.29\n\t\th-3.565V0h14.715c0.834,0,1.618,0.184,2.351,0.55c0.733,0.367,1.378,0.873,1.935,1.517c0.556,0.645,0.999,1.41,1.327,2.294\n\t\tc0.328,0.885,0.493,1.833,0.493,2.844c0,0.834-0.133,1.638-0.398,2.408c-0.265,0.772-0.632,1.473-1.1,2.105\n\t\tc-0.468,0.632-1.018,1.157-1.65,1.574c-0.632,0.417-1.315,0.688-2.048,0.815l4.854,9.557H41.679z\"/>\n\t<path d=\"M50.477,0h3.603v12.971c0.126,1.011,0.442,1.959,0.948,2.844c0.505,0.886,1.138,1.656,1.896,2.313\n\t\tc0.758,0.658,1.618,1.176,2.579,1.555c0.96,0.38,1.972,0.569,3.034,0.569s2.073-0.189,3.034-0.569\n\t\tc0.96-0.379,1.813-0.896,2.56-1.555c0.746-0.657,1.365-1.428,1.858-2.313c0.493-0.885,0.802-1.833,0.929-2.844V0h3.641v11.908\n\t\tc0,1.644-0.316,3.186-0.948,4.627c-0.632,1.441-1.486,2.699-2.56,3.773c-1.075,1.075-2.345,1.922-3.812,2.541\n\t\tc-1.466,0.62-3.034,0.93-4.703,0.93c-1.668,0-3.236-0.31-4.703-0.93c-1.467-0.619-2.744-1.466-3.831-2.541\n\t\tc-1.087-1.074-1.947-2.332-2.579-3.773c-0.632-1.441-0.948-2.983-0.948-4.627V0z\"/>\n\t<path d=\"M99.589,3.375H86.164c-1.138,0-1.985,0.322-2.541,0.967c-0.557,0.645-0.834,1.46-0.834,2.446\n\t\tc0,0.885,0.228,1.618,0.683,2.2c0.455,0.582,1.188,0.974,2.2,1.176v3.375c-0.885,0-1.726-0.177-2.522-0.531\n\t\tc-0.796-0.354-1.492-0.84-2.086-1.459c-0.594-0.62-1.062-1.34-1.403-2.162c-0.341-0.821-0.512-1.688-0.512-2.598\n\t\tc0-1.011,0.158-1.934,0.474-2.769c0.316-0.834,0.745-1.548,1.29-2.143c0.543-0.594,1.188-1.056,1.934-1.384\n\t\tC83.591,0.165,84.381,0,85.216,0h14.374V3.375z M79.527,20.29h13.387c1.138,0,1.984-0.322,2.541-0.968\n\t\tc0.556-0.645,0.834-1.46,0.834-2.445c0-0.859-0.228-1.58-0.683-2.162c-0.455-0.581-1.188-0.973-2.199-1.176v-3.413\n\t\tc0.884,0,1.726,0.177,2.522,0.531c0.796,0.354,1.491,0.841,2.085,1.46c0.594,0.62,1.068,1.34,1.422,2.161\n\t\tc0.354,0.822,0.531,1.688,0.531,2.599c0,1.011-0.165,1.934-0.493,2.769c-0.329,0.834-0.765,1.549-1.309,2.143\n\t\tc-0.544,0.594-1.188,1.056-1.934,1.384c-0.746,0.329-1.536,0.493-2.37,0.493H79.527V20.29z\"/>\n\t<path d=\"M104.443,0h20.29v3.375h-8.381v20.29h-3.603V3.375h-8.306V0z\"/>\n\t<path d=\"M138.233,23.665v-8.268L127.994,0h4.438l7.547,11.226L147.791,0h4.398l-10.314,15.208v8.457H138.233z\"/>\n\n</g>\n</svg>\n"

/***/ }),
/* 192 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./client/style/icons/trusty_input_close.svg ***!
  \***************************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"32px\"\n\t height=\"32px\" viewBox=\"0 0 32 32\" enable-background=\"new 0 0 32 32\" xml:space=\"preserve\">\n<g id=\"Layer_1\">\n</g>\n<g id=\"Layer_2\">\n\t<g>\n\t\t<rect x=\"14.982\" y=\"-5.61\" transform=\"matrix(0.7073 0.7069 -0.7069 0.7073 15.9925 -6.6278)\" width=\"2.036\" height=\"43.219\"/>\n\t\t<rect x=\"-5.609\" y=\"14.982\" transform=\"matrix(0.7071 0.7071 -0.7071 0.7071 16.0001 -6.6278)\" width=\"43.219\" height=\"2.036\"/>\n\t</g>\n</g>\n<g id=\"Layer_3\">\n</g>\n<g id=\"comments\">\n</g>\n<g id=\"pop-ups\">\n</g>\n</svg>\n"

/***/ }),
/* 193 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./client/style/icons/trusty_minus.svg ***!
  \*********************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t width=\"57.002px\" height=\"57px\" viewBox=\"0 0 58 58\" enable-background=\"new 0 0 57.002 57\" xml:space=\"preserve\">\n<path fill=\"#FFFFFF\" d=\"M28.501,0.347C12.978,0.347,0.348,12.977,0.348,28.5s12.629,28.152,28.153,28.152S56.653,44.023,56.653,28.5\n\tS44.024,0.347,28.501,0.347z M28.501,54.652C14.08,54.652,2.348,42.921,2.348,28.5S14.08,2.347,28.501,2.347\n\tS54.653,14.079,54.653,28.5S42.922,54.652,28.501,54.652z M8.899,27.5v2h39.202v-2H8.899z\"/>\n</svg>\n"

/***/ }),
/* 194 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./client/style/icons/trusty_options.svg ***!
  \***********************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t width=\"40px\" height=\"40px\" viewBox=\"0 0 40 40\" enable-background=\"new 0 0 40 40\" xml:space=\"preserve\">\n<path fill=\"#FFFFFF\" d=\"M40,22.722v-5.444l-5.34-0.801c-0.373-1.56-0.984-3.024-1.801-4.353l3.209-4.341l-3.852-3.85l-4.342,3.208\n\tc-1.328-0.814-2.793-1.427-4.352-1.801L22.723,0h-5.445l-0.801,5.34c-1.559,0.374-3.025,0.986-4.354,1.801l-4.34-3.208l-3.85,3.85\n\tl3.209,4.341c-0.816,1.329-1.43,2.793-1.803,4.353L0,17.278v5.444l5.34,0.802c0.373,1.558,0.986,3.024,1.803,4.353l-3.209,4.34\n\tl3.85,3.851l4.34-3.209c1.328,0.816,2.795,1.429,4.354,1.803L17.277,40h5.445l0.801-5.339c1.559-0.374,3.023-0.986,4.352-1.803\n\tl4.342,3.209l3.852-3.851l-3.209-4.34c0.816-1.328,1.428-2.795,1.801-4.353L40,22.722z M20,30.13\n\tc-5.594,0-10.129-4.535-10.129-10.13c0-5.594,4.535-10.129,10.129-10.129c5.596,0,10.131,4.535,10.131,10.129\n\tC30.131,25.595,25.596,30.13,20,30.13z\"/>\n</svg>\n"

/***/ }),
/* 195 */
/* unknown exports provided */
/* all exports used */
/*!******************************************************!*\
  !*** ./client/style/icons/trusty_owl_small_logo.svg ***!
  \******************************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t width=\"255.428px\" height=\"252.001px\" viewBox=\"0 0 255.428 252.001\" enable-background=\"new 0 0 255.428 252.001\"\n\t xml:space=\"preserve\">\n<g id=\"Layer_4\">\n</g>\n<g id=\"Layer_1\">\n\t<g>\n\t\t<path d=\"M84.541,112.692c-10.569,0-19.167-8.597-19.167-19.164c0-7.019,3.831-13.469,9.997-16.833\n\t\t\tc0.486-0.265,1.093-0.085,1.357,0.399c0.265,0.484,0.086,1.092-0.399,1.356c-5.523,3.014-8.955,8.791-8.955,15.077\n\t\t\tc0,9.464,7.701,17.164,17.167,17.164c9.462,0,17.16-7.7,17.16-17.164c0-2.248-0.547-4.546-1.673-7.023\n\t\t\tc-0.228-0.503-0.006-1.096,0.497-1.324c0.501-0.231,1.095-0.007,1.324,0.496c1.246,2.743,1.852,5.312,1.852,7.852\n\t\t\tC103.701,104.096,95.106,112.692,84.541,112.692z\"/>\n\t\t<path d=\"M84.541,101.458c-4.07,0-7.381-3.312-7.381-7.381s3.311-7.381,7.381-7.381c4.071,0,7.383,3.312,7.383,7.381\n\t\t\tS88.612,101.458,84.541,101.458z M84.541,88.696c-2.967,0-5.381,2.414-5.381,5.381s2.414,5.381,5.381,5.381\n\t\t\tc2.968,0,5.383-2.414,5.383-5.381S87.509,88.696,84.541,88.696z\"/>\n\t\t<path d=\"M170.888,112.692c-10.565,0-19.161-8.597-19.161-19.164c0-2.536,0.605-5.104,1.849-7.851\n\t\t\tc0.227-0.504,0.82-0.727,1.323-0.498s0.726,0.82,0.498,1.324c-1.124,2.48-1.67,4.778-1.67,7.024\n\t\t\tc0,9.464,7.698,17.164,17.161,17.164c9.461,0,17.159-7.7,17.159-17.164c0-6.284-3.428-12.063-8.947-15.077\n\t\t\tc-0.485-0.266-0.663-0.873-0.398-1.357c0.265-0.484,0.871-0.663,1.357-0.398c6.161,3.367,9.988,9.816,9.988,16.833\n\t\t\tC190.047,104.096,181.452,112.692,170.888,112.692z\"/>\n\t\t<path d=\"M170.888,101.458c-4.072,0-7.385-3.312-7.385-7.381s3.313-7.381,7.385-7.381c4.067,0,7.376,3.312,7.376,7.381\n\t\t\tS174.955,101.458,170.888,101.458z M170.888,88.696c-2.969,0-5.385,2.414-5.385,5.381s2.416,5.381,5.385,5.381\n\t\t\tc2.964,0,5.376-2.414,5.376-5.381S173.852,88.696,170.888,88.696z\"/>\n\t\t<path d=\"M46.378,9.706c-0.06,0-0.121-0.005-0.182-0.017L4.246,1.984c-0.543-0.1-0.903-0.621-0.803-1.164\n\t\t\tc0.1-0.543,0.62-0.904,1.164-0.803l41.95,7.705c0.543,0.1,0.903,0.621,0.803,1.164C47.272,9.369,46.852,9.706,46.378,9.706z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM38.188,11.276\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM67.287,29.62\"/>\n\t\t<path d=\"M127.715,96.179c-0.227,0-0.453-0.076-0.639-0.23L84.022,60.235c-0.425-0.353-0.483-0.982-0.131-1.408\n\t\t\tc0.353-0.424,0.983-0.484,1.408-0.131l38.379,31.835L98.243,49.225c-0.29-0.471-0.143-1.086,0.327-1.376\n\t\t\tc0.471-0.291,1.086-0.143,1.376,0.327l28.62,46.479c0.257,0.417,0.174,0.958-0.196,1.279\n\t\t\tC128.183,96.097,127.949,96.179,127.715,96.179z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM59.463,21.794\"/>\n\t\t<path d=\"M127.715,96.179c-0.106,0-0.215-0.017-0.321-0.053L47.034,68.851c-0.204-0.069-0.379-0.202-0.501-0.379l-17.67-25.563\n\t\t\tc-0.314-0.454-0.2-1.077,0.254-1.391c0.456-0.314,1.078-0.201,1.392,0.254l17.482,25.29l80.046,27.169\n\t\t\tc0.523,0.178,0.803,0.746,0.625,1.269C128.521,95.917,128.131,96.179,127.715,96.179z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM117.191,46.255\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM127.715,23.993\"/>\n\t\t<path d=\"M127.716,24.993c-0.069,0-0.14-0.007-0.21-0.022l-34.073-7.3l-33.82,5.112c-0.543,0.072-1.056-0.294-1.138-0.84\n\t\t\ts0.293-1.056,0.839-1.139l34.001-5.139c0.12-0.017,0.242-0.013,0.359,0.012l34.251,7.338c0.54,0.115,0.884,0.647,0.769,1.188\n\t\t\tC128.592,24.672,128.177,24.993,127.716,24.993z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM93.464,16.655\"/>\n\t\t<path d=\"M99.095,49.7c-0.18,0-0.358-0.049-0.514-0.143l-31.808-19.08c-0.07-0.042-0.135-0.093-0.192-0.15L45.67,9.413\n\t\t\tc-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0l20.823,20.827l31.401,18.836l17.749-2.398l10.6-0.616\n\t\t\tc0.557-0.029,1.024,0.389,1.056,0.94c0.032,0.551-0.389,1.024-0.941,1.056l-10.523,0.609l-18.021,2.438\n\t\t\tC99.184,49.697,99.139,49.7,99.095,49.7z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM35.186,24.913\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM87.656,127.985\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM114.75,108.142\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM127.715,95.179\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM69.011,63.624\"/>\n\t\t<path d=\"M84.66,60.466c-0.169,0-0.34-0.043-0.497-0.133L64.511,49.047l-34.987-5.719c-0.545-0.09-0.915-0.604-0.826-1.148\n\t\t\tc0.089-0.544,0.598-0.913,1.148-0.826l35.166,5.748c0.119,0.02,0.233,0.061,0.337,0.12l19.81,11.377\n\t\t\tc0.479,0.275,0.644,0.887,0.369,1.365C85.343,60.286,85.007,60.466,84.66,60.466z\"/>\n\t\t<path d=\"M67.289,30.62c-0.048,0-0.097-0.003-0.146-0.011l-32.102-4.707c-0.171-0.024-0.333-0.094-0.469-0.2L3.813,1.79\n\t\t\tC3.377,1.451,3.298,0.823,3.637,0.388C3.976-0.05,4.604-0.129,5.041,0.212l30.551,23.75l31.841,4.669\n\t\t\tc0.546,0.08,0.924,0.588,0.844,1.135C68.204,30.263,67.776,30.62,67.289,30.62z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM64.852,48.089\"/>\n\t\t<path d=\"M113.846,157.483c-0.121,0-0.243-0.021-0.362-0.067l-54.872-21.311c-0.515-0.2-0.771-0.78-0.57-1.295\n\t\t\tc0.201-0.515,0.781-0.768,1.294-0.57l54.872,21.311c0.515,0.2,0.771,0.78,0.57,1.295\n\t\t\tC114.624,157.241,114.246,157.483,113.846,157.483z\"/>\n\t\t<path d=\"M31.821,146.577c-0.316,0-0.628-0.149-0.822-0.43L5.318,109.204c-0.184-0.265-0.229-0.602-0.121-0.905l21.608-60.838\n\t\t\tL1.775,78.199c-0.349,0.428-0.978,0.492-1.407,0.144c-0.428-0.349-0.493-0.979-0.144-1.407L28.91,41.709\n\t\t\tc0.308-0.378,0.84-0.478,1.266-0.24c0.424,0.239,0.615,0.748,0.452,1.207L7.254,108.484l25.388,36.522\n\t\t\tc0.315,0.453,0.203,1.076-0.25,1.392C32.217,146.52,32.018,146.577,31.821,146.577z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM47.355,67.903\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM84.661,59.466\"/>\n\t\t<path d=\"M29.686,43.341c-0.421,0-0.813-0.269-0.951-0.69L19.283,13.6c-0.17-0.525,0.117-1.09,0.642-1.261\n\t\t\tc0.528-0.168,1.09,0.117,1.261,0.642l9.451,29.051c0.17,0.525-0.117,1.09-0.642,1.261C29.892,43.325,29.788,43.341,29.686,43.341z\n\t\t\t\"/>\n\t\t<path d=\"M14.763,85.353c-0.148,0-0.299-0.033-0.441-0.104L0.558,78.464c-0.495-0.244-0.699-0.844-0.455-1.339\n\t\t\tc0.245-0.494,0.843-0.699,1.339-0.454l13.764,6.785c0.495,0.244,0.699,0.844,0.455,1.339\n\t\t\tC15.486,85.147,15.132,85.353,14.763,85.353z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM31.52,101.247\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM18.277,74.448\"/>\n\t\t<path d=\"M21.67,186.808c-0.115,0-0.23-0.02-0.341-0.06c-0.328-0.119-0.57-0.401-0.639-0.743l-15.53-77.174\n\t\t\tc-0.075-0.375,0.07-0.76,0.374-0.992c0.305-0.232,0.713-0.271,1.056-0.099l52.573,26.407c17.108-1.785,42.782-4.546,44.251-4.924\n\t\t\tc0.899-0.413,3.63-1.202,12.934-3.462c0.535-0.135,1.077,0.199,1.208,0.735c0.13,0.537-0.199,1.078-0.736,1.208\n\t\t\tc-5.57,1.353-11.862,2.97-12.552,3.3c0.006-0.003,0.132-0.064,0.254-0.213c-0.423,0.48-2.72,0.919-45.443,5.375\n\t\t\tc-0.188,0.02-0.382-0.015-0.552-0.101l-51-25.618L22.326,184l19.448-15.596c0.43-0.345,1.06-0.276,1.406,0.154\n\t\t\tc0.345,0.432,0.276,1.061-0.155,1.406l-20.729,16.623C22.115,186.732,21.894,186.808,21.67,186.808z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM102.406,86.733\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM103.744,130.161\"/>\n\t\t<path d=\"M127.002,184.737c-0.392,0-0.764-0.231-0.924-0.616l-22.258-53.576c-0.212-0.51,0.03-1.096,0.54-1.308\n\t\t\tc0.51-0.209,1.095,0.03,1.307,0.54l22.258,53.576c0.212,0.51-0.03,1.096-0.54,1.308\n\t\t\tC127.26,184.713,127.13,184.737,127.002,184.737z\"/>\n\t\t<path d=\"M116.582,127.733c-0.11,0-0.223-0.019-0.333-0.057c-0.521-0.185-0.794-0.755-0.61-1.276l11.133-31.555\n\t\t\tc0.184-0.52,0.755-0.792,1.275-0.61c0.521,0.185,0.794,0.755,0.61,1.276l-11.133,31.555\n\t\t\tC117.38,127.477,116.994,127.733,116.582,127.733z\"/>\n\t\t<path d=\"M52.373,192.44c-0.389,0-0.749-0.228-0.912-0.591l-20.553-45.863c-0.226-0.504,0-1.096,0.503-1.321\n\t\t\tc0.503-0.228,1.095-0.001,1.322,0.503l19.014,42.43l1.704-17.294c0.054-0.55,0.546-0.942,1.093-0.897\n\t\t\tc0.549,0.054,0.951,0.544,0.897,1.093l-2.073,21.039c-0.044,0.451-0.387,0.816-0.834,0.89\n\t\t\tC52.48,192.437,52.426,192.44,52.373,192.44z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM74.965,141.021\"/>\n\t\t<path d=\"M92.37,214.698c-0.284,0-0.559-0.121-0.752-0.341l-37.924-43.297c-0.364-0.416-0.322-1.048,0.094-1.411\n\t\t\tc0.415-0.363,1.047-0.323,1.411,0.093l36.451,41.616l7.355-59.884c0.068-0.549,0.575-0.942,1.115-0.87\n\t\t\tc0.548,0.067,0.938,0.566,0.871,1.114l-7.628,62.102c-0.048,0.392-0.322,0.718-0.699,0.834\n\t\t\tC92.567,214.684,92.468,214.698,92.37,214.698z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM54.446,170.401\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM68.763,210.763\"/>\n\t\t<path d=\"M92.371,214.698c-0.285,0-0.568-0.121-0.766-0.356c-0.355-0.423-0.301-1.054,0.122-1.409l35.632-29.961\n\t\t\tc0.423-0.354,1.053-0.301,1.409,0.122c0.355,0.423,0.301,1.054-0.122,1.409l-35.632,29.961\n\t\t\tC92.826,214.621,92.598,214.698,92.371,214.698z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM72.805,205.103\"/>\n\t\t<path d=\"M127.715,251.634c-0.263,0-0.526-0.104-0.723-0.309L91.647,214.39c-0.382-0.399-0.368-1.032,0.031-1.414\n\t\t\tc0.399-0.382,1.031-0.367,1.414,0.031l35.345,36.936c0.382,0.399,0.368,1.032-0.031,1.414\n\t\t\tC128.212,251.542,127.963,251.634,127.715,251.634z\"/>\n\t\t<path d=\"M83.068,252.001c-0.005,0-0.01,0-0.016,0c-0.369-0.006-0.705-0.214-0.873-0.542l-30.695-59.561\n\t\t\tc-0.253-0.491-0.061-1.094,0.431-1.347c0.491-0.254,1.094-0.061,1.347,0.431l29.84,57.9l15.614-28.1\n\t\t\tc0.268-0.483,0.877-0.659,1.36-0.389c0.482,0.269,0.657,0.877,0.388,1.359l-16.521,29.732\n\t\t\tC83.766,251.805,83.431,252.001,83.068,252.001z\"/>\n\t\t<path d=\"M44.815,217.317c-0.378,0-0.737-0.216-0.906-0.576l-16.628-35.51c-0.234-0.5-0.019-1.096,0.481-1.329\n\t\t\tc0.5-0.234,1.096-0.019,1.33,0.481l16.248,34.697l15.726-5.376c0.521-0.178,1.091,0.1,1.27,0.623\n\t\t\tc0.179,0.522-0.1,1.091-0.623,1.27l-16.574,5.666C45.032,217.3,44.923,217.317,44.815,217.317z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM100.938,86.091\"/>\n\t\t<path d=\"M127.715,141.128c-0.287,0-0.572-0.123-0.77-0.36l-11.133-13.395c-0.353-0.425-0.295-1.056,0.13-1.409\n\t\t\tc0.424-0.351,1.055-0.293,1.408,0.13l11.133,13.395c0.353,0.425,0.295,1.056-0.13,1.409\n\t\t\tC128.167,141.052,127.94,141.128,127.715,141.128z\"/>\n\t\t<path d=\"M67.512,135.081c-20.48,0-37.143-16.662-37.143-37.143c0-12.336,6.108-23.841,16.339-30.775\n\t\t\tc0.458-0.31,1.079-0.19,1.389,0.268c0.31,0.457,0.19,1.078-0.267,1.389c-9.682,6.562-15.461,17.447-15.461,29.119\n\t\t\tc0,19.378,15.765,35.143,35.143,35.143c19.323,0,35.043-15.687,35.043-34.969c0-3.561-0.679-7.012-2.075-10.549\n\t\t\tc-0.203-0.514,0.049-1.095,0.563-1.298c0.517-0.199,1.095,0.05,1.297,0.563c1.49,3.775,2.214,7.467,2.214,11.283\n\t\t\tC104.555,118.497,87.938,135.081,67.512,135.081z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM127.38,94.63\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM67.287,29.62\"/>\n\t\t<path d=\"M99.095,49.7c-0.281,0-0.56-0.117-0.757-0.347c-0.361-0.418-0.314-1.05,0.104-1.41l28.62-24.707\n\t\t\tc0.417-0.361,1.048-0.315,1.41,0.104c0.361,0.418,0.314,1.05-0.104,1.41l-28.62,24.707C99.559,49.62,99.327,49.7,99.095,49.7z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM99.998,150.167\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM103.744,130.161\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM77.221,133.239\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM99.998,150.167\"/>\n\t\t<path d=\"M209.046,9.706c-0.474,0-0.894-0.337-0.982-0.819c-0.1-0.543,0.26-1.064,0.803-1.164l41.955-7.705\n\t\t\tc0.548-0.102,1.064,0.26,1.164,0.803c0.1,0.543-0.26,1.064-0.803,1.164l-41.955,7.705C209.167,9.701,209.105,9.706,209.046,9.706z\n\t\t\t\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM217.237,11.276\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM188.137,29.62\"/>\n\t\t<path d=\"M127.715,96.179c-0.234,0-0.468-0.082-0.656-0.245c-0.37-0.321-0.453-0.862-0.196-1.279l28.618-46.479\n\t\t\tc0.29-0.47,0.905-0.618,1.376-0.327c0.47,0.29,0.617,0.905,0.327,1.376L131.75,90.531l38.377-31.835\n\t\t\tc0.426-0.354,1.056-0.293,1.408,0.131c0.353,0.425,0.294,1.056-0.131,1.408l-43.052,35.713\n\t\t\tC128.168,96.103,127.941,96.179,127.715,96.179z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM195.967,21.794\"/>\n\t\t<path d=\"M127.715,96.179c-0.417,0-0.806-0.262-0.947-0.679c-0.178-0.522,0.103-1.091,0.625-1.269l80.043-27.169l17.484-25.29\n\t\t\tc0.314-0.456,0.936-0.568,1.392-0.254c0.454,0.313,0.568,0.937,0.254,1.391l-17.672,25.563c-0.122,0.177-0.298,0.31-0.501,0.379\n\t\t\tl-80.356,27.275C127.93,96.162,127.821,96.179,127.715,96.179z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM138.233,46.255\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM127.715,23.993\"/>\n\t\t<path d=\"M127.714,24.993c-0.461,0-0.876-0.321-0.977-0.79c-0.116-0.54,0.229-1.072,0.769-1.188l34.246-7.338\n\t\t\tc0.118-0.024,0.24-0.028,0.359-0.012l34.006,5.139c0.546,0.083,0.922,0.593,0.839,1.139c-0.082,0.546-0.593,0.913-1.138,0.84\n\t\t\tl-33.825-5.112l-34.068,7.3C127.854,24.986,127.783,24.993,127.714,24.993z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM161.961,16.655\"/>\n\t\t<path d=\"M156.333,49.7c-0.044,0-0.089-0.003-0.134-0.009l-18.1-2.445l-10.442-0.603c-0.552-0.031-0.973-0.505-0.941-1.056\n\t\t\tc0.033-0.552,0.513-0.973,1.056-0.94l10.519,0.609l17.828,2.405l31.397-18.836L208.34,7.999c0.391-0.391,1.023-0.391,1.414,0\n\t\t\ts0.391,1.023,0,1.414l-20.91,20.914c-0.058,0.058-0.123,0.108-0.192,0.15l-31.804,19.08C156.691,49.651,156.513,49.7,156.333,49.7\n\t\t\tz\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM220.242,24.913\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM167.769,127.985\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM140.677,108.142\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM127.715,95.179\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM186.418,63.624\"/>\n\t\t<path d=\"M170.768,60.466c-0.346,0-0.683-0.18-0.868-0.502c-0.275-0.479-0.11-1.09,0.369-1.365l19.807-11.377\n\t\t\tc0.104-0.06,0.218-0.101,0.337-0.12l35.17-5.748c0.546-0.087,1.059,0.282,1.148,0.826c0.089,0.545-0.28,1.059-0.826,1.148\n\t\t\tl-34.99,5.719l-19.649,11.286C171.108,60.423,170.937,60.466,170.768,60.466z\"/>\n\t\t<path d=\"M188.135,30.62c-0.488,0-0.915-0.357-0.988-0.854c-0.08-0.547,0.298-1.055,0.844-1.135l31.845-4.669l30.552-23.75\n\t\t\tc0.435-0.341,1.063-0.262,1.403,0.176c0.339,0.436,0.26,1.063-0.176,1.402l-30.76,23.912c-0.136,0.106-0.298,0.176-0.469,0.2\n\t\t\tl-32.105,4.707C188.232,30.617,188.184,30.62,188.135,30.62z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM190.573,48.089\"/>\n\t\t<path d=\"M141.579,157.483c-0.4,0-0.778-0.242-0.932-0.638c-0.2-0.515,0.055-1.095,0.57-1.295l54.876-21.311\n\t\t\tc0.512-0.199,1.093,0.055,1.294,0.57c0.2,0.515-0.055,1.095-0.57,1.295l-54.876,21.311\n\t\t\tC141.822,157.462,141.7,157.483,141.579,157.483z\"/>\n\t\t<path d=\"M223.608,143.151c-0.212,0-0.426-0.067-0.608-0.206c-0.438-0.336-0.521-0.964-0.186-1.402l25.351-33.086l-23.364-65.781\n\t\t\tc-0.163-0.459,0.028-0.968,0.452-1.207c0.423-0.237,0.958-0.138,1.266,0.24l28.685,35.227c0.349,0.429,0.284,1.059-0.144,1.407\n\t\t\ts-1.058,0.284-1.407-0.144l-25.029-30.738l21.608,60.838c0.113,0.319,0.058,0.674-0.148,0.943l-25.681,33.518\n\t\t\tC224.205,143.017,223.908,143.151,223.608,143.151z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM208.071,67.903\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM170.767,59.466\"/>\n\t\t<path d=\"M225.743,43.341c-0.102,0-0.207-0.016-0.309-0.049c-0.525-0.171-0.813-0.735-0.642-1.261l9.447-29.051\n\t\t\tc0.171-0.523,0.735-0.812,1.26-0.642c0.525,0.171,0.813,0.735,0.642,1.261l-9.447,29.051\n\t\t\tC226.557,43.072,226.165,43.341,225.743,43.341z\"/>\n\t\t<path d=\"M240.665,85.353c-0.369,0-0.724-0.205-0.898-0.558c-0.244-0.495-0.041-1.095,0.455-1.339l13.764-6.785\n\t\t\tc0.497-0.246,1.095-0.04,1.339,0.454c0.244,0.495,0.041,1.095-0.455,1.339l-13.764,6.785\n\t\t\tC240.964,85.319,240.813,85.353,240.665,85.353z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM223.909,101.247\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM237.151,74.448\"/>\n\t\t<path d=\"M233.758,186.808c-0.228,0-0.452-0.078-0.633-0.226l-21.142-17.299c-0.427-0.351-0.49-0.98-0.141-1.407\n\t\t\tc0.35-0.428,0.979-0.49,1.407-0.142l19.856,16.247l14.798-73.533l-51,25.618c-0.171,0.086-0.364,0.122-0.552,0.101\n\t\t\tc-42.219-4.403-44.97-4.887-45.433-5.363c0.122,0.142,0.238,0.199,0.244,0.202c-0.69-0.331-6.984-1.947-12.557-3.301\n\t\t\tc-0.537-0.13-0.866-0.671-0.736-1.208c0.13-0.536,0.675-0.867,1.208-0.735c9.281,2.254,12.026,3.052,12.933,3.464l0.001-0.003\n\t\t\tc1.42,0.374,27.13,3.138,44.256,4.925l52.573-26.407c0.341-0.171,0.751-0.134,1.056,0.099c0.304,0.232,0.449,0.617,0.374,0.992\n\t\t\tl-15.531,77.174c-0.069,0.344-0.313,0.626-0.644,0.744C233.985,186.788,233.871,186.808,233.758,186.808z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM153.021,86.733\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM151.684,130.161\"/>\n\t\t<path d=\"M128.427,184.737c-0.133,0-0.268-0.026-0.397-0.083c-0.507-0.22-0.739-0.809-0.52-1.315l23.256-53.576\n\t\t\tc0.219-0.507,0.81-0.74,1.315-0.519c0.507,0.22,0.739,0.809,0.52,1.315l-23.256,53.576\n\t\t\tC129.182,184.513,128.813,184.737,128.427,184.737z\"/>\n\t\t<path d=\"M138.842,127.733c-0.412,0-0.798-0.257-0.943-0.667l-11.127-31.555c-0.184-0.521,0.089-1.093,0.61-1.276\n\t\t\tc0.522-0.181,1.092,0.091,1.275,0.61l11.127,31.555c0.184,0.521-0.089,1.093-0.61,1.276\n\t\t\tC139.064,127.715,138.952,127.733,138.842,127.733z\"/>\n\t\t<path d=\"M203.052,192.44c-0.049,0-0.099-0.004-0.148-0.011c-0.453-0.068-0.802-0.436-0.847-0.892l-2.073-21.039\n\t\t\tc-0.054-0.549,0.348-1.039,0.897-1.093c0.547-0.045,1.039,0.348,1.093,0.897l1.684,17.087l19.028-45.624\n\t\t\tc0.213-0.51,0.798-0.751,1.308-0.538c0.51,0.213,0.751,0.798,0.538,1.308l-20.557,49.289\n\t\t\tC203.818,192.202,203.451,192.44,203.052,192.44z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM180.456,141.021\"/>\n\t\t<path d=\"M163.052,214.698c-0.098,0-0.197-0.015-0.294-0.044c-0.376-0.116-0.65-0.443-0.698-0.834l-7.622-62.102\n\t\t\tc-0.067-0.549,0.323-1.047,0.871-1.114c0.541-0.072,1.046,0.321,1.114,0.87l7.35,59.884l36.454-41.616\n\t\t\tc0.363-0.416,0.996-0.456,1.411-0.093s0.458,0.995,0.094,1.411l-37.927,43.297C163.611,214.577,163.335,214.698,163.052,214.698z\"\n\t\t\t/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM200.979,170.401\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM186.666,210.763\"/>\n\t\t<path d=\"M163.051,214.698c-0.227,0-0.456-0.077-0.643-0.234l-35.624-29.961c-0.423-0.355-0.477-0.986-0.122-1.409\n\t\t\ts0.985-0.477,1.409-0.122l35.624,29.961c0.423,0.355,0.477,0.986,0.122,1.409C163.619,214.577,163.336,214.698,163.051,214.698z\"\n\t\t\t/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM182.624,205.103\"/>\n\t\t<path d=\"M127.715,251.634c-0.249,0-0.498-0.092-0.691-0.277c-0.399-0.382-0.413-1.015-0.031-1.414l35.337-36.936\n\t\t\tc0.381-0.398,1.015-0.413,1.414-0.031s0.413,1.015,0.031,1.414l-35.337,36.936C128.241,251.53,127.978,251.634,127.715,251.634z\"\n\t\t\t/>\n\t\t<path d=\"M172.359,252.001c-0.363,0-0.697-0.196-0.874-0.514l-16.527-29.732c-0.269-0.483-0.095-1.092,0.388-1.36\n\t\t\tc0.483-0.271,1.092-0.094,1.36,0.388l15.62,28.101l29.837-57.9c0.252-0.491,0.857-0.685,1.347-0.431\n\t\t\tc0.491,0.253,0.684,0.855,0.431,1.347l-30.692,59.561c-0.169,0.328-0.505,0.536-0.874,0.542\n\t\t\tC172.37,252.001,172.365,252.001,172.359,252.001z\"/>\n\t\t<path d=\"M210.613,217.317c-0.107,0-0.217-0.018-0.323-0.054l-16.581-5.666c-0.523-0.179-0.802-0.747-0.623-1.27\n\t\t\ts0.745-0.801,1.27-0.623l15.732,5.376l16.244-34.697c0.234-0.501,0.83-0.717,1.33-0.481c0.5,0.233,0.716,0.829,0.482,1.329\n\t\t\tl-16.624,35.51C211.351,217.102,210.992,217.317,210.613,217.317z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM154.486,86.091\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM134.225,149.64\"/>\n\t\t<path d=\"M127.714,141.128c-0.225,0-0.452-0.075-0.639-0.23c-0.425-0.354-0.483-0.983-0.13-1.408l11.127-13.395\n\t\t\tc0.353-0.425,0.983-0.483,1.408-0.131c0.425,0.354,0.483,0.983,0.13,1.408l-11.127,13.395\n\t\t\tC128.286,141.005,128.001,141.128,127.714,141.128z\"/>\n\t\t<path d=\"M187.916,135.081c-20.427,0-37.046-16.584-37.046-36.969c0-3.811,0.726-7.501,2.218-11.283\n\t\t\tc0.203-0.514,0.783-0.763,1.297-0.563c0.514,0.203,0.766,0.784,0.563,1.298c-1.399,3.544-2.079,6.995-2.079,10.549\n\t\t\tc0,19.282,15.722,34.969,35.046,34.969c19.376,0,35.14-15.765,35.14-35.143c0-11.674-5.779-22.56-15.459-29.119\n\t\t\tc-0.457-0.311-0.577-0.932-0.267-1.389c0.309-0.458,0.931-0.577,1.389-0.268c10.23,6.933,16.337,18.438,16.337,30.775\n\t\t\tC225.056,118.419,208.395,135.081,187.916,135.081z\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM128.05,94.63\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM188.137,29.62\"/>\n\t\t<path d=\"M156.333,49.7c-0.231,0-0.464-0.08-0.653-0.243L127.062,24.75c-0.418-0.36-0.464-0.992-0.104-1.41\n\t\t\tc0.361-0.419,0.992-0.465,1.41-0.104l28.618,24.707c0.418,0.36,0.464,0.992,0.104,1.41C156.892,49.583,156.613,49.7,156.333,49.7z\n\t\t\t\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM155.43,150.167\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM151.684,130.161\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM178.208,133.239\"/>\n\t\t<path fill=\"none\" stroke=\"#000000\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"\n\t\t\tM155.43,150.167\"/>\n\t</g>\n</g>\n<g id=\"POP-UP\">\n</g>\n</svg>\n"

/***/ }),
/* 196 */
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./client/style/icons/trusty_plus.svg ***!
  \********************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t width=\"57.002px\" height=\"57px\" viewBox=\"0 0 58 58\" enable-background=\"new 0 0 57.002 57\" xml:space=\"preserve\">\n\n<path fill=\"none\" d=\"M28.501,0.347C12.978,0.347,0.348,12.977,0.348,28.5s12.629,28.152,28.153,28.152S56.653,44.023,56.653,28.5\n\tS44.024,0.347,28.501,0.347z M28.501,54.652C14.08,54.652,2.348,42.921,2.348,28.5S14.08,2.347,28.501,2.347\n\tS54.653,14.079,54.653,28.5S42.922,54.652,28.501,54.652z M29.502,27.5V8.9h-2v18.6h-18.6v2h18.6v18.6h2V29.5h18.601v-2H29.502z\"/>\n</svg>\n"

/***/ }),
/* 197 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************!*\
  !*** ./client/style/icons/trusty_portfolio_arrow_right.svg ***!
  \*************************************************************/
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t width=\"16.471px\" height=\"28px\" viewBox=\"5.765 -4.765 16.471 28\" enable-background=\"new 5.765 -5.765 16.471 28\"\n\t xml:space=\"preserve\">\n<polygon points=\"5.765,19.702 8.286,22.235 22.235,8.235 8.286,-5.765 5.765,-3.232 17.189,8.235 \"/>\n</svg>\n"

/***/ }),
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */
/* unknown exports provided */
/* exports used: default */
/*!*****************************************!*\
  !*** ./client/components/Auth/Auth.vue ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader?sourceMap&-autoprefixer!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-2b913e06","scoped":false,"hasInlineConfig":false}!sass-loader?sourceMap!../../../~/vue-loader/lib/selector?type=styles&index=0!./Auth.vue */ 168)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 3)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./Auth.vue */ 104),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-2b913e06"}!../../../~/vue-loader/lib/template-compiler/preprocessor?raw&engine=pug!../../../~/vue-loader/lib/selector?type=template&index=0!./Auth.vue */ 226),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 213 */
/* unknown exports provided */
/* exports used: default */
/*!*******************************************!*\
  !*** ./client/components/Auth/signup.vue ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 3)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./signup.vue */ 106),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-81f33854"}!../../../~/vue-loader/lib/template-compiler/preprocessor?raw&engine=pug!../../../~/vue-loader/lib/selector?type=template&index=0!./signup.vue */ 232),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 214 */
/* unknown exports provided */
/* exports used: default */
/*!*****************************************!*\
  !*** ./client/components/Home/Home.vue ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader?sourceMap&-autoprefixer!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-2185f866","scoped":false,"hasInlineConfig":false}!sass-loader?sourceMap!../../../~/vue-loader/lib/selector?type=styles&index=0!./Home.vue */ 166)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 3)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./Home.vue */ 107),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-2185f866"}!../../../~/vue-loader/lib/template-compiler/preprocessor?raw&engine=pug!../../../~/vue-loader/lib/selector?type=template&index=0!./Home.vue */ 224),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 215 */
/* unknown exports provided */
/* exports used: default */
/*!*********************************************************!*\
  !*** ./client/components/Portfolio/ManagePortfolio.vue ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader?sourceMap&-autoprefixer!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-3377a633","scoped":false,"hasInlineConfig":false}!sass-loader?sourceMap!../../../~/vue-loader/lib/selector?type=styles&index=0!./ManagePortfolio.vue */ 169)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 3)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./ManagePortfolio.vue */ 108),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-3377a633"}!../../../~/vue-loader/lib/template-compiler/preprocessor?raw&engine=pug!../../../~/vue-loader/lib/selector?type=template&index=0!./ManagePortfolio.vue */ 227),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 216 */
/* unknown exports provided */
/* exports used: default */
/*!************************************************************!*\
  !*** ./client/components/Portfolio/ManagePortfolioTab.vue ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader?sourceMap&-autoprefixer!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-05e9da12","scoped":false,"hasInlineConfig":false}!sass-loader?sourceMap!../../../~/vue-loader/lib/selector?type=styles&index=0!./ManagePortfolioTab.vue */ 164)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 3)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./ManagePortfolioTab.vue */ 109),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-05e9da12"}!../../../~/vue-loader/lib/template-compiler/preprocessor?raw&engine=pug!../../../~/vue-loader/lib/selector?type=template&index=0!./ManagePortfolioTab.vue */ 222),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 217 */
/* unknown exports provided */
/* exports used: default */
/*!***************************************************!*\
  !*** ./client/components/Portfolio/Portfolio.vue ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader?sourceMap&-autoprefixer!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-b77adcd0","scoped":false,"hasInlineConfig":false}!sass-loader?sourceMap!../../../~/vue-loader/lib/selector?type=styles&index=0!./Portfolio.vue */ 175)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 3)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./Portfolio.vue */ 110),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-b77adcd0"}!../../../~/vue-loader/lib/template-compiler/preprocessor?raw&engine=pug!../../../~/vue-loader/lib/selector?type=template&index=0!./Portfolio.vue */ 234),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 218 */
/* unknown exports provided */
/* exports used: default */
/*!**********************************************************!*\
  !*** ./client/components/Portfolio/PortfolioBalance.vue ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader?sourceMap&-autoprefixer!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-5ded8758","scoped":false,"hasInlineConfig":false}!sass-loader?sourceMap!../../../~/vue-loader/lib/selector?type=styles&index=0!./PortfolioBalance.vue */ 173)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 3)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./PortfolioBalance.vue */ 111),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-5ded8758"}!../../../~/vue-loader/lib/template-compiler/preprocessor?raw&engine=pug!../../../~/vue-loader/lib/selector?type=template&index=0!./PortfolioBalance.vue */ 231),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 219 */
/* unknown exports provided */
/* exports used: default */
/*!**********************************************!*\
  !*** ./client/components/Transfer/index.vue ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader?sourceMap&-autoprefixer!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-1ea95387","scoped":false,"hasInlineConfig":false}!sass-loader?sourceMap!../../../~/vue-loader/lib/selector?type=styles&index=0!./index.vue */ 165)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 3)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./index.vue */ 112),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-1ea95387"}!../../../~/vue-loader/lib/template-compiler/preprocessor?raw&engine=pug!../../../~/vue-loader/lib/selector?type=template&index=0!./index.vue */ 223),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 220 */
/* unknown exports provided */
/* exports used: default */
/*!*****************************************!*\
  !*** ./client/components/User/User.vue ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader?sourceMap&-autoprefixer!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-2aa1abe6","scoped":false,"hasInlineConfig":false}!sass-loader?sourceMap!../../../~/vue-loader/lib/selector?type=styles&index=0!./User.vue */ 167)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 3)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./User.vue */ 115),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-2aa1abe6"}!../../../~/vue-loader/lib/selector?type=template&index=0!./User.vue */ 225),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 221 */
/* unknown exports provided */
/* exports used: default */
/*!********************************************!*\
  !*** ./client/components/header/index.vue ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!vue-style-loader!css-loader?sourceMap&-autoprefixer!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-a7bb186e","scoped":false,"hasInlineConfig":false}!sass-loader?sourceMap!../../../~/vue-loader/lib/selector?type=styles&index=0!./index.vue */ 174)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 3)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vue-loader/lib/selector?type=script&index=0!./index.vue */ 116),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-a7bb186e"}!../../../~/vue-loader/lib/template-compiler/preprocessor?raw&engine=pug!../../../~/vue-loader/lib/selector?type=template&index=0!./index.vue */ 233),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 222 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-05e9da12"}!./~/vue-loader/lib/template-compiler/preprocessor.js?raw&engine=pug!./~/vue-loader/lib/selector.js?type=template&index=0!./client/components/Portfolio/ManagePortfolioTab.vue ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "asset_tab"
    }
  }, [_vm._m(0), _c('table', {
    staticClass: "managePortfolio"
  }, [_vm._m(1), _c('tbody', _vm._l((_vm.portfolio), function(item) {
    return _c('tr', [_c('td', [_c('div', {
      staticClass: "portfolio_item _index"
    }, [_c('div', {
      staticClass: "fake_line_height"
    }), _c('span', [_vm._v(_vm._s(item.asset))]), _c('icon-component', {
      attrs: {
        "name": "trusty_portfolio_arrow_right"
      }
    })], 1)]), _c('td', [_c('div', {
      staticClass: "portfolio_item _index"
    }, [_c('div', {
      staticClass: "fake_line_height"
    }), _c('a', {
      staticClass: "_minus normal portfolio_asset"
    }, [_c('icon-component', {
      attrs: {
        "name": "trusty_minus"
      }
    })], 1), _c('span', {
      staticClass: "normal portfolio_asset"
    }, [_vm._v(_vm._s(item.percentage + "%"))]), _c('a', {
      staticClass: "_plus normal portfolio_asset _disable"
    }, [_c('icon-component', {
      attrs: {
        "name": "trusty_plus"
      }
    })], 1)])])])
  }))]), _vm._m(2)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('h5', [_vm._v("Please select shares of assets "), _c('br'), _vm._v(" in your portfolio")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("ASSET")]), _c('th', [_vm._v("SHARE")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrap main_padding"
  }, [_c('div', {
    staticClass: "trusty_inline_buttons _one_button"
  }, [_c('button', [_vm._v("Suggest Portfolio")])]), _c('div', {
    staticClass: "trusty_inline_buttons _one_button"
  }, [_c('button', [_vm._v("Update Portfolio")])])])
}]}

/***/ }),
/* 223 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-1ea95387"}!./~/vue-loader/lib/template-compiler/preprocessor.js?raw&engine=pug!./~/vue-loader/lib/selector.js?type=template&index=0!./client/components/Transfer/index.vue ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "trusty_transfer"
    }
  }, [_c('div', {
    staticClass: "_turnover_inputs",
    class: {
      "_margin_bottom": !_vm.isTrustyTransfer
    }
  }, [_c('trusty-input', {
    attrs: {
      "label": "send any sum"
    }
  }, [_c('template', {
    slot: "input"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: (_vm.amount),
      expression: "amount",
      modifiers: {
        "number": true
      }
    }],
    domProps: {
      "value": (_vm.amount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.amount = _vm._n($event.target.value)
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _c('template', {
    slot: "right"
  }, [_c('icon-component', {
    attrs: {
      "name": "trusty_arrow_down"
    }
  }), _c('span', {
    staticClass: "fake_option_width"
  }), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.coin),
      expression: "coin"
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.coin = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((['BTC', 'DASH', 'ETH', 'USD', 'RUB']), function(i) {
    return _c('option', [_vm._v(_vm._s(i))])
  }))], 1)], 2), _c('trusty-input', {
    attrs: {
      "isOpen": true,
      "label": "payment method",
      "className": "select_input"
    }
  }, [_c('template', {
    slot: "input"
  }, [_c('input', {
    style: ({
      display: 'none'
    })
  }), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.service),
      expression: "service"
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.service = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.transferServices), function(option) {
    return _c('option', {
      domProps: {
        "value": option
      }
    }, [_vm._v(_vm._s(option))])
  }))])], 2), (!_vm.isDeposit) ? _c('trusty-input', {
    attrs: {
      "label": "enter receiving address"
    }
  }, [_c('template', {
    slot: "input"
  }, [_c('input')])], 2) : _vm._e()], 1), _vm._m(0), (!_vm.isTrustyTransfer) ? [(!_vm.isDeposit) ? [_c('div', {
    staticClass: "_turnover_info"
  }, [_c('div', {
    staticClass: "trusty_help_text _yellow"
  }, [_vm._v("Please enter a valid " + _vm._s(_vm.coin) + " address")]), _vm._m(1), _vm._m(2), _vm._m(3)])] : [_c('div', {
    staticClass: "_turnover_info"
  }, [_c('div', {
    staticClass: "trusty_help_text _yellow"
  }, [_vm._v("Send " + _vm._s(_vm.coin) + " to the address below")]), _c('div', {
    staticClass: "trusty_cutted_address",
    domProps: {
      "innerHTML": _vm._s(_vm.depositAddress)
    }
  }), _vm._m(4), _c('div', {
    staticClass: "trusty_help_text _yellow"
  }, [_vm._v("Push CONFIRM button as soon as you have completed the payment")]), _vm._m(5), _vm._m(6)])]] : _vm._e()], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "_turnover_service"
  }, [_c('span', [_vm._v("trusty deposit")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "trusty_inline_buttons _one_button"
  }, [_c('button', [_vm._v("Paste Address")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "trusty_inline_buttons"
  }, [_c('button', [_vm._v("Confirm")]), _c('button', [_vm._v("Cancel")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "trusty_ps_text"
  }, [_vm._v("Payment gateway service is provided by "), _c('br'), _vm._v("\nOpenledger.io at 0% fee")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "trusty_inline_buttons _one_button"
  }, [_c('button', [_vm._v("Copy address")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "trusty_inline_buttons"
  }, [_c('button', [_vm._v("Confirm")]), _c('button', [_vm._v("Cancel")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "trusty_ps_text"
  }, [_vm._v("Payment gateway service is provided by "), _c('br'), _vm._v("\nOpenledger.io at 0% fee")])
}]}

/***/ }),
/* 224 */
/* unknown exports provided */
/* all exports used */
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-2185f866"}!./~/vue-loader/lib/template-compiler/preprocessor.js?raw&engine=pug!./~/vue-loader/lib/selector.js?type=template&index=0!./client/components/Home/Home.vue ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "trusty_profile"
    }
  }, [_c('div', {
    staticClass: "useful_wrap"
  }, [_c('div', {
    staticClass: "trusty_inline_buttons _mob"
  }, [_c('button', [_vm._v("DEPOSIT")]), _c('button', [_vm._v("WITHDRAW")])]), _c('div', {
    staticClass: "trusty_total_funds"
  }, [_c('p', [_vm._v("account name")]), _c('h3', {
    staticClass: "_text_center"
  }, [_c('span', [_vm._v("4$")])])]), _c('div', {
    staticClass: "_wrap_desk_buttons _desk"
  }, [_c('div', {
    staticClass: "trusty_inline_buttons"
  }, [_c('button', [_vm._v("DEPOSIT")]), _c('button', [_vm._v("WITHDRAW")])]), _c('div', {
    staticClass: "trusty_inline_buttons _one_button"
  }, [_c('button', [_vm._v("MANAGE FUND")])])]), _c('div', {
    staticClass: "trusty_inline_buttons _mob _one_button"
  }, [_c('button', [_vm._v("MANAGE FUND")])])]), _c('div', {
    staticClass: "table_wrap"
  }, [_c('table', {
    staticClass: "trusty_table"
  }, [_c('thead', [_c('tr', [_c('th', {
    staticClass: "_text_left"
  }, [_c('span', [_vm._v("ASSET")])]), _c('th', {
    staticClass: "_text_right"
  }, [_c('span', [_vm._v("SHARE ")])]), _c('th', {
    staticClass: "_text_right"
  }, [_c('span', [_vm._v("VAlUE")])]), _c('th', {
    staticClass: "_text_right"
  }, [_c('span', [_vm._v("7DAYS")])])])]), _c('tbody', [_c('tr', [_c('td', {
    staticClass: "_text_left"
  }, [_vm._v(" BTS")]), _c('td', {
    staticClass: "_text_right"
  }, [_vm._v("100%")]), _c('td', {
    staticClass: "_text_right"
  }, [_vm._v("0")]), _c('td', {
    staticClass: "_text_right"
  }, [_vm._v("-4%")])])])])])])
}]}

/***/ }),
/* 225 */
/* unknown exports provided */
/* all exports used */
/*!************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-2aa1abe6"}!./~/vue-loader/lib/selector.js?type=template&index=0!./client/components/User/User.vue ***!
  \************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user-container"
  }, [_c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_vm._v("back")]), _vm._v(" "), (_vm.account) ? _c('div', [_c('h4', [_vm._v(_vm._s(_vm.name) + " [" + _vm._s(_vm.account.id) + "]")]), _vm._v(" "), _c('Portfolio', {
    attrs: {
      "balances": _vm.userBalances,
      "base-id": "1.3.0",
      "fiat-id": "1.3.121",
      "days": 7
    }
  })], 1) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 226 */
/* unknown exports provided */
/* all exports used */
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-2b913e06"}!./~/vue-loader/lib/template-compiler/preprocessor.js?raw&engine=pug!./~/vue-loader/lib/selector.js?type=template&index=0!./client/components/Auth/Auth.vue ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "trusty_auth"
    }
  }, [_c('div', {
    staticClass: "input_area"
  }, [_c('div', {
    staticClass: "left"
  }, [_c('confirm-password'), _c('trusty-input', {
    attrs: {
      "label": "brainkey",
      "type": "textarea"
    }
  }, [_c('template', {
    slot: "input"
  }, [_c('textarea')])], 2)], 1), _c('div', {
    staticClass: "right"
  }, [_c('div', {
    staticClass: "_logo_owl _desk"
  }, [_c('icon-component', {
    attrs: {
      "name": "trusty_owl_small_logo"
    }
  })], 1)])]), _vm._m(0), _vm._m(1), _vm._m(2), _vm._m(3), _c('div', {
    staticClass: "_logo_owl _mob"
  }, [_c('icon-component', {
    attrs: {
      "name": "trusty_owl_small_logo"
    }
  })], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "_tooltip_p"
  }, [_vm._v(" Please enter account brainkey once for new devices, "), _c('br'), _vm._v("\n12 words, you backed up, when account was created")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "trusty_buttons"
  }, [_c('button', [_vm._v("Log in")]), _c('span', {
    staticClass: "_desk",
    staticStyle: {
      "display": "inline-block",
      "width": "1vw"
    }
  }), _c('button', {
    staticClass: "_grey_style _desk"
  }, [_vm._v("Sign up")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "_tooltip_p _text_center"
  }, [_vm._v(" Before continuing, make sure your device is secure "), _c('br')])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "_bottom_link _mob"
  }, [_c('span', [_vm._v("Sign up with new account")])])
}]}

/***/ }),
/* 227 */
/* unknown exports provided */
/* all exports used */
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-3377a633"}!./~/vue-loader/lib/template-compiler/preprocessor.js?raw&engine=pug!./~/vue-loader/lib/selector.js?type=template&index=0!./client/components/Portfolio/ManagePortfolio.vue ***!
  \************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main_centered_container",
    attrs: {
      "id": "trusty_manage_portfolio"
    }
  }, [_c('div', {
    staticClass: "trusty_portfolio_tabs"
  }, [_vm._m(0), _c('div', {
    staticClass: "tabs-content-container"
  }, [_c('ManagePortfolioTab')], 1)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tabs-header-container"
  }, [_c('div', {
    staticClass: "tab-link tab-link-active"
  }, [_vm._v("Manual")]), _c('div', {
    staticClass: "tab-link"
  }, [_vm._v("Index")]), _c('div', {
    staticClass: "tab-link"
  }, [_vm._v("Mirror")])])
}]}

/***/ }),
/* 228 */
/* unknown exports provided */
/* all exports used */
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-3d5118ab"}!./~/vue-loader/lib/template-compiler/preprocessor.js?raw&engine=pug!./~/vue-loader/lib/selector.js?type=template&index=0!./client/components/UI/icon.vue ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "trusty_icon",
    class: _vm.classes,
    domProps: {
      "innerHTML": _vm._s(_vm.icons[_vm.name])
    }
  })
},staticRenderFns: []}

/***/ }),
/* 229 */
/* unknown exports provided */
/* all exports used */
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-46681b74"}!./~/vue-loader/lib/template-compiler/preprocessor.js?raw&engine=pug!./~/vue-loader/lib/selector.js?type=template&index=0!./client/components/Auth/confirm-password.vue ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "confirm_password"
  }, [_c('trusty-input', {
    attrs: {
      "label": "password"
    }
  }, [_c('template', {
    slot: "input"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.password),
      expression: "password"
    }],
    domProps: {
      "value": (_vm.password)
    },
    on: {
      "keyup": _vm.validate,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password = $event.target.value
      }
    }
  })])], 2), _c('div', {
    staticClass: "trusty_font_error"
  }, [_vm._v(_vm._s(_vm.error_length))]), _c('trusty-input', {
    attrs: {
      "label": "confirm password"
    }
  }, [_c('template', {
    slot: "input"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.confirm),
      expression: "confirm"
    }],
    domProps: {
      "value": (_vm.confirm)
    },
    on: {
      "keyup": _vm.validate,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.confirm = $event.target.value
      }
    }
  })])], 2), _c('div', {
    staticClass: "trusty_font_error"
  }, [_vm._v(_vm._s(_vm.error_match))])], 1)
},staticRenderFns: []}

/***/ }),
/* 230 */
/* unknown exports provided */
/* all exports used */
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-475f571e"}!./~/vue-loader/lib/template-compiler/preprocessor.js?raw&engine=pug!./~/vue-loader/lib/selector.js?type=template&index=0!./client/components/UI/form/input.vue ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "trusty_input_container",
    class: _vm.classes,
    style: (_vm.styleSheet)
  }, [_c('div', {
    staticClass: "w_input"
  }, [_c('div', {
    ref: "input_space",
    staticClass: "_input_space",
    class: {
      active_input: _vm.opened
    }
  }, [_c('label', {
    staticClass: "trusty_place_holder",
    class: {
      no_opened: !_vm.opened
    },
    on: {
      "click": function($event) {
        _vm.opened = true
      }
    }
  }, [_vm._v(_vm._s(_vm.label))]), _vm._t("input")], 2), _c('div', {
    ref: "right_space",
    staticClass: "_right_space"
  }, [_vm._t("right")], 2)])])
},staticRenderFns: []}

/***/ }),
/* 231 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-5ded8758"}!./~/vue-loader/lib/template-compiler/preprocessor.js?raw&engine=pug!./~/vue-loader/lib/selector.js?type=template&index=0!./client/components/Portfolio/PortfolioBalance.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('tr', {
    staticClass: "portfolio-container__balance"
  }, [_c('td', {
    staticClass: "_text_left"
  }, [_vm._v(" " + _vm._s(_vm.item.name))]), _c('td', {
    staticClass: "_text_right"
  }, [_vm._v(_vm._s(_vm.share && _vm.share.toFixed(0)) + "%")]), _c('td', {
    staticClass: "_text_right"
  }, [_vm._v(_vm._s(_vm.item.balanceFiat.toFixed(0)) + "$")]), _c('td', {
    staticClass: "_text_right"
  }, [_vm._v(_vm._s(_vm.formattedChange) + "%")])])
},staticRenderFns: []}

/***/ }),
/* 232 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-81f33854"}!./~/vue-loader/lib/template-compiler/preprocessor.js?raw&engine=pug!./~/vue-loader/lib/selector.js?type=template&index=0!./client/components/Auth/signup.vue ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "trusty_auth"
    }
  }, [_c('div', {
    staticClass: "input_area"
  }, [_c('div', {
    staticClass: "left"
  }, [_c('trusty-input', {
    attrs: {
      "label": "new account name"
    }
  }, [_c('template', {
    slot: "input"
  }, [_c('input')])], 2), _c('trusty-input', {
    attrs: {
      "label": "enter email"
    }
  }, [_c('template', {
    slot: "input"
  }, [_c('input')])], 2), _c('confirm-password')], 1), _c('div', {
    staticClass: "right"
  }, [_c('div', {
    staticClass: "_logo_owl _desk"
  }, [_c('icon-component', {
    attrs: {
      "name": "trusty_owl_small_logo"
    }
  })], 1)])]), _c('p', {
    staticClass: "_tooltip_p _yellow"
  }, [_vm._v("Write down your password, it CAN'T BE RECOVERED ")]), _vm._m(0), _c('p', {
    staticClass: "_tooltip_p _text_center"
  }, [_vm._v(" Before continuing, make sure your device is secure")]), _vm._m(1), _vm._m(2), _c('div', {
    staticClass: "_logo_owl _mob"
  }, [_c('icon-component', {
    attrs: {
      "name": "trusty_owl_small_logo"
    }
  })], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "trusty_buttons"
  }, [_c('button', [_vm._v("Sign up")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "_bottom_link"
  }, [_c('span', [_vm._v("Log in with existing account")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "_bottom_link _margins"
  }, [_c('span', [_vm._v("I accept Terms of use")])])
}]}

/***/ }),
/* 233 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-a7bb186e"}!./~/vue-loader/lib/template-compiler/preprocessor.js?raw&engine=pug!./~/vue-loader/lib/selector.js?type=template&index=0!./client/components/header/index.vue ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "trusty_header"
  }, [(_vm.isProfilePage) ? _c('icon-component', {
    attrs: {
      "name": "trusty_fund_logo",
      "className": "fund_logo"
    },
    on: {
      "click": function($event) {
        _vm.router.push('/')
      }
    }
  }) : _vm._e(), (!_vm.isProfilePage) ? _c('span', {
    staticClass: "_back _mob",
    on: {
      "click": _vm.backAction
    }
  }, [_c('icon-component', {
    attrs: {
      "name": "trusty_arrow_back"
    }
  })], 1) : _vm._e(), (_vm.isProfilePage) ? _c('span', {
    staticClass: "_options _mob",
    on: {
      "click": _vm.backAction
    }
  }, [_c('icon-component', {
    attrs: {
      "name": "trusty_options"
    }
  })], 1) : _vm._e(), (!_vm.isProfilePage) ? _c('div', {
    staticClass: "header_title"
  }, [_vm._v(_vm._s(_vm.getTitle))]) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 234 */
/* unknown exports provided */
/* all exports used */
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-b77adcd0"}!./~/vue-loader/lib/template-compiler/preprocessor.js?raw&engine=pug!./~/vue-loader/lib/selector.js?type=template&index=0!./client/components/Portfolio/Portfolio.vue ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('table', {
    staticClass: "trusty_table portfolio-container"
  }, [_vm._m(0), _c('tbody', _vm._l((_vm.items), function(item, id) {
    return _c('PortfolioBalance', {
      key: id,
      attrs: {
        "item": item,
        "total-base-value": _vm.totalBaseValue
      }
    })
  }))])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', {
    staticClass: "_text_left"
  }, [_c('span', [_vm._v("ASSET")])]), _c('th', {
    staticClass: "_text_right"
  }, [_c('span', [_vm._v("SHARE ")])]), _c('th', {
    staticClass: "_text_right"
  }, [_c('span', [_vm._v("$VALUE")])]), _c('th', {
    staticClass: "_text_right"
  }, [_c('span', [_vm._v("7DAYS")])])])])
}]}

/***/ }),
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */
/* unknown exports provided */
/* all exports used */
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 239 */
/* unknown exports provided */
/* all exports used */
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 240 */
/* unknown exports provided */
/* all exports used */
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 241 */
/* unknown exports provided */
/* all exports used */
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 242 */
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__promise_polyfill__ = __webpack_require__(/*! ./promise-polyfill */ 77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(/*! ./app */ 76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(/*! ../config */ 79);



// Enable progressive web app support (with offline-plugin)

if (true) {
  __webpack_require__(/*! ./pwa */ 78); // eslint-disable-line global-require
}

if (__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].pixel && "production" === 'development') {
  __webpack_require__(/*! ./style/pixel-glass.js */ 75); // eslint-disable-line global-require
  __webpack_require__(/*! ./style/pixel-glass.scss */ 80); // eslint-disable-line global-require
}

__WEBPACK_IMPORTED_MODULE_1__app__["a" /* app */].$mount('#app');

/***/ })
],[242]);
//# sourceMappingURL=client.e7ef404e.js.map