import angular from 'angular';
import router from 'angular-ui-router';
import templates from '../templates';

//import router from 'oclazyload-systemjs-router';
//import futureRoutes from 'app/routes.json!';
import quizModule from 'app/quiz/quiz.config';

var appModule = angular.module('app', ['templates', 'ui.router', quizModule.name]);

appModule.config(function($locationProvider, $httpProvider, $urlRouterProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$httpProvider.useApplyAsync(true);
	return $urlRouterProvider.otherwise('/quiz');
});

angular.element(document).ready(function() {
	return angular.bootstrap(document.body, [appModule.name], {
		strictDi: true
	});
});


export default appModule;
