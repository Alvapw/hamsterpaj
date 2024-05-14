
let recipies = [];
const filters = {
    categories: [],
    seasons: [],
    search: ""
}
const dataUserTemplate = document.querySelector('[data-user-template]');
const dataUserCards = document.querySelector('.popular-cards');
const catyChips = document.querySelectorAll('.chip.caty');
const seasonChips = document.querySelectorAll('.chip.season');
const searchInput = document.querySelector('[data-search]');

searchInput.addEventListener('input', (e) => {
    const valueInput = e.target.value.toLowerCase();
    filters.search = valueInput;
    render();
});
fetch('../json/recept.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(recept => {
            //recipies.push({ filtered: false, domNode: null, ...recept });
            recipies.push(recept);
        });
        render();

    })
    .catch(error => console.log(error));
function createCard(recept) {
    const card = dataUserTemplate.content.cloneNode(true).children[0];
    const header = card.querySelector('[data-header]');
    const img = card.querySelector('[data-image]');
    const link = card.querySelector('[data-link]');
    const cat = card.querySelector('[data-cat]');
    cat.textContent = recept.categories;
    link.setAttribute('href', recept.html);
    header.textContent = recept.name;
    img.setAttribute('src', recept.imageURL);
    dataUserCards.append(card);
}
function render() {
    console.log(filters.search);
    let filteredRecipies = [...recipies];
    if (filters.search.length > 0) {
        const search = filters.search.toLowerCase();
        filteredRecipies = filteredRecipies.filter(r => r.name.toLowerCase().includes(search));
    }
    if (filters.categories.length > 0) {
        filteredRecipies = filteredRecipies.filter(r => filters.categories.every(f => r.categories.includes(f)));
    }
    if (filters.seasons.length > 0) {
        filteredRecipies = filteredRecipies.filter(r => filters.seasons.every(f => r.seasons.includes(f)));
    }
    dataUserCards.innerHTML = '';
    filteredRecipies.forEach(recept => createCard(recept));
}
catyChips.forEach(chip => {
    chip.addEventListener('change', (e) => {
        const currentCat = e.target.dataset.caty;
        toggleItemArray(currentCat, filters.categories);
        render();
    });
});
seasonChips.forEach(chip => {
    chip.addEventListener('change', (e) => {
        const currentSeason = e.target.dataset.season;
        toggleItemArray(currentSeason, filters.seasons);
        render();
    });
});

function toggleItemArray(item, array) {
    //Om det finns i arrray ta bort
    //om det inte finns lägg till 
    array.includes(item);
    if (array.includes(item)) {
        const index = array.indexOf(item);
        array.splice(index, 1);
    } else {
        array.push(item);
    }
    console.log(array);
}