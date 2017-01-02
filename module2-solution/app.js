(function () {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
	  var toBuy = this;

	  toBuy.items = ShoppingListCheckOffService.getItems();

	  toBuy.buyItem = function(item){
	  		ShoppingListCheckOffService.buyItem(item);
	  };

	}

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {
	  var alreadyBought = this;

	  alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();

	}

	function ShoppingListCheckOffService() {
	  var service = this;

	  // Generated some item names
	  var items = [{
	  	name : "Baked Chilli Yak",
	  	quantity : 10
	  },
	  {
	  	name : "Mango Cobbler",
	  	quantity : 15
	  },
	  {
	  	name : "Cookies",
	  	quantity : 25
	  },
	  {
	  	name : "Cinnamon Buns",
	  	quantity : 5
	  },
	  {
	  	name : "Raspberry Delight",
	  	quantity : 5
	  },{
	  	name : "Mandarin Crispies",
	  	quantity : 12
	  }
	  ];

	  var itemsToBuy = items;
	  var itemsBought = []; // array to hold bought items

	  service.getItems = function () {
	  	return itemsToBuy;
	  };

	  // buy the selected item, remove it from the main array and push the data to bought array.
	  service.buyItem = function (item) {
	    itemsBought.push(item);
	    itemsToBuy.splice(itemsToBuy.indexOf(item),1);
	    // console.log(itemsBought);
	  };

	  service.getBoughtItems = function () {
	    return itemsBought;
	  };
	}

  
})();