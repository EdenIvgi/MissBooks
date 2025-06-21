// BookReview.jsx
const { useState } = React

export function BookReview({ onAddReview }) {
  const [review, setReview] = useState({
    fullname: '',
    rating: 1,
    readAt: ''
  })

  function handleChange({ target }) {
    const { name, value } = target
    setReview(prev => ({ ...prev, [name]: value }))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onAddReview(review)
    setReview({ fullname: '', rating: 1, readAt: '' })
  }

  return (
    <form className="book-review" onSubmit={onSubmit}>
      <label>
        Full Name:
        <input type="text" name="fullname" value={review.fullname} onChange={handleChange} required />
      </label>

      <label>
        Rating:
        <select name="rating" value={review.rating} onChange={handleChange}>
          {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
        </select>
      </label>

      <label>
        Read At:
        <input type="date" name="readAt" value={review.readAt} onChange={handleChange} required />
      </label>

      <button type="submit">Submit</button>
    </form>
  )
}
