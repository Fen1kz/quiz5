export default (ngModule) => {
	ngModule.service('quizService', ['$stateParams', QuizService]);
};

import Promise from 'bluebird';
import _ from 'lodash';

import quiz1 from 'app/quiz/data/quiz1';

class QuizService {
	constructor($stateParams) {
		this.$stateParams = $stateParams;
		this.$quizList = [quiz1];
	}

	getQuizList() {
		return Promise.resolve(this.$quizList);
	}

	init(quiz) {
		this.$quiz = quiz;
	}

	quiz() {
		return (this.$quiz
				? this.$quiz
				: this.$quiz = _.find(this.$quizList, 'name', this.$stateParams.name)
		);
	}

	question() {
		let questionNumber = this.$stateParams.question;
		return this.quiz().questions[questionNumber];
	}
}
