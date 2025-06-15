import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onSelectBookId, onRemoveBook }) {
  return (
    <ul className="book-list">
      {books.map(book => (
        <li key={book.id}>
          <BookPreview
            book={book}
            onSelect={onSelectBookId}
            onRemove={onRemoveBook}
          />
        </li>
      ))}
    </ul>
  )
}

