let data = null;

async function caricaDati() {
  const response = await fetch('rose.json');
  data = await response.json();
  const select = document.getElementById('squadraSelect');
  const container = document.getElementById('giocatoriContainer');

  data.squadre.forEach(sq => {
    const opt = document.createElement('option');
    opt.value = sq.nome;
    opt.textContent = sq.nome;
    select.appendChild(opt);
  });

  select.addEventListener('change', () => {
    mostraGiocatori(data.squadre.find(s => s.nome === select.value));
  });

  document.getElementById('aggiornaBtn').addEventListener('click', () => {
    alert("🔄 Funzione aggiorna rose in arrivo!");
  });

  document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const risultati = [];

    data.squadre.forEach(s => {
      s.giocatori.forEach(g => {
        if (g.nome.toLowerCase().includes(query)) {
          risultati.push({ ...g, squadra: s.nome });
        }
      });
    });

    mostraRicerca(risultati);
  });
}

function mostraGiocatori(squadra) {
  const container = document.getElementById('giocatoriContainer');
  if (!squadra) return container.innerHTML = '';

  let html = `<h2>${squadra.nome}</h2><table><tr>
    <th>Nome</th><th>Ruolo</th><th>Età</th><th>Valore</th>
    <th>Form. Probabile</th><th>Rigorista</th><th>Punizioni</th>
    <th>Imbattibilità</th><th>Rigori Parati</th>
  </tr>`;

  squadra.giocatori.forEach(g => {
    html += `<tr>
      <td>${g.nome}</td>
      <td>${g.ruolo}</td>
      <td>${g.eta ?? '-'}</td>
      <td>${g.valore ?? '-'}</td>
      <td>${g.formazione_probabile ? '✅' : '❌'}</td>
      <td>${g.rigorista ? '✅' : '—'}</td>
      <td>${g.punizioni ? '✅' : '—'}</td>
      <td>${g.ruolo === 'Portiere' ? (g.imbattibilita ?? '-') : '—'}</td>
      <td>${g.ruolo === 'Portiere' ? (g.rigori_parati ?? '-') : '—'}</td>
    </tr>`;
  });

  html += '</table>';
  container.innerHTML = html;
}

function mostraRicerca(risultati) {
  const container = document.getElementById('giocatoriContainer');
  if (!risultati.length) return container.innerHTML = '<p>Nessun giocatore trovato.</p>';

  let html = `<h2>Risultati ricerca</h2><table><tr>
    <th>Nome</th><th>Ruolo</th><th>Età</th><th>Valore</th>
    <th>Squadra</th><th>Form. Probabile</th><th>Rigorista</th><th>Punizioni</th>
    <th>Imbattibilità</th><th>Rigori Parati</th>
  </tr>`;

  risultati.forEach(g => {
    html += `<tr>
      <td>${g.nome}</td>
      <td>${g.ruolo}</td>
      <td>${g.eta ?? '-'}</td>
      <td>${g.valore ?? '-'}</td>
      <td>${g.squadra}</td>
      <td>${g.formazione_probabile ? '✅' : '❌'}</td>
      <td>${g.rigorista ? '✅' : '—'}</td>
      <td>${g.punizioni ? '✅' : '—'}</td>
      <td>${g.ruolo === 'Portiere' ? (g.imbattibilita ?? '-') : '—'}</td>
      <td>${g.ruolo === 'Portiere' ? (g.rigori_parati ?? '-') : '—'}</td>
    </tr>`;
  });

  html += '</table>';
  container.innerHTML = html;
}

caricaDati();
