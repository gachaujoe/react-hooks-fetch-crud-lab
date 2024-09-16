// import React from "react";

// function QuestionList() {
//   return (
//     <section>
//       <h1>Quiz Questions</h1>
//       <ul>{/* display QuestionItem components here after fetching */}</ul>
//     </section>
//   );
// }

// export default QuestionList;

import React from 'react';
import QuestionItem from './QuestionItem';

function QuestionList({ questions, removeQuestion }) {
  return (
    <ul>
      {questions.map((question) => (
        <QuestionItem 
          key={question.id} 
          question={question} 
          removeQuestion={removeQuestion} 
        />
      ))}
    </ul>
  );
}

export default QuestionList;
