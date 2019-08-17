import axios from 'axios'

function makeHeaders() {
  return {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
  }
}

const API = {
  getDailyExercise: async () => {
    return await axios.post('/api/revise/today', null, { headers: makeHeaders() })
  },

  correctExercise: async (ex) => {
    return axios.post('/api/correction', ex, { headers: makeHeaders() })
  },

  findWords: async (find) => {
    return axios.post('/api/words', find, { headers: makeHeaders() })
  },

  updateKnownWords: async (words) => {
    return axios.post('/api/update-known-words', words, { headers: makeHeaders() })
  }
}

export default API
