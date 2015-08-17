export default ['$scope', '$state', 'quizService', function ($scope, $state, quizService) {
	$scope.ctrl = this;

	quizService.getQuizList()
		.then((quizList) => {
			this.quizList = quizList;
		});

	this.startQuiz = (quiz) => {
		$state.go('quiz-self', {name: quiz.name, question: 0});
	}
}];
