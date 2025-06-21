import { makeId, makeLorem, getRandomIntInclusive, saveToStorage, loadFromStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    addReview,
    removeReview
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
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
        reviews: []
    }
}

function getDefaultFilter() {
    return { title: '', minPrice: '' }
}

function addReview(bookId, review) {
    return get(bookId).then(book => {
        if (!book.reviews) book.reviews = []
        review.id = makeId()
        book.reviews.push(review)
        return save(book)
    })
}

function removeReview(bookId, reviewId) {
    return get(bookId).then(book => {
        book.reviews = book.reviews.filter(review => review.id !== reviewId)
        return save(book)
    })
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: makeId(),
                title: makeLorem(2),
                subtitle: makeLorem(4),
                authors: [makeLorem(1)],
                publishedDate: getRandomIntInclusive(1950, 2024),
                description: makeLorem(20),
                pageCount: getRandomIntInclusive(20, 600),
                categories: [ctgs[getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `https://www.coding-academy.org/books-photos/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                },
                reviews: []
            }
            books.push(book)
        }
        saveToStorage(BOOK_KEY, books)
    }
}

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}



// function _createBook(title, price) {
//     return {
//         id: makeId(),
//         title,
//         description: makeLorem(20),
//         thumbnail: `http://coding-academy.org/books-photos/${getRandomIntInclusive(1, 20)}.jpg`,
//         listPrice: {
//             amount: price,
//             currencyCode: 'EUR',
//             isOnSale: Math.random() > 0.5,
//         },
//     }
// }


