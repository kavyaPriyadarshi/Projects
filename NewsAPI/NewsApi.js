const apikey=
"20a066edaa7c4d95b9d55add110ffdb2";

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        //console.log(data);
        return data.articles;
    } catch(error){
        console.error("Error fetching random news",error)
        return [];
    }

}

searchButton.addEventListener("click", async () =>{
    const query = searchField.value.trim();
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles);
        }
        catch(error){
            console.log("Error fetching news by query",error);
            
        }
    }
    
});

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        //console.log(data);
        return data.articles;
    } catch(error){
        console.error("Error fetching random news",error)
        return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML="";
    articles.forEach((article) =>{
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;             //"urlToImage is property of newsApi"
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title && article.title.length > 30
        // const truncatedTitle = article.title.value.length >30 
        ? article.title.slice(0,30) + "....": article.title;
         title.textContent = truncatedTitle;
        //const textContent = article.title;
        const description = document.createElement("p");
        const truncatedDes = article.description && article.description.length > 120
        // const truncatedDes = article.description.length > 120
        ? article.description.slice(0,120) + "....": article.description;
        description.textContent = truncatedDes;
        //description.textContent = article.description;


        
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () =>{
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard)
    });
}

(async ()=>{
    try{
        const articles= await fetchRandomNews();
        displayBlogs(articles);
    }catch(error){
        console.error("Error fetching random news",error);
        return [];

    }
})();
