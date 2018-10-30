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
    createNews(){
        let newsArr = [];
        for (let i = 1; i < newsCount; i++) {
            const title = this.title + i;
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

            const news = new NewsTemp(title, this.date, category, this.text);
            newsArr.push(news);
        }
        return newsArr;
    }
}

let newsObj = new NewsTemp('Заголовок ','08.10.2018','','Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.');
let news = newsObj.createNews();

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

function renderMoreNews(btnText, newsArr) {
    clearNews();
    const maxLength = parseInt(btnText) * renderLimit;
    const minLength = maxLength - renderLimit;
    const moreNews = newsArr.slice(minLength, maxLength);
    renderNews(moreNews);
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