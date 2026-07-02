// ================================
// LoL Learning Hub
// app.js
// Version 0.1
// ================================

console.log("LoL Learning Hub Started");

// --------------------
// ランダムチャンピオン
// --------------------

const favoriteChampions = [
    {
        name: "リリア",
        role: "Jungle",
        page: "champions/lillia.html"
    },
    {
        name: "ランブル",
        role: "Top",
        page: "champions/rumble.html"
    },
    {
        name: "タリヤ",
        role: "Mid / Jungle",
        page: "champions/taliyah.html"
    },
    {
        name: "シンジド",
        role: "Top",
        page: "champions/singed.html"
    },
    {
        name: "ブライアー",
        role: "Jungle",
        page: "champions/briar.html"
    },
    {
        name: "ニダリー",
        role: "Jungle",
        page: "champions/nidalee.html"
    }
];

const randomButton = document.getElementById("randomChampion");

if (randomButton) {

    randomButton.addEventListener("click", () => {

        const champion =
            favoriteChampions[
                Math.floor(Math.random() * favoriteChampions.length)
            ];

        alert(
            `今日のおすすめ\n\n${champion.name}\n${champion.role}`
        );

    });

}

// --------------------
// スムーズスクロール
// --------------------

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});

// --------------------
// フェードイン
// --------------------

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("fade-in");

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(
    ".dashboard-card, .feature, .champion-card"
).forEach(card => {

    observer.observe(card);

});

// --------------------
// Champion数表示
// --------------------

const championCount = document.getElementById("championCount");

if (championCount) {

    championCount.textContent = "170+";

}

// --------------------
// ダークモード準備
// （今後実装）
// --------------------

const settings = {
    theme: "dark"
};

console.log(settings);

// --------------------
// localStorage準備
// --------------------

if (!localStorage.getItem("lol-learning")) {

    localStorage.setItem(
        "lol-learning",
        JSON.stringify({
            favorites: [],
            progress: {},
            notes: {}
        })
    );

}

// --------------------
// Welcome
// --------------------

console.log("Welcome to LoL Learning Hub");
