import { loadFromStorage, makeId, saveToStorage, makeLorem, getRandomIntInclusive } from './util.service.js'
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
                thumbnail: `assets/books-photos/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        saveToStorage(BOOK_KEY, books)
    }
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


