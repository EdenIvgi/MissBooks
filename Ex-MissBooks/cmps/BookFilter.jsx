const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
  const [filter, setFilter] = useState({ ...filterBy })

  useEffect(() => {
    onSetFilter(filter)
  }, [filter])

  function handleChange({ target }) {
    const { name, value } = target
    setFilter(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section className="book-filter">
      <h3>Filter Books</h3>
      <form>
        <input
          type="text"
          name="txt"
          value={filter.txt}
          placeholder="Search by title..."
          onChange={handleChange}
        />
      </form>
    </section>
  )
}
