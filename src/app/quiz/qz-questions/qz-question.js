export default ['$templateCache', '$compile', 'quizService', directive]

function directive($templateCache, $compile, quizService) {
	return {
		restrict: 'E'
		//, replace: true
		, scope: {
			index: '='
			, type: '@'
		}
		, compile: (element, attrs) =>
			(scope, element, attrs) => {
				let template = $templateCache.get(`app/quiz/qz-questions/question.${attrs.type}.tpl.html`);
				element.html(template);
				$compile(element.contents())(scope);
			}
		, bindToController: true
		, controller: controllerFactory()
		, controllerAs: 'questionCtrl'
	};
}

function controllerFactory() {
	return ['$scope', 'quizService', function ($scope, quizService) {
		let ctrl = this;
		ctrl.question = quizService.quiz().questions[ctrl.index];
		$scope.$watchCollection('questionCtrl.answer', () => {
			quizService.answer(ctrl.question, ctrl.answer);
		});

		ctrl.util = {
			multi: {
				toggle: (item) => {
					if (ctrl.answer === void 0) ctrl.answer = [];
					var idx = ctrl.answer.indexOf(item);
					if (idx > -1) ctrl.answer.splice(idx, 1);
					else ctrl.answer.push(item);
				}
			}
		}
	}]
}
