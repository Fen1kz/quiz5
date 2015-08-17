export default (ngModule) => {
	ngModule.service('quizService', serviceFactory());
};

import Promise from 'bluebird';
import _ from 'lodash';

import quiz1 from 'app/quiz/data/quiz1';

class quizService {
	constructor($stateParams) {
		this.$stateParams = $stateParams;
	}

}

function serviceFactory() {
	return ['$stateParams', function ($stateParams) {
		let $quizList = [quiz1];
		return {
			getQuizList: () => {
				return Promise.resolve($quizList);
			}
			, init: (quiz) => {
				this.$quiz = quiz;
			}
			, quiz: () => {
				return (this.$quiz
					? this.$quiz
					: this.$quiz = _.find($quizList, 'name', $stateParams.name)
				);
			}
			, question: () => {
				let questionNumber = $stateParams.question;
				return this.quiz().questions[questionNumber];
			}
		}
	}]
}
