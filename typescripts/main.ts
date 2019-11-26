/**
 * Respresents a single joke about chuck norris from icndb.com
 */
class ChuckNorrisJoke{
    /**
     * The ID of the joke
     */
    id:Number;
    /**
     * The text of the Joke
     */
    joke:string;
    /**
     * The categories the joke falls under.
     * Some Jokes are not categorized
     */
    categories:string[];
}


window.onload = function(){
    let jokeButton = <HTMLButtonElement>document.getElementById("get-joke");
    jokeButton.onclick = fetchJoke;
    populateCategories();
}

function fetchJoke():void{
    let jokeBtn = <HTMLButtonElement>this;
    jokeBtn.disabled = true;

    let loaderImg = document.getElementById("loader");
    loaderImg.classList.add("loader");

    let request = new XMLHttpRequest();
    request.onreadystatechange = handleJokeResponse;

    //Set URL for resuest
    request.open("GET", "https://api.icndb.com/jokes/random");

    //Initiate request
    request.send();
}

function isCategorySelected():boolean{
    let selIndex = (<HTMLSelectElement>document.getElementById("cat-list")).selectedIndex;
    if(selIndex == 0){
        return false;
    }
    return true;
}

/**
 * Returns the category that is selected
 */
function getSelectedCategory():string{
    let selIndex = (<HTMLSelectElement>document.getElementById("cat-list")).selectedIndex;
    return "";
}

function handleJokeResponse():void{
    let request = <XMLHttpRequest>this;

    //readyState 4 means requesst is finished
    //status 200 means successful
    if(request.readyState == 4 && request.status == 200){
        //Hold JSON response from server
        let responseData = JSON.parse(request.responseText);
        let myJoke = <ChuckNorrisJoke>responseData.value;
        displayJoke(myJoke);
        //alert(myJoke.joke);
        //console.log(myJoke);
    }
    else if(request.readyState == 4 && request.status != 200){
        alert("Please try again later, Something happened.");
    }
}

function displayJoke(j:ChuckNorrisJoke):void{
    let jokeTextPar = document.getElementById("joke-text");
    jokeTextPar.innerHTML = j.joke;

    let jokeIdPar = document.getElementById("joke-id");
    jokeIdPar.innerHTML = "ID: " + j.id.toString();

    let jokeCatList = <HTMLUListElement>document.getElementById("categories");
    //Clear out any categories from previous joke
    jokeCatList.innerHTML = "";

    let allCategories = j.categories;
    allCategories.sort();
    for(let i = 0; i < allCategories.length; i++){
        let item = document.createElement("li");
        item.innerHTML = allCategories[i];

        jokeCatList.appendChild(item);
    }

    let categoryDisplay = document.getElementById("category-display");
    if(allCategories.length == 0){
        categoryDisplay.hidden = true;
    }
    else{
        categoryDisplay.hidden = false;
    }

    let loaderImg = document.getElementById("loader");
    loaderImg.classList.remove("loader");

    //Re=enables button 3 seconds after it displays
    setTimeout(function(){
        let jokeBtn = <HTMLButtonElement>document.getElementById("get-joke");
        jokeBtn.disabled = false;
    }, 1000)
}

/**
 * Displays categories in a drop down list
 */
function populateCategories():void{
    let request = new XMLHttpRequest();
    request.open("GET", "https://api.icndb.com/categories");

    request.onreadystatechange = function(){
        //Request finished   (4) successfully    (200)
        if(this.readyState == 4 && this.status == 200){
            let categories:string[] = JSON.parse(this.responseText).value;
            console.log(categories);
            populateCatDropdown(categories);
        }
    }
    
    request.send();
}

function populateCatDropdown(categories:string[]):void{
    let dropDown = <HTMLSelectElement>document.getElementById("cat-list");
    for(let i = 0; i < categories.length; i++){
        let currOption = <HTMLOptionElement>document.createElement("option");
        currOption.text = categories[i];
        dropDown.appendChild(currOption);
    }
}