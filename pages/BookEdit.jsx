import { bookService } from "../services/book.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM


export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])


    function loadBook() {
        bookService.get(bookId)
            .then(book =>
                console.log('book', book) ||
                // If the book is not found, redirect to book index  
                setBookToEdit(book))
                
            .catch(err => console.log('Cannot get book:', err))
    }


    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => navigate('/book'))
            .catch(err => {
                console.log('Cannot save book:', err)
                showErrorMsg('Cannot save book')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
                case 'range':
                    value = +value
                    break;

                    case 'checkbox':
                        value = target.checked
                        break
                    }
                    if (field === 'listPrice') {
                        setBookToEdit(prevBook => ({
                            ...prevBook,
                            listPrice: { ...prevBook.listPrice, amount: value }
                        }))
                    } else {
                        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
                    }    }
          
    
                const { title,listPrice } = bookToEdit
                return (
                    <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="listPrice">listPrice</label>
                <input onChange={handleChange} value={listPrice.amount||'' } type="number" name="listPrice" id="listPrice" />

                <button>Save</button>
            </form>

        </section>
    )
    
}