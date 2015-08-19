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
		this.$results = [];
	}

	getQuizList() {
		return Promise.resolve(this.$quizList);
	}

	init(quiz) {
		this.$quiz = quiz;
	}

	quiz() {
		if (!this.$quiz) {
			this.$quiz = _.find(this.$quizList, 'name', this.$stateParams.name);
			this.$quiz.answers = [];
			this.$quiz.questions = this.$quiz.questions.map((question, index) => _.assign(question, {
				index: index
				, first: index === 0
				, last: index === this.$quiz.questions.length - 1
			}));
		}
		return this.$quiz;
	}

	answer(question, _answer) {
		if (!_.isEmpty(_answer)) {
			this.$quiz.answers[question.index] = _answer;
			question.answered = true;
		} else {
			question.answered = false;
		}
	}

	endQuiz() {
		this.$quiz.results = _.zipWith(this.$quiz.questions, this.$quiz.answers, (question, answer) => {
			let result = {};
			result.score = (() => {
				switch (question.type) {
					case 'one':
						let realAnswer = question.answers[answer];
						return (!_.isEmpty(realAnswer) ? realAnswer.score : 0);
					case 'multi':
						return _.zipWith(question.answers, answer || [], (qItem, aItem) => {
							aItem = _.defaults(aItem || {}, {score: 0});
							return ((qItem.score > 0 && aItem.score > 0)
								? 1
								: (qItem.score <= 0 && aItem.score > 0)
									? -1
									: 0);
						}).reduce((sum, score) => {
							return (sum + score >= 0 ? sum + score : 0);
						}, 0);
					case 'text':
						return (_.chain(question.answer).trim().escape().startCase().value() === _.chain(answer).trim().escape().startCase().value() ? 1 : 0);
					default:
						return 0;
				}
			})();
			return result;
		});
		return Promise.resolve();
	}
}
