// import { BookFilter } from "../cmps/BookFilter.jsx"
// import { BookList } from "../cmps/BookList.jsx"
// import { bookService } from "../services/book.service.js"
// import { BookDetails } from "./BookDetails.jsx"

// const { useState, useEffect, Fragment } = React

// export function BookIndex() {
    
//     const [books, setBooks] = useState(null)
//     const [selectedBookId, setSelectedBookId] = useState(null)
//     const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

//     useEffect(() => {
//         loadBooks()
//     }, [filterBy])

//     function loadBooks() {
//         bookService.query(filterBy)
//             .then(cars => setBooks(cars))
//             .catch(err => console.log('err:', err))
//     }

//     function onRemoveBook(bookId) {
//         BookService.remove(bookId)
//             .then(() => {
//                 setBooks(books => books.filter(book => book.id !== bookId))
//             })
//             .catch(err => {
//                 console.log('err:', err)
//             })
//     }

//     function onSetFilter(filterBy) { // ex: {txt:'asd'}
//         setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
//     }

//     function onSelectBookId(bookId) {
//         setSelectedBookId(bookId)
//     }

//     if (!books) return <div>Loading...</div>
  
//     return (
//         <section className="book-index">
//             {selectedBookId &&
//                 <BookDetails
//                     bookId={selectedBookId}
//                     onBack={() => setSelectedBookId(null)}
//                 />
//             }
//             {!selectedBookId &&
//                 <Fragment>
//                     <BookFilter
//                         defaultFilter={filterBy}
//                         onSetFilter={onSetFilter}
//                     />
//                     <BookList
//                         books={books}
//                         onRemoveBook={onRemoveBook}
//                         onSelectBookId={onSelectBookId}
//                     />
//                 </Fragment>
//             }
//         </section>
//     )


// }

// import { bookService } from '../services/book.service.js'
// import { BookList } from '../cmps/BookList.jsx'

// export function BookIndex() {
//   const [books, setBooks] = React.useState([])

//   React.useEffect(() => {
//     bookService.query().then(setBooks)
//   }, [])

//   return (
//     <section className="book-index">
//       <h2>Books</h2>
//       <BookList books={books} />
//     </section>
//   )
// }
  
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { BookDetails } from './BookDetails.jsx'

const { useState, useEffect, Fragment } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy)
      .then(setBooks)
      .catch(err => {
        console.log('Failed to load books:', err)
      })
  }

  function onRemoveBook(bookId) {
    bookService.remove(bookId)
      .then(() => {
        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
      })
      .catch(err => {
        console.log('Failed to remove book:', err)
      })
  }

  function onSetFilter(newFilter) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
  }

  function onSelectBookId(bookId) {
    setSelectedBookId(bookId)
  }

  if (!books) return <div>Loading...</div>

  return (
    <section className="book-index">
      {selectedBookId &&
        <BookDetails
          bookId={selectedBookId}
          onBack={() => setSelectedBookId(null)}
        />
      }

      {!selectedBookId &&
        <Fragment>
          <BookFilter
            filterBy={filterBy}
            onSetFilter={onSetFilter}
          />
          <BookList
            books={books}
            onRemoveBook={onRemoveBook}
            onSelectBookId={onSelectBookId}
          />
        </Fragment>
      }
    </section>
  )
}
