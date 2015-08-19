import angular from 'angular';
import 'angular-ui-router';
import 'angular-material';
import templates from '../templates';
import './assets/quiz.css!';

//import router from 'oclazyload-systemjs-router';
//import futureRoutes from 'app/routes.json!';
import quizModule from 'app/quiz/quiz.config';

var appModule = angular.module('app', ['templates', 'ngMaterial', 'ui.router', quizModule.name]);

appModule.config(['$mdThemingProvider', function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		//.primaryPalette('blue')
		//.accentPalette('green');
}]);

appModule.config(['$locationProvider', '$httpProvider', '$urlRouterProvider', function($locationProvider, $httpProvider, $urlRouterProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$httpProvider.useApplyAsync(true);
	return $urlRouterProvider.otherwise('/quiz');
}]);

angular.element(document).ready(function() {
	return angular.bootstrap(document.body, [appModule.name], {
		strictDi: true
	});
});


export default appModule;
