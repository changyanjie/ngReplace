(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('angular'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(['angular'], factory);
    } else {
        // Global Variables
        factory(root.angular);
    }
}(this, function (angular) {
    'use strict';

    var m = angular.module('ngReplace', []);

    m.factory('replaceWith',['$compile','$http',
        function($compile,$http){

            var replaceTpl = function(replaceTpl,replaceId,scope){
                 $http.get(replaceTpl, {cache: true}).then(function (response) {
                    var replaceDom = angular.element('#' + replaceId);

                    replaceDom.html(response.data);
                    $compile(replaceDom.contents())(scope);
                });
            }

            return {
                template: replaceTpl
            }
        }
    ])

    m.directive('ngClickReplace', function (replaceWith) {

        var linker = function (scope, element, attrs) {
            element.bind('click', function () {
                var replaceTpl = attrs.replaceTpl,
                    replaceId = attrs.replaceId;

                replaceWith.template(replaceTpl,replaceId,scope);
                //$http.get(replaceTpl, {cache: true}).then(function (response) {
                //    var replaceDom = angular.element('#' + replaceId);
                //
                //    replaceDom.html(response.data);
                //    $compile(replaceDom.contents())(scope);
                //});
            })
        };

        return {
            restrict: 'E',
            link: linker,
            scope: {
                content: '='
            }
        };
    });
}));