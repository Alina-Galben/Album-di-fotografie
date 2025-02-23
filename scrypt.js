// 1.	Caricamento delle immagini random all'avvio (6 immagini in fila).
// 2.	Ricerca dinamica tramite input e pulsante di ricerca.
// 3.	Pulsanti per categorie (animali, natura, arte) generati dinamicamente.
// 4.	Utilizzo dei metodi dell'array studiati a lezione.


const API_KEY = "563492ad6f91700001000001b0ec30909a274fddaf88db2ac6d23e44";
const API_URL = "https://api.pexels.com/v1/search?query=";
const RANDOM_URL = "https://api.pexels.com/v1/curated?per_page=36";

const searchInput = document.getElementById("input-search");
const searchButton = document.getElementById("button-search");
const mainContainer = document.querySelector("main");

// Contenitore per immagini
const imageContainer = document.createElement("div");
imageContainer.classList.add("container", "mt-5");
mainContainer.appendChild(imageContainer);

// Funzione per creare card con le immagini
function createImageCards(photos) {
    imageContainer.innerHTML = ""; // Pulisce il contenitore
    
    const gallery = document.createElement("div");
    gallery.classList.add("row", "row-cols-1", "row-cols-sm-2", "row-cols-md-3", "rou-cols-lg-6", "mt-5", "g-3");
    
    photos.forEach(photo => {
        const col = document.createElement("div");
        col.classList.add("col-md-2"); // Imposta larghezza standard per la riga
        
        const card = document.createElement("div");
        card.classList.add("card", "h-100", "shadow-sm");
        
        const img = document.createElement("img");
        img.src = photo.src.small; // Usa l'immagine in formato piccolo
        img.classList.add("card-img-top");
        img.alt = photo.photographer;
        img.style.height = "150px"; // Imposta altezza standard
        img.style.objectFit = "cover"; // Assicura che le immagini riempiano lo spazio
        
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "p-2");
        
        const cardText = document.createElement("p");
        cardText.classList.add("card-text", "small");
        cardText.textContent = `Photo by ${photo.photographer}`;
        
        cardBody.appendChild(cardText);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        gallery.appendChild(col);
    });
    
    imageContainer.appendChild(gallery);
}

// Funzione per fare fetch delle immagini
//      Primo modo per fare la fetch
function fetchImages(query) {
    fetch(API_URL + query, {
        headers: { Authorization: API_KEY}
    })
    .then(response => response.json())
    .then(data => createImageCards(data.photos))
    .catch(error => console.error("Errore nel recupero delle immagini:", error));
}
//      Secondo modo per fare la fetch
// async function fetchImages(query) {
//     try {
//         const response = await fetch(API_URL + query, {
//             headers: { Authorization: API_KEY }
//         });
//         const data = await response.json();
//         createImageCards(data.photos);
//     } catch (error) {
//         console.error("Errore nel recupero delle immagini:", error);
//     }
// }

// Funzione per ottenere immagini random
async function fetchRandomImages() {
    try {
        const response = await fetch(RANDOM_URL, {
            headers: { Authorization: API_KEY }
        });
        const data = await response.json();
        createImageCards(data.photos);
    } catch (error) {
        console.error("Errore nel recupero delle immagini random:", error);
    }
}

// Aggiunta listener al bottone di ricerca
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) fetchImages(query);
});

// Creazione dinamica dei bottoni categoria
const categories = ["Animals", "Nature", "Art"];
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("d-flex", "justify-content-center", "mt-5", "gap-3");

categories.forEach(category => {
    const button = document.createElement("button");
    button.textContent = category;
    button.classList.add("btn", "btn-secondary");
    button.addEventListener("click", () => fetchImages(category.toLowerCase()));
    buttonContainer.appendChild(button);
});

// Aggiunge i bottoni sotto l'input nel main
mainContainer.insertBefore(buttonContainer, imageContainer);

// Carica immagini random all'avvio
fetchRandomImages();
