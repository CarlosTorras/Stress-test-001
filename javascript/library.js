// Fetch for books

fetch("https://api.myjson.com/bins/zyv02", {
  method: "GET",
  headers: {}
})
  .then(function(books) {
    console.log(books);
    return books.json();
  })
  .then(function(books) {
    console.log(books);
    var books = books.books;
    bookcards(books, "library");
    document.getElementById("forsearch").addEventListener("keyup", function() {
      bookSearch(books);
    });
  })
  .catch(function(error) {
    console.log(error);
  });

function bookcards(array, id) {
  var body = document.getElementById(id);

  body.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    var flipcard = document.createElement("div");
    flipcard.className = "flip-card";
    var flipcardinner = document.createElement("div");
    flipcardinner.setAttribute("class", "flip-card-inner");
    var flipcardfront = document.createElement("div");
    flipcardfront.setAttribute("class", "flip-card-front");
    var cover = document.createElement("img");
    cover.setAttribute("src", array[i].cover);
    var flipcardback = document.createElement("div");
    flipcardback.setAttribute("class", "flip-card-back");
    var title = document.createElement("h2");
    title.className = "title";
    var info = document.createElement("p");
    info.className = "info";
    var btnfunction = document.createElement("a");
    btnfunction.setAttribute("href", array[i].detail);
    btnfunction.setAttribute("data-fancybox", "gallery");
    btnfunction.setAttribute("data-caption", array[i].title);
    var button = document.createElement("button");
    button.setAttribute("type", "button");

    title.innerHTML = array[i].title;
    info.innerHTML =
      array[i].description + "<br>" + "language:" + " " + array[i].language;
    button.innerHTML = "More Info";

    flipcardfront.append(cover);
    btnfunction.append(button);
    flipcardback.append(title, info, btnfunction);
    flipcardinner.append(flipcardfront, flipcardback);

    flipcard.append(flipcardinner);
    body.append(flipcard);
  }
  document.getElementById("load-icon").style.display = "none";
}

// Search input

function bookSearch(array) {
  var input = document.getElementById("forsearch");
  var filteredArr = [];

  filteredArr = array.filter(
    arr =>
      arr.title.toUpperCase().includes(input.value.toUpperCase()) ||
      arr.description.toUpperCase().includes(input.value.toUpperCase())
  );

  console.log(filteredArr);

  bookcards(filteredArr, "library");
}
