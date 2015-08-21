export default ['$templateCache', '$compile', 'quizService', directive]

import _ from 'lodash';

function directive($templateCache, $compile, quizService) {
	return {
		restrict: 'E'
		//, replace: true
		, scope: {
			index: '='
			, type: '@'
			, result: '='
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
	return ['$scope', 'dragulaService', 'quizService', function ($scope, dragulaService, quizService) {
		let ctrl = this;
		ctrl.question = quizService.quiz().questions[ctrl.index];
		$scope.$watchCollection('questionCtrl.answer', () => {
			quizService.answer(ctrl.question, ctrl.answer);
		});

		$scope.$on('QUIZ.ENDED', (e) => {
			if (ctrl.events[ctrl.type] && ctrl.events[ctrl.type].end) {
				ctrl.events[ctrl.type].end();
			}
		});

		$scope.$on('QUIZ.RESULTS', (e) => {
			if (ctrl.events[ctrl.type] && ctrl.events[ctrl.type].results) {
				ctrl.events[ctrl.type].results();
			}
		});


		ctrl.events = {
			link: {
				start: () => {
					ctrl.cols = _.zip(ctrl.question.col1, ctrl.question.col2);
					ctrl.answer = [];
					ctrl.question.col1.map((item) => _.assign(item, {
						items: []
					}));
					ctrl.targets = ctrl.question.col1;
					ctrl.source = ctrl.question.col2;
					$scope.$watch(() => ctrl.targets, (a, b) => {
						if (!ctrl.result) {
							ctrl.answer.length = 0;
							ctrl.targets.forEach((target) => {
								target.items.forEach((item) => {
									ctrl.answer.push([target.id, item.id]);
								});
							});
						}
					}, true);
				}
				, end: () => {
					dragulaService.destroy($scope, 'qz-bag-link');
				}
				, results: () => {
					ctrl.targets.forEach(target => {
						target.items.forEach((item) => {
							ctrl.answer.forEach(answer => {
								if (target.id == answer[0] && item.id == answer[1]) {
									item.score = answer[2];
								}
							});
						});
					})
				}
			}
		};

		ctrl.util = {
			multi: {
				toggle: (index) => {
					ctrl.answer[index] = !ctrl.answer[index];
				}
				, checked: (index) => {
					return ctrl.answer[index];
				}
			}
		}

		if (ctrl.events[ctrl.type] && ctrl.events[ctrl.type].start) {
			ctrl.events[ctrl.type].start();
		}
	}]
}
