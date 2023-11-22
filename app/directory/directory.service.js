(function(){
    'use strict';

    angular
        .module('app.directory')
        .factory('directoryService', factory)

    factory.$inject = ['$http', "$q"];

    function factory($http, $q) {
        var service = {
            getData: getData,
            deleteCat,
            deleteEmp,
            deleteDep,
            addEmployee
        };

        service.directory = null;

        function deleteEmp({catIdx, depIdx, empIdx}) {
            return $q(function(resolve, reject) {
                service.directory[catIdx].departments[depIdx].employees.splice(empIdx, 1);
                resolve(service.directory);
            })
        }

        function deleteDep({catIdx, depIdx}) {
            return $q(function(resolve, reject) {
                service.directory[catIdx].departments.splice(depIdx, 1);
                resolve(service.directory);
            });
        }

        function deleteCat({catIdx}) {
            return $q(function(resolve, reject) {
                service.directory.splice(catIdx, 1);
                resolve(service.directory);
            })
        }

        function addEmployee({catIdx, depIdx}, employeeData) {
            return $q(function(resolve, reject) {
                service.directory[catIdx].departments[depIdx].employees.push(employeeData.name);
                resolve(service.directory)
            })
        }

        return service;

        function getData() {
            return $q(function(resolve, reject) {
                if (service.directory) {
                    resolve(service.directory)
                }
                $http.get("data.json").then(function(response) {
                    service.directory = response.data
                    resolve(response.data)
                }, function(err) {
                    reject(err)
                })
            })
        }
    }
})();