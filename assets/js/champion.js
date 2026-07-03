// champion.js

const params = new URLSearchParams(window.location.search);
const championId = params.get("id");

let champions = [];

async function loadChampion() {
    try {
        const response = await fetch("data/champions.json");
        champions = await response.json();

        const champion = champions.find(c => c.id === championId);

        if (!champion) {
            document.getElementById("championDetail").innerHTML =
                "<h2>Champion not found.</h2>";
            return;
        }

        renderChampion(champion);

    } catch (error) {
        console.error(error);
    }
}

function renderChampion(champion) {

    document.title = champion.name + " | LoL Learning Hub";

    document.getElementById("championImage").src = champion.image;
    document.getElementById("championImage").alt = champion.name;

    document.getElementById("championName").textContent = champion.name;
    document.getElementById("championTitle").textContent = champion.title;
    document.getElementById("championRole").textContent = champion.role.join(" / ");
    document.getElementById("championDamage").textContent = champion.damage;
    document.getElementById("championDifficulty").textContent =
        "★".repeat(champion.difficulty);

    // Playstyle
    const playstyle = document.getElementById("playstyleContainer");
    playstyle.innerHTML = "";

    if (champion.playstyle) {
        champion.playstyle.forEach(tag => {
            const badge = document.createElement("span");
            badge.className = "badge";
            badge.textContent = tag;
            playstyle.appendChild(badge);
        });
    }

    // スキル情報はまだJSONに無いので空欄にする
    document.getElementById("skillP").textContent = "-";
    document.getElementById("skillQ").textContent = "-";
    document.getElementById("skillW").textContent = "-";
    document.getElementById("skillE").textContent = "-";
    document.getElementById("skillR").textContent = "-";

    loadUserData(champion.id);
}

function loadUserData(id) {

    const memo =
        localStorage.getItem(id + "_memo") || "";

    const understanding =
        localStorage.getItem(id + "_understanding") || "0";

    const favorite =
        localStorage.getItem(id + "_favorite") === "true";

    document.getElementById("memo").value = memo;

    document.getElementById("understanding").value = understanding;

    document.getElementById("understandingValue").textContent =
        understanding;

    if (favorite) {
        document.getElementById("favoriteButton").textContent =
            "★ お気に入り済み";
    }
}

document.getElementById("saveMemo").addEventListener("click", () => {

    localStorage.setItem(
        championId + "_memo",
        document.getElementById("memo").value
    );

    alert("保存しました！");
});

document.getElementById("understanding").addEventListener("input", (e) => {

    document.getElementById("understandingValue").textContent =
        e.target.value;

    localStorage.setItem(
        championId + "_understanding",
        e.target.value
    );
});

document.getElementById("favoriteButton").addEventListener("click", () => {

    const key = championId + "_favorite";

    const current =
        localStorage.getItem(key) === "true";

    localStorage.setItem(key, !current);

    document.getElementById("favoriteButton").textContent =
        !current ? "★ お気に入り済み" : "☆ お気に入り";
});

loadChampion();
