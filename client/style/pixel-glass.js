/* eslint-disable */
function pixelGlass() {

  'use strict';

  let doc = document;
  let controlsPanel;
  let bodyContentWrapper;
  let panelClass = 'controls-panel';
  let canBeDisabled = [];

  let prefix = 'pg';
  let filtersList = ['none', 'invert'];
  let statesList = ['off', 'on'];

  let currents = {
    state: getCurrent('state', statesList[1]),
    filter: getCurrent('filter', filtersList[0]),
    opacity: getCurrent('opacity', 0.5)
  };

  let targets = {
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
  let paramsStates = {
    elemTag: 'button',
    elemText: 'on',
    listName: 'states',
    itemName: 'state',
    target: targets.state,
    type: 'button',
    list: statesList,
    canDisableAll: true,
    attrs: {
      tabindex: 1,
    }
  };

  // Filters switcher params
  let paramsFilters = {
    elemTag: 'button',
    elemText: 'invert',
    listName: 'filters',
    itemName: 'filter',
    target: targets.filter,
    type: 'button',
    list: filtersList,
    attrs: {
      tabindex: 2,
    }
  };

  // Opacity range params
  let paramsOpacity = {
    itemName: 'opacity',
    type: 'number',
    target: targets.opacity,
    setAttr: 'style',
    attrs: {
      min: 0,
      max: 1,
      step: 0.1,
      tabindex: 3,
    }
  };

  //---------------------------------------------

  init();

  //---------------------------------------------

  function init() {
    createContolsPanel();
    applyCurrentData();

    if (currents.state === 'on'){
      applyCurrentStyles();
    }
  }

  //---------------------------------------------

  function createContolsPanel() {
    let targetElem = doc.documentElement;

    if ( hasData( doc.body, 'has-sticky-point' ) ) {
      let stickyPoint = doc.querySelector('.sticky-point');

      if( stickyPoint && !localStorage['pg-released'] ) {
        targetElem = stickyPoint;
      }
      // Override defaults for demo page
      currents.state = 'off';
    }

    controlsPanel = doc.createElement('div');
    controlsPanel.classList.add(panelClass);
    targetElem.appendChild(controlsPanel);
    let sides = ['top', 'right', 'bottom', 'left'];

    sides.forEach(function(item) {
      let itemVal = getCurrent(item, '');
      if ( itemVal ) {
        controlsPanel.style[ item ] = itemVal;
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
    let listName = params.listName;
    let itemName = params.itemName;
    let elemTag = params.elemTag;
    let elemText = params.elemText;
    let type = params.type;
    let list = params.list;
    let action = params.action;
    let currentVal = currents[itemName];
    let attrs = params.attrs;
    let currentNum = list.indexOf(currentVal);
    let canDisableAll = params.canDisableAll;

    let id = itemName;
    let input = doc.createElement(elemTag);
    setClasses( input, [
      panelClass + '__control',
      panelClass + '__control--' + type
    ]);
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    setData( input, 'state-num', currentNum );

    if ( attrs ) {
      for (let attr in attrs) {
        input.setAttribute(attr, attrs[attr]);
      }
    }

    if (elemTag === 'button') {
      input.innerHTML = elemText;
    }

    if ( !canDisableAll ) {
      canBeDisabled.push(input);
    }

    controlsPanel.appendChild(input);

    input.onclick = function() {
      if (!params.target) {
        return;
      }

      currentNum = +!currentNum;
      currentVal = list[currentNum];

      setData( input, 'state-num', currentNum );
      setData( params.target.elem, itemName, currentVal );

      saveLocalStorage(itemName, currentVal);

      if (canDisableAll && canDisableAll === true) {
        if (currentVal === 'off'){
          removeCurrentStyles();
          disableInputs();
        }
        else {
          applyCurrentStyles();
          enableInputs();
        }
      }
    };
  }

  //---------------------------------------------

  function createInputNumber(params) {
    let itemName = params.itemName;
    let attrs = params.attrs;
    let type = params.type;
    let setAttr = params.setAttr;
    let canDisableAll = params.canDisableAll;

    let id = itemName;
    let input = doc.createElement('input');
    setClasses( input, [
      panelClass + '__control',
      panelClass + '__control--' + type
    ]);
    input.setAttribute('type', type);
    input.setAttribute('id', id);

    for (let attr in attrs) {
      input.setAttribute(attr, attrs[attr]);
    }
    input.setAttribute('value', currents[itemName]);

    if ( !canDisableAll ) {
      canBeDisabled.push(input);
    }

    controlsPanel.appendChild(input);

    input.oninput = function() {
      if (setAttr === 'style') {
        params.target.elem.style[itemName] = this.value;
        saveLocalStorage(itemName, this.value);
      }
    };
  }

  //---------------------------------------------

  function createDragButton() {
    let input = doc.createElement('button');
    setClasses( input, [
      panelClass + '__control',
      panelClass + '__control--drag-n-drop'
    ]);
    input.setAttribute('type', 'button');
    input.innerHTML = ' ';

    controlsPanel.appendChild(input);

    input.onmousedown = function () {
      //Place it here to get real sizes after
      // external styles has been loaded
      let offsetTop = this.offsetTop;
      let offsetLeft = controlsPanel.clientWidth - this.clientWidth;
      let styles = getComputedStyle(controlsPanel);

      controlsPanel.style.top = styles.top;
      controlsPanel.style.left = styles.left;
      controlsPanel.style.right = 'auto';
      controlsPanel.style.bottom = 'auto';

      doc.onmousemove = function ( ev ) {
        let x = (ev.clientX - offsetLeft ) + 'px';
        let y = (ev.clientY) + 'px';

        controlsPanel.style.left = x;
        controlsPanel.style.top = y;
      };
    };

    input.onmouseup = function () {
      let styles = getComputedStyle(controlsPanel);
      let left = +styles.left.replace(/px/,'');
      let right = +styles.right.replace(/px/,'');
      let top = +styles.top.replace(/px/,'');
      let bottom = +styles.bottom.replace(/px/,'');

      if ( left > right ) {
        saveLocalStorage('left', 'auto');
        saveLocalStorage('right', styles.right);

        controlsPanel.style.right = styles.right;
        controlsPanel.style.left = 'auto';
      }
      else {
        saveLocalStorage('left', styles.left);
        saveLocalStorage('right', 'auto'); //'auto' needs to override default position;
      }
      if ( top > bottom ) {
        saveLocalStorage('top', 'auto');
        saveLocalStorage('bottom', styles.bottom);

        controlsPanel.style.bottom = styles.bottom;
        controlsPanel.style.top = 'auto';
      }
      else {
        saveLocalStorage('top', styles.top);
        saveLocalStorage('bottom', 'auto');
      }

      doc.onmousemove = null;
    };
  }

  //---------------------------------------------

  function disableInputs() {
    canBeDisabled.forEach(function(item) {
      item.setAttribute('disabled', '');
    });
  }

  //---------------------------------------------

  function enableInputs() {
    canBeDisabled.forEach(function(item) {
      item.removeAttribute('disabled');
    });
  }

  //---------------------------------------------

  function getCurrent(name, defaultValue) {
    let itemName = [prefix, name].join('-');
    let localStorageVal = localStorage[ itemName ];
    return localStorageVal ? localStorageVal : defaultValue;
  }

  //---------------------------------------------

  function saveLocalStorage(name, value) {
    let itemName = [prefix, name].join('-');
    localStorage[itemName] = value;
  }

  //---------------------------------------------

  // Not used
  function getBodyOpacity() {
    let opacityStr = getComputedStyle(doc.body).opacity;
    return +opacityStr;
  }

  //---------------------------------------------

  // Not used
  function addExternalCSS() {
    let styleElem = doc.createElement('style');
    let cssLink = doc.createElement('link');
    cssLink.setAttribute('rel', 'stylesheet');
    cssLink.setAttribute('href', '../pixel-glass-js/styles.css');

    doc.head.appendChild(cssLink);
  }

  //---------------------------------------------

  function applyCurrentData() {
    for (let key in targets ) {
      let target = targets[ key ];
      let current = currents[ key ];

      if (target.attr === 'data') {
        setData( target.elem, key, current );
      }
    }

    if(currents.state === 'off') {
      disableInputs();
    }
  }
  //---------------------------------------------

  function applyCurrentStyles() {
    for (let key in targets ) {
      let target = targets[ key ];
      let current = currents[ key ];

      if (target.attr === 'style') {
        target.elem.style[ key ] = current;
      }
    }
  }

  //---------------------------------------------

  function removeCurrentStyles() {
    for (let key in targets ) {
      let target = targets[ key ];

      if (target.attr === 'style') {
        target.elem.style[ key ] = '';
      }
    }
  }

  //---------------------------------------------

  // Made for IE10, it doesn't support dataset

  function hasData( elem, dataName ) {
    if ( !elem ) {
      return false;
    }

    dataName = 'data-' + dataName;

    if ( elem.getAttribute( dataName) !== undefined && elem.getAttribute( dataName) !== null ) {
      return true;
    }

    return false;
  }

  //---------------------------------------------

  function setData( elem, dataName, dataVal ) {
    if ( !elem ) {
      return;
    }

    dataName = 'data-' + dataName;
    elem.setAttribute( dataName, dataVal );
  }

  //---------------------------------------------

  // Made for IE10, it doesn't support
  // multiply classes for classList.add

  function setClasses( elem, classes ) {
    if ( !elem ) {
      return;
    }

    if ( classes.length > 0 ) {
      classes.forEach( function ( className ) {
        elem.classList.add( className );
      });
    }
  }

  //---------------------------------------------
}

window.onload = function () {
  pixelGlass();
};
