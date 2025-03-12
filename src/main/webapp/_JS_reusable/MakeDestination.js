"use strict";
function MakeDestination({
    name = "Unknown Destination",
    imageUrl = "default-destination.jpg",
    imageList = [
        { display: "Mountain", val: "style/mountain.jpeg", name: "Mountain Retreat", price: 800, rating: 4.0 },
        { display: "Tropical", val: "style/tr.jpg", name: "Tropical Paradise", price: 1000, rating: 4.5 },
        { display: "City", val: "style/city.jpeg", name: "City Escape", price: 600, rating: 3.5 }
    ],
    rating = 0,
    price = 0
    
}) {
    const destElement = document.createElement("div");
    destElement.classList.add("destination");

    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageElement.alt = name;
    destElement.appendChild(imageElement);

    const nameElement = document.createElement("h2");
    nameElement.textContent = name;
    destElement.appendChild(nameElement);

    const ratingElement = document.createElement("p");
    ratingElement.textContent = `Rating: ${rating} / 5`;
    destElement.appendChild(ratingElement);

    const priceElement = document.createElement("p");
    priceElement.textContent = `Price: $${price}`;
    destElement.appendChild(priceElement);

    // Add span elements for increasing and decreasing the rating
    const increaseText = document.createElement("span");
    increaseText.textContent = "Increase Rating";
    increaseText.style.cursor = "pointer";
    increaseText.style.color = "blue";
    increaseText.style.marginRight = "10px"; 
    destElement.appendChild(increaseText);

    const decreaseText = document.createElement("span");
    decreaseText.textContent = "Decrease Rating";
    decreaseText.style.cursor = "pointer";
    decreaseText.style.color = "blue";
    destElement.appendChild(decreaseText);

    const selectElement = document.createElement("select");
    selectElement.classList.add("selectImagesC");
    imageList.forEach(img => {
        const option = document.createElement("option");
        option.value = img.val;
        option.textContent = img.display;
        selectElement.appendChild(option);
    });
    destElement.appendChild(selectElement);

    function updateDisplay() {
        imageElement.src = imageUrl;
        nameElement.textContent = name;
        ratingElement.textContent = `Rating: ${rating} / 5`;
        priceElement.textContent = `Price: $${price}`;
    }

    // Event listener to handle the image selection change
    selectElement.addEventListener('change', (event) => {
        const selectedImage = imageList.find(img => img.val === event.target.value);
        if (selectedImage) {
            imageUrl = selectedImage.val;
            name = selectedImage.name;
            price = selectedImage.price;
            rating = selectedImage.rating;
        }
        updateDisplay();
    });

    // Event listeners for the text spans to increase/decrease rating
    increaseText.addEventListener('click', () => {
        if (rating < 5) {
            rating += 0.5;
            updateDisplay();
        }
    });

    decreaseText.addEventListener('click', () => {
        if (rating > 0) {
            rating -= 0.5;
            updateDisplay();
        }
    });

    updateDisplay();
    return destElement;
}
