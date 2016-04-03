/**
 * API Error Interceptor
 * @constructor
 */
var ApiErrorInterceptor = function ApiErrorInterceptor($q, $location, AlertService) {
    return {
        response: function onResponseSuccess(responseData) {
            return responseData;
        },

        responseError: function onResponseError(response) {
            var type = 'error';
            if (response.status >= 400 && response.status < 500) {

            }
            switch (response.status) {
                // 400 : Bad Request
                case 400:
                    break;

                // 401 : Unauthorized
                case 401:
                    $location.path('/login');
                    break;

                // 403 : Forbidden
                case 403:
                    break;

                // 404 : Not Found
                case 404:
                    $location.path('/404');
                    break;

                // 422 : Unprocessable entity
                case 422:
                    AlertService.addWarning({ title: 'Invalid data.' }, {}, true);
                    break;

                case 500:
                    console.log(response);
                    if (response.data && response.data.errors) {
                        for (var i = 0; i < response.data.errors.length; i++) {
                            AlertService.addError(response.data.errors[i], false, {
                                label: 'RETRY',
                                action: function action() {
                                    console.log('coucou');
                                }
                            });
                        }
                    }

                    break;

                default:
                    $location.path('/error_server');
            }

            return $q.reject(response);
        }
    };
};

// Set up dependency injection
ApiErrorInterceptor.$inject = [ '$q', '$location', 'AlertService' ];

// Inject Service into AngularJS
angular
    .module('Api')
    .service('ApiErrorInterceptor', ApiErrorInterceptor);