import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/notes'
const baseUrl = process.env.REACT_APP_API_URL || '/api/notes';

//const baseUrl = '/api/notes';

const getAll = () => {
    return axios.get(baseUrl)
  }
  
  const create = newObject => {
    return axios.post(baseUrl, newObject)
  }
  
  const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
  }
  
  export default { 
    getAll: getAll, 
    create: create, 
    update: update 
  }

