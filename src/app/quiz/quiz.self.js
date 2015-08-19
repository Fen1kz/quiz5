import _ from 'lodash';

export default ['$scope', '$state', '$stateParams', '$mdDialog', 'quizService', function ($scope, $state, $stateParams, $mdDialog, quizService) {
	$scope.ctrl = this;

	this.quiz = quizService.quiz();

	this.tabs = this.quiz.questions;
	this.selectedTab = (!isNaN($stateParams.question) ? $stateParams.question : this.tabs.length);
	this.tabResults = {
		custom: true
		, label: 'Результаты'
		, content: 'lalal'
		, disabled: !(this.selectedTab === this.tabs.length)
	};

	if (this.tabResults.disabled) {
		this.question = this.quiz.questions[this.selectedTab];
	} else {
		this.question = null;
	}

	this.selectTab = (index) => {
		this.selectedTab = index;
	};

	this.mdOnSelect = (index) => {
		//console.log('selected', index, this.selectedTab);
		$state.transitionTo('quiz-self', {name: this.quiz.name, question: index}, {notify: false});
		this.question = this.quiz.questions[this.selectedTab];
	};

	this.mdOnSelectResult = (index) => {
		//console.log('selected', index, this.selectedTab);
		$state.transitionTo('quiz-self', {name: this.quiz.name, question: 'result'}, {notify: false});
		this.question = null;
	};

	this.mdOnDeselect = (index) => {
		//console.log('deselected', index, this.selectedTab);
		this.previousSelectedTab = index;
	};

	this.endQuizAsk = ($event) => {
		this.endQuiz();
		//var confirm = $mdDialog.confirm()
		//	.title('Результаты')
		//	.content('Закончить тест и перейти к \n результатам?')
		//	.ok('Да')
		//	.cancel('Нет')
		//	.targetEvent($event);
		//$mdDialog.show(confirm)
		//	.then(() => {
		//	this.endQuiz();
		//});
	};

	this.endQuiz = () => {
		this.tabResults.disabled = false;
		this.selectTab(this.tabs.length);
		quizService.endQuiz();
	}
}];
