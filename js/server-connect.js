class NewsRequestor{
    getNews(url,callback){
        const Http = new XMLHttpRequest();
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange=()=>{
            callback = Http.responseText;
            console.log(callback);
        }
    }
}

let callback = '';
let request = new NewsRequestor();
request.getNews('http://localhost:3000/news',callback);