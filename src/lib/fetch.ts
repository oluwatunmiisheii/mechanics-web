import { APIError } from "./utils"

const BASE_URL = process.env.API_BASE_URL as string

const baseHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
}

const mergeOptions = (options: RequestInit = {}): RequestInit => ({
    ...options,
    headers: {
        ...baseHeaders,
        ...options.headers
    },
})

interface RequestParams {
    body?: unknown
    options?: RequestInit
}

const createHttpRequestFunction = (method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE') =>
    async function <T>(endpoint: string, params?: RequestParams): Promise<T> {
        const { body, options } = params ?? {}
        const url = `${BASE_URL}${endpoint}`
        
        let formattedBody = body as string | FormData | undefined

        if (body !== undefined && !(body instanceof FormData)) {
            formattedBody = JSON.stringify(body)
        }

        const mergedOptions = mergeOptions({
            ...options,
            method,
            ...(body !== undefined && { body: formattedBody }),
        })

        const response = await fetch(url, mergedOptions)

        if (!response.ok) {
            console.log("🚀 ~ createHttpRequestFunction ~ response:", response)
            const error = await response.json()
            throw new APIError(response.status, error.detail ?? error.message ?? error?.error ?? 'An error occurred')
        }

        return await response.json() as T
    }

const get = createHttpRequestFunction('GET')
const post = createHttpRequestFunction('POST')
const put = createHttpRequestFunction('PUT')
const patch = createHttpRequestFunction('PATCH')
const del = createHttpRequestFunction('DELETE')

export { get, post, put, patch, del }
