/*
This project implements four core functionalities:

1 - Allows user to add names through a text field and display the names in a public list when the "Add" button is clicked;
2 - Display an alert ("Please, enter a valid name.") if the user attempts to add an empty input or invalid data;
3 - As specified in the first functionality, the entered names are displayed in a public list below the text field;
4 - When the "Pick a Secret Friend" button is clicked, randomly select a name from the public list and display it on the page.

*/

// Let´s create an array to store the names as they are added by the user
let arrayFriends = [];

// Let´s implement the first function that will add names to the array declared as arrayFriends
function addFriend(){

    // Let´s get the value entered in the input field
    let nameFriend = document.getElementById("friend").value;

    // Let´s implement the alert for empty input or invalid data
    if (nameFriend == ""){
        alert("Please, enter a valid name.");
    } else {
        // Add the name to the array
        arrayFriends.push(nameFriend);
        
        // We are adding this after the creation of the displayArrayFriends()
        displayArrayFriends();
    }

    // As a best practice, clear the text field after adding the name to the array
    document.getElementById("friend").value = "";
}

// After declaring the addFriend() function, we need to display the names in the arrayFriends list below the text field. Let's implement the function responsible for this task
function displayArrayFriends() {

    // Let's get the element where the names will be displayed
    let resultList = document.getElementById("arrayFriends");

    // We need to clear the previous list before updating it to prevent displaying duplicate names. Try commenting out this line to see the effect
    resultList.innerHTML = "";

    // Let´s iterate through the arrayFriends and create <li> elements for each name in the array (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
    arrayFriends.forEach(function(name) {
        // Then, a <li> element is created
        let li = document.createElement("li");

        // Let´s assign each name to the <li> element using textContent (https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
        li.textContent = name;

        // Append the <li> element to the <ul> element
        resultList.appendChild(li);
    });
}

// For the last functionality, let's implement a function that randomly selects a name from the public list (arrayFriends) and displays it on the page
function pickFriend(){

    // Let´s create an alert if the arrayFriends is empty
    if (arrayFriends.length == 0){
        alert("Please, add some friends' names before picking a secret friend.");
    } else {
        // Now that we know the arrayFriends isn't empty, let's pick a random index from the array
        let randomIndex = parseInt(Math.random() * arrayFriends.length +1);

        // Then, locate the name in the generated randomIndex
        let secretFriend = arrayFriends[randomIndex]; 

        // Let´s display the secretFriend into the <ul> element
        let resultList = document.getElementById("resultList");

        // Let´s assign each name to the <ul> element using textContent 
        resultList.textContent = `You picked ${secretFriend} as your Secret Friend`;
    }
}