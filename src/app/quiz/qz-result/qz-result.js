export default ['$templateCache', '$compile', 'quizService', directive]

function directive($templateCache, $compile, quizService) {
	return {
		restrict: 'E'
		//, replace: true
		, scope: {
			index: '='
			, type: '@'
		}
		, template: (element, attrs) => $templateCache.get(`app/quiz/qz-result/qz-result.tpl.html`)
		, bindToController: true
		, controller: controllerFactory()
		, controllerAs: 'resultCtrl'
	};
}

function controllerFactory() {
	return ['$scope', 'quizService', function ($scope, quizService) {
		//quizService
	}];
}
