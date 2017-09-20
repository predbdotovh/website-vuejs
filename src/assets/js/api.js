import Vue from 'vue'

const apiEndpoint = 'https://predb.ovh/api/v1/'
const wssEndpoint = 'wss://predb.ovh/api/v1/ws'

const api = {
  err (msg, ctx) {
    let err = new Error(msg)
    err.ctx = ctx
    throw err
  },
  checkHTTP (res) {
    if (!res || res.status !== 200) {
      this.err('Unexpected response from API')
      return
    }

    return res
  },
  parseJson (res) {
    return res.json()
  },
  checkStatus (json) {
    if (!json) {
      this.err('Unexpected response from API')
      return
    }

    if (json.status !== 'success') {
      this.err(json.message.replace('\0', ''), json)
      return
    }

    return json
  },
  get (path, params) {
    return Vue.http.get(apiEndpoint + path, {params: params})
    .then(this.checkHTTP)
    .then(this.parseJson)
    .then(this.checkStatus)
  },
  websocket () {
    return new WebSocket(wssEndpoint)
  },
  fresh () {
    return this.get('live', {})
    .then((json) => {
      return json.data
    })
  },
  query (params = {}) {
    if ('page' in params && params.page === 1) {
      delete params.page
    }

    return this.get('', params)
    .then((json) => {
      return json.data
    })
  },
  stats () {
    return this.get('stats', {})
    .then((json) => {
      return json.data
    })
  }
}

export default api
