import { gql } from '@apollo/client';

export const GET_CATEGORY = gql`
{
    Category {
    id
    name
  }
}
`;

export const CREATE_CATEGORY = gql`
mutation CreateCategory($name: String!) {
    addCategory(name: $name) {
    id
    name
  }
}
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
      name
    }
  }
`;


export const UPDATE_CATEGORY = gql`
mutation updateCategory($id: ID!, $name: String) {
  updateCategory(id: $id, name: $name) {
    id
    name
  }
}
`;