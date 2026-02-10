// script.js

// Variable to track the timer for the spinning cat
let spinTimeout; 

// Variable to track how many times "No" was clicked
let noClickCount = 0;

// List of phrases to cycle through when "No" is clicked
const noTexts = [
    "You sure?", 
    "I wouldn't say no!", 
    "baka naman yah",
    "Nasan na ba pamalo ko", 
    "Final answer?", 
    "Oh wag na wag na!", 
    "Plsss? 🥺"
];

// Function to handle button click events
function selectOption(option) {
    if (option === 'yes') {
        // 1. Hide the question and options
        document.getElementById('question').style.display = 'none'; 
        document.getElementById('options').style.display = 'none'; 

        // 2. Create a Loading Screen
        var imageContainer = document.getElementById('image-container');
        imageContainer.innerHTML = ''; // Clear the current cat image
        
        // Create the loading text and icon
        var loaderDiv = document.createElement('div');
        loaderDiv.id = 'loading-state';
        loaderDiv.innerHTML = '❤️<br>Sending love...';
        
        // Style the loader
        loaderDiv.style.fontFamily = "'Sacramento', cursive";
        loaderDiv.style.fontSize = '50px';
        loaderDiv.style.color = '#d62828';
        loaderDiv.style.marginTop = '50px';
        
        // Add a pulsing animation via CSS injection
        var styleSheet = document.createElement("style");
        styleSheet.innerText = `
            @keyframes pulseLoader {
                0% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.1); }
                100% { opacity: 0.6; transform: scale(1); }
            }
        `;
        document.head.appendChild(styleSheet);
        loaderDiv.style.animation = 'pulseLoader 1.5s infinite';

        imageContainer.appendChild(loaderDiv);

        // 3. Wait 3 seconds, then show the dancing cat
        setTimeout(function() {
            displayCatHeart(); 
        }, 3000);

    } else if (option === 'no') {
        
        // Play the "No" audio
        var audio = new Audio('cat-spin2.m4a');
        audio.play();

        // Change image to spinning cat
        var imageContainer = document.getElementById('image-container');
        var currentImage = imageContainer.querySelector('img'); 
        
        if (currentImage) {
            currentImage.src = 'cat-spin.gif'; 
            
            clearTimeout(spinTimeout);

            spinTimeout = setTimeout(function() {
                currentImage.src = 'cat-rose.png'; 
            }, 3000);
        }

        // --- NEW CODE: Cycle through the list of text ---
        var noButton = document.getElementById('no-button');
        
        // Get the next phrase from the list
        if (noClickCount < noTexts.length) {
            noButton.innerText = noTexts[noClickCount];
        } else {
            // If we run out of phrases, just keep repeating the last one
            noButton.innerText = noTexts[noTexts.length - 1];
        }
        noClickCount++; // Increment the counter

        // Increase font size of "Yes" button
        var yesButton = document.getElementById('yes-button');
        var currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size');
        var newSize = parseFloat(currentFontSize) * 1.5; // Grow by 1.5x (slightly less aggressive)
        yesButton.style.fontSize = newSize + 'px';
        
    } else {
        alert('Invalid option!');
    }
}

// Function to display the cat.gif initially
function displayCat() {
    var imageContainer = document.getElementById('image-container');
    var catImage = new Image();
    catImage.src = 'cat-rose.png'; 
    catImage.alt = 'Cat';
    catImage.onload = function() {
        imageContainer.appendChild(catImage);
    };
}

// Function to display the cat-heart.gif (Final Screen)
function displayCatHeart() {
    document.getElementById('image-container').innerHTML = '';
    
    var imageContainer = document.getElementById('image-container');
    var catHeartImage = new Image();
    catHeartImage.src = 'cat-dance.gif'; 
    catHeartImage.alt = 'Cat Heart';
    catHeartImage.onload = function() {
        imageContainer.appendChild(catHeartImage);
        
        document.getElementById('options').style.display = 'none';

        // Message text
        var textContainer = document.getElementById('text-container');
        var messageDiv = document.createElement('div');
        messageDiv.id = 'message-me';
        messageDiv.innerText = 'yey!\nmessage me hehe';
        messageDiv.style.fontFamily = "'Sacramento', cursive";
        messageDiv.style.fontSize = '60px';
        messageDiv.style.marginTop = '20px';
        messageDiv.style.color = '#d62828'; 
        
        messageDiv.style.animation = 'heartbeatText 2s infinite'; 
        
        // Add animation keyframes if not already present
        if (!document.getElementById('heartbeat-style')) {
             var styleSheet = document.createElement("style");
             styleSheet.id = 'heartbeat-style';
             styleSheet.innerText = `
                @keyframes heartbeatText {
                    0% { transform: scale(1); }
                    15% { transform: scale(1.1); }
                    30% { transform: scale(1); }
                    45% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
             `;
             document.head.appendChild(styleSheet);
        }

        textContainer.appendChild(messageDiv);

        // Play Music
        var audio = new Audio('music-dance.m4a'); 
        audio.loop = true; 
        audio.play();
    };
}

// Display the cat.gif initially
displayCat();

