import { STORAGE_KEYS } from '../lib/constants'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

function getHeaders() {
  const token = localStorage.getItem(STORAGE_KEYS.token)
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function parseError(response: Response) {
  try {
    const data = await response.json()
    return data.detail ?? `${response.status} ${response.statusText}`
  } catch {
    return `${response.status} ${response.statusText}`
  }
}

export async function httpGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: getHeaders(),
  })
  if (!response.ok) throw new Error(await parseError(response))
  return response.json() as Promise<T>
}

export async function httpPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getHeaders(),
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await parseError(response))
  return response.json() as Promise<T>
}

export async function httpPatch<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...getHeaders(),
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await parseError(response))
  return response.json() as Promise<T>
}

export async function httpPut<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getHeaders(),
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(await parseError(response))
  return response.json() as Promise<T>
}

export async function httpPostForm<T>(path: string, form: FormData): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: getHeaders(),
    body: form,
  })
  if (!response.ok) throw new Error(await parseError(response))
  return response.json() as Promise<T>
}
