/**
 * API Error Service
 * @constructor
 */
var ApiErrorService = function ApiErrorService($q, $location, AlertService) {
    return {
        response: function onResponseSuccess(responseData) {
            return responseData;
        },

        responseError: function onResponseError(response) {
            switch (response.status) {
                case 401:
                    $location.path('/login');
                    break;
                case 404:
                    $location.path('/404');
                    break;
                // 422 : Unprocessable entity
                case 422:
                    AlertService.addAlert('error', 'Invalid data.', true);
                    break;
                default:
                    $location.path('/error_server');
            }

            return $q.reject(response);
        }
    };
};

// Set up dependency injection
ApiErrorService.$inject = [ '$q', '$location', 'AlertService' ];

// Inject Service into AngularJS
angular
    .module('Api')
    .service('ApiErrorService', ApiErrorService);