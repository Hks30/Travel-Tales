function MakeDestination_CGF() {
    // Create a <style> element for CSS
    const style = document.createElement("style");
    style.textContent = `
                .destination-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 800px;
            margin: 20px auto;
        }

        .destination-container p {
            text-align: center;
            font-size: 1.2rem;
            color: #333;
            margin-bottom: 20px;
        }

        .destination-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 250px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin: 10px;
            padding: 15px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
        }

        .destination-card:hover {
            transform: scale(1.05);
        }

        .destination-card img {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: 5px;
            margin-bottom: 10px;
        }

        .destination-card .name {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 5px;
            color: #444;
        }

        .destination-card .details {
            font-size: 0.9rem;
            color: #777;
            text-align: center;
        }

        .button-group {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 15px;
        }

        .button-group button {
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .button-group button:hover {
            background-color: #45a049;
        }

        .button-group button:disabled {
            background-color: #ddd;
            color: #aaa;
            cursor: not-allowed;
        }

        .button-group .quantity {
            font-size: 1.2rem;
            margin: 0 15px;
            font-weight: bold;
        }

    `;

    // Append the <style> element to the <head> of the document
    document.head.appendChild(style);

    // Create the destination container
    const container = document.createElement("div");
    container.classList.add("destination-container");

    const selectionParagraph = document.createElement("p");
    selectionParagraph.textContent =
        "Please select a destination from the options below. Each destination offers unique experiences tailored to your preferences.";
    container.appendChild(selectionParagraph);

    // Define each destination
    const dest1 = MakeDestination({
        name: "Mountain Retreat",
        imageUrl: "style/mountain.jpeg",
        rating: 4.5,
        price: 1000,
        isOpen: true,
    });
    container.appendChild(dest1);

    const dest2 = MakeDestination({
        name: "Tropical Paradise",
        imageUrl: "style/tr.jpg",
        rating: 4.0,
        price: 800,
        isOpen: true,
    });
    container.appendChild(dest2);

    const dest3 = MakeDestination({
        name: "City Escape",
        imageUrl: "style/city.jpeg",
        rating: 3.5,
        price: 900,
        isOpen: true,
    });
    container.appendChild(dest3);

    return container;
}
