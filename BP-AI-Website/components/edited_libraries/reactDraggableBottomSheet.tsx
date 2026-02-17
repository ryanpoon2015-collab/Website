// @ts-nocheck

import Draggable from "@azabraao/react-draggable";
import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useCallbackRef } from "use-callback-ref";

/** ****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
const myDocument: Document | undefined =
  typeof window === "undefined" ? undefined : document;
let __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (const p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};

const lockBodyScroll = function () {
  const scrollingElement = myDocument?.scrollingElement || myDocument?.body;
  scrollingElement.style.overflow = "hidden";
};
const unlockBodyScroll = function () {
  const scrollingElement = myDocument?.scrollingElement || myDocument?.body;
  scrollingElement.style.overflow = "auto";
};

const Backdrop = function (_a) {
  const { onClick } = _a;
  const _b = _a.style;
  const style = _b === void 0 ? {} : _b;
  const _c = _a.className;
  const className = _c === void 0 ? "" : _c;
  const _d = _a.isActive;
  const isActive = _d === void 0 ? false : _d;
  return React.createElement("div", {
    onClick,
    "data-testid": "backdrop",
    className: clsx(
      "BottomSheet__backdrop",
      {
        "BottomSheet__backdrop--active": isActive,
      },
      className
    ),
    style,
  });
};
const Backdrop$1 = memo(Backdrop);

const DragIndicator = function (_a) {
  const _b = _a.className;
  const className =
    _b === void 0
      ? {
          wrap: "",
          indicator: "",
        }
      : _b;
  const _c = _a.style;
  const style =
    _c === void 0
      ? {
          wrap: {},
          indicator: {},
        }
      : _c;
  return React.createElement(
    "div",
    {
      className: clsx("BottomSheet__drag-indicator-wrap", className.wrap),
      style: style.wrap,
    },
    React.createElement("div", {
      className: clsx("BottomSheet__drag-indicator", className.indicator),
      style: style.indicator,
    })
  );
};
const DragIndicator$1 = memo(DragIndicator);

const useIsDesktop = function (desktopBreakpoint) {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= desktopBreakpoint;
};

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  const { insertAt } = ref;

  if (!css || typeof document === "undefined") {
    return;
  }

  const head = myDocument?.head || myDocument?.getElementsByTagName("head")[0];
  const style = myDocument?.createElement("style");
  style.type = "text/css";

  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(myDocument?.createTextNode(css));
  }
}

const css_248z =
  ".BottomSheet {\n  position: fixed;\n  display: flex;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 20;\n  transition-property: opacity;\n  justify-content: center;\n  align-items: flex-end;\n  color: #0f0e17;\n}\n\n.BottomSheet--modalOnDesktop {\n  align-items: center;\n}\n\n.BottomSheet--modalOnDesktop .BottomSheet__draggable {\n  pointer-events: none;\n}\n\n.BottomSheet--modalOnDesktop .BottomSheet__window {\n  pointer-events: all;\n}\n\n.BottomSheet--open {\n  pointer-events: auto;\n  opacity: 1;\n}\n\n.BottomSheet--closed {\n  transition-delay: 300ms;\n  opacity: 0;\n}\n\n.BottomSheet--closed,\n.BottomSheet--closed.BottomSheet--modalOnDesktop .BottomSheet__window,\n.BottomSheet--closed * {\n  pointer-events: none;\n}\n\n.BottomSheet__backdrop {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 20;\n  transition-property: opacity;\n  transition-duration: 500ms;\n  pointer-events: none;\n  opacity: 0;\n}\n\n.BottomSheet__backdrop--active {\n  pointer-events: auto;\n  opacity: 1;\n  background-color: #000;\n  opacity: 0.7;\n}\n\n.BottomSheet__draggable {\n  transition-property: transform;\n  transition-duration: 300ms;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  width: 100%;\n  max-width: 72rem;\n}\n\n.BottomSheet__window-wrap {\n  display: flex;\n  position: relative;\n  z-index: 40;\n  flex-direction: column;\n  max-height: 100vh;\n  background-color: #fff;\n}\n\n.BottomSheet__drag-indicator-wrap {\n  display: flex;\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  justify-content: center;\n  align-items: center;\n}\n\n.BottomSheet__drag-indicator {\n  width: 2.5rem;\n  height: 2px;\n  background-color: #0f0e17;\n}\n\n.BottomSheet__window {\n  overflow-y: auto;\n}\n\n.BottomSheet__window::-webkit-scrollbar {\n  display: none;\n}\n";
styleInject(css_248z);

const body = myDocument?.querySelector("body");
const UnderBody = function (_a) {
  const { children } = _a;
  return createPortal(children, body);
};
const BottomSheet = function (_a) {
  let _b;
  let _c;
  let _d;
  let _e;
  const { children } = _a;
  const { isOpen } = _a;
  const { close } = _a;
  const { onBackdropClick } = _a;
  const _f = _a.onDrag;
  const onDrag = _f === void 0 ? function () {} : _f;
  const _g = _a.onStart;
  const onStart = _g === void 0 ? function () {} : _g;
  const _h = _a.onMouseDown;
  const onMouseDown = _h === void 0 ? function () {} : _h;
  const _j = _a.modalOnDesktop;
  const modalOnDesktop = _j === void 0 ? false : _j;
  const _k = _a.desktopBreakpoint;
  const desktopBreakpoint = _k === void 0 ? 1024 : _k;
  const _l = _a.styles;
  const styles = _l === void 0 ? {} : _l;
  const _m = _a.disabled;
  const disabled = _m === void 0 ? false : _m;
  const _o = _a.classNames;
  const classNames =
    _o === void 0
      ? {
          bottomSheet: "",
          backdrop: "",
          draggable: "",
          window: {
            wrap: "",
            content: "",
          },
          dragIndicator: {
            wrap: "",
            indicator: "",
          },
        }
      : _o;
  const isDesktop = useIsDesktop(desktopBreakpoint);
  const _p = useState();
  const rect = _p[0];
  const setRect = _p[1];
  const ref = useCallbackRef(null, function (ref) {
    setRect(
      ref === null || ref === void 0 ? void 0 : ref.getBoundingClientRect()
    );
  });
  useEffect(
    function () {
      if (isOpen) lockBodyScroll();
      else unlockBodyScroll();
    },
    [isOpen]
  );
  const onDragging = (event, data) => {
    onDrag(event, data);
    if (ref === null || ref === void 0 ? void 0 : ref.current) {
      ref.current.style.transition = "none";
    }
  };
  const handleStopDragging = (_, _a) => {
    let _b;
    const { y } = _a;
    if (ref.current) {
      ref.current?.style?.transition = "transform 0.3s ease-in-out";
      const elementHeight =
        ((_b = ref.current) === null || _b === void 0
          ? void 0
          : _b.offsetHeight) | 0;
      const elementHeightHalf = elementHeight / 2;
      const shouldClose = y > elementHeightHalf;
      if (shouldClose) close();
    }
  };
  const position = useMemo(
    function () {
      return {
        x: 0,
        y: isOpen
          ? 0
          : (rect === null || rect === void 0 ? void 0 : rect.height) || 10000,
      };
    },
    [isOpen, rect]
  );
  return React.createElement(
    UnderBody,
    null,
    React.createElement(
      "div",
      {
        className: clsx(
          "BottomSheet",
          isOpen ? "BottomSheet--open" : "BottomSheet--closed",
          modalOnDesktop && isDesktop && "BottomSheet--modalOnDesktop",
          classNames.bottomSheet
        ),
        style: styles.bottomSheet,
      },
      React.createElement(Backdrop$1, {
        onClick(event) {
          if (onBackdropClick) onBackdropClick(event);
          close();
        },
        className: classNames.backdrop,
        style: styles.backdrop,
        isActive: isOpen,
      }),
      React.createElement(
        Draggable,
        {
          axis: "y",
          bounds: {
            top: 0,
            ...(isDesktop && modalOnDesktop && { bottom: 0 }),
          },
          position,
          defaultClassName: clsx(
            "BottomSheet__draggable",
            classNames.draggable
          ),
          onStop: handleStopDragging,
          onDrag: onDragging,
          onMouseDown,
          onStart,
          disabled,
          nodeRef: ref,
          cancel: "[data-no-drag]",
        },
        React.createElement(
          "div",
          {
            ref,
            className: clsx(
              "BottomSheet__window-wrap",
              (_b = classNames.window) === null || _b === void 0
                ? void 0
                : _b.wrap
            ),
            style:
              (_c = styles.window) === null || _c === void 0 ? void 0 : _c.wrap,
          },
          !modalOnDesktop &&
            !isDesktop &&
            React.createElement(DragIndicator$1, {
              className:
                classNames === null || classNames === void 0
                  ? void 0
                  : classNames.dragIndicator,
              style: styles.dragIndicator,
            }),
          React.createElement(
            "div",
            {
              className: clsx(
                "BottomSheet__window",
                (_d = classNames.window) === null || _d === void 0
                  ? void 0
                  : _d.content
              ),
              style:
                (_e = styles.window) === null || _e === void 0
                  ? void 0
                  : _e.content,
            },
            children
          )
        )
      )
    )
  );
};

// var ModifiedMottomSheet = BottomSheet;
// export default ModifiedMottomSheet;

const ModifiedBottomSheet = memo(BottomSheet);
export default ModifiedBottomSheet;
// # sourceMappingURL=index.js.map
