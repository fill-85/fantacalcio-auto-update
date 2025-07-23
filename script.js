async function caricaDati() {
  const response = await fetch('rose.json');
  const data = await response.json();
  const select = document.getElementById('squadraSelect');
  const container = document.getElementById('giocatoriContainer');

  data.squadre.forEach(sq => {
    const opt = document.createElement('option');
    opt.value = sq.nome;
    opt.textContent = sq.nome;
    select.appendChild(opt);
  });

  select.addEventListener('change', () => {
    const squadra = data.squadre.find(s => s.nome === select.value);
    if (squadra) {
      let html = `<table><tr>
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
    } else {
      container.innerHTML = '';
    }
  });
}

caricaDati();
