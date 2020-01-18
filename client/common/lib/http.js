import queryString from 'query-string'
import { getMessage as getErrorMessage } from '../utils/error-codes'

// METHOD | REQUEST_BODY | RESPONSE_BODY
// -------------------------------------
// GET    | false        | true
// POST   | true         | true
// DELETE | true         | true
// PUT    | true         | false

async function request(url, options) {
    try {
        const json = await fetch(url, options)

        const { status, headers } = json

        // неверный код ответа
        if (status != 200 && status != 304) {
            throw { code: 2, status }
        }

        // неверные заголовки
        if (!headers.get('Content-Type') || headers.get('Content-Type').toLowerCase() != 'application/json; charset=utf-8') {
            throw { code: 3 }
        }

        // json-парсинг
        let data

        try {
            data = await json.json()
        } catch(err) {
            throw { code: 4 }
        }

        if (data.ok === true) {
            return data.response
        }

        throw data.error
    } catch(err) {
        console.error(err)

        const code = err.code || 1
        const message = getErrorMessage(code)

        throw { code, message }
    }
}

export function GET(url, data) {
    let uri = url

    if (data) {
        uri += '?' + queryString.stringify(data, { skipNull: true })
    }

    const options = {
        headers: {
            'X-Csrf': 'csrf'
        }
    }

    return request(uri, options)
}

export function POST(url, data) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Csrf':       'csrf'
        },
        body: JSON.stringify(data)
    }

    return request(url, options)
}

export function DELETE(url, data) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Csrf':       'csrf'
        },
        body: JSON.stringify(data)
    }

    return request(url, options)
}

export function PUT(url, data) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Csrf':       'csrf'
        },
        body: JSON.stringify(data)
    }

    return request(url, options)
}

export function FILE(url, data) {
    try {
        const formData = new FormData
        formData.append('photo', data)

        const options = {
            method: 'POST',
            headers: {
                'X-Csrf': 'csrf'
            },
            body: formData
        }

        return request(url, options)
    } catch(err) {
        throw err
    }
}
