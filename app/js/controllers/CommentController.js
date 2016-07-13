'use strict';

angular.module('commentApp')

.controller('CommentController', ['$scope', '$http', function($scope, $http){
	$http.get('components/json/comments.json')
	/**
	 * success() - запрос и загрузка ранее созданых комментариев
	 * @param  {[type]} response [description]
	 * @return {[type]}          [description]
	 */
	.success(function(response) {
		/**
		 * comments - объект, хранящий ответ сервера с файла 'comments.json' 
		 * @type {Object}
		 */
		$scope.comments = response.comments;
		// comments
		/**
		 * checked - маркер класса
		 * @type {String}
		 */
		var checked = 'm-panel-buttons__button_active';
		// checked
		/**
		 * data - объект, хранящий ответы пользователя
		 * @type {Object}
		 */
		$scope.data = {};
		$scope.data.showLast = true;
		$scope.data.showAll = false;
		$scope.data.buttonLast = checked;
		$scope.data.buttonAll = '';
		// data
		/**
		 * sendMessage - функция оправки комментария
		 */
		$scope.sendMessage = function() {
			/**
			 * monthArr и timeWrite() - инициализация и настройка тобажения времени отправки комментария
			 */
			var monthArr=new Array("января","февраля","марта","апреля","мая","июля","июня","августа","сентября","октября","ноября","декабря");

			function timeWrite(d) {
				var c = d.toString();
				var aa = d.getDate()+' '+monthArr[d.getMonth()]+' '+ c.replace(/^.*?\s(\d{3,4}).*$/ig,"$1").replace(/^0+/ig,'');
				$scope.data.date = aa;
			}
			// monthArr и timeWrite()

			if ($scope.data.message) {
				
				$scope.data.alert = '';
				$scope.data.name = prompt('Введите Ваше имя', 'Неизвестный автор');

				if ($scope.data.name) {

					var date = new Date();
					timeWrite(date);
					/**
					 * tempObj - сборка комментария
					 * @type {Object}
					 */
					var tempObj = {
						"name": $scope.data.name,
						"date": $scope.data.date,
						"dateBySeconds": date.getTime(),
						"message": $scope.data.message
					};
					// tempObj
					$scope.comments.push(tempObj);
					$scope.data.message = '';	
				}
			} else {
				$scope.data.alert = 'Введите текст сообщения!';
			}
		}
		// sendMessage()
		/**
		 * keypress() - определитель события по нажатию на клавиши 'Ctrl' + 'Enter'
		 * @param  {Object} event 
		 */
		$scope.keypress = function(event) {
			if (event.keyCode === 10) {
				$scope.sendMessage();		
			}
		}
		// keypress()
		/**
		 * changeCommentsDisplay() - управляет отображением комментариев и кнопками управления
		 * @param  {Object} event 
		 */
		$scope.changeCommentsDisplay = function(event) {
			if (event.target.dataset.name === 'data_lastComments') {
				$scope.data.showLast = true;
				$scope.data.showAll = false;
				$scope.data.buttonLast = checked;
				$scope.data.buttonAll = '';
			} else if (event.target.dataset.name === 'data_allComments') {
				$scope.data.showLast = false;
				$scope.data.showAll = true;
				$scope.data.buttonLast = '';
				$scope.data.buttonAll = checked;
			}
		}
		// changeCommentsDisplay()

	});// success()
}])