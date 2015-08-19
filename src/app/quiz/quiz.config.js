import angular from 'angular';
import appModule from 'app/app';


import quizService from 'app/quiz/service.quiz-service'
import quizList from 'app/quiz/quiz-list/quiz-list'
import quizSelf from 'app/quiz/quiz.self'

import qzQuestionDirective from 'app/quiz/qz-questions/qz-question';
import qzResultDirective from 'app/quiz/qz-result/qz-result';

let module = angular.module('quiz', []);

quizService(module);
module.directive('qzQuestion', qzQuestionDirective);
module.directive('qzResult', qzResultDirective);

module.config(($stateProvider) => {
	$stateProvider
		.state('quiz-list', {
			url: '/quiz'
			, templateProvider: function ($templateCache) {
				// simplified, expecting that the cache is filled
				// there should be some checking... and async $http loading if not found
				return $templateCache.get('app/quiz/quiz-list/quiz-list.tpl.html');
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
