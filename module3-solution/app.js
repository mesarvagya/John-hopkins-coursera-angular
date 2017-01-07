(function() {
    'use strict';
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service("MenuSearchService", MenuSearchService)
        .directive("foundItems", FoundItems)
        .constant("URL", "https://davids-restaurant.herokuapp.com/menu_items.json");



    function FoundItems() {
        var ddo = {
            templateUrl: "foundItems.html",
            scope: {
                items: "<",
                error: "<",
                onRemove: "&"
            }
        };

        return ddo;

    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.found = [];
        menu.searchTerm = "";
        menu.error = false;

        menu.narrowItDown = function() {
            menu.found = []
            if (menu.searchTerm) {
                var resultPromise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
                resultPromise.then(function(items) {
                    menu.found = items;
                });
            } else {
                menu.showError();

            }

        };

        menu.showError = function() {
             menu.error = (menu.found.length === 0);
        }

        menu.removeItem = function(index){
            menu.found.splice(index,1)
        }

    }

    MenuSearchService.$inject = ["$http", "URL"];

    function MenuSearchService($http, URL) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: URL,
            }).then(function(response) {
                var found_items = response.data.menu_items.filter(function(item) {
                    return item.description.indexOf(searchTerm) != -1;
                });
                return found_items;

            }).catch(function(error) {
                console.log("ERROR " + error);
            })

        }

    }

})();