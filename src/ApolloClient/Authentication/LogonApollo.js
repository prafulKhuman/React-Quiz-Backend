// mutations.js
import { gql } from '@apollo/client';


export const LOGIN_MUTATION = gql`
  mutation adminlogin($username: String!, $password: String!) {
    adminLogin(username: $username, password: $password){
        token
        userId
        message
    }
  }
`;

export const GET_ADMIN = gql`
{
  Admin{
    id
    username
    password
  }
}
`;

export const GET_USER = gql`
{
    User{
    id
    username
    password
  }
}
`;
