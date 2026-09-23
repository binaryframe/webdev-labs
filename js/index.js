"use strict"
import { renderList } from "./dom-utils.js"

class Luminaire {
    constructor(type, power, ledCount, manufacturer) {
        this.id = uuid.v1();
        this.type = type;
        this.power = power;
        this.ledCount = ledCount;
        this.manufacturer = manufacturer;
    }
}

const luminaireList = [
    new Luminaire("Panel Light", 40, 120, "Philips"),
    new Luminaire("Street Light", 150, 300, "Osram"),
    new Luminaire("Downlight", 12, 24, "IKEA"),
    new Luminaire("Flood Light", 100, 200, "Philips"),
    new Luminaire("Track Light", 20, 40, "GE Lighting"),
    new Luminaire("High Bay Light", 200, 400, "Osram"),
];

const header__search = document.getElementById("header__search");
const header__search_btn = document.getElementById("header__search-btn");
const header__clear_btn = document.getElementById("header__clear-btn");
const header__sort = document.getElementById("header__sort");
const header__count = document.getElementById("header__count");
const view_title = document.getElementById("view__title");
const view_count = document.getElementById("view_count");
const view_total_power = document.getElementById("view_total-power");

header__search.addEventListener("keyup", (e) => {
    if (e.key !== "Enter") {
        return;
    }
    updateView();
});

header__search_btn.addEventListener("click", () => {
    updateView();
});

header__clear_btn.addEventListener("click", () => {
    header__search.value = "";
    header__sort.value = "";
    updateView();
});

header__sort.addEventListener("change", () => {
    updateView();
});

header__count.addEventListener("click", () => {
    const filtered = getFiltered();
    const totalPower = filtered.reduce((sum, item) => sum + item.power, 0);
    view_total_power.innerText = `Total power: ${totalPower} W`;
});

function getSort(value) {
    switch (value) {
        case "0":
            return (a, b) => a.type.localeCompare(b.type);
        case "1":
            return (a, b) => b.power - a.power;
        case "2":
            return (a, b) => b.ledCount - a.ledCount;
        default:
            return null;
    }
}

function getFiltered() {
    const prefix = header__search.value.trim().toLocaleLowerCase();
    return luminaireList.filter((item) => {
        return item.manufacturer.toLocaleLowerCase().startsWith(prefix);
    });
}

function updateView() {
    const prefix = header__search.value.trim();
    view_title.innerText = prefix === "" ? "Luminaires" : `Search: "${prefix}"`;

    const filtered = getFiltered();
    const sortFn = getSort(header__sort.value);
    if (sortFn != null) {
        filtered.sort(sortFn);
    }

    renderList(filtered);
    view_count.innerText = `Count: ${filtered.length}`;
    view_total_power.innerText = "Total power: 0 W";
}

updateView();