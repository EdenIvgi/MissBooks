import { bookService } from '../services/book.service.js'
import { BookReview } from '../cmps/BookReview.jsx'

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {
  const { bookId } = useParams()
  const navigate = useNavigate()

  const [book, setBook] = useState(null)
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false)

  useEffect(() => {
    loadBook()
  }, [bookId])

  function loadBook() {
    bookService.get(bookId)
      .then(setBook)
      .catch(err => console.log('Failed to load book:', err))
  }

  function onRemoveReview(reviewId) {
    bookService.removeReview(bookId, reviewId)
      .then(loadBook)
      .catch(err => console.log('Failed to remove review', err))
  }

  function onBack() {
    navigate('/book')
  }

  function onToggleReviewModal() {
    setIsAddReviewOpen(prev => !prev)
  }

  if (!book) return <div>Loading...</div>

  const { title, description, thumbnail, listPrice, pageCount, publishedDate, reviews, nextBookId, prevBookId } = book

  const readingLevel = getReadingLevel(pageCount)
  const publicationStatus = getPublicationStatus(publishedDate)
  const priceClass = getPriceClass(listPrice && listPrice.amount)

  return (
    <section className="book-details container">
      <h1>{title}</h1>
      <img src={thumbnail} alt={title} />
      <p>{description}</p>
      <p>Pages: {pageCount} – <span>{readingLevel}</span></p>
      <p>Published: {publishedDate} – <span>{publicationStatus}</span></p>
      <p className={priceClass}>
        Price: {listPrice && listPrice.amount} {listPrice && listPrice.currencyCode}
        {listPrice && listPrice.isOnSale && <span className="on-sale"> – On Sale!</span>}
      </p>

      <section className="review-section">
        <h3>Reviews</h3>
        <button onClick={onToggleReviewModal}>{isAddReviewOpen ? 'Close Review Form' : 'Add Review'}</button>
        {isAddReviewOpen && <BookReview bookId={bookId} onReviewAdded={loadBook} />}

        <ul className="review-list">
          {reviews && reviews.length > 0 ? (
            reviews.map(review => (
              <li key={review.id} className="review-item">
                <p><strong>{review.fullname}</strong> rated {review.rating}/5</p>
                <p>Read at: {review.readAt}</p>
                <button onClick={() => onRemoveReview(review.id)}>Delete</button>
              </li>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </ul>
      </section>

      <div className="navigation-btns">
        <button onClick={onBack}>Back</button>
        <button onClick={() => navigate(`/book/${prevBookId}`)}>Prev Book</button>
        <button onClick={() => navigate(`/book/${nextBookId}`)}>Next Book</button>
      </div>
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
