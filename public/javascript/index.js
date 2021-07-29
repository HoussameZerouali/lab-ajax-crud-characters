const charactersAPI = new APIHandler('http://localhost:8000/');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    console.log('Getting List of Characters')
    charactersAPI.getFullList()
    .then((response) => {
      const charactersJSON = response.data;
      const characterContainer = document.querySelector('.characters-container')
      characterContainer.innerHTML = ""
      charactersJSON.forEach(element => {
        characterContainer.innerHTML += `<div class='character-info'>
                                      <div class='name'>Name : ${element.name}</div>
                                      <div class='occupation'>Occupation : ${element.occupation}</div>
                                      <div class='cartoon'>Cartoon : ${element.cartoon}</div>
                                      <div class='weapon'>Weapon : ${element.weapon}</div>
                                    </div>`
      });
      
    })
    .catch((err) => {
      console.log(err)
    })
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    event.preventDefault();
    const characterContainer = document.querySelector('.characters-container')
    const form = document.querySelector('#character-id')
    if (form.value) {
      charactersAPI.getOneRegister(form.value).then((response) => {
        const character = response.data;
        characterContainer.innerHTML = `<div class='character-info'>
        <div class='name'>Name : ${character.name}</div>
        <div class='occupation'>Occupation : ${character.occupation}</div>
        <div class='cartoon'>Cartoon : ${character.cartoon}</div>
        <div class='weapon'>Weapon : ${character.weapon}</div>
      </div>`
      })
    }
    
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    event.preventDefault();
    const characterContainer = document.querySelector('.characters-container')
    const form = document.querySelector('#character-id-delete')
    if (form.value){
      const button = document.getElementById('delete-one')
      charactersAPI.deleteOneRegister(form.value).then(() => {
        button.style.color ="green" 
      }).catch((error) => {
        button.style.color ="red" 
      })
    }

  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const form = document.getElementById('edit-character-form')
    
    const inputName = form.querySelector('input[name="name"]')
    const inputOccupation = form.querySelector('input[name="occupation"]')
    const inputWeapon = form.querySelector('input[name="weapon"]')
    const inputCartoon = form.querySelector('input[name="cartoon"]') 
    const inputID = form.querySelector('input[name="chr-id"]')
    const id = inputID.value
    
    const name = inputName.value
    const occupation = inputOccupation.value
    const weapon = inputWeapon.value
    const cartoon = false;
    if (inputCartoon.value == 'on'){
      const cartoon = true
    }else{
      const cartoon = false
    }

    const updatedCharacter = {name, occupation, weapon, cartoon}

    charactersAPI.updateOneRegister(id, updatedCharacter)
    console.log(updatedCharacter)
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const form = document.getElementById('new-character-form');
    const inputName = form.querySelector('input[name="name"]')
    const inputOccupation = form.querySelector('input[name="occupation"]')
    const inputWeapon = form.querySelector('input[name="weapon"]')
    const inputCartoon = form.querySelector('input[name="cartoon"]')

    const name = inputName.value
    const occupation = inputOccupation.value
    const weapon = inputWeapon.value
    const cartoon = false;
    if (inputCartoon.value == 'on'){
      const cartoon = true
    }else{
      const cartoon = false
    }
    
    
    const newCharacter = {name, occupation, weapon, cartoon}

    if (name !== "" && occupation !== "" && weapon !== "" && cartoon !== ""){
      charactersAPI.createOneRegister(newCharacter)
    }
    
    
  });
});
