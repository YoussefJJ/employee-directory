(function () {
    'use strict';

    angular
        .module ('app.directory')
        .component ('directory', directory());


    function directory() {

        function directoryController($scope, $directoryService){
            var ctrl = this;
            ctrl.companies = [];
            ctrl.message = "";
            ctrl.newEmployeeData = {};
            ctrl.execute = () => {};
            
            init();

            ctrl.selectCategory = function(index) {
                ctrl.selected.catIdx = index;
                ctrl.departments = ctrl.directoryData[index].departments.map(d => d.departmentName);
                ctrl.selected.empIdx = null;
                ctrl.selected.depIdx = null;
            }

            ctrl.selectDepartment = function(index) {
                ctrl.selected.depIdx = index;
                const i = ctrl.selected.catIdx;
                ctrl.employees = ctrl.directoryData[i].departments[index].employees;
                ctrl.selected.empIdx = null;
            }

            ctrl.selectEmployee = function(index) {
                ctrl.selected.empIdx = index;
            }

            function deleteCat() {
                if (ctrl.selected.catIdx === null) return;

                $directoryService.deleteCat(ctrl.selected).then(data => {
                    ctrl.companies = data.map(c => c.categoryName);
                });

                ctrl.selected = {
                    catIdx: null,
                    depIdx: null,
                    empIdx: null,
                }
            }

            function deleteDep() {
                const catIdx = ctrl.selected.catIdx;
                if (catIdx === null) return;
                
                $directoryService.deleteDep(ctrl.selected).then(data => {
                    ctrl.companies = data.map(c => c.categoryName);
                    ctrl.departments = data[catIdx].departments.map(d => d.departmentName);
                    
                    ctrl.selected = {
                        catIdx: catIdx,
                        depIdx: null,
                        empIdx: null,
                    }
                });
            }

            function deleteEmp() {
                const catIdx = ctrl.selected.catIdx;
                const depIdx = ctrl.selected.depIdx;
                if (catIdx === null || depIdx === null) return;

                $directoryService.deleteEmp(ctrl.selected).then(data => {
                    ctrl.companies = data.map(c => c.categoryName);
                    ctrl.departments = data[catIdx].departments.map(d => d.departmentName);
                    ctrl.employees = data[catIdx].departments[depIdx].employees;

                    ctrl.selected = {
                        catIdx: catIdx,
                        depIdx: depIdx,
                        empIdx: null,
                    }
                })

            }

            function command(callbackFn, event, modalId) {
                return () => {
                    $scope.$broadcast(event, modalId);
                    callbackFn();
                }
            }

            function addEmp() {
                const catIdx = ctrl.selected.catIdx;
                const depIdx = ctrl.selected.depIdx;
                if (catIdx === null || depIdx === null) return;
                
                $directoryService.addEmployee(ctrl.selected, ctrl.newEmployeeData).then(data => {
                    ctrl.companies = data.map(c => c.categoryName);
                    ctrl.departments = data[catIdx].departments.map(d => d.departmentName);
                    ctrl.employees = data[catIdx].departments[depIdx].employees;
                })
            }

            ctrl.delete = function(type, modalId) {
                $scope.$broadcast("item.deletion", modalId);
                switch (type) {
                    case 'category':
                        ctrl.execute = command(deleteCat, "item.deleted", modalId);
                        break;
                    case 'department':
                        ctrl.execute = command(deleteDep, "item.deleted", modalId);
                        break;
                    case 'employee':
                        ctrl.execute = command(deleteEmp, "item.deleted", modalId);
                        break;
                    default:
                        return;
                }
                ctrl.message = `Are you sure you want to delete this ${type}?`;
            }

            ctrl.add = function(modalId) {
                $scope.$broadcast("employee.add", modalId)
                ctrl.execute = command(addEmp, "employee.added",modalId)
            }

            function init() {
                $directoryService.getData().then(data => {
                    ctrl.directoryData = data
                    ctrl.companies = ctrl.directoryData.map(c => c.categoryName)
                    ctrl.selected = {
                        catIdx: null,
                        depIdx: null,
                        empIdx: null,
                    }
                })
            }
        }

        return {
            bindings: {},
            controller: ["$scope", "directoryService", directoryController],
            templateUrl: "directory/directory.html",
            controllerAs: 'ctrl'
        }
    }

} ());

