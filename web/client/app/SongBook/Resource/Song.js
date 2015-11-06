/**
 * Song Resource
 */
angular
    .module('SongBook')
    .factory('Song', [
        '$resource',
        'ApiService',
        function SongResource($resource, ApiService){
            return $resource(ApiService.getServer() + '/songs/:id', { id: '@id' }, {
                create: {
                    method: 'POST',
                    transformRequest: function (data, headersGetter) {
                        var wrappedData = {
                            'musictools_songbookbundle_song': data
                        };

                        return JSON.stringify(wrappedData);
                    }
                },
                update: {
                    method: 'PUT',
                    transformRequest: function (data, headersGetter) {
                        var result = JSON.stringify(data.productIntro);
                        return result;
                    }
                }
            });
        }]
    );