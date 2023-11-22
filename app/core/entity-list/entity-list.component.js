(function () {
    'use strict';

    angular
        .module ('core.entity-list')
        .component ('list', entityList());


    function entityList() {

        function EntityListController(){
            var ctrl = this;
            ctrl.searchValue = "";

            init();

            ctrl.getPlaceholder = function() {
                let placeholder = "";
                switch (ctrl.title) {
                    case "Companies":
                        placeholder = "a company";
                        break; 
                    case "Departments":
                        placeholder = "a department";
                        break;
                    case "Employees":
                        placeholder = "an employee";
                        break;  
                }

                return `Search ${placeholder}...`
            }

            function init() {
                ctrl.canadd = false;
            }
        }

        return {
            bindings: {
                data: "<",
                title: "<",
                canadd: "<",
                selected: "<",
                onSelect: "&",
                onadd: "&"
            },
            controller: EntityListController,
            templateUrl: "core/entity-list/entity-list.html",
            controllerAs: 'ctrl'
        }
    }

} ());