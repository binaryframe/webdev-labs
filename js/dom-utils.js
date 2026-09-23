"use strict"

const grid_parent = document.getElementById("film-grid");

export function renderCard({ type, power, ledCount, manufacturer }) {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("div");
    image.classList.add("card__image");
    image.innerText = "220x130";
    card.appendChild(image);

    const body = document.createElement("div");
    body.classList.add("card__body");

    const title = document.createElement("p");
    title.classList.add("card__title");
    title.innerText = type;
    body.appendChild(title);

    const description = document.createElement("p");
    description.classList.add("card__description");
    description.innerText = `Made by ${manufacturer}, ${ledCount} LED bulbs.`;
    body.appendChild(description);

    const power_line = document.createElement("p");
    power_line.classList.add("card__description");
    power_line.innerText = `${power} W`;
    body.appendChild(power_line);

    card.appendChild(body);
    grid_parent.appendChild(card);
}

export function renderList(luminaire_list) {
    grid_parent.innerHTML = "";
    for (let luminaire of luminaire_list) {
        renderCard(luminaire);
    }
}
