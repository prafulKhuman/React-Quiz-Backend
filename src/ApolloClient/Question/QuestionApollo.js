import { gql } from '@apollo/client';

export const GET_QUESTION = gql`
  {
    Question {
      id
      quizName
      quizId
      questions {
        question
        options {
          id
          value
          status
        }
      }
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation AddQuestion($quizName: String!, $quizId: String!, $questions: [QuestionsInputType!]!) {
    addQuestion(quizName: $quizName, quizId: $quizId, questions: $questions) {
      id
      quizName
      quizId
      questions {
        question
        options {
          id
          value
          status
        }
      }
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: ID!) {
    deleteQuestion(id: $id) {
      id
      quizName
      quizId
      questions {
        question
        options {
          id
          value
          status
        }
      }
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation UpdateQuestion($id: ID!, $quizName: String, $quizId: String!, $questions: [QuestionsInputType!]!) {
    updateQuestion(id: $id, quizName: $quizName, quizId: $quizId, questions: $questions) {
      id
      quizName
      quizId
      questions {
        question
        options {
          id
          value
          status
        }
      }
    }
  }
`;
