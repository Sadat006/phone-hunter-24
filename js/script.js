const loadPhone = async (searchText = "apple", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

// display phones
const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  const showAllbtn = document.getElementById("showAllbtn");
  // condition
  if (phones.length > 12 && !isShowAll) {
    showAllbtn.classList.remove("hidden");
  } else {
    showAllbtn.classList.add("hidden");
  }

  // phones result length to show
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-full bg-base-100 shadow-xl pt-5`;
    phoneCard.innerHTML = `
    <figure>
          <img
            src="${phone.image}"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>Discover a new realm of technological excellence with our range of quality smartphones.</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-secondary">Show Details</button>
          </div>
        </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const inputField02 = document.getElementById("input-field02");
  const inputFelidText = inputField02.value;
  loadPhone(inputFelidText, isShowAll);
};

// spinner
const toggleLoadingSpinner = (isLoading) => {
  const loaderContainer = document.getElementById("loader-container");
  if (isLoading) {
    loaderContainer.classList.remove("hidden");
  } else {
    loaderContainer.classList.add("hidden");
  }
};

// handle showAll
const handleShowAll = () => {
  handleSearch(true);
};

// show details
const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json()
  const phone = data.data;
  showPhoneDetails(phone);
};

// handle modal show details
const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById("show-details-phone-name");
  phoneName.innerText = phone.name;

  console.log(phone);

  const phoneDetailsContainer = document.getElementById("show-detail-phone");
  phoneDetailsContainer.innerHTML = `
      <img src="${phone.image}" class="mx-auto my-2">
      <div class = "border">
     
      <p><span class="id">Brand : </span>${phone.brand}</p>
      <p><span class="id">Memory : </span>${phone.mainFeatures.memory}</p>
      <p><span class="id">Release Date :</span>${phone.releaseDate}</p>
      <p><span class="id">Slug : </span>${phone.slug}</p>
      <p><span class="id">Display Size : </span>${phone.mainFeatures.displaySize}</p>
      <p><span class="id">Chipset : </span>${phone.mainFeatures.chipSet}</p>      
      </div>
  `;
  console.log(phone);
  // Get all elements with the class 'id'
  let elementsWithClassId = document.getElementsByClassName("id");

  for (let i = 0; i < elementsWithClassId.length; i++) {
    let element = elementsWithClassId[i];
    element.style.color = "green";
    element.style.fontWeight = "bold";
  }

  // modal show
  show_details_modal.showModal();
};

loadPhone();
