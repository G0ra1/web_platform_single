'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

import * as minDom from 'min-dom'
import * as tinySvg from 'tiny-svg'
import * as minDash from 'min-dash'
import cssEscapex from 'css.escape'
import * as GraphicsUtil from 'diagram-js/lib/util/GraphicsUtil'
var cssEscape = _interopDefault(cssEscapex);

// var minDom = require('min-dom');
// var tinySvg = require('tiny-svg');
// var minDash = require('min-dash');
// var cssEscape = _interopDefault(require('css.escape'));
// var GraphicsUtil = require('diagram-js/lib/util/GraphicsUtil');

var MINIMAP_VIEWBOX_PADDING = 50;

var RANGE = { min: 0.2, max: 4 },
    NUM_STEPS = 10;

var DELTA_THRESHOLD = 0.1;

var LOW_PRIORITY = 250;


/**
 * A minimap that reflects and lets you navigate the diagram.
 */
function Minimap(
    config, injector, eventBus,
    canvas, elementRegistry) {

  var self = this;

  this._canvas = canvas;
  this._elementRegistry = elementRegistry;
  this._eventBus = eventBus;
  this._injector = injector;

  this._state = {
    isOpen: undefined,
    isDragging: false,
    initialDragPosition: null,
    offsetViewport: null,
    cachedViewbox: null,
    dragger: null,
    svgClientRect: null,
    parentClientRect: null,
    zoomDelta: 0
  };

  this._init();

  this.toggle((config && config.open) || false);

  function setViewboxCenteredAroundClickEvent(event) {

    // getBoundingClientRect might return zero-dimensional when called for the first time
    if (!self._state._svgClientRect || isZeroDimensional(self._state._svgClientRect)) {
      self._state._svgClientRect = self._svg.getBoundingClientRect();
    }

    var diagramPoint = mapMousePositionToDiagramPoint({
      x: event.clientX - self._state._svgClientRect.left,
      y: event.clientY - self._state._svgClientRect.top
    }, self._svg, self._lastViewbox);

    setViewboxCenteredAroundPoint(diagramPoint, self._canvas);

    self._update();
  }

  // set viewbox on click
  minDom.event.bind(this._svg, 'click', function(event) {
    event.preventDefault();
    event.stopPropagation();

    setViewboxCenteredAroundClickEvent(event);
  });

  function mousedown(center) {

    return function onMousedown(event) {

      // getBoundingClientRect might return zero-dimensional when called for the first time
      if (!self._state._svgClientRect || isZeroDimensional(self._state._svgClientRect)) {
        self._state._svgClientRect = self._svg.getBoundingClientRect();
      }

      if (center) {
        setViewboxCenteredAroundClickEvent(event);
      }

      var diagramPoint = mapMousePositionToDiagramPoint({
        x: event.clientX - self._state._svgClientRect.left,
        y: event.clientY - self._state._svgClientRect.top
      }, self._svg, self._lastViewbox);

      var viewbox = canvas.viewbox();

      var offsetViewport = getOffsetViewport(diagramPoint, viewbox);

      var initialViewportDomRect = self._viewportDom.getBoundingClientRect();

      // take border into account (regardless of width)
      var offsetViewportDom = {
        x: event.clientX - initialViewportDomRect.left + 1,
        y: event.clientY - initialViewportDomRect.top + 1
      };

      // init dragging
      minDash.assign(self._state, {
        cachedViewbox: viewbox,
        initialDragPosition: {
          x: event.clientX,
          y: event.clientY
        },
        isDragging: true,
        offsetViewport: offsetViewport,
        offsetViewportDom: offsetViewportDom,
        viewportClientRect: self._viewport.getBoundingClientRect(),
        parentClientRect: self._parent.getBoundingClientRect()
      });

      minDom.event.bind(document, 'mousemove', onMousemove);
      minDom.event.bind(document, 'mouseup', onMouseup);
    };
  }

  function onMousemove(event) {

    // set viewbox if dragging active
    if (self._state.isDragging) {

      // getBoundingClientRect might return zero-dimensional when called for the first time
      if (!self._state._svgClientRect || isZeroDimensional(self._state._svgClientRect)) {
        self._state._svgClientRect = self._svg.getBoundingClientRect();
      }

      // update viewport DOM
      var offsetViewportDom = self._state.offsetViewportDom,
          viewportClientRect = self._state.viewportClientRect,
          parentClientRect = self._state.parentClientRect;

      minDash.assign(self._viewportDom.style, {
        top: (event.clientY - offsetViewportDom.y - parentClientRect.top) + 'px',
        left: (event.clientX - offsetViewportDom.x - parentClientRect.left) + 'px'
      });

      // update overlay
      var clipPath = getOverlayClipPath(parentClientRect, {
        top: event.clientY - offsetViewportDom.y - parentClientRect.top,
        left: event.clientX - offsetViewportDom.x - parentClientRect.left,
        width: viewportClientRect.width,
        height: viewportClientRect.height
      });

      minDash.assign(self._overlay.style, {
        clipPath: clipPath
      });

      var diagramPoint = mapMousePositionToDiagramPoint({
        x: event.clientX - self._state._svgClientRect.left,
        y: event.clientY - self._state._svgClientRect.top
      }, self._svg, self._lastViewbox);

      setViewboxCenteredAroundPoint({
        x: diagramPoint.x - self._state.offsetViewport.x,
        y: diagramPoint.y - self._state.offsetViewport.y
      }, self._canvas);
    }
  }

  function onMouseup(event) {

    if (self._state.isDragging) {

      // treat event as click
      if (self._state.initialDragPosition.x === event.clientX
          && self._state.initialDragPosition.y === event.clientY) {
        setViewboxCenteredAroundClickEvent(event);
      }

      self._update();

      // end dragging
      minDash.assign(self._state, {
        cachedViewbox: null,
        initialDragPosition: null,
        isDragging: false,
        offsetViewport: null,
        offsetViewportDom: null
      });

      minDom.event.unbind(document, 'mousemove', onMousemove);
      minDom.event.unbind(document, 'mouseup', onMouseup);
    }
  }

  // dragging viewport scrolls canvas
  minDom.event.bind(this._viewportDom, 'mousedown', mousedown(false));
  minDom.event.bind(this._svg, 'mousedown', mousedown(true));

  minDom.event.bind(this._parent, 'wheel', function(event) {

    // stop propagation and handle scroll differently
    event.preventDefault();
    event.stopPropagation();

    // only zoom in on ctrl; this aligns with diagram-js navigation behavior
    if (!event.ctrlKey) {
      return;
    }

    // getBoundingClientRect might return zero-dimensional when called for the first time
    if (!self._state._svgClientRect || isZeroDimensional(self._state._svgClientRect)) {
      self._state._svgClientRect = self._svg.getBoundingClientRect();
    }

    // disallow zooming through viewport outside of minimap as it is very confusing
    if (!isPointInside(event, self._state._svgClientRect)) {
      return;
    }

    var factor = event.deltaMode === 0 ? 0.020 : 0.32;

    var delta = (
      Math.sqrt(
        Math.pow(event.deltaY, 2) +
        Math.pow(event.deltaX, 2)
      ) * sign(event.deltaY) * -factor
    );

    // add until threshold reached
    self._state.zoomDelta += delta;

    if (Math.abs(self._state.zoomDelta) > DELTA_THRESHOLD) {
      var direction = delta > 0 ? 1 : -1;

      var currentLinearZoomLevel = Math.log(canvas.zoom()) / Math.log(10);

      // zoom with half the step size of stepZoom
      var stepSize = getStepSize(RANGE, NUM_STEPS * 2);

      // snap to a proximate zoom step
      var newLinearZoomLevel = Math.round(currentLinearZoomLevel / stepSize) * stepSize;

      // increase or decrease one zoom step in the given direction
      newLinearZoomLevel += stepSize * direction;

      // calculate the absolute logarithmic zoom level based on the linear zoom level
      // (e.g. 2 for an absolute x2 zoom)
      var newLogZoomLevel = Math.pow(10, newLinearZoomLevel);

      canvas.zoom(cap(RANGE, newLogZoomLevel), diagramPoint);

      // reset
      self._state.zoomDelta = 0;

      var diagramPoint = mapMousePositionToDiagramPoint({
        x: event.clientX - self._state._svgClientRect.left,
        y: event.clientY - self._state._svgClientRect.top
      }, self._svg, self._lastViewbox);

      setViewboxCenteredAroundPoint(diagramPoint, self._canvas);

      self._update();
    }
  });

  minDom.event.bind(this._toggle, 'click', function(event) {
    event.preventDefault();
    event.stopPropagation();

    self.toggle();
  });

  // add shape on shape/connection added
  eventBus.on([ 'shape.added', 'connection.added' ], function(context) {
    var element = context.element;

    self._addElement(element);

    self._update();
  });

  // remove shape on shape/connection removed
  eventBus.on([ 'shape.removed', 'connection.removed' ], function(context) {
    var element = context.element;

    self._removeElement(element);

    self._update();
  });

  // update on elements changed
  eventBus.on('elements.changed', LOW_PRIORITY, function(context) {
    var elements = context.elements;

    elements.forEach(function(element) {
      self._updateElement(element);
    });

    self._update();
  });

  // update on element ID update
  eventBus.on('element.updateId', function(context) {
    var element = context.element,
        newId = context.newId;

    self._updateElementId(element, newId);
  });

  // update on viewbox changed
  eventBus.on('canvas.viewbox.changed', function() {
    if (!self._state.isDragging) {
      self._update();
    }
  });

  eventBus.on('canvas.resized', function() {

    // only update if present in DOM
    if (document.body.contains(self._parent)) {
      if (!self._state.isDragging) {
        self._update();
      }

      self._state._svgClientRect = self._svg.getBoundingClientRect();
    }

  });
}

Minimap.$inject = [
  'config.minimap',
  'injector',
  'eventBus',
  'canvas',
  'elementRegistry'
];

Minimap.prototype._init = function() {
  var canvas = this._canvas,
      container = canvas.getContainer();

  // create parent div
  var parent = this._parent = document.createElement('div');

  minDom.classes(parent).add('djs-minimap');

  container.appendChild(parent);

  // create toggle
  var toggle = this._toggle = document.createElement('div');

  minDom.classes(toggle).add('toggle');

  parent.appendChild(toggle);

  // create map
  var map = this._map = document.createElement('div');

  minDom.classes(map).add('map');

  parent.appendChild(map);

  // create svg
  var svg = this._svg = tinySvg.create('svg');
  tinySvg.attr(svg, { width: '100%', height: '100%' });
  tinySvg.append(map, svg);

  // add groups
  var elementsGroup = this._elementsGroup = tinySvg.create('g');
  tinySvg.append(svg, elementsGroup);

  var viewportGroup = this._viewportGroup = tinySvg.create('g');
  tinySvg.append(svg, viewportGroup);

  // add viewport SVG
  var viewport = this._viewport = tinySvg.create('rect');

  tinySvg.classes(viewport).add('viewport');

  tinySvg.append(viewportGroup, viewport);

  // prevent drag propagation
  minDom.event.bind(parent, 'mousedown', function(event) {
    event.stopPropagation();
  });

  // add viewport DOM
  var viewportDom = this._viewportDom = document.createElement('div');

  minDom.classes(viewportDom).add('viewport-dom');

  this._parent.appendChild(viewportDom);

  // add overlay
  var overlay = this._overlay = document.createElement('div');

  minDom.classes(overlay).add('overlay');

  this._parent.appendChild(overlay);
};

Minimap.prototype._update = function() {
  var viewbox = this._canvas.viewbox(),
      innerViewbox = viewbox.inner,
      outerViewbox = viewbox.outer;

  if (!validViewbox(viewbox)) {
    return;
  }

  var x, y, width, height;

  var widthDifference = outerViewbox.width - innerViewbox.width,
      heightDifference = outerViewbox.height - innerViewbox.height;

  // update viewbox
  // x
  if (innerViewbox.width < outerViewbox.width) {
    x = innerViewbox.x - widthDifference / 2;
    width = outerViewbox.width;

    if (innerViewbox.x + innerViewbox.width < outerViewbox.width) {
      x = Math.min(0, innerViewbox.x);
    }
  } else {
    x = innerViewbox.x;
    width = innerViewbox.width;
  }

  // y
  if (innerViewbox.height < outerViewbox.height) {
    y = innerViewbox.y - heightDifference / 2;
    height = outerViewbox.height;

    if (innerViewbox.y + innerViewbox.height < outerViewbox.height) {
      y = Math.min(0, innerViewbox.y);
    }
  } else {
    y = innerViewbox.y;
    height = innerViewbox.height;
  }

  // apply some padding
  x = x - MINIMAP_VIEWBOX_PADDING;
  y = y - MINIMAP_VIEWBOX_PADDING;
  width = width + MINIMAP_VIEWBOX_PADDING * 2;
  height = height + MINIMAP_VIEWBOX_PADDING * 2;

  this._lastViewbox = {
    x: x,
    y: y,
    width: width,
    height: height
  };

  tinySvg.attr(this._svg, {
    viewBox: x + ', ' + y + ', ' + width + ', ' + height
  });

  // update viewport SVG
  tinySvg.attr(this._viewport, {
    x: viewbox.x,
    y: viewbox.y,
    width: viewbox.width,
    height: viewbox.height
  });

  // update viewport DOM
  var parentClientRect = this._state._parentClientRect = this._parent.getBoundingClientRect();
  var viewportClientRect = this._viewport.getBoundingClientRect();

  var withoutParentOffset = {
    top: viewportClientRect.top - parentClientRect.top,
    left: viewportClientRect.left - parentClientRect.left,
    width: viewportClientRect.width,
    height: viewportClientRect.height
  };

  minDash.assign(this._viewportDom.style, {
    top: withoutParentOffset.top + 'px',
    left: withoutParentOffset.left + 'px',
    width: withoutParentOffset.width + 'px',
    height: withoutParentOffset.height + 'px'
  });

  // update overlay
  var clipPath = getOverlayClipPath(parentClientRect, withoutParentOffset);

  minDash.assign(this._overlay.style, {
    clipPath: clipPath
  });
};

Minimap.prototype.open = function() {
  minDash.assign(this._state, { isOpen: true });

  minDom.classes(this._parent).add('open');

  var translate = this._injector.get('translate', false) || function(s) { return s; };

  minDom.attr(this._toggle, 'title', translate('Close minimap'));

  this._update();

  this._eventBus.fire('minimap.toggle', { open: true });
};

Minimap.prototype.close = function() {
  minDash.assign(this._state, { isOpen: false });

  minDom.classes(this._parent).remove('open');

  var translate = this._injector.get('translate', false) || function(s) { return s; };

  minDom.attr(this._toggle, 'title', translate('Open minimap'));

  this._eventBus.fire('minimap.toggle', { open: false });
};

Minimap.prototype.toggle = function(open) {

  var currentOpen = this.isOpen();

  if (typeof open === 'undefined') {
    open = !currentOpen;
  }

  if (open == currentOpen) {
    return;
  }

  if (open) {
    this.open();
  } else {
    this.close();
  }
};

Minimap.prototype.isOpen = function() {
  return this._state.isOpen;
};

Minimap.prototype._updateElement = function(element) {

  try {

    // if parent is null element has been removed, if parent is undefined parent is root
    if (element.parent !== undefined && element.parent !== null) {
      this._removeElement(element);
      this._addElement(element);
    }
  } catch (error) {
    console.warn('Minimap#_updateElement errored', error);
  }

};

Minimap.prototype._updateElementId = function(element, newId) {

  try {
    var elementGfx = minDom.query('#' + cssEscape(element.id), this._elementsGroup);

    if (elementGfx) {
      elementGfx.id = newId;
    }
  } catch (error) {
    console.warn('Minimap#_updateElementId errored', error);
  }

};

/**
 * Adds an element to the minimap.
 */
Minimap.prototype._addElement = function(element) {
  var self = this;

  this._removeElement(element);

  var parent,
      x, y;

  var newElementGfx = this._createElement(element);
  var newElementParentGfx = minDom.query('#' + cssEscape(element.parent.id), this._elementsGroup);

  if (newElementGfx) {

    var elementGfx = this._elementRegistry.getGraphics(element);
    var parentGfx = this._elementRegistry.getGraphics(element.parent);

    var index = getIndexOfChildInParentChildren(elementGfx, parentGfx);

    // index can be 0
    if (index !== 'undefined') {
      if (newElementParentGfx) {

        // in cases of doubt add as last child
        if (newElementParentGfx.childNodes.length > index) {
          insertChildAtIndex(newElementGfx, newElementParentGfx, index);
        } else {
          insertChildAtIndex(newElementGfx, newElementParentGfx, newElementParentGfx.childNodes.length - 1);
        }

      } else {
        this._elementsGroup.appendChild(newElementGfx);
      }

    } else {

      // index undefined
      this._elementsGroup.appendChild(newElementGfx);
    }

    if (isConnection(element)) {
      parent = element.parent;
      x = 0;
      y = 0;

      if (typeof parent.x !== 'undefined' && typeof parent.y !== 'undefined') {
        x = -parent.x;
        y = -parent.y;
      }

      tinySvg.attr(newElementGfx, { transform: 'translate(' + x + ' ' + y + ')' });
    } else {
      x = element.x;
      y = element.y;

      if (newElementParentGfx) {
        parent = element.parent;

        x -= parent.x;
        y -= parent.y;
      }

      tinySvg.attr(newElementGfx, { transform: 'translate(' + x + ' ' + y + ')' });
    }

    if (element.children && element.children.length) {
      element.children.forEach(function(child) {
        self._addElement(child);
      });
    }

    return newElementGfx;
  }
};

Minimap.prototype._removeElement = function(element) {
  var elementGfx = this._svg.getElementById(element.id);

  if (elementGfx) {
    tinySvg.remove(elementGfx);
  }
};

Minimap.prototype._createElement = function(element) {
  var gfx = this._elementRegistry.getGraphics(element),
      visual;

  if (gfx) {
    visual = GraphicsUtil.getVisual(gfx);

    if (visual) {
      var elementGfx = tinySvg.clone(visual);
      tinySvg.attr(elementGfx, { id: element.id });

      return elementGfx;
    }
  }
};

function isConnection(element) {
  return element.waypoints;
}

function getOffsetViewport(diagramPoint, viewbox) {
  var centerViewbox = {
    x: viewbox.x + (viewbox.width / 2),
    y: viewbox.y + (viewbox.height / 2)
  };

  return {
    x: diagramPoint.x - centerViewbox.x,
    y: diagramPoint.y - centerViewbox.y
  };
}

function mapMousePositionToDiagramPoint(position, svg, lastViewbox) {

  // firefox returns 0 for clientWidth and clientHeight
  var boundingClientRect = svg.getBoundingClientRect();

  // take different aspect ratios of default layers bounding box and minimap into account
  var bBox =
    fitAspectRatio(lastViewbox, boundingClientRect.width / boundingClientRect.height);

  // map click position to diagram position
  var diagramX = map(position.x, 0, boundingClientRect.width, bBox.x, bBox.x + bBox.width),
      diagramY = map(position.y, 0, boundingClientRect.height, bBox.y, bBox.y + bBox.height);

  return {
    x: diagramX,
    y: diagramY
  };
}

function setViewboxCenteredAroundPoint(point, canvas) {

  // get cached viewbox to preserve zoom
  var cachedViewbox = canvas.viewbox(),
      cachedViewboxWidth = cachedViewbox.width,
      cachedViewboxHeight = cachedViewbox.height;

  canvas.viewbox({
    x: point.x - cachedViewboxWidth / 2,
    y: point.y - cachedViewboxHeight / 2,
    width: cachedViewboxWidth,
    height: cachedViewboxHeight
  });
}

function fitAspectRatio(bounds, targetAspectRatio) {
  var aspectRatio = bounds.width / bounds.height;

  // assigning to bounds throws exception in IE11
  var newBounds = minDash.assign({}, {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height
  });

  if (aspectRatio > targetAspectRatio) {

    // height needs to be fitted
    var height = newBounds.width * (1 / targetAspectRatio),
        y = newBounds.y - ((height - newBounds.height) / 2);

    minDash.assign(newBounds, {
      y: y,
      height: height
    });
  } else if (aspectRatio < targetAspectRatio) {

    // width needs to be fitted
    var width = newBounds.height * targetAspectRatio,
        x = newBounds.x - ((width - newBounds.width) / 2);

    minDash.assign(newBounds, {
      x: x,
      width: width
    });
  }

  return newBounds;
}

function map(x, inMin, inMax, outMin, outMax) {
  var inRange = inMax - inMin,
      outRange = outMax - outMin;

  return (x - inMin) * outRange / inRange + outMin;
}

/**
 * Returns index of child in children of parent.
 *
 * g
 * '- g.djs-element // parentGfx
 * '- g.djs-children
 *    '- g
 *       '-g.djs-element // childGfx
 */
function getIndexOfChildInParentChildren(childGfx, parentGfx) {
  var childrenGroup = minDom.query('.djs-children', parentGfx.parentNode);

  if (!childrenGroup) {
    return;
  }

  var childrenArray = [].slice.call(childrenGroup.childNodes);

  var indexOfChild = -1;

  childrenArray.forEach(function(childGroup, index) {
    if (minDom.query('.djs-element', childGroup) === childGfx) {
      indexOfChild = index;
    }
  });

  return indexOfChild;
}

function insertChildAtIndex(childGfx, parentGfx, index) {
  var childrenArray = [].slice.call(parentGfx.childNodes);

  var childAtIndex = childrenArray[index];

  parentGfx.insertBefore(childGfx, childAtIndex.nextSibling);
}

function isZeroDimensional(clientRect) {
  return clientRect.width === 0 && clientRect.height === 0;
}

function isPointInside(point, rect) {
  return point.x > rect.left
    && point.x < rect.left + rect.width
    && point.y > rect.top
    && point.y < rect.top + rect.height;
}

var sign = Math.sign || function(n) {
  return n >= 0 ? 1 : -1;
};

/**
 * Get step size for given range and number of steps.
 *
 * @param {Object} range - Range.
 * @param {number} range.min - Range minimum.
 * @param {number} range.max - Range maximum.
 */
function getStepSize(range, steps) {

  var minLinearRange = Math.log(range.min) / Math.log(10),
      maxLinearRange = Math.log(range.max) / Math.log(10);

  var absoluteLinearRange = Math.abs(minLinearRange) + Math.abs(maxLinearRange);

  return absoluteLinearRange / steps;
}

function cap(range, scale) {
  return Math.max(range.min, Math.min(range.max, scale));
}

function getOverlayClipPath(outer, inner) {
  var coordinates = [
    toCoordinatesString(inner.left, inner.top),
    toCoordinatesString(inner.left + inner.width, inner.top),
    toCoordinatesString(inner.left + inner.width, inner.top + inner.height),
    toCoordinatesString(inner.left, inner.top + inner.height),
    toCoordinatesString(inner.left, outer.height),
    toCoordinatesString(outer.width, outer.height),
    toCoordinatesString(outer.width, 0),
    toCoordinatesString(0, 0),
    toCoordinatesString(0, outer.height),
    toCoordinatesString(inner.left, outer.height)
  ].join(', ');

  return 'polygon(' + coordinates + ')';
}

function toCoordinatesString(x, y) {
  return x + 'px ' + y + 'px';
}

function validViewbox(viewBox) {

  return minDash.every(viewBox, function(value) {

    // check deeper structures like inner or outer viewbox
    if (minDash.isObject(value)) {
      return validViewbox(value);
    }

    return minDash.isNumber(value) && isFinite(value);
  });
}

var index = {
  __init__: [ 'minimap' ],
  minimap: [ 'type', Minimap ]
};

export default index;
