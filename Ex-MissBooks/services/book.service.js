import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.speed >= filterBy.minPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = 0) {
    return {
        id: '',
        title,
        description: '',
        thumbnail: '',
        listPrice: {
            amount: price,
            currencyCode: 'USD',
            isOnSale: false,
        },
    }
}

function getDefaultFilter() {
    return { txt: '', minSpeed: '' }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('Harry Potter', 120),
            _createBook('The Little Prince', 80),
            _createBook('JavaScript: The Good Parts', 150),
        ]
        saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, price) {
    return {
        id: makeId(),
        title,
        description: makeLorem(20),
        thumbnail: `http://ca.org/books-photos/${getRandomIntInclusive(1, 20)}.jpg`,
        listPrice: {
            amount: price,
            currencyCode: 'EUR',
            isOnSale: Math.random() > 0.5,
        },
    }
}
