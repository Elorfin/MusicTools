/**
 * Lesson Module
 */
angular
    .module('Lesson', [
        'ui.tinymce'
    ])
    .value('uiTinymceConfig', {
        statusbar: false,
        elementpath: false,
        menubar: false,
        plugins: [
            'link',
            'image',
            'table',
            'code'
        ],
        toolbar: 'undo redo | styleselect | bold italic underline | bullist numlist table | alignleft aligncenter alignright alignjustify | indent outdent | link unlink | image | code'
    })
    .config([
        '$translateProvider',
        function lessonConfig($translateProvider) {
            // Inject translations
            for (var lang in lessonTranslations) {
                if (lessonTranslations.hasOwnProperty(lang)) {
                    $translateProvider.translations(lang, lessonTranslations[lang]);
                }
            }
        }
    ]);