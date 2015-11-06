/**
 * Form controller for Songs
 * @constructor
 */
var SongFormController = function SongFormController(entity, Upload, ApiService, $timeout, $scope) {
    BaseFormController.apply(this, arguments);

    /*this.uploadService = Upload;*/

    $scope.uploadPic = function(file) {
        var method = this.isNew() ? 'POST' : 'PUT';
        var url    = this.isNew() ? ApiService.getServer() + '/songs' : ApiService.getServer() + '/songs/' + this.entity.id;
        file.upload = Upload.upload({
            url: url,
            method: method,
            data: {
                musictools_songbookbundle_song: {
                    title: this.entity.title,
                    artist: this.entity.artist,

                        cover: {
                            file: file
                        }
                }

            }
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }.bind(this);
};

// Extends BaseFormController
SongFormController.prototype             = Object.create(BaseFormController.prototype);
SongFormController.prototype.constructor = SongFormController;

SongFormController.prototype.validate = function () {
    /*this.uploadCover(this.entity.cover);*/

    BaseFormController.validate.apply(this, arguments);
};

SongFormController.prototype.uploadCover = function uploadCover(file) {
    /*file.upload = this.uploadService.upload({
        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        data: { file: file, username: $scope.username }
    });

    file.upload.then(function (response) {
        $timeout(function () {
            file.result = response.data;
        });
    }, function (response) {
        if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });*/
};

// Register controller into angular
angular
    .module('SongBook')
    .controller('SongFormController', [ 'entity', 'Upload', 'ApiService', '$timeout', '$scope', SongFormController ]);
