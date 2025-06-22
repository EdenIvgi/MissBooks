
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes?printType=books&q='

export const googleBookService = {
    query
}

function query(searchTerm) {
    const url = GOOGLE_BOOKS_API + encodeURIComponent(searchTerm)

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.items) return []

            return data.items.map(item => {
                const info = item.volumeInfo
                return {
                    id: item.id,
                    title: info.title,
                    subtitle: info.subtitle || '',
                    authors: info.authors || [],
                    publishedDate: info.publishedDate || '',
                    description: info.description || '',
                    pageCount: info.pageCount || 0,
                    categories: info.categories || [],
                    thumbnail: (info.imageLinks && info.imageLinks.thumbnail) || '',
                    language: info.language || 'en'
                }
            })
        })
}
