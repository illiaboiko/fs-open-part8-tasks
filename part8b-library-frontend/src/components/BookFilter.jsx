import { useState } from 'react'

const BookFilter = ({ allBooks, changeFilter, filter }) => {
  if (!allBooks) return null


  let genresSet = new Set()
  for (const book of allBooks) {
    for (const genre of book.genres) {
      genresSet.add(genre)
    }
  }
  const genresToDisplay = Array.from(genresSet)

  const handleFilterClick = (f) => {
    if(f === filter) return null
    changeFilter(f)
  }

  return (
    <>
      filter:
      <button
        onClick={() => {
          changeFilter('')
        }}
        style={{
          margin: '4px',
          padding: '6px 12px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          backgroundColor: filter === '' ? '#007bff' : 'white',
          color: filter === '' ? 'white' : 'black',
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
            backgroundColor: filter === g ? '#007bff' : 'white',
            color: filter === g ? 'white' : 'black',
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
