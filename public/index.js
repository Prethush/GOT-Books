
function init() {
    const container = document.querySelector("#container");
    const ul = document.querySelector("ul");
    const modal = document.querySelector(".modal");
    const close = document.querySelector(".close");
    const charactersData = document.querySelector(".characters-data");
    const error = document.querySelector(".error");
    const main = document.querySelector(".main");
    const miniContainer = document.querySelector(".mini-container");

/* <div class="donut"></div> */

function handleErrorMessage(msg = `Something went wrong ❌`) {
    main.style.display = "none";
    error.innerText = msg;
    error.style.display = "block";
   
}
function handleSpinner(rootElm, status = false) {
    console.log(rootElm)
   if(status) {
    rootElm.innerHTML="<div class='donut'><div>";
   }
}
close.addEventListener("click", (e) => {
    modal.style.display = "none";
})
const url = `https://www.anapioficeandfire.com/api/books`;

function displayCharacters(characters) {
    handleSpinner(miniContainer, true);   
    Promise.all(characters.map((character) =>fetch(character).then((res) => res.json())))
    .then((data) => {
        console.log(data);
        miniContainer.innerHTML = "";
        charactersData.innerHTML = "";
        data.forEach((character) => {
        let li = document.createElement("li");
        li.classList.add("border-solid", "border-2", "border-gray-400", "p-2", "my-2", "text-md", "sm:text-xl", "font-semibold");
         li.innerText = `${character.name}: ${character.aliases.join(" ")}`;
        charactersData.append(li);
        console.log(charactersData);
        miniContainer.append(charactersData);
        })
        
        
    });
    
    modal.append(miniContainer);
    console.log(modal);
    // li.innerText = `${}`
}


function displayUI(books) {
    container.innerHTML = "";
    books.forEach((book) => {
        let li = document.createElement("li");
        li.classList.add("text-box", "w-full", "flex", "flex-col","items-center","justify-center", "flex-100", "sm:flex-50" ,"lg:flex-30","xl:flex-25", "2xl:flex-20", "bg-primary", "border", "border-black", "py-6", "text-center", "m-4", "rounded-md", "px-4");
        let title = document.createElement("h2");
        title.classList.add("text-2xl", "font-bold", "mb-5");
        title.innerText = book.name;
        let author = document.createElement("h3");
        author.innerText = book.authors[0];
        author.classList.add("text-xl", "mb-6");
        let button = document.createElement("a");
        button.innerText = `Show Characters ${book.characters.length}`;
        button.classList.add("bg-black", "text-white", "p-2","cursor-pointer");
        button.addEventListener("click", (e) => {
            console.log("click");
            displayCharacters(book.characters);
            modal.style.display = "block";
            container.append(modal);
        })
        li.append(title, author, button);
        ul.append(li);
        container.append(ul);
    })
}

function booksData() {
    handleSpinner(container, true);
    fetch(url).then((res) => {
        if(res.ok) {
            return res.json();
        }
        throw new Error("Reponse is not Ok");
    })
    .then((booksData) =>{
        console.log(booksData)
        displayUI(booksData)
    })
    .catch((error) => handleErrorMessage(error))
    .finally(() => handleSpinner(container));
}
        
// Promise.all(books.map((book) => book).then(console.log));

modal.addEventListener("load", (e) => {
    modal.style.display = "none";
});
console.log(modal);



if(navigator.onLine) {
    booksData();

} else {
    handleErrorMessage("Check your Internet Connection ❌");
}

}

init();