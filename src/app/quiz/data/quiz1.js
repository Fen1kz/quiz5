export default {
	name: 'quiz1'
	, questions: [{
		type: 'one'
		, text: "Sup, how are you?"
		, answers: [{
			text: "i'm good"
			, score: 1
		}, {
			text: "fine"
			, score: 1
		}, {
			text: "thanks"
			, score: 1
		}, {
			text: "fuck you"
			, score: 0
		}]
	}, {
		type: 'multi'
		, text: "Choose your destiny"
		, answers: [{
			text: "power"
			, score: 1
		}, {
			text: "justice"
			, score: 1
		}, {
			text: "death"
			, score: 0
		}, {
			text: "something"
			, score: 0
		}]
	}, {
		type: 'link'
		, text: "make titles:"
		, col1: [
			{id: 0, text: 'Lion'}
			, {id: 1, text: 'Adventure'}
			, {id: 2, text: 'The Little'}]
		, col2: [
			{id: 0, text: 'King'}
			, {id: 1, text: 'Times'}
			, {id: 2, text: 'Mermaid'}]
		, links: [[0, 0], [1, 1], [2, 2]]
	}, {
		type: 'text'
		, text: "Capital of The Great Britain?"
		, answer: {
			text: "London"
			, score: 1
		}
	}]
};
