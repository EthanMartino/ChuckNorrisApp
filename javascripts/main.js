/**
 * Respresents a single joke about chuck norris from icndb.com
 */
var ChuckNorrisJoke = /** @class */ (function () {
    function ChuckNorrisJoke() {
    }
    return ChuckNorrisJoke;
}());
window.onload = function () {
    var jokeButton = document.getElementById("get-joke");
    jokeButton.onclick = fetchJoke;
    populateCategories();
};
function fetchJoke() {
    var jokeBtn = this;
    jokeBtn.disabled = true;
    var loaderImg = document.getElementById("loader");
    loaderImg.classList.add("loader");
    var request = new XMLHttpRequest();
    request.onreadystatechange = handleJokeResponse;
    //Set URL for resuest
    request.open("GET", "https://api.icndb.com/jokes/random");
    //Initiate request
    request.send();
}
function handleJokeResponse() {
    var request = this;
    //readyState 4 means requesst is finished
    //status 200 means successful
    if (request.readyState == 4 && request.status == 200) {
        //Hold JSON response from server
        var responseData = JSON.parse(request.responseText);
        var myJoke = responseData.value;
        displayJoke(myJoke);
        //alert(myJoke.joke);
        //console.log(myJoke);
    }
    else if (request.readyState == 4 && request.status != 200) {
        alert("Please try again later, Something happened.");
    }
}
function displayJoke(j) {
    var jokeTextPar = document.getElementById("joke-text");
    jokeTextPar.innerHTML = j.joke;
    var jokeIdPar = document.getElementById("joke-id");
    jokeIdPar.innerHTML = "ID: " + j.id.toString();
    var jokeCatList = document.getElementById("categories");
    //Clear out any categories from previous joke
    jokeCatList.innerHTML = "";
    var allCategories = j.categories;
    allCategories.sort();
    for (var i = 0; i < allCategories.length; i++) {
        var item = document.createElement("li");
        item.innerHTML = allCategories[i];
        jokeCatList.appendChild(item);
    }
    var categoryDisplay = document.getElementById("category-display");
    if (allCategories.length == 0) {
        categoryDisplay.hidden = true;
    }
    else {
        categoryDisplay.hidden = false;
    }
    var loaderImg = document.getElementById("loader");
    loaderImg.classList.remove("loader");
    //Re=enables button 3 seconds after it displays
    setTimeout(function () {
        var jokeBtn = document.getElementById("get-joke");
        jokeBtn.disabled = false;
    }, 1000);
}
/**
 * Displays categories in a drop down list
 */
function populateCategories() {
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.icndb.com/categories");
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var categories = JSON.parse(this.responseText).value;
            console.log(categories);
        }
    };
    request.send();
}
