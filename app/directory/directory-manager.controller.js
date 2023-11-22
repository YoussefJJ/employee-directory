(function(){
    'use strict';

    angular
        .module('app.directory')
        .controller('DirectoryManagerCtrl', DMController)

    DMController.$inject = ['$scope', "modalService"];

    function DMController($scope, modalService) {
        /* jshint validthis:true */
        var vm = this;
        
        vm.openModal = openModal;
        vm.closeModal = closeModal;

        init();

        $scope.$on("item.deletion", function(event, modalId) {
            openModal(modalId);
        })

        $scope.$on("item.deleted", function(event, modalId) {
            closeModal(modalId);
        })

        $scope.$on("employee.add", function(event, modalId) {
            openModal(modalId);
            $("#employee-input").focus()
        })
        
        $scope.$on("employee.added", function(event, modalId) {
            closeModal(modalId);
        })

        function openModal(id){
            modalService.Open(id);
        }

        function closeModal(id){
            modalService.Close(id);
        }

        function init() {}
    }
})();