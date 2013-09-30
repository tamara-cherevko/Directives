(function () {
	'use strict';

	angular.module('mainModule').directive("dropdown", ['$parse', function($log) {
		return {
			restrict: "AEC"
			,replace: true
			,scope: {
				data: '&'
			}
			,template:
				"<div class='dropdown-list' ng-class='{white: isWhite}'>" +
					"<div class='dropdown-list__title'>" +
						"<span ng-show='selectedItem'>{{selectedItem}}</span>" +
						"<span ng-hide='selectedItem'>Please select...</span>" +
					"</div>" +
					"<div class='dropdown-list__body'>" +
						"<div class='dropdown-list__items'>" +
							"<div class='dropdown-list__item' ng-repeat='item in items' ng-click='selectItem($index)' ng-class='{active: item == selectedItem}'>" +
                                "{{item}}" +
							"</div>" +
							"<div class='dropdown-list__separator'></div>" +
							"<div class='dropdown-list__item' ng-click='close()'>some action in future</div>" +
						"</div>" +
					"</div>" +
			    "</div>"

			,link: function(scope, element, attr){
				scope.isWhite =  attr.white !== undefined;
				scope.selectedItem = null;
				scope.items = scope.data();

				var dropDownClass = ".dropdown-list",
					titleElement = $(element).find(".dropdown-list__title"),
					openClass = "open",
					activeClass = "active",
					disabledClass = "disabled",
					toggle;

				scope.selectItem  = function(index){
					if(scope.items && scope.items[index]){
						scope.selectedItem = scope.items[index];
						scope.close();
					} else{
						$log.info("|DropDown Directive: Can't set selectedItem")
					}
				};

				scope.close = function(){
					var dropDown = $(element),
						dropDownIsOpen = dropDown.hasClass(openClass) && dropDown.hasClass(activeClass);

					if(dropDownIsOpen){
						dropDown.removeClass(openClass);
						dropDown.removeClass(activeClass);
					}
				};

				/* private functions */
				toggle = function(){
					var dropDown = $(element),
						dropDownIsOpen = dropDown.hasClass(openClass) && dropDown.hasClass(activeClass);

					if(!dropDown.hasClass(disabledClass)){
						if(dropDownIsOpen){
							scope.close();
						} else{
							$(dropDownClass).removeClass(openClass);
							$(dropDownClass).removeClass(activeClass);
							dropDown.addClass(openClass).addClass(activeClass);
						}
					}
				};

				/* add event listeners*/
				titleElement.bind('click', function($event){
					toggle()
				});

				$('body, html').bind('click', function($event){
					var dropDown = $($event.target).parents(dropDownClass);
					if(!dropDown.length){
						scope.close();
					}
				});
			}
		}
	}]);

})();