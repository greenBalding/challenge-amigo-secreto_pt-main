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
        alert(translations[currentLanguage].alertInvalidName);
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
        alert(translations[currentLanguage].alertNoNames);
        return;
    }

    // Now that we know the arrayFriends isn't empty, let´s check the current theme and execute the appropriate function
    if (currentTheme === 'Nitro') {
        assignSecretFriends(); // If the theme is Nitro, call the function that assigns secret friends
    } else {

        // Use the default method to pick a secret friend that was originally requested

        // let's pick a random index from the arrayFriends
        let randomIndex = Math.floor(Math.random() * arrayFriends.length);

        // Then, locate the name in the generated randomIndex
        let secretFriend = arrayFriends[randomIndex];

        // Let´s display the secretFriend into the <ul> element
        let resultList = document.getElementById("resultList");

        // Let´s update the result with the secretFriend using innerHTML
        resultList.innerHTML = translations[currentLanguage].resultMessage.replace("{secretFriend}", secretFriend);
    }
}

/* ------ NEW FEATURES AREA ------ */

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
        alertInvalidName: "Please, enter a valid name.",
        alertNoNames: "Please, add some friends' names before picking a secret friend.",
        alertNotEnoughNames: "The list must have at least 2 names.",
        alertUnableToAssign: "Unable to generate valid assignments. Please try again.",
        resultMessage: "You picked {secretFriend} as your Secret Friend"
    },
    PT: {
        mainTitle: "Amigo Secreto",
        sectionTitle: "Digite o nome dos seus amigos",
        inputPlaceholder: "Digite um nome",
        buttonAdd: "Adicionar",
        buttonDraw: "Sortear amigo",
        alertInvalidName: "Por favor, insira um nome válido.",
        alertNoNames: "Por favor, adicione alguns nomes de amigos antes de sortear um amigo secreto.",
        alertNotEnoughNames: "A lista deve ter pelo menos 2 nomes.",
        alertUnableToAssign: "Não foi possível gerar atribuições válidas. Por favor, tente novamente.",
        resultMessage: "Você escolheu {secretFriend} como seu Amigo Secreto"
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

    // Then, we iterate over each element and update it based on the selected language
    elementsToUpdate.forEach(element => {
        document.querySelector(element.selector)[element.property] = translations[currentLanguage][element.translationKey];
    });

    /* An error occurred. After switching languages, the image inside the buttonDraw was missing. 
    Instead of changing the entire button's textContent, we just update the text inside the button while keeping the image intact. */
    const buttonDraw = document.querySelector('.button-draw');
    const buttonImage = buttonDraw.querySelector('img');
    
    buttonDraw.textContent = translations[currentLanguage].buttonDraw;
    buttonDraw.prepend(buttonImage);  // Re-attach the image if it gets removed

    // Update the button text to indicate the next language. This switches the language and updates the button dynamically
    document.getElementById('language-switch').textContent = currentLanguage === 'EN' ? 'PT' : 'EN';
}

/* ------ NEW FEATURES AREA - with GITHUB COPILOT 🔥 ------ */

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

// It's time to implement the function that will assign secret friends when the Nitro theme is selected
function assignSecretFriends() {

    // let's create an alert if the arrayFriends has fewer than 2 names
    if (arrayFriends.length < 2) {
        alert(translations[currentLanguage].alertNotEnoughNames);
        return;
    }

    // Make a copy of the arrayFriends list and call it receivers. The spread operator (...) is used to create a shallow copy of the array (https://www.w3schools.com/react/react_es6_spread.asp)
    let receivers = [...arrayFriends];
    // Set a flag to false to track if we have a successful assignment. This variable will be used to track whether a valid assignment of secret friends has been successfully created
    let success = false;
    // Set the maximum number of attempts to 100. This is a safeguard to prevent the algorithm from running indefinitely in case it struggles to find a valid assignment
    let maxAttempts = 100;
    // Start with 0 attempts. This variable will be used to count the number of attempts the algorithm has made to find a valid assignment
    let attempts = 0;

    // Keep trying until we succeed or reach the maximum number of attempts. This loop will continue until a valid assignment is found or the maximum number of attempts is reached
    while (!success && attempts < maxAttempts) {
        // Shuffle the receivers list to mix up the names. This helps in randomizing the assignments
        shuffleArray(receivers);
        // Assume success is true for now. This assumption will be checked in the next loop
        success = true;
        // Check each name in the arrayFriends list. This loop ensures that no one gets their own name
        for (let i = 0; i < arrayFriends.length; i++) {
            // If someone gets their own name, set success to false and increase attempts. This ensures that the assignment is valid
            if (arrayFriends[i] === receivers[i]) {
                success = false;
                attempts++;
                break;
            }
        }
    }

    // Let´s fire up an alert if the assignment was unsuccessful
    if (!success) {
        alert(translations[currentLanguage].alertUnableToAssign);
        return;
    }

    // Create a list of assignments. This array will store the final assignments of secret friends and garantee that no one gets their own name
    let assignments = [];
    for (let i = 0; i < arrayFriends.length; i++) {
        assignments.push(`${arrayFriends[i]} → ${receivers[i]}`);
    }

    // Display the assignments on the page. This updates the HTML to show the assignments to the user
    let resultList = document.getElementById("resultList");
    resultList.innerHTML = assignments.join('<br>');
}

// This is a helper function to shuffle an array. This function shuffles the elements of an array randomly using the math.random() function
function shuffleArray(array) {
    // Loop through the array from the end to the beginning. This ensures that all elements are considered for shuffling
    for (let i = array.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i. This index will be used to swap elements
        const j = Math.floor(Math.random() * (i + 1));
        // Swap the elements at index i and j. This randomizes the positions of the elements
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}