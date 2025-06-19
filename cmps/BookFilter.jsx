const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({
    title: filterBy.title || '',
    minPrice: filterBy.minPrice || ''
  })

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    if (target.type === 'number') {
      value = +value || ''
    }

    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  const { title, minPrice } = filterByToEdit

  return (
    <section className="book-filter">
      <form>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={handleChange}
        />

        <label htmlFor="minPrice">Min Price</label>
        <input
          id="minPrice"
          name="minPrice"
          type="number"
          value={minPrice}
          onChange={handleChange}
        />
      </form>
    </section>
  )
}
