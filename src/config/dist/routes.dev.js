"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _SeekerDetail = _interopRequireDefault(require("~/pages/SeekerDetail/SeekerDetail"));

var _routes;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var routes = (_routes = {
  home: '/',
  profile: '/profile',
  jobs: '/jobs',
  // List of all jobs
  jobDetails: '/jobs/:id',
  // Job details page
  postJob: '/post-job',
  // Page to post a new job
  login: '/login',
  // Login page
  register: '/register',
  // Registration page
  about: '/about',
  // About page
  contact: '/contact',
  // Contact page
  dashboard: '/dashboard',
  // Admin or user dashboard
  applications: '/applications',
  // List of job applications
  applicationDetails: '/applications/:id',
  // Application details page
  serviceAndPolicy: '/service-and-policy',
  error: '/error',
  createCVSeekerPage: '/createCVSeekerPage',
  findJobPage: '/findJobPage'
}, _defineProperty(_routes, "jobDetails", '/jobDetails'), _defineProperty(_routes, "seekerDetailPage", '/seekerDetailPage'), _defineProperty(_routes, "findJob", '/find-job'), _defineProperty(_routes, "findCandidate", '/find-candidate'), _defineProperty(_routes, "verify", '/api/auth/verify'), _defineProperty(_routes, "single", '/single'), _routes);
var _default = routes;
exports["default"] = _default;