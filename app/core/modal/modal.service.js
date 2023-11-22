(function () {
    'use strict';

    angular
        .module('core.modal')
        .factory('modalService', Service);

    function Service() {
        var modals = []; // array of modals on the page
        var service = {};

        service.Add = Add;
        service.Remove = Remove;
        service.Open = Open;
        service.Close = Close;

        return service;

        function Add(modal) {
            // add modal to array of active modals
            modals.push(modal);
        }
        
        function Remove(id) {
            // remove modal from array of active modals
            var modalToRemove = modals.find(m => m.id === id);
            const idx = modals.indexOf(modalToRemove);
            return modals.splice(idx, 1);
        }

        function Open(id) {
            // open modal specified by id
            var modal = modals.find(m => m.id === id);
            modal.open();
        }

        function Close(id) {
            // close modal specified by id
            var modal = modals.find(m => m.id === id);
            modal.close();
        }
    }

})();