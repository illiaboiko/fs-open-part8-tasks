import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../graphql/queries/book'
import BookFilter from './BookFilter'
import { useState } from 'react'

const Books = () => {
  const { loading, error, data } = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('')

  if (loading) return <p>loading data...</p>

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
        allBooks={data?.allBooks}
        changeFilter={(f) => setFilter(f)}
      />

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {(filter
            ? data.allBooks.filter((book) => book.genres.includes(filter))
            : data.allBooks
          ).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
