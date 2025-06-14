"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.privateRoutes = exports.publicRoutes = void 0;

var _config = _interopRequireDefault(require("~/config"));

var _pages = require("~/pages");

var _layouts = require("~/layouts");

var _Single = _interopRequireDefault(require("~/pages/Single/Single"));

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
  component: _pages.ServiceAndPolicyPage
}, {
  path: _config["default"].routes.serviceAndPolicy,
  component: _pages.ServiceAndPolicyPage,
  layout: _layouts.HeaderOnly
}, {
  path: _config["default"].routes.findJobPage,
  component: _pages.FindJobPage,
  layout: _layouts.HeaderOnly
}, {
  path: _config["default"].routes.jobDetails,
  component: _pages.JobDetail,
  layout: _layouts.HeaderOnly
}, {
  path: _config["default"].routes.seekerDetailPage,
  component: _pages.SeekerDetailPage,
  layout: _layouts.HeaderOnly
}, {
  path: _config["default"].routes.verify,
  component: _pages.VerifyPage,
  layout: null
}, {
  path: _config["default"].routes.single,
  component: _Single["default"],
  layout: _layouts.HeaderOnly
}];
exports.publicRoutes = publicRoutes;
var privateRoutes = [{
  path: _config["default"].routes.dashboard,
  component: _pages.DashboardPage
}, {
  path: _config["default"].routes.findJob,
  component: _pages.FindJob,
  layout: _layouts.HeaderOnly
}];
exports.privateRoutes = privateRoutes;