// champions.js

let champions = [];

const grid = document.getElementById("championGrid");
const searchInput = document.getElementById("searchInput");
const roleFilter = document.getElementById("roleFilter");
const damageFilter = document.getElementById("damageFilter");
const resetButton = document.getElementById("resetFilter");

async function loadChampions() {
    try {
        const response = await fetch("data/champions.json");
        champions = await response.json();

        renderChampions(champions);

    } catch (error) {
        console.error(error);

        grid.innerHTML = `
            <p>チャンピオンデータを読み込めませんでした。</p>
        `;
    }
}

function renderChampions(list) {

    grid.innerHTML = "";

    if (list.length === 0) {

        grid.innerHTML = "<p>一致するチャンピオンがありません。</p>";

        return;
    }

    list.forEach(champion => {

        const card = document.createElement("div");

        card.className = "champion-card fade-in";

        card.style.cursor = "pointer";

        card.innerHTML = `

            <div class="champion-image">

                <img
                    src="${champion.image}"
                    alt="${champion.name}">

            </div>

            <h3>${champion.name}</h3>

            <p>${champion.title}</p>

            <div>

                ${champion.role.map(role =>
                    `<span class="badge">${role}</span>`
                ).join("")}

                <span class="badge">
                    ${champion.damage}
                </span>

            </div>

            <p class="mt-2">

                難易度
                ${"★".repeat(champion.difficulty)}

            </p>

        `;

        card.onclick = () => {

            window.location.href =
                `champion.html?id=${champion.id}`;

        };

        grid.appendChild(card);

    });

}

function filterChampions() {

    const keyword =
        searchInput.value.toLowerCase();

    const role =
        roleFilter.value;

    const damage =
        damageFilter.value;

    const filtered = champions.filter(champion => {

        const matchName =
            champion.name.toLowerCase().includes(keyword);

        const matchRole =
            role === "" ||
            champion.role.includes(role);

        const matchDamage =
            damage === "" ||
            champion.damage === damage;

        return (
            matchName &&
            matchRole &&
            matchDamage
        );

    });

    renderChampions(filtered);

}

searchInput.addEventListener(
    "input",
    filterChampions
);

roleFilter.addEventListener(
    "change",
    filterChampions
);

damageFilter.addEventListener(
    "change",
    filterChampions
);

resetButton.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        roleFilter.value = "";

        damageFilter.value = "";

        renderChampions(champions);

    }
);

loadChampions();
