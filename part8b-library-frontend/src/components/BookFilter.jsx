import { useState } from 'react'

const BookFilter = ({ allBooks, changeFilter }) => {
  if (!allBooks) return null

  const [pickedFilter, setPickedFilter] = useState('')

  let genresSet = new Set()
  for (const book of allBooks) {
    for (const genre of book.genres) {
      genresSet.add(genre)
    }
  }
  const genresToDisplay = Array.from(genresSet)

  const handleFilterClick = (f) => {
    setPickedFilter(f)
    changeFilter(f)
  }

  return (
    <>
      filter:
      <button
        onClick={() => {
          setPickedFilter('')
          changeFilter('')
        }}
        style={{
          margin: '4px',
          padding: '6px 12px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          backgroundColor: pickedFilter === '' ? '#007bff' : 'white',
          color: pickedFilter === '' ? 'white' : 'black',
          cursor: 'pointer',
        }}
      >
        All
      </button>
      {genresToDisplay.map((g) => (
        <button
          key={g}
          onClick={() => handleFilterClick(g)}
          style={{
            margin: '4px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: pickedFilter === g ? '#007bff' : 'white',
            color: pickedFilter === g ? 'white' : 'black',
            cursor: 'pointer',
          }}
        >
          {g}
        </button>
      ))}
    </>
  )
}

export default BookFilter
