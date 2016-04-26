(function() {
  'use strict';

  // .module('devPortal', ["ui.router"])
  angular
    .module('Core', ['ui.router', 'ngResource', 'ngPromiseExtras'])
    // .factory('HttpHeaderInterceptor', ['$window', function($window) {
    //   return {
    //     request: function(config) {
    //       config.headers = config.headers || {};
    //       config.headers.Authorization = 'Bearer ' + JSON.parse($window.sessionStorage.token);
    //       return config;
    //     }
    //   };
    // }])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('HttpHeaderInterceptor');
    }])
    .config(function($stateProvider, $urlRouterProvider) {

      $stateProvider.state("Home", {
          template: '<ui-view/>',
          controller: function($state, IdpClient) {
            if (IdpClient.isAuthorized('USER', 'devnet-alpha.integratingfactor.com')) {
              $state.transitionTo('Home.User');
            } else {
              $state.transitionTo('Home.Guest');
            }
          }
        })
        .state('Home.Guest', {
          templateUrl: '/site/home/home-tab-guest.html',
          controller: 'SectionsCtrl',
          controllerAs: 'sections'
        })
        .state('Home.User', {
          templateUrl: '/site/home/home-tab-user.html'
        });

      $stateProvider.state("GoHome", {
        controller: function($state) {
          $state.transitionTo('Home');
        }
      });

      $stateProvider.state("Issues", {
        templateUrl: '/site/search/search-tab.html'
      });

      $stateProvider.state("Projects", {
        templateUrl: '/site/projects/projects-tab-all.html',
        controller: 'ProjectsCtrl',
        controllerAs: 'projects'
      });

      $stateProvider.state("Projects.Modal", {
        params: {
          projectI: null
        },
        views: {
          "modal": {
            templateUrl: '/site/projects/projectModal.html',
            controller: 'ProjectModalCtrl',
            controllerAs: 'projectModal'
          }
        }
      });

      $stateProvider.state("ProjectsCreate", {
        templateUrl: '/site/projects/projects-tab-create.html',
        controller: 'ProjectsCreateCtrl',
        controllerAs: 'projects'
      });

      $stateProvider.state("ProjectsManage.Default", {
        views: {
          "modal": {
            template: '<div></div>'
          }
        }
      });

      $stateProvider.state("ProjectsManage", {
        params: {
          projectIndex: null
        },
        templateUrl: '/site/projects/projects-tab-manage.html',
        controller: 'ProjectsManageCtrl',
        controllerAs: 'projects'
      });

      $stateProvider
        .state("ProjectsManage.AppInput", {
          parent: 'ProjectsManage',
          params: {
            appIndex: null
          },
          views: {
            "modal": {
              templateUrl: '../site/application/appInputModal.html',
              controller: 'AppInputModalCtrl',
              controllerAs: 'appInputCtrl'
            }

          }
        })
        .state("ProjectsManage.User", {
          parent: 'ProjectsManage',
          params: {
            userI: null,
            role: ''
          },
          views: {
            "modal": {
              templateUrl: '../site/user/userModal.html',
              controller: 'UserModalCtrl',
              controllerAs: 'userModalCtrl'
            }
          }
        })
        .state("ProjectsManage.Invite", {
          parent: 'ProjectsManage',
          params: {
            inviteI: null,
            role: ''
          },
          views: {
            "modal": {
              templateUrl: '../site/user/inviteModal.html',
              controller: 'InviteModalCtrl',
              controllerAs: 'inviteModalCtrl'
            }
          }
        });

      $urlRouterProvider.otherwise('/');
    });
})();
