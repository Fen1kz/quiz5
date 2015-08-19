export default ['$templateCache', 'quizService', directive]

function directive($templateCache, quizService) {
	return {
		restrict: 'E',
		replace: true,
		template: () => $templateCache.get(`app/quiz/qz-tabs/tabs.tpl.html`)
	};
}
