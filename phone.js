// fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
// .then(res=>res.json())
// .then(data=>console.log(data))

const loadPhone = async (searchText = 'iphone', isShowAll) => {
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
    const div = document.createElement('div');

    if (phones.length > 12 && !isShowAll) {
        showAllButton.classList.remove('hidden');
    }
    else if (phones.length === 0) {
        toggleSpinner(false);
        showAllButton.classList.add('hidden');
        div.innerHTML = `
        <div class="flex justify-center items-center gap-5 w-[160vh] h-[60vh] mx-auto">
        <div class="badge badge-error gap-2 items-center h-8">
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </div>
        <p>error</p>
        </div>
        <h2 class="text-3xl font-bold">Item Not Found</h2>
        </div>
        `
        phoneContainer.appendChild(div);
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
    if (searchText === '') {
        loadPhone('iphone', isShowAll);
    }
    else {
        loadPhone(searchText, isShowAll);
    }
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