"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.privateRoutes = exports.publicRoutes = void 0;

var _config = _interopRequireDefault(require("~/config"));

var _pages = require("~/pages");

var _layouts = require("~/layouts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//routes
var publicRoutes = [{
  path: _config["default"].routes.login,
  component: _pages.LoginPage,
  layout: null
}, {
  path: _config["default"].routes.register,
  component: _pages.RegisterPage,
  layout: null
}, {
  path: _config["default"].routes.home,
  component: _pages.HomePage,
  layout: _layouts.HeaderOnly
}, {
  path: _config["default"].routes.error,
  component: _pages.ErrorPage,
  layout: null
}, {
  path: _config["default"].routes.createCVSeekerPage,
  component: _pages.CreateCVSeekerPage,
  layout: _layouts.HeaderOnly
}, {
  path: _config["default"].routes.dashboard,
  component: _pages.DashboardPage
}, {
  path: _config["default"].routes.serviceAndPolicy,
  component: _pages.ServiceAndPolicyPage,
  layout: _layouts.HeaderOnly
}, {
  path: _config["default"].routes.findJob,
  component: _pages.FindJobPage,
  layout: _layouts.HeaderOnly
}];
exports.publicRoutes = publicRoutes;
var privateRoutes = [];
exports.privateRoutes = privateRoutes;