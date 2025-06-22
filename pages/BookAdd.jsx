// import React from 'react'
const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'
import { googleBookService } from '../services/googleBook.service.js'

export function BookAdd() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!searchTerm) return

    const timeoutId = setTimeout(() => {
      googleBookService.query(searchTerm)
        .then(setResults)
        .catch(err => {
          console.error('Failed to fetch books from Google:', err)
          setResults([])
        })
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  function onAddBook(googleBook) {
    bookService.addGoogleBook(googleBook)
      .then(() => {
        alert(`"${googleBook.title}" added successfully`)
      })
      .catch(err => {
        alert(`"${googleBook.title}" could not be added: ${err}`)
      })
  }

  return (
    <section className="book-add">
      <h2>Search Google Books</h2>
      <input
        type="text"
        placeholder="Search book title..."
        value={searchTerm}
        onChange={ev => setSearchTerm(ev.target.value)}
      />

      <ul>
        {results.map(book => (
          <li key={book.id}>
            {book.title}
            <button onClick={() => onAddBook(book)}>+</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
