import { gql } from '@apollo/client';



export const GET_RESULT_CONDITION = gql`
  query GetResult($id: String! , $userId : String!) {
    Result(id: $id , userId: $userId) {
        id
        quizname,
        quizid,
        userid,
        correctscore,
        incorrectscore,
        missing
        totalscore,
        status 
    }
  }
`;

export const CREATE_RESULT = gql`
mutation AddResult($quizname : String! , $quizid: String! , $userid: String! , $correctscore: String! ,$incorrectscore: String! ,$missing : String! , $totalscore: String! , $status: String!) {
    addResult(quizname: $quizname , quizid: $quizid , userid: $userid , correctscore: $correctscore , incorrectscore: $incorrectscore ,missing : $missing totalscore: $totalscore  , status: $status ) {
        id
        quizname,
        quizid,
        userid,
        correctscore,
        incorrectscore,
        missing,
        totalscore,
        status 
    }
  }
`;



