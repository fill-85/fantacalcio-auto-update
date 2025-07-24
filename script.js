let roseData = {};
fetch("rose.json")
  .then((res) => res.json())
  .then((data) => {
    roseData = data;
    const select = document.getElementById("squadraSelect");
    data.squadre.forEach((s) => {
      const option = document.createElement("option");
      option.value = s.nome;
      option.textContent = s.nome;
      select.appendChild(option);
    });
  });

document.getElementById("squadraSelect").addEventListener("change", function () {
  const squadra = roseData.squadre.find((s) => s.nome === this.value);
  mostraRosa(squadra.giocatori);
});

document.getElementById("searchInput").addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();
  for (const squadra of roseData.squadre) {
    const trovati = squadra.giocatori.filter((g) =>
      g.nome.toLowerCase().includes(searchValue)
    );
    if (trovati.length > 0) {
      mostraRosa(trovati);
      break;
    }
  }
});

function mostraRosa(giocatori) {
  const output = document.getElementById("output");
  if (!giocatori) {
    output.innerHTML = "";
    return;
  }
  const rows = giocatori.map((g) => {
    const extra = g.ruolo === "Portiere" ? `
      <td>${g.imbattibilita || 0}</td>
      <td>${g.rigori_parati || 0}</td>` : `<td></td><td></td>`;
    return `<tr>
      <td>${g.nome}</td>
      <td>${g.ruolo}</td>
      <td>${g.eta}</td>
      <td>${g.valore}</td>
      <td>${g.formazione_probabile ? "✔️" : ""}</td>
      <td>${g.rigorista ? "✔️" : ""}</td>
      <td>${g.punizioni ? "✔️" : ""}</td>
      ${extra}
    </tr>`;
  }).join("");

  output.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nome</th><th>Ruolo</th><th>Età</th><th>Valore</th>
          <th>In Formazione</th><th>Rigorista</th><th>Punizioni</th>
          <th>Imbattibilità</th><th>Rigori Parati</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function aggiornaRose() {
  alert("Aggiornamento rose in arrivo... 😉");
}
