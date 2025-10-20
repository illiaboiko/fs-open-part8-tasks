import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../graphql/queries/book'
import { ME } from '../graphql/queries/user'

const RecommendedView = ({ token }) => {
  const { data: meData } = useQuery(ME)
  const favoriteGenre = meData?.me.favoriteGenre

  const { data: allBooksData } = useQuery(ALL_BOOKS, {
    variables: {
      genre: favoriteGenre || null,
    },
    skip: !favoriteGenre,
  })

  if (!token) return <>Please log in to view recommendations</>
  if (!meData) return <>Loading user data</>
  if (!favoriteGenre) return <>No favorite genre found</>
  if (!allBooksData) return null

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooksData.allBooks
            ?.filter((b) => b.genres.includes(favoriteGenre))
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
