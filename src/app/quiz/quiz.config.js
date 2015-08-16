import angular from 'angular';
import appModule from 'app/app';
import todoTpl from 'app/quiz/quiz.tpl';

let module = angular.module('quiz', [appModule.name, todoTpl.name]);

import quizDirective from 'app/quiz/quiz/quiz.directive';

quizDirective(module);


module.config(($stateProvider) => {
	$stateProvider
		.state('home', {
			url: '/quiz/home'
			, templateUrl: todoTpl.name
			, controller: ['$scope', controller]
		})
		//.state('todo.all', {
		//	url: '/all',
		//	templateUrl: todoTpl.name,
		//	controller: 'TodoCtrl'
		//})
		//.state('todo.completed', {
		//	url: '/completed',
		//	templateUrl: todoTpl.name,
		//	controller: 'TodoCtrl'
		//})
		//.state('todo.active', {
		//	url: '/active',
		//	templateUrl: todoTpl.name,
		//	controller: 'TodoCtrl'
		//});
});

export default module;

import quiz from 'app/quiz/data/quiz1';
import Promise from 'bluebird';

function controller($scope) {
	$scope.ctrl = this;

	let questions = quiz.questions;
	loop((number) => {
		let question = quiz.questions[number];
		if (!question) return void 0;
		console.log(number);

		this.question = question;

		return {
			result: ++number
		};
	}, [0])
	.then(() => {
			console.log('shit has ended!');
	})
}

function loop(fn, args) {
	return Promise.resolve(fn.apply(null, args))
		.then((resultObject) => {
			if (typeof resultObject === 'object'
				&& 'result' in resultObject
				&& resultObject.result !== void 0) {
				return loop(fn, [resultObject.result]);
			}
		});
}
