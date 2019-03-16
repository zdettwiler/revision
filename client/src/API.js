import axios from 'axios'


const headers = {
  'Authorization': 'Bearer ' + localStorage.getItem('token'),
  'Content-Type': 'application/json'
}

const API = {
  getDailyExercise: async () => {
    return await axios.post('/api/revise/today', null, { headers })
  },

  correctExercise: async (ex) => {
    return axios.post('/api/correction', ex, { headers })
  },

  findWords: async (find) => {
    return axios.post('/api/words', find, { headers })
  },

  updateKnownWords: async (words) => {
    return axios.post('/api/update-known-words', words, { headers })
  }
}

export default API
