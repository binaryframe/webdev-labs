"use strict"
import {
    goBack, goEdit, goCreate,
    getLuminaireObj, getCreateInputs, getEditInputs,
    clearCreateInputs, renderList, fillEditInputs
} from "./dom-utils.js"
import { openDialog } from "./dialog-setup.js"

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
];

const header__search = document.getElementById("header__search");
const header__search_btn = document.getElementById("header__search-btn");
const header__clear_btn = document.getElementById("header__clear-btn");
const header__sort = document.getElementById("header__sort");
const header__count = document.getElementById("header__count");
const view_title = document.getElementById("view__title");
const view_count = document.getElementById("view_count");
const view_total_power = document.getElementById("view_total-power");

const tab_view = document.getElementById("tab-view");
const header__create = document.getElementById("header__create");
const create_button = document.getElementById("create__create");
const edit_button = document.getElementById("edit__edit");
const create_go_back = document.getElementById("create__go-back");
const edit_go_back = document.getElementById("edit__go-back");

tab_view.addEventListener("click", goBack);
create_go_back.addEventListener("click", goBack);
edit_go_back.addEventListener("click", goBack);

header__create.addEventListener("click", () => {
    clearCreateInputs();
    goCreate();
});

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

function isValid({ type, power, ledCount, manufacturer }) {
    if (type === "" || manufacturer === "") return false;
    if (Number.isNaN(power) || power <= 0) return false;
    if (Number.isNaN(ledCount) || ledCount <= 0) return false;
    return true;
}

create_button.addEventListener("click", () => {
    const input = getCreateInputs();
    if (!isValid(input)) {
        openDialog();
        return;
    }
    const luminaire_obj = getLuminaireObj(input);
    luminaireList.unshift(luminaire_obj);
    clearCreateInputs();
    header__search.value = "";
    updateView();
    goBack();
});

edit_button.addEventListener("click", () => {
    const input = getEditInputs();
    if (!isValid(input)) {
        openDialog();
        return;
    }
    luminaireList.forEach((value, index, arr) => {
        if (value.id === input.id) {
            arr[index] = input;
        }
    });
    header__search.value = "";
    updateView();
    goBack();
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

    renderList(filtered, onEdit, onDelete);
    view_count.innerText = `Count: ${filtered.length}`;
    view_total_power.innerText = "Total power: 0 W";
}

function onEdit(luminaire_id) {
    const luminaire = findLuminaire(luminaire_id);
    if (luminaire === null) {
        return;
    }
    fillEditInputs(luminaire);
    goEdit();
}

function onDelete(luminaire_id) {
    for (let index in luminaireList) {
        if (luminaireList[index].id === luminaire_id) {
            luminaireList.splice(index, 1);
            updateView();
            return;
        }
    }
}

function findLuminaire(luminaire_id) {
    for (let luminaire of luminaireList) {
        if (luminaire.id === luminaire_id) {
            return luminaire;
        }
    }
    return null;
}

updateView();