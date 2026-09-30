"use strict"
import {
    goBack, goEdit, goCreate,
    getCreateInputs, getEditInputs,
    clearCreateInputs, renderList, fillEditInputs
} from "./dom-utils.js"
import { openDialog } from "./dialog-setup.js"

let luminaireList = [];
const API_URL = "http://localhost:5050/api/luminaires";

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
    loadData();
});

header__search_btn.addEventListener("click", () => {
    loadData();
});

header__clear_btn.addEventListener("click", () => {
    header__search.value = "";
    header__sort.value = "";
    loadData();
});

header__sort.addEventListener("change", () => {
    loadData();
});

header__count.addEventListener("click", async () => {
    const search = header__search.value.trim();
    const params = new URLSearchParams();
    if (search) params.append("search", search);

    try {
        const response = await fetch(`${API_URL}/total-power?${params.toString()}`);
        const data = await response.json();
        view_total_power.innerText = `Total power: ${data.totalPower} W`;
    } catch (error) {
        console.error("count error:", error);
    }
});

function isValid({ type, power, ledCount, manufacturer }) {
    if (type === "" || manufacturer === "") return false;
    if (Number.isNaN(power) || power <= 0) return false;
    if (Number.isNaN(ledCount) || ledCount <= 0) return false;
    return true;
}

create_button.addEventListener("click", async () => {
    const input = getCreateInputs();
    if (!isValid(input)) {
        openDialog();
        return;
    }
    
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        
        clearCreateInputs();
        header__search.value = "";
        await loadData();
        goBack();
    } catch (error) {
        console.error("creation error:", error);
    }
});

edit_button.addEventListener("click", async () => {
    const input = getEditInputs();
    if (!isValid(input)) {
        openDialog();
        return;
    }
    
    try {
        await fetch(`${API_URL}/${input.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        
        header__search.value = "";
        await loadData();
        goBack();
    } catch (error) {
        console.error("update error:", error);
    }
});

function updateView() {
    const prefix = header__search.value.trim();
    view_title.innerText = prefix === "" ? "Luminaires" : `Search: "${prefix}"`;

    renderList(luminaireList, onEdit, onDelete);
    view_count.innerText = `Count: ${luminaireList.length}`;
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

async function onDelete(luminaire_id) {
    try {
        await fetch(`${API_URL}/${luminaire_id}`, {
            method: 'DELETE'
        });
        
        await loadData();
    } catch (error) {
        console.error("deletion error:", error);
    }
}

function findLuminaire(luminaire_id) {
    for (let luminaire of luminaireList) {
        if (luminaire.id == luminaire_id) {
            return luminaire;
        }
    }
    return null;
}

async function loadData() {
    const search = header__search.value.trim();
    const sort = header__sort.value;

    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (sort !== "") params.append("sort", sort);

    try {
        const response = await fetch(`${API_URL}?${params.toString()}`);
        luminaireList = await response.json();
        updateView();
    } catch (error) {
        console.error("data load error:", error);
    }
}

loadData();