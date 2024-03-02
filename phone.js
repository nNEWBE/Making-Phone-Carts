// fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
// .then(res=>res.json())
// .then(data=>console.log(data))

const loadPhone = async (searchText='iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAllButton = document.getElementById('show-all-button');
    const searchField = document.getElementById('search-field');

    if (phones.length > 12 && !isShowAll) {
        showAllButton.classList.remove('hidden');
    }
    else {
        showAllButton.classList.add('hidden');
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    // else
    // {
    // phones=phones.slice(0,phones.length());
    // }

    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card lg:w-96 bg-base-100 shadow-xl">
                    <figure class="px-10 pt-10">
                        <img src="${phone.image}" alt="Phone"
                            class="rounded-xl"/>
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title font-bold">${phone.phone_name}</h2>
                        <p> There are many variations of passages of available, but the majority have suffered</p>
                        <p class="my-5 text-2xl font-bold">$999</p>
                        <div class="card-actions">
                    <button onclick="handleModal('${phone.slug}')" class="btn btn-ghost bg-[#0D6EFD] text-white font-bold text-base">Show Details</button>
                        </div>
                    </div>
                </div>
        `
        phoneContainer.appendChild(div);
        toggleSpinner(false);
    });
}

const handleModal = async (id) => {
    console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
}

// Handle search button
function handleSearch(isShowAll) {
    toggleSpinner(true);
    console.log('Button Clicked');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText, isShowAll);
}

const spinner = document.getElementById('spinner');
function toggleSpinner(isTrue) {
    if (isTrue) {
        spinner.classList.remove('hidden');
    }
    else {
        spinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}

loadPhone();