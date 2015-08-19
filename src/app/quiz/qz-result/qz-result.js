export default ['$templateCache', '$compile', 'quizService', directive]

import _ from 'lodash';

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
		$scope.$on('QUIZ.RESULTS', (event, results) => {
			this.resultsTotal = results.length;
			this.resultsGood = _.reduce(results, (sum, result) => {
				return sum + (result.maxScore === result.score ? 1 : 0);
			}, 0);
		});
	}];
}
