"use strict"

const grid_parent = document.getElementById("film-grid");

const view = document.getElementById("view");
const create = document.getElementById("create");
const edit = document.getElementById("edit");
const search_panel = document.getElementById("search-panel");

const tab_view = document.getElementById("tab-view");
const tab_create = document.getElementById("header__create");

const create__type = document.getElementById("create__type");
const create__power = document.getElementById("create__power");
const create__ledCount = document.getElementById("create__led-count");
const create__manufacturer = document.getElementById("create__manufacturer");

const edit__id = document.getElementById("edit__id");
const edit__type = document.getElementById("edit__type");
const edit__power = document.getElementById("edit__power");
const edit__ledCount = document.getElementById("edit__led-count");
const edit__manufacturer = document.getElementById("edit__manufacturer");

export function renderCard({ id, type, power, ledCount, manufacturer }, callback_edit, callback_delete) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = id;

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

    const actions = document.createElement("div");
    actions.classList.add("card__actions");

    const editBtn = document.createElement("button");
    editBtn.classList.add("card__edit");
    editBtn.textContent = "Edit";
    actions.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("card__remove");
    removeBtn.textContent = "Remove";
    actions.appendChild(removeBtn);

    body.appendChild(actions);
    card.appendChild(body);
    grid_parent.appendChild(card);

    editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        callback_edit(id);
    });
    removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        callback_delete(id);
    });
}

export function renderList(luminaire_list, callback_edit, callback_delete) {
    grid_parent.innerHTML = "";
    for (let luminaire of luminaire_list) {
        renderCard(luminaire, callback_edit, callback_delete);
    }
}


function setActiveTab(isView) {
    tab_view.classList.toggle("tab--active", isView);
    tab_create.classList.toggle("tab--active", !isView);
}

export function goCreate() {
    view.classList.remove("open");
    edit.classList.remove("open");
    create.classList.add("open");
    search_panel.classList.remove("open");
    setActiveTab(false);
}

export function goEdit() {
    create.classList.remove("open");
    view.classList.remove("open");
    search_panel.classList.remove("open");
    edit.classList.add("open");
    setActiveTab(false);
}

export function goBack() {
    create.classList.remove("open");
    edit.classList.remove("open");
    view.classList.add("open");
    search_panel.classList.add("open");
    setActiveTab(true);
}

export function clearCreateInputs() {
    create__type.value = "";
    create__power.value = 5;
    create__ledCount.value = 1;
    create__manufacturer.value = "";
}

export function getCreateInputs() {
    return {
        type: create__type.value,
        power: create__power.valueAsNumber,
        ledCount: create__ledCount.valueAsNumber,
        manufacturer: create__manufacturer.value.trim()
    };
}

export function getEditInputs() {
    return {
        id: edit__id.value,
        type: edit__type.value,
        power: edit__power.valueAsNumber,
        ledCount: edit__ledCount.valueAsNumber,
        manufacturer: edit__manufacturer.value.trim()
    };
}

export function fillEditInputs(luminaire_obj) {
    edit__id.value = luminaire_obj.id;
    edit__type.value = luminaire_obj.type;
    edit__power.value = luminaire_obj.power;
    edit__ledCount.value = luminaire_obj.ledCount;
    edit__manufacturer.value = luminaire_obj.manufacturer;
}

export function getLuminaireObj({ type, power, ledCount, manufacturer }) {
    return {
        id: uuid.v1(),
        type,
        power,
        ledCount,
        manufacturer
    };
}
