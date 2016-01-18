/**
 * Lesson routes
 */
angular
    .module('Lesson')
    .config([
        'resourceRouteProvider',
        function LessonRoutes(resourceRouteProvider) {
            resourceRouteProvider.register('Lesson', 'Lesson', 'lessons', false);
        }
    ]);