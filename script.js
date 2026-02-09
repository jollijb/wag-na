// script.js

// variable to track the timer
let spinTimeout; 

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
        
        // Style the loader (Large font, Romantic Red)
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

        // 3. Wait 3 seconds (3000ms), then show the dancing cat
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

        // Change text on the "No" button
        document.getElementById('no-button').innerText = 'You sure?'; 
        
        // Increase font size of "Yes" button
        var yesButton = document.getElementById('yes-button');
        var currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size');
        var newSize = parseFloat(currentFontSize) * 2; 
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
    // Clear the Loading text
    document.getElementById('image-container').innerHTML = '';
    
    var imageContainer = document.getElementById('image-container');
    var catHeartImage = new Image();
    catHeartImage.src = 'cat-dance.gif'; 
    catHeartImage.alt = 'Cat Heart';
    catHeartImage.onload = function() {
        imageContainer.appendChild(catHeartImage);
        
        // Double check options are hidden (in case of refresh issues)
        document.getElementById('options').style.display = 'none';

        // Message text
        var textContainer = document.getElementById('text-container');
        var messageDiv = document.createElement('div');
        messageDiv.id = 'message-me';
        messageDiv.innerText = 'yeeeyyy!\nmessage me hehe~';
        messageDiv.style.fontFamily = "'Sacramento', cursive";
        messageDiv.style.fontSize = '60px';
        messageDiv.style.marginTop = '20px';
        messageDiv.style.color = '#d62828'; // Deep Red
        
        
        // Add heartbeat animation to text
        messageDiv.style.animation = 'heartbeatText 2s infinite'; 

        textContainer.appendChild(messageDiv);

        // Play Music
        var audio = new Audio('music-dance.m4a'); 
        audio.loop = true; 
        audio.play();
    };
}

// Display the cat.gif initially
displayCat();
