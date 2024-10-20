
// Fetch

// create loadCategories
const loadCategories = () => {
    // fetch the data
    
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
      .then((response) => response.json())
      .then(data => displayCategories(data.categories))
      .catch(error => console.log(error))
  };
  loadCategories();
  
  
  //create load category
  const loadCategoryPets = (id) => {
    // alert(id);
    
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((response) => response.json())
    .then(data => {
      displayCards(data.data);
    })
    .catch(error => console.log(error))
  };
  
  // Create displayCategories
  const displayCategories = (categories) => {
    // all data in HTML   
  
    document.getElementById('spinner').style.display = "none";
  
    categories.forEach((item) => {
        const categoryContainer = document.getElementById('category-btn');
        // create a button
        const buttonContainer = document.createElement('div');
        buttonContainer.classList = "flex items-center"; 
  
        const button = document.createElement('button');
        button.id = `btn-${item.id}`;
  
        
        button.classList = " hover:text-black category-btn text-xl font-bold px-10 md:px-17 lg:px-20 lg:py-4 py-2 rounded-lg border border-gray-300 hover:bg-[#d4f3f7] hover:border-[#0E7A81] flex items-center gap-3 justify-center space-x-3 flex-row-reverse";
        button.innerText = item.category;
  
      //active button
        button.addEventListener('click', () => {
  
          // Remove 'active' class from all buttons
          const allButtons = document.querySelectorAll('.category-btn');
          allButtons.forEach(btn => {
  
            btn.classList.remove('bg-[#0E7A81]', 'text-white');
              
          });
  
          // Add 'active' class to the clicked button
          button.classList.add('bg-[#0E7A81]', 'text-white')
  
          // Load category pets and handle search
          loadCategoryPets(item.category);
          handleSearch(item.category);
      });
  
        // Use addEventListener to handle the click event
        
        button.addEventListener('click', () => loadCategoryPets(item.category));
        button.onclick = () => handleSearch(item.category);
  
        // create an image element for the icon
        const img = document.createElement('img');
        img.src = item.category_icon;
        img.alt = `${item.category} icon`;
        img.classList = "w-10 h-10";
  
        // append image and text to the button
        button.appendChild(img);
  
        // add button to the button container
        buttonContainer.appendChild(button);
        
        // add button container to the category container
        categoryContainer.appendChild(buttonContainer);
    });
  };
  
  
  //cards
  document.addEventListener("DOMContentLoaded", () => {
    loadCards();
  });
  
  //fetch all pets
  const loadCards = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
      .then((response) => response.json())
      .then(data => displayCards(data.pets))
      .catch(error => console.log(error));
  };
  
  const displayCards = (cards) => {
  const cardsContainer = document.getElementById('card');
  cardsContainer.innerHTML = ""; 
  
  if(cards.length === 0 ){
    cardsContainer.classList.remove("lg:grid")
    cardsContainer.classList.add("lg:grid-cols-1")
    cardsContainer.classList.add("md:grid-cols-1")
    cardsContainer.innerHTML = `
    <div class="min-h-[600px] flex flex-col text-center gap-5 justify-center items-center border border-gray-300 rounded-lg p-5 ">
    <img class="left-96" src="images/error.webp" alt="">
    <p class="text-4xl font-bold ">No Information Available</p>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    </div>
    `;
    return;
  } else {
    cardsContainer.classList.add("lg:grid")
    cardsContainer.classList.remove("lg:grid-cols-1")
    cardsContainer.classList.remove("md:grid-cols-1")
  }
  
  cards.forEach((cards) => {
    const card = document.createElement("div");
    card.classList = "border p-4 rounded-xl";
    card.innerHTML = `
      <div class="mb-4">
          <img src="${cards.image}" alt="${cards.name}" class="w-full h-[230px] object-cover rounded-lg">
      </div>
      <div class="space-y-1">
          <p class="text-xl"><strong>${cards.category || 'Category Unknown'}</strong></p>
          <div class="flex gap-1">
              <img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=uKqTvWCjmzOf&format=png&color=000000" alt="">
              <p><strong>Breed:</strong> ${cards.breed ? cards.breed : 'Breed Unknown'}</p>
          </div>
          <div class="flex gap-1">
              <img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=60611&format=png&color=000000" alt="">
              <p><strong>Birth:</strong> ${cards.date_of_birth ? cards.date_of_birth : 'Date of Birth Unknown'}</p>
          </div>
          <div class="flex gap-1">
              <img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=6vWA99ikHpCe&format=png&color=000000" alt="">
              <p><strong>Gender:</strong> ${cards.gender ? cards.gender : 'Gender Unknown'}</p>
          </div>
          <div class="flex gap-1">
              <img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=FOB3UVRpPWII&format=png&color=000000" alt="">
              <p><strong>Price:</strong> ${cards.price ? cards.price : 'Price Unavailable'}</p>
          </div>
          <div><hr></div>
      </div>
      <div class="mt-5 flex justify-between items-center">
          <div>
              <button onclick="likeBtn('${cards.image}')" class="border hover:bg-[#0E7A81] text-white border-gray-300 py-2 px-4 rounded-xl">
                  <img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=82788&format=png&color=000000" alt="">
              </button>
          </div>
          <div>
              <button onclick="showAdoptModal('${cards.petId}')" class="text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white rounded-xl py-2 px-4 border border-gray-300 font-bold">
                Adopt
              </button>
          </div>
          <div>
              <button onclick="loadDetails('${cards.petId}')" class="text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white rounded-xl py-2 px-4 border border-gray-300 font-bold">Details</button>
          </div>
      </div>
    `;
    cardsContainer.append(card);
  });
  };
  
  
  //Sort By Price
  
  let sortingData = [];
  fetch(`https://openapi.programming-hero.com/api/peddy/pets`) 
      .then(response => response.json())
      .then(data => {
          sortingData = data.pets || data.data; 
          displayCards(sortingData);
      })
      .catch(error => console.error('Error fetching data:', error));
  
  
  // sort function
  function sortByPrice() {
      sortingData.sort((a, b) =>   b.price - a.price ); 
     displayCards(sortingData); 
  }
  
  
  //modal details
  const loadDetails = async(petId)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    const data =await response.json();
    displayModalDetails(data.petData);
  
  }
  
  //modal display details
  const displayModalDetails = (pet) =>{
    const detailsContainer = document.getElementById('modal-container');
    detailsContainer.classList=" space-y-2"
    detailsContainer.innerHTML=`
    <div>
    <img class="object-cover w-full rounded-lg" src='${pet.image}'>
    </div>
    <h1 class="text-black text-4xl font-bold">${pet.pet_name}</h1>
    <div class="flex gap-10">
          <div class="flex gap-1">
              <img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=uKqTvWCjmzOf&format=png&color=000000" alt="">
              <p><strong>Breed:</strong> ${pet.breed ? pet.breed : 'Breed Unknown'}</p>
          </div>
          <div class="flex gap-1">
              <img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=60611&format=png&color=000000" alt="">
              <p><strong>Birth:</strong> ${pet.date_of_birth ? pet.date_of_birth : 'Date of Birth Unknown'}</p>
          </div>
    </div>
      <div class="flex gap-10">
          <div class="flex gap-1">
              <img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=6vWA99ikHpCe&format=png&color=000000" alt="">
              <p><strong>Gender:</strong> ${pet.gender ? pet.gender : 'Gender Unknown'}</p>
          </div>
          <div class="flex gap-1">
              <img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=FOB3UVRpPWII&format=png&color=000000" alt="">
             <p><strong>Gender:</strong> ${pet.price ? pet.price : 'Price Unavailable'}</p>
          </div>
    </div>
    <div class="flex gap-1">
     <img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=2gYIr9lAicwI&format=png&color=000000">
     <p><strong>vaccinated_status:</strong> ${pet.vaccinated_status ? pet.vaccinated_status : 'vaccinated_status Unavailable'}</p>
     </div>
    <p class="bg-gray-300"><hr></p>
    <p class="text-2xl"><strong>Details Information</strong></p>
    <p>${pet.pet_details}</p>
    `;
    document.getElementById('customModal').showModal();
  }
  
  //count
  let counter = 3;
  
  function updateCountdown(petId) {
      const countdownElement = document.getElementById('countdown');
      countdownElement.innerHTML = counter; 
  
      if (counter > 0) {
          counter--; 
          setTimeout(() => updateCountdown(petId), 1000); 
      } else {
          
          document.getElementById('adoptModal').checked = false;
  
          const adoptButton = document.querySelector(`button[onclick="showAdoptModal('${petId}')"]`);
          adoptButton.innerText = "Adopted";
          adoptButton.disabled = true;  
          adoptButton.classList.add("bg-gray-200", "text-white");
          adoptButton.classList = "bg-[#0E7A81] text-white px-6 rounded-lg py-2 font-bold border-2 "
      }
  }
  
  function showAdoptModal(petId) {
      counter = 3;  
      document.getElementById('adoptModal').checked = true; 
      updateCountdown(petId);  
  }
  
  
  //like btn
  const likeBtn = (image) =>{
    console.log(image);
    
    const likeContainer = document.getElementById('like-btn')
  
    const div = document.createElement('div')
    div.innerHTML =`
    <div class="grid grid-cols-2"></div>
    <div><img class="rounded-lg" src="${image}"></div>
  
    `;
    likeContainer.appendChild(div)
  
  }
  
  
  //loading spinner
  const handleSearch = () => {
    
    const card = document.getElementById('card');
    console.log(card);
    
    // the grid classes are added and not overwritten
    card.classList.add('grid', 'lg:grid-cols-3', 'lg:cols-span-4');
    document.getElementById('card').style.display = "none";
    document.getElementById('spinner').style.display = "block"
  
  
    setTimeout(function(){
      
      document.getElementById('card').style.display = "block";
     document.getElementById('spinner').style.display = "none"
     document.getElementById('card').style.display = "grid";
      displayCategories()
    },2000)
  
  }
  
  
  
  //active button
  const buttonContainer = document.getElementById('btn-${item.id}');
  
  // 
  items.forEach(item => {
      const button = document.createElement('button');
      // button ID dynamically
      button.id = `btn-${item.id}`;  
      button.classList = "category-btn text-xl font-bold px-20 py-4 rounded-lg border border-gray-300 hover:bg-[#d4f3f7] hover:border-[#0E7A81] flex items-center justify-center space-x-3 bg-blue-500 text-white";
      button.innerText = item.category; // Set button text
  
      // Append the button to the button container
      buttonContainer.appendChild(button);
  
      // Add click event listener to the button
      button.addEventListener('click', () => {
        
          item.forEach(i => {
              const btn = document.getElementById(`btn-${i.id}`);
          });
          
      });
  });
  