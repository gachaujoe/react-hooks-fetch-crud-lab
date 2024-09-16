import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

function App() {
  const [questions, setQuestions] = useState([]);
  const [questionFormDisp, setQuestionFormDisp] = useState(false);
  const [questListDisp, setQuestListDisp] = useState(true);

  console.log('questions:', questions);

  const onChangePage = (domValue) => {
    if (domValue === 'Form') {
      setQuestListDisp(false);
      setQuestionFormDisp(true);
    } else if (domValue === 'List') {
      setQuestionFormDisp(false);
      setQuestListDisp(true);
    }
  };

  const addQuestion = (questn) => {
    setQuestions([...questions, questn]);
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questn),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('success:', data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });

    setQuestionFormDisp(false);
    setQuestListDisp(true);
  };

  const removeQuestion = (id) => {
    console.log('deleting:', id)
    deleteData(id);
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  };

  const deleteData = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Record with id ${id} deleted successfully`);
        } else {
          console.error('Failed to delete record');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const updateQuestion = (id, updatedData) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedQuestions = questions.map((question) =>
          question.id === id ? { ...question, ...updatedData } : question
        );
        setQuestions(updatedQuestions);
        console.log('Question updated:', data);
      })
      .catch((error) => {
        console.error('Error updating question:', error);
      });
  };

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  return (
    <div>
      <AdminNavBar onChangePage={onChangePage} />
      {questionFormDisp && <QuestionForm addQuestion={addQuestion} />}
      {questListDisp && <QuestionList questions={questions} removeQuestion={removeQuestion} />}
      {/* Other components and logic */}
    </div>
  );
}

export default App;