const cidade = "Jundiaí";

document.getElementById("cidade-nome").textContent = cidade;

const noticiasContainer = document.getElementById("noticias");
const pesquisaInput = document.getElementById("pesquisa");
const buscarBtn = document.getElementById("buscar-btn");
const atualizarBtn = document.getElementById("atualizar-btn");

let noticiasOriginais = []; // aqui ficam todas as notícias retornadas da API

function renderNoticias(lista) {
  noticiasContainer.innerHTML = "";

  if (!lista || lista.length === 0) {
    noticiasContainer.innerHTML = "<p>Nenhuma notícia encontrada.</p>";
    return;
  }

  lista.forEach((noticia) => {
    const div = document.createElement("div");
    div.classList.add("noticia");

    div.innerHTML = `
      <h2>${noticia.title}</h2>
      ${
        noticia.image
          ? `<img src="${noticia.image}" alt="Imagem da notícia">`
          : ""
      }
      <p>${noticia.description || ""}</p>
      <a href="${noticia.url}" target="_blank">Ler mais</a>
    `;
    noticiasContainer.appendChild(div);
  });
}

function buscarNoticiasNaAPI() {
  const url = `/api?cidade=${encodeURIComponent(cidade)}`;

  noticiasContainer.innerHTML = "<p>Carregando...</p>";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      noticiasOriginais = data.articles || [];
      renderNoticias(noticiasOriginais);
    })
    .catch((error) => {
      console.error("Erro ao buscar notícias:", error);
      noticiasContainer.innerHTML = "<p>Erro ao carregar notícias.</p>";
    });
}

//  Busca entre os retornados
buscarBtn.addEventListener("click", () => {
  const termo = pesquisaInput.value.trim().toLowerCase();
  if (termo === "") {
    renderNoticias(noticiasOriginais);
    return;
  }

  const filtradas = noticiasOriginais.filter(
    (noticia) =>
      noticia.title?.toLowerCase().includes(termo) ||
      noticia.description?.toLowerCase().includes(termo)
  );

  renderNoticias(filtradas);
});

// Atualiza com nova chamada da API
atualizarBtn.addEventListener("click", () => {
  buscarNoticiasNaAPI();
});

// Carrega ao abrir
buscarNoticiasNaAPI();
