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

        // Let´s assign each name to the <li> element using innerHTML
        li.innerHTML = name;

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
        let randomIndex = Math.floor(Math.random() * arrayFriends.length);

        // Then, locate the name in the generated randomIndex
        let secretFriend = arrayFriends[randomIndex]; 

        // Let´s display the secretFriend into the <ul> element
        let resultList = document.getElementById("resultList");

        // Let´s update the result with the secretFriend using innerHTML
        resultList.innerHTML = `You picked ${secretFriend} as your Secret Friend`;
    }
}

/* NEW FEATURES AREA */

// Let's set the default language. In this case, it's English
let currentLanguage = 'EN';

// Let's set the elements that will be switched
const translations = {
    EN: {
        mainTitle: "Secret Friend",
        sectionTitle: "Write some friends' names",
        inputPlaceholder: "Write a name",
        buttonAdd: "Add",
        buttonDraw: "Pick a Secret Friend",
    },
    PT: {
        mainTitle: "Amigo Secreto",
        sectionTitle: "Digite o nome dos seus amigos",
        inputPlaceholder: "Digite um nome",
        buttonAdd: "Adicionar",
        buttonDraw: "Sortear amigo",
    }
};

// Let's create a function that will be responsible for changing the tags in the HTML file
function switchLanguage() {
    // This is the condition that will switch the current language displayed to the user
    currentLanguage = currentLanguage === 'EN' ? 'PT' : 'EN';

    // Let´s declare an array of elements to update along with their respective translation keys to reduce redundancy and make the code more maintainable
    const elementsToUpdate = [
        { selector: '.main-title', property: 'textContent', translationKey: 'mainTitle' },
        { selector: '.section-title', property: 'textContent', translationKey: 'sectionTitle' },
        { selector: '.input-name', property: 'placeholder', translationKey: 'inputPlaceholder' },
        { selector: '.button-add', property: 'textContent', translationKey: 'buttonAdd' }
    ];

    // Then, we iterate over each element and update it based on the selected language.
    elementsToUpdate.forEach(element => {
        document.querySelector(element.selector)[element.property] = translations[currentLanguage][element.translationKey];
    });

    /* An error occurred. After switching languages, the image inside the buttonDraw was missing. 
    Instead of changing the entire button's textContent, we just update the text inside the button while keeping the image intact. */
    const buttonDraw = document.querySelector('.button-draw');
    const buttonImage = buttonDraw.querySelector('img');
    
    buttonDraw.textContent = translations[currentLanguage].buttonDraw;
    buttonDraw.prepend(buttonImage);  // Re-attach the image if it gets removed

    // Update the button text to indicate the next language. This switches the language and updates the button dynamically.
    document.getElementById('language-switch').textContent = currentLanguage === 'EN' ? 'PT' : 'EN';
}

/* NEW FEATURES AREA - with GITHUB COPILOT 🔥*/

// Let's set the default theme. In this case, it's "Default"
let currentTheme = 'Default';

// Let's set the elements that will be switched
const themeTexts = {
    Default: "Switch to Nitro 🔥",
    Nitro: "Switch to Default"
};

// Function to toggle the theme
function switchTheme() {
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const themeButton = document.getElementById('theme-switch');

    // This is the condition that will switch the current theme displayed to the user
    currentTheme = currentTheme === 'Default' ? 'Nitro' : 'Default';

    // Update the stylesheet based on the current theme
    themeStylesheet.setAttribute('href', currentTheme === 'Default' ? 'style.css' : 'style-nitro.css');

    // Update the button text to indicate the next theme
    themeButton.textContent = themeTexts[currentTheme];
}