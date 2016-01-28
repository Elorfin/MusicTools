/**
 * HTTP Error Service
 * @constructor
 */
var HttpErrorService = function HttpErrorService($q, $location) {
    return {
        response: function(responseData) {
            return responseData;
        },

        responseError: function error(response) {
            switch (response.status) {
                case 401:
                    $location.path('/login');
                    break;
                case 404:
                    $location.path('/404');
                    break;
                default:
                    $location.path('/error_server');
            }

            return $q.reject(response);
        }
    };
};

// Set up dependency injection
HttpErrorService.$inject = [ '$q', '$location' ];

// Inject Service into AngularJS
angular
    .module('Utilities')
    .service('HttpErrorService', HttpErrorService);