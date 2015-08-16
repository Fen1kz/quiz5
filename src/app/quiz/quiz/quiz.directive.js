export default (ngModule) => {
	ngModule.directive('qzQuiz', directive);
};

import template from 'app/quiz/quiz/quiz.directive.tpl.html';

function directive() {
	return {
		restrict: 'E'
		, templateUrl: template.name
		, controller: [controller]
	}
}

function controller() {
	console.log('quiz-d!');
}