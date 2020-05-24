const PAGE_SIZE = 9;

let dataset;
let offset = 0;

fetch("/pokemon")
    .then(res => res.json())
    .then(res => {
        dataset = res;
        render();
    });

const getCard = data => {
    return `
    <div class="card">
      <div class="card-image">
        <img
          src="${data.img}"
        />
      </div>
      <div class="card-content">
        <span class="id">No. ${data.id}</span>
        <p class="name">${data.name}</p>
      </div>
    </div>
  `;
};

function renderPokemonBox(html) {
    const box = document.getElementById("pokemon-box");
    box.innerHTML = html;
}

function render() {
    const html = dataset
        .slice(offset, offset + PAGE_SIZE)
        .map(obj => getCard(obj)); // 把寶可夢的資料轉成一張一張卡片

    // 初始化
    renderPokemonBox(html);
}

const prevBtn = document.querySelector(".prev-page");
const nextBtn = document.querySelector(".next-page");

prevBtn.addEventListener("click", () => {
    nextBtn.classList.remove("disabled");

    if (prevBtn.classList.contains("disabled")) return;

    offset = offset - PAGE_SIZE;

    if (offset <= 0) {
        prevBtn.classList.add("disabled");
    }

    render();
});

nextBtn.addEventListener("click", () => {
    prevBtn.classList.remove("disabled");

    if (nextBtn.classList.contains("disabled")) return;

    offset += PAGE_SIZE;

    if (offset + PAGE_SIZE >= dataset.length) {
        nextBtn.classList.add("disabled");
    }

    render();
});