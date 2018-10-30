const newsContainer = document.getElementsByClassName('news-section');
const nav = ['Главная','Новости','О нас','Контакты','Партнеры'];

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