export function BookPreview({ book, onSelect, onRemove }) {
    return (
      <article className="book-preview">
        <h3>{book.title}</h3>
        <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
        <button onClick={() => onSelect(book.id)}>Details</button>
        <button onClick={() => onRemove(book.id)}>Remove</button>
      </article>
    )
  }
  