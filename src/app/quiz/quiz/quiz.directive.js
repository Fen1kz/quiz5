export default (ngModule) => {
	ngModule.directive('qzQuiz', directiveFactory());
};

function directiveFactory() {
	return ['$templateCache', function ($templateCache) {
		return {
			restrict: 'E'
			, template: $templateCache.get('app/quiz/quiz/quiz.directive.tpl.html')
			, controller: [controller]
		}
	}];
}

function controller() {
	console.log('quiz-d!');
}
