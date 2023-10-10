"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageContainer = PageContainer;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Breadcrumbs = _interopRequireDefault(require("@mui/material/Breadcrumbs"));
var _Container = _interopRequireDefault(require("@mui/material/Container"));
var _Link = _interopRequireDefault(require("@mui/material/Link"));
var _Stack = _interopRequireDefault(require("@mui/material/Stack"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _useSlotProps = _interopRequireDefault(require("@mui/utils/useSlotProps"));
var _material = require("@mui/material");
var _Link2 = require("../shared/Link");
var _PageContainerToolbar = require("./PageContainerToolbar");
var _navigation = require("../shared/navigation");
var _useActivePage = require("../useActivePage");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PageContentHeader = (0, _material.styled)('div')(({
  theme
}) => ({
  display: 'flex',
  flexDirection: 'row',
  jusifyContent: 'space-between',
  gap: theme.spacing(2)
}));
/**
 * A container component to provide a title and breadcrumbs for your pages.
 *
 * Demos:
 *
 * - [Page Container](https://mui.com/toolpad/core/react-page-container/)
 *
 * API:
 *
 * - [PageContainer API](https://mui.com/toolpad/core/api/page-container)
 */
function PageContainer(props) {
  var _ref, _props$breadCrumbs, _ref2, _props$title, _props$slots$toolbar, _props$slots, _props$slotProps;
  const {
    children,
    slots,
    slotProps,
    ...rest
  } = props;
  const activePage = (0, _useActivePage.useActivePage)();
  const breadCrumbs = (_ref = (_props$breadCrumbs = props.breadCrumbs) != null ? _props$breadCrumbs : activePage == null ? void 0 : activePage.breadCrumbs) != null ? _ref : [];
  const title = (_ref2 = (_props$title = props.title) != null ? _props$title : activePage == null ? void 0 : activePage.title) != null ? _ref2 : '';
  const ToolbarComponent = (_props$slots$toolbar = props == null || (_props$slots = props.slots) == null ? void 0 : _props$slots.toolbar) != null ? _props$slots$toolbar : _PageContainerToolbar.PageContainerToolbar;
  const toolbarSlotProps = (0, _useSlotProps.default)({
    elementType: ToolbarComponent,
    ownerState: props,
    externalSlotProps: props == null || (_props$slotProps = props.slotProps) == null ? void 0 : _props$slotProps.toolbar,
    additionalProps: {}
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Container.default, {
    ...rest,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Stack.default, {
      sx: {
        my: 2
      },
      spacing: 2,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_Stack.default, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Breadcrumbs.default, {
          "aria-label": "breadcrumb",
          children: breadCrumbs ? breadCrumbs.map((item, index) => {
            return index < breadCrumbs.length - 1 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
              component: _Link2.Link,
              underline: "hover",
              color: "inherit",
              href: item.path,
              children: (0, _navigation.getItemTitle)(item)
            }, item.path) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
              color: "text.primary",
              children: (0, _navigation.getItemTitle)(item)
            }, item.path);
          }) : null
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(PageContentHeader, {
          children: [title ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
            variant: "h4",
            children: title
          }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(ToolbarComponent, {
            ...toolbarSlotProps
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: children
      })]
    })
  });
}
process.env.NODE_ENV !== "production" ? PageContainer.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The breadcrumbs of the page. Leave blank to use the active page breadcrumbs.
   */
  breadCrumbs: _propTypes.default.arrayOf(_propTypes.default.shape({
    path: _propTypes.default.string.isRequired,
    title: _propTypes.default.string.isRequired
  })),
  /**
   * @ignore
   */
  children: _propTypes.default.node,
  /**
   * The props used for each slot inside.
   */
  slotProps: _propTypes.default.shape({
    toolbar: _propTypes.default.shape({
      children: _propTypes.default.node
    }).isRequired
  }),
  /**
   * The components used for each slot inside.
   */
  slots: _propTypes.default.shape({
    toolbar: _propTypes.default.elementType
  }),
  /**
   * The title of the page. Leave blank to use the active page title.
   */
  title: _propTypes.default.string
} : void 0;