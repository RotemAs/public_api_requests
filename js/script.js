//  Treehouse FSJS Techdegree
//  Project 5 - Public API Requests

let users = [];
let fetchUsers = [];
const url = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob&noinfo &nat=US`;
const gallery = document.getElementById("gallery");
const searchContainer = document.querySelector(".search-container");

const search = document.getElementById("search-input");

const searchSubmit = document.getElementById("search-submit");
let gModalIndex = 0;

fetch(url) // Fetch request for random user API
  .then((res) => res.json())
  .then((res) => usersFetch(res.results))
  .catch((err) => console.log(err));

function usersFetch(userData) {
  fetchUsers = userData;
  displayUsers(fetchUsers);
}

function displayUsers(userData) {
  gallery.innerHTML=""
  let userHTML = "";
  users = userData;
  userData.forEach((user, index) => {
    // Looping through all data
    const name = user.name;
    const email = user.email;
    const city = user.location.city;
    const picture = user.picture;

    // console.log('index:',index,"displayUsers - userData :", userData,'\n user.name :',user.name,'\n user.location.city:',user.location.city);
    // Temperate literal
    userHTML += `
        <div class="card" data-index=${index}>
          <div class="card-img-container">
            <img class="card-img" src="${picture.medium}" alt=profile picture">
            </div>
            <div class="card-info-container">
              <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
              <p class="card-text">${email}</p>
              <p class="card-text cap">${city}</p>
            </div>
          </div>
      `;
  });

  gallery.insertAdjacentHTML("beforeend", userHTML); // Inserting new HTML
}
function generateModal(index) {
  const {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture,
  } = users[index]; // Object destructuring
  const newFormatPhone = phone.replace(/-/, " ");
  let date = new Date(dob.date);
  const modalContainer = document.querySelector(".modal-container");
  // Temperate literal
  const modalHTML = `
  
      <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
          <p class="modal-text">${email}</p>
          <p class="modal-text cap">${city}</p>
          <hr>
          <p class="modal-text">${newFormatPhone}</p>
          <p class="modal-text">${street.number} ${
    street.name
  }, ${city}, ${state} ${postcode}</p>
          <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
      </div>
      <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
 
  `;

  modalContainer.innerHTML = modalHTML;
  modalContainer.classList.remove("hide");

  const modalClose = document.getElementById("modal-close-btn");
  const modalNext = document.getElementById("modal-next");
  const ModalPrev = document.getElementById("modal-prev");

  modalClose.addEventListener("click", (e) => {
    modalContainer.innerHTML = "";
    modalContainer.classList.add("hide");
  });
  modalNext.addEventListener("click", (e) => {
    moveModalForeword();
  });
  ModalPrev.addEventListener("click", (e) => {
    moveModalBack();
  });
}

gallery.addEventListener("click", (e) => {
  // When the employee card is clicked a modal with their information will be generated
  const card = e.target.closest(".card");
  const index = card.getAttribute("data-index");
  // currentModalIndex = index;
  gModalIndex = index;
  console.log("currentModalIndex", "gModalIndex", gModalIndex);

  generateModal(gModalIndex);
});

// search.addEventListener("change",(e)=>{
//   console.log('search e',e,e.value)

// })

// searchSubmit.addEventListener("click", (e) => {
//   console.log('searchSubmit e',e,e.value)
// })

function moveModalBack() {
  if (gModalIndex > 0) {
    gModalIndex--;
    generateModal(gModalIndex);
  } else {
    gModalIndex = 11;
    generateModal(gModalIndex);
  }
}

function moveModalForeword() {
  if (gModalIndex < users.length - 1) {
    gModalIndex++;
    generateModal(gModalIndex);
  } else {
    gModalIndex = 0;
    generateModal(gModalIndex);
  }
}

function generateSearchHTML() {
  searchContainer.innerHTML = `<form action="#" method="get" class="search-form"> 
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
      <span class="search-message hide">no search results</span>
  </form>`;
}
// <button type="button" id="Clear filter" class="Clear filter" onclick="searchclaer()" > clear</button>

generateSearchHTML();


const searchBtn = document.getElementById("search-submit");
const searchForm = document.querySelector(".search-form");
const searchField = document.getElementById("search-input");

searchContainer.addEventListener("keydown", (e) => {
  if((e.keyCode >65 & e.keyCode <90)|| (e.keyCode = 8)||(e.keyCode = 13)){
     let searchText ;
    if (e.keyCode >65 & e.keyCode <90){
      console.log('e:',e,'\n e.target.value', e.target.value)
       searchText = e.target.value + e.key;
      searchText = searchText.toUpperCase()
    }else if(e.keyCode = 8){
      searchText = e.target.value.slice(0,-1) ;
      searchText = searchText.toUpperCase()
    }
    // else if(e.keyCode = 13){
      // serch botten func
    // }

      // searchBtn.onclick = () => {
      //   searchField.value = "";
      //   // console.log('searchBtn.onclick')
      // };
      
    users = fetchUsers
      const filteredList = users.filter((student) => {
        return (
          student.name.first.toUpperCase().includes(searchText) ||
          student.name.last.toUpperCase().includes(searchText)
        );
      });
      filteredUsers = filteredList;
      if (filteredUsers.length > 0) {
        console.log('filteredUsers',filteredUsers,'searchText',searchText)
        displayUsers(filteredUsers);
      } else {
        console.log(" no results  ");
        document.querySelector('.search-message').classList.remove('hide')
        gallery.innerHTML="no results "
      }
      // console.log('filteredUsers',filteredUsers)
  }

});

// searchContainer.addEventListener("search", (e) => {
// console.log('e',e,"\n event value",e.target.value)
// })

// searchContainer.addEventListener("keypress", (e) => {
//   console.log('e',e,"\n event value",e.target.value+e.key)
//   })

function searchclaer(){
  console.log('searchclaer','searchForm.span.innerHTML',searchForm)
  users = fetchUsers
  displayUsers(users)
  document.querySelector('.search-message').classList.add('hide')
  searchField.value=null
}