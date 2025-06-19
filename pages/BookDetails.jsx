import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {
  const [book, setBook] = useState(null)

  useEffect(() => {
    loadBook()
  }, [])

  function loadBook() {
    bookService.get(bookId)
      .then(setBook)
      .catch(err => {
        console.log('Failed to load book:', err)
      })
  }

  if (!book) return <div>Loading...</div>

  const { title, description, thumbnail, listPrice, pageCount, publishedDate } = book

  const readingLevel = getReadingLevel(pageCount)
  const publicationStatus = getPublicationStatus(publishedDate)
  const priceClass = getPriceClass(listPrice.amount)

  return (
    <section className="book-details container">
      <button onClick={onBack}> Back</button>
      <h1>{title}</h1>
      <img src={thumbnail} alt={title} />
      <p>{description}</p>
      <p>
        Pages: {pageCount} – <span>{readingLevel}</span>
      </p>
      <p>
        Published: {publishedDate} – <span>{publicationStatus}</span>
      </p>
      <p className={priceClass}>
        Price: {listPrice.amount} {listPrice.currencyCode}
        {listPrice.isOnSale && <span className="on-sale"> – On Sale!</span>}
      </p>
    </section>
  )
}

function getReadingLevel(pageCount) {
  if (pageCount > 500) return 'Serious Reading'
  if (pageCount > 200) return 'Decent Reading'
  if (pageCount < 100) return 'Light Reading'
  return ''
}

function getPublicationStatus(year) {
  const currYear = new Date().getFullYear()
  if (currYear - year > 10) return 'Vintage'
  if (currYear - year < 1) return 'New'
  return ''
}

function getPriceClass(amount) {
  if (amount > 150) return 'price-high'
  if (amount < 20) return 'price-low'
  return ''
}