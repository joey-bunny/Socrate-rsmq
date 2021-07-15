import axios from 'axios'

export async function hermes (method: any, url: any, payload?: any) {
  try {
    
    const call = await axios({
      method: method,
      url: url,
      data: payload
    })

    return call
  } catch (error) {

    throw error
  }
}

export function lower(obj) {
  for (var prop in obj) {
  if (typeof obj[prop] === 'string') {
    obj[prop] = obj[prop].toLowerCase();
  }
  if (typeof obj[prop] === 'object') {
    lower(obj[prop]);
    }
  }
  return obj;
}