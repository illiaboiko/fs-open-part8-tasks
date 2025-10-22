import { useQuery, useSubscription } from '@apollo/client/react'
import { ALL_BOOKS } from '../graphql/queries/book'
import BookFilter from './BookFilter'
import { useState } from 'react'
import { BOOK_ADDED } from '../graphql/subsctiptions/book'

const Books = ({ notify }) => {
  const [filter, setFilter] = useState('')
  const { data: allBooksForGenresFilter } = useQuery(ALL_BOOKS)
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      notify('new book added')
      client.cache.updateQuery(
        {
          query: ALL_BOOKS,
          variables: {
            genre: '',
          },
        },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(addedBook),
          }
        }
      )
    },
  })

  if (error) {
    return (
      <>
        <p>{`${error.message}`}</p>
        <p>{`${error.stack}`}</p>
      </>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <BookFilter
        allBooks={allBooksForGenresFilter?.allBooks}
        filter={filter}
        changeFilter={(f) => setFilter(f)}
      />
      {loading ? (
        <p>Loading books ...</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Books
