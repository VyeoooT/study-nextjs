import envConfig from "@/config";

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined
}

class HttpError extends Error {
  status: number
  payload: any
  constructor({ status, payload }: { status: number; payload: any }) {
    super('Htpp Error')
    this.status = status
    this.payload = payload
  }
}

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined
  const baseHeaders = {
    'Content-Type': 'application/json',
  }

  // neu khong truyen `baseUrl` (hoac baseUrl = undefined) thi lay tu `envConfig.NEXT_PUBLIC_API_ENDPOINT`
  // neu truyen `baseUrl` thi lay gia tri duoc truyen vao, truyen gia tri do vao '', thi dong nghia voi viec chung ta goi API den Nextjs Server
  const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl

  // allow url: `/account/me` or `account/me`
  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  // options
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    },
    body,
    method
  })
  const payload: Response = await res.json()
  const data = {
    status: res.status,
    payload
  }
  
  if (!res.ok) {
    throw new HttpError(data)
  }

  return data
}

// 
const http = {

  // method GET nen minh khong truyen len `body`, nen `Omit body` trong `CustomOptions`
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('GET', url, options)
  },

  post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('POST', url, { ...options, body })
  },

  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PUT', url, { ...options, body })
  },

  delete<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('DELETE', url, { ...options, body })
  },
}

export default http
