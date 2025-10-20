import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from './graphql/queries/book'
import { ME } from './graphql/queries/user'

const RecommendedView = ({ token }) => {
  const { data: allBooksData } = useQuery(ALL_BOOKS)
  const { data: meData } = useQuery(ME)

  if (!token) return <>Please log in to view recommendations</>
  if (!meData) return <>cannot receive favorite genre</>
  if (!allBooksData) return null

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{meData.me.favoriteGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooksData.allBooks
            ?.filter(
              (b) =>
                b.genres.includes(meData.me.favoriteGenre)
            )
            .map((a) => (
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

export default RecommendedView
