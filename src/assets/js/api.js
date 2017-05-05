import Vue from 'vue'

const host = 'predb.ovh'
const endpoint = host + '/api/v1'

const api = {
  host: 'predb.ovh',
  endpoint: '/api/v1',
  url: 'https://' + endpoint + '/',
  wss: 'wss://' + endpoint + '/ws',

  checkHTTP (res) {
    if (res.status >= 200 && res.status <= 300) {
      return res
    }
  },
  parseJson (res) {
    if (!res) {
      return
    }

    return res.json()
  },
  checkStatus (json) {
    if (!json) {
      return
    }

    if (json.status !== 'success') {
      let err = new Error(json.message.replace('\0', ''))
      err.response = json
      throw err
    }

    return json
  },

  exec (params) {
    return Vue.http.get(this.url, {params: params})
    .then(this.checkHTTP)
    .then(this.parseJson)
    .then(this.checkStatus)
  },
  query (queryString, page) {
    const params = {}
    if (queryString) {
      params.q = queryString
    }
    if (page) {
      params.page = page
    }
    console.log(params)

    return this.exec(params)
    .then((json) => {
      if (!json) {
        return
      }

      return json.data
    })
  }
}

export default api
