import angular from 'angular';
import appModule from 'app/app';

import quizDirective from 'app/quiz/quiz/quiz.directive';
import quizList from 'app/quiz/quiz.list'
import quizSelf from 'app/quiz/quiz.self'
import quizService from 'app/quiz/service.quiz-service'

let module = angular.module('quiz', []);

quizService(module);
quizDirective(module);

module.config(($stateProvider) => {
	$stateProvider
		.state('quiz-list', {
			url: '/quiz'
			, templateProvider: function ($templateCache) {
				// simplified, expecting that the cache is filled
				// there should be some checking... and async $http loading if not found
				return $templateCache.get('app/quiz/quiz.list.tpl.html');
			}
			//, template: $templateCache.get('app/quiz/quiz.tpl.html')
			, controller: quizList
		})
		.state('quiz-self', {
			url: '/quiz/:name/:question'
			, templateProvider: ['$templateCache', ($tc) => $tc.get('app/quiz/quiz.self.tpl.html')]
			, controller: quizSelf
		})
});

export default module;

//function controller($scope) {
//	let questions = quiz.questions;
//	loop((number) => {
//		let question = quiz.questions[number];
//		if (!question) return void 0;
//		console.log(number);
//
//		this.question = question;
//
//		return {
//			result: ++number
//		};
//	}, [0])
//	.then(() => {
//			console.log('shit has ended!');
//	})
//}
//
//function loop(fn, args) {
//	return Promise.resolve(fn.apply(null, args))
//		.then((resultObject) => {
//			if (typeof resultObject === 'object'
//				&& 'result' in resultObject
//				&& resultObject.result !== void 0) {
//				return loop(fn, [resultObject.result]);
//			}
//		});
//}
