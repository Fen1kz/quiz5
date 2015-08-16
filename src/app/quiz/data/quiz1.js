export default {
  questions: [{
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
      {id: 1, text: 'Lion'}
      , {id: 2, text: 'Adventure'}]
    , col2: [
      {id: 1, text: 'King'}
      , {id: 2, text: 'Times'}]
    , links: [
      {first: 1, second: 1}
      , {first: 2, second: 2}
    ]
  }, {
    type: 'text'
    , text: "Capital of The Great Britain?"
    , answer: "London"
  }]
};
