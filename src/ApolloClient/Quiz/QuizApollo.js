import { gql } from '@apollo/client';

export const GET_QUIZ = gql`
{
    Quiz {
    id
    name
    category
    description
    totalQuestion
    
  }
}
`;

export const CREATE_QUIZ = gql`
mutation AddQuiz($name: String! , $category : String! ,  $description:String! , $totalQuestion : Int! ) {
    addQuiz(name: $name ,category: $category ,  description : $description , totalQuestion : $totalQuestion ) {
    id
    name
    category
    description
    totalQuestion
    
  }
}
`;

export const DELETE_QUIZ = gql`
  mutation DeleteQuiz($id: ID!) {
    deleteQuiz(id: $id) {
      id
      name
      category
      description
      totalQuestion
      
    }
  }
`;


export const UPDATE_QUIZ = gql`
mutation UpdateQuiz($id: ID!, $name: String , $category: String! ,  $description:String! , $totalQuestion:Int! ) {
    updateQuiz(id: $id, name: $name , category: $category ,  description:$description , totalQuestion: $totalQuestion ) {
    id
    name
    category
    description
    totalQuestion
    
  }
}
`;