import { gql } from '@apollo/client';

export const GET_RULES = gql`
{
    Rules {
    id
    quizid
    quiz
    rules
    
  }
}
`;

export const CREATE_RULES = gql`
mutation AddRules($quizid : String! , $quiz: String! , $rules: String!) {
    addRules(quizid: $quizid , quiz: $quiz , rules: $rules) {
      id
      quizid
      quiz
      rules
    }
  }
`;

export const DELETE_RULES = gql`
  mutation DeleteRules($id: ID!) {
    deleteRules(id: $id) {
        id
        quizid
        quiz
        rules
      
    }
  }
`;


export const UPDATE_RULES = gql`
mutation UpdateRules($id: ID!, $quizid: String! , $quiz: String! , $rules: String!)  {
    updateRules(id: $id ,quizid: $quizid, quiz: $quiz , rules: $rules) {
        id
        quizid
        quiz
        rules
    
  }
}
`;