import { bookService } from '../services/book.service.js'
import { BookReview } from '../cmps/BookReview.jsx'

const { useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [isReviewing, setIsReviewing] = useState(false)

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

  function onAddReview(review) {
    bookService.addReview(bookId, review)
      .then(() => loadBook())
      .catch(err => console.log('Failed to add review:', err))
  }

  function onRemoveReview(reviewId) {
    bookService.removeReview(bookId, reviewId)
      .then(() => loadBook())
      .catch(err => console.log('Failed to remove review:', err))
  }

  if (!book) return <div>Loading...</div>

  const { title, description, thumbnail, listPrice, pageCount, publishedDate, reviews = [] } = book

  const readingLevel = getReadingLevel(pageCount)
  const publicationStatus = getPublicationStatus(publishedDate)
  const priceClass = getPriceClass(listPrice.amount)

  return (
    <section className="book-details container">
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{title}</h1>
      <img src={thumbnail} alt={title} />
      <p>{description}</p>
      <p>Pages: {pageCount} – <span>{readingLevel}</span></p>
      <p>Published: {publishedDate} – <span>{publicationStatus}</span></p>
      <p className={priceClass}>
        Price: {listPrice.amount} {listPrice.currencyCode}
        {listPrice.isOnSale && <span className="on-sale"> – On Sale!</span>}
      </p>

      <button onClick={() => setIsReviewing(prev => !prev)}>
        {isReviewing ? 'Close Review Form' : 'Add Review'}
      </button>

      {isReviewing && <BookReview onAddReview={onAddReview} />}

      <section className="review-list">
        <h2>Reviews</h2>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p><strong>{review.fullname}</strong> rated it {review.rating}/5</p>
              <p>Read on: {review.readAt}</p>
              <button onClick={() => onRemoveReview(review.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}

function getReadingLevel(pageCount) {
  if (pageCount > 500) return 'Serious Reading'
  if (pageCount > 150) return 'Decent Reading'
  if (pageCount < 150) return 'Light Reading'
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
