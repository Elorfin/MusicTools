/**
 * Lesson routes
 */
angular
    .module('Lesson')
    .config([
        'apiResourceRouteProvider',
        function LessonRoutes(apiResourceRouteProvider) {
            apiResourceRouteProvider.register('Lesson', 'Lesson', 'lessons', false);
        }
    ]);