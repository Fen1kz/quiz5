export default ['$scope', 'quizService', function ($scope, quizService) {
	$scope.ctrl = this;

	let quiz = quizService.quiz();
	this.question = quizService.question();

	//this.quizList = [quiz1];
  //
	//this.startQuiz = (quiz) => {
	//	console.log('started', quiz);
	//	quizResults.init(quiz);
	//}
}];
