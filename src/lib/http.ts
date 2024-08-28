import envConfig from "@/config";
import { LoginResType } from "@/schemaValidations/auth.schema";

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined
}

const ENTITY_ERROR_STATUS = 422

// kieu du lieu loi tra ve
type EntityErrorPayload = {
  message: string
  errors: {
    field: string
    message: string
  }[]
}

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }
  constructor({ status, payload }: { status: number; payload: any }) {
    super('Htpp Error')
    this.status = status
    this.payload = payload
  }
}

// ke thua HttpError
export class EntityError extends HttpError {
  status: 422
  payload: EntityErrorPayload
  constructor({
    status,
    payload
  }: {
    status: 422
    payload: EntityErrorPayload
  }) {
    super({ status, payload })
    this.status = status
    this.payload = payload
  }
}

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined
  const baseHeaders = {
    'Content-Type': 'application/json',
    Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : ''
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
  
  // Interceptor la noi xu ly request va response truoc khi tra ve cho phia component
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422
          payload: EntityErrorPayload
        }
      )
    }
    else {
      throw new HttpError(data)
    }
  }

  // xu ly interceptors
  if (['/auth/login', '/auth/register'].includes(url)) {
    clientSessionToken.value = (payload as LoginResType).data.token
  }
  else if ('/auth/logout'.includes(url)) {
    clientSessionToken.value = ''
  }

  return data
}

// get sessionToken
class SessionToken {
  private token = ''
  get value() {
    return this.token
  }
  set value(token: string) {
    // neu goi method nay o server thi se bi loi
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token on server side')
    }

    this.token = token
  }
}

export const clientSessionToken = new SessionToken()

// create http
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
