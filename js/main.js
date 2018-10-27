const newsContainer = document.getElementsByClassName('news-section');
const nav = ['Главная','Новости','О нас','Контакты','Партнеры'];
const categories = ['свежее','горячее','важное','архив'];
const newsCount = 50;
const renderLimit = 4;

class NewsTemp{
    constructor(_title, _date, _category, _text){
        this.title = _title;
        this.date = _date;
        this.category = _category;
        this.text = _text;
    }
}

let news = createNews();

function createNews() {
    let newsArr = [];
    for (let i = 0; i < newsCount; i++) {
        const title = 'Заголовок ' + i;
        let category;

        switch (i % 5){
            case 0:
                category = categories[0];
                break;
            case 2:
                category = categories[1];
                break;
            case 4:
                category = categories[2];
                break;
            default:
                category = categories[3];
                break;
        }

        const news = new NewsTemp(title, '08.10.2018', category, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.');
        newsArr.push(news);
    }
    return newsArr;
}

function renderNav() {
    const navContainer = document.getElementsByClassName('nav-top');
    renderLinksList(navContainer,nav);
}

function renderCategories() {
    const categoriesContainer = document.getElementsByClassName('categories-list');
    renderLinksList(categoriesContainer,categories,'categories');
}

function renderLinksList(container,arr,className) {
    const _className = className === undefined ? '' : className;
    arr.forEach((item) => {
        const block = document.createElement('li');
        block.innerHTML += '<a href="javascript:void(0)" class="'+_className+'">' + item + '</a>';
        container[0].appendChild(block);
    });
}

function searchNews(word) {
    const result = news.filter((item) => {
        return findSubstr(item,word);
    });
    return result;
}

function findSubstr(item,word) {
    for (let key in item) {
        if (~item[key].indexOf(word)) {
            return true;
        }
    }
}

function renderNews(newsArr) {
    if (newsArr.length > renderLimit) {
        createPagination();
    }
    newsArr.forEach((item,i) => {
        if (i < renderLimit) {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML += '<span>' + item.title + '</span>';
            newsItem.innerHTML += '<span>' + item.date + '</span>';
            newsItem.innerHTML += '<span>' + item.category + '</span>';
            newsItem.innerHTML += '<span>' + item.text + '</span>';
            newsContainer[0].appendChild(newsItem);
        }
        else if (i % renderLimit === 0) {
            createPaginationNav(i / renderLimit);
        }
    });
}

function createPagination() {
    if(!document.getElementsByClassName('pagination').length){
        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        newsContainer[0].parentElement.appendChild(pagination);
    }
}

function createPaginationNav(counter) {
    const pagination = document.getElementsByClassName('pagination');
    const paginationBtn = document.createElement('button');
    paginationBtn.className = 'pagination-btn';
    paginationBtn.innerHTML = counter;
    pagination[0].appendChild(paginationBtn);
}

function listenPaginationNav(newsArr) {
    const pagination = document.getElementsByClassName('pagination');
    const btnArr = pagination[0].children;
    btnArr[0].classList.add("active");
    for (let i = 0; i < btnArr.length; i++) {
        btnArr[i].addEventListener("click", (e) => {
            if (!e.srcElement.classList.contains("active")) {
                toggleBtnClass(e.srcElement, btnArr);
                renderMoreNews(e.srcElement.textContent, newsArr);
            }
        });
    }
}

function toggleBtnClass(btn, btnArr) {
    for (let i = 0; i < btnArr.length; i++) {
        if (btnArr[i].classList.contains("active")) {
            btnArr[i].classList.remove("active");
            break;
        }
    }
    btn.classList.add("active");
}

function renderMoreNews(btnText, newsArr) {
    clearNews();
    const maxLength = parseInt(btnText) * renderLimit;
    const minLength = maxLength - renderLimit;
    const moreNews = newsArr.slice(minLength, maxLength);
    renderNews(moreNews);
}

function listenSearch() {
    const btnSearch = document.getElementById('search');
    btnSearch.addEventListener("click",() => {
        const searchWord = getWord();
        const searchArr = searchNews(searchWord);
        clearNews();
        clearPagination();
        renderNews(searchArr);
        listenPaginationNav(searchArr);
        countNews(searchArr.length);
    });
}

function getWord() {
    const field = document.getElementsByClassName('search-input');
    let inputVal;
    if (field[0].value.length) {
        inputVal = field[0].value;
    }
    return inputVal;
}

function clearNews() {
    newsContainer[0].innerHTML = '';
}

function clearPagination() {
    const pagination = document.getElementsByClassName('pagination');
    pagination[0].innerHTML = '';
}

function listenFilter(){
    const btnFilter = document.getElementsByClassName('categories');
    for(let i = 0; i < btnFilter.length; i++){
        btnFilter[i].addEventListener("click",(e) => {
            filterNews(e.srcElement.textContent);
        });
    }
}

function filterNews(filterText){
    const filterArr = news.filter((item)=>{
        return item.category === filterText;
    });
    clearNews();
    clearPagination();
    renderNews(filterArr);
    countNews(filterArr.length);
    listenPaginationNav(filterArr);
}

function countNews(count){
    const counter = document.getElementsByClassName('news-count');
    if(counter.length === 0){
        console.log(counter.length);
        const container = newsContainer[0].parentElement;
        const counterBlock = document.createElement('div');
        counterBlock.className = 'news-count';
        counterBlock.innerHTML = 'Выведено новостей (' + count + ')';
        container.prepend(counterBlock);
    }
    else{
        counter[0].innerHTML = 'Выведено новостей (' + count + ')';
    }
}

renderNav();
renderCategories();
renderNews(news);
listenPaginationNav(news);
listenSearch();
listenFilter();
countNews(news.length);