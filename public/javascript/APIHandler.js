
class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

   getFullList = () => {
    return axios.get('http://localhost:8000/characters');
  }
  
   getOneRegister = (id) => {
    return axios.get(`http://localhost:8000/characters/${id}`)
  }
  
   createOneRegister = (character) => {
    return axios.post('http://localhost:8000/characters', character)
  }
  
   updateOneRegister = (id, data) => {
    return axios.patch(`http://localhost:8000/characters/${id}`, data)
  }
  
   deleteOneRegister = (id) => {
    return axios.delete(`http://localhost:8000/characters/${id}`)
  };

  
  
}

