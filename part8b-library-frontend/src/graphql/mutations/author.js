import { gql } from '@apollo/client'

export const EDIT_AUTHOR = gql`
  mutation ($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      born
      id
      name
    }
  }
`
