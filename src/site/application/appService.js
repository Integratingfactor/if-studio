(function() {

  'use strict';

  angular
    .module('projects-templates')
    .factory('AppService', AppService);

  function App() {
    this.app_type = '';
    this.app_secret = '';
    this.encryption_key = '';
    this.redirect_urls = [];
    this.privacy_url = '';
    this.app_name = '';
    this.app_info = '';
  };

  /* *ngInject */
  function AppService($q, $log, IfStudioClient) {

    var app = {
      app_type: '',
      app_secret: '',
      encryption_key: '',
      redirect_urls: [],
      privacy_url: '',
      app_name: '',
      app_info: ''
    };

    var model = {
      currAppIndex: 0,
      currApp: {
        "app_type": "backend_app",
        "app_secret": "Secret123",
        "encryption_key": "a.secret.key",
        "redirect_urls": [
          "http://localhost:8080"
        ],
        "privacy_url": "http://localhost:8080/privacy.html",
        "app_name": "app1",
        "app_info": "a test app for testing"
      },
      appList: [{
        "app_type": "backend_app",
        "app_secret": "Secret123",
        "encryption_key": "a.secret.key",
        "redirect_urls": [
          "http://localhost:8080"
        ],
        "privacy_url": "http://localhost:8080/privacy.html",
        "app_name": "app1",
        "app_info": "a test app for testing"
      }, {
        "app_type": "endpoint_app",
        "app_secret": "Secret123",
        "encryption_key": "a.secret.key",
        "redirect_urls": [
          "http://localhost:8080"
        ],
        "privacy_url": "http://localhost:8080/privacy.html",
        "app_name": "app2",
        "app_info": "a test app for testing"
      }, {
        "app_type": "endpoint_app",
        "app_secret": "Secret123",
        "encryption_key": "a.secret.key",
        "redirect_urls": [
          "http://localhost:8080"
        ],
        "privacy_url": "http://localhost:8080/privacy.html",
        "app_name": "app3",
        "app_info": "a test app for testing"
      }]
    };

    var service = {
      newApp: newApp,
      getAllApps: getAllApps,
      updateApp: updateApp,
      createApp: createApp,
      getAppModel: getAppModel,
      initAppModel: initAppModel,
      setModelAppList: setModelAppList,
      getModelAppList: getModelAppList,
      setModelProjectOrgId: setModelProjectOrgId,
      getModelProjectOrgId: getModelProjectOrgId
    }

    return service;

    //////////
    function noop() {

    }

    function newApp() {
      return new App();
    }

    function getAllApps(orgId, success, failure) {
      return IfStudioClient.getAllApps(orgId, success, failure);
      // var deferred = $q.defer();
      // deferred.resolve(model.appList);
      // return deferred.promise;
    }

    function updateApp(orgId, appId, app, success, failure) {
      return IfStudioClient.updateApp(orgId, appId, app, success, failure);
    }

    function createApp(orgId, app, success, failure) {
      return IfStudioClient.registerApp(orgId, app, success, failure);
    }

    function getAppModel() {
      return model;
    }

    function initAppModel() {
      model = {};
    }

    function setModelAppList(appList) {
      model.appList = angular.copy(appList);
    }

    function getModelAppList() {
      return angular.copy(model.appList);
    }

    function setModelProjectOrgId(orgId) {
      model.projectOrgId = orgId;
    }

    function getModelProjectOrgId() {
      return model.projectOrgId;
    }

  }
})();
