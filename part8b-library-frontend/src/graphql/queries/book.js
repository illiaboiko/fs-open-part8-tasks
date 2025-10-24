import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
        born
      }
      published
      genres
      id
    }
  }
`
