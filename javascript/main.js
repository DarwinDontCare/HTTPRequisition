let listElement = document.getElementById("list");
let itemInfoDiv = document.getElementById("item_info");
let nameInput = document.getElementById("name_input");
let usernameInput = document.getElementById("username_input");
let emailInput = document.getElementById("email_input");
let idInput = document.getElementById("id_input");
let backButton = document.getElementById("back_button");
let submitButton = document.getElementById("submit_button");
let newUserDiv = document.getElementById("new_user_submit_container");
let listDiv = document.getElementById("list_container");
let addUserButton = document.getElementById("add_user");
let backButtonNewUser = document.getElementById("back_new_button");
let nameNewUserInput = document.getElementById("name_new_input");
let usernameNewUserInput = document.getElementById("username_new_input");
let NewUserEmailInput = document.getElementById("email_new_input");
let idNewUserInput = document.getElementById("id_new_input");
let submitNewUserButton = document.getElementById("submit_new_button");

backButton.addEventListener("click", hideItemInfo);
submitButton.addEventListener("click", sendDataToURL);
addUserButton.addEventListener("click", showNewUserScreen);
backButtonNewUser.addEventListener("click", hideNewUserScreen);
submitNewUserButton.addEventListener("click", addNewUser);

let listOfItems = [];

function getDataFromURL() {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => {
        addItemsToList(json);
    });
}

function addItemsToList(items) {
    for (var i = 0; i < 10; i++) {
        listOfItems.push(items[i]);
    }
    for (var i = 0; i < listOfItems.length; i++) {
        createItemElement(listOfItems[i].username);
    }
    console.log(listOfItems);
}

function createItemElement(text) {
    let li = document.createElement("li");
    li.className = "listItem";

    let span = document.createElement("span");
    span.textContent = text;

    li.addEventListener("click", clickListItem);

    li.appendChild(span);
    listElement.appendChild(li);
}

function loadItemInfo() {
    let liElements = document.getElementsByClassName("listItem");
    for (var i = 0; i < listOfItems.length; i++) {
        liElements[i].firstElementChild.textContent = listOfItems[i].username;
    }
}

function showItemInfo(element) {
    listDiv.style.visibility = "hidden";
    listDiv.style.position = "absolute";
    itemInfoDiv.style.visibility = "visible";

    nameInput.value = element.name;
    usernameInput.value = element.username;
    emailInput.value = element.email;
    idInput.value = element.id;
}

function hideItemInfo() {
    listDiv.style.visibility = "visible";
    listDiv.style.position = "relative";
    itemInfoDiv.style.visibility = "hidden";
}

function showNewUserScreen() {
    listDiv.style.visibility = "hidden";
    listDiv.style.position = "absolute";
    itemInfoDiv.style.visibility = "hidden";
    itemInfoDiv.style.position = "absolute";
    newUserDiv.style.visibility = "visible";
}

function hideNewUserScreen() {
    listDiv.style.visibility = "visible";
    listDiv.style.position = "relative";
    itemInfoDiv.style.visibility = "hidden";
    itemInfoDiv.style.position = "relative";
    newUserDiv.style.visibility = "hidden";
}

function addNewUser() {
    let newItem = {
        name: nameNewUserInput.value,
        email: NewUserEmailInput.value,
        username: usernameNewUserInput.value,
        id: idNewUserInput.value,
    };
    listOfItems.push(newItem)
    createItemElement(nameNewUserInput.value);
    fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => {
        alert("new user created!");
        console.log(json)
    });
}

function removeItemFromList(element) {
    let liItem = listOfItems.find(item => item.username == element.textContent);
    if(liItem) {
        fetch('https://jsonplaceholder.typicode.com/users/' + liItem.id, {
            method: 'DELETE',
        });
        listOfItems.splice(listOfItems.indexOf(liItem), listOfItems.indexOf(liItem) + 1);
        element.remove();
    }
}

function clickListItem(event) {
    if(event.target.nodeName == "LI") {
        removeItemFromList(event.target);
    } else {
        let liItem = listOfItems.find(item => item.username == event.target.textContent);
        showItemInfo(liItem);
    }
}

function sendDataToURL() {
    listOfItems[idInput.value - 1].name = nameInput.value;
    listOfItems[idInput.value - 1].email = emailInput.value;
    listOfItems[idInput.value - 1].username = usernameInput.value;
    listOfItems[idInput.value - 1].id = idInput.value;

    fetch('https://jsonplaceholder.typicode.com/users/' + idInput.value, {
        method: 'PUT',
        body: JSON.stringify({
            name: nameInput.value,
            email: emailInput.value,
            username: usernameInput.value,
            id: idInput.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => {
        alert("data changed!");
        console.log(json)
    });

    loadItemInfo();
}

function getDataFromInputs() {

}

getDataFromURL();
