
async function loadTeams() {
    const response = await fetch('rose.json');
    const data = await response.json();

    const teamList = document.getElementById('teamList');
    teamList.innerHTML = '';

    data.squadre.forEach(squadra => {
        const div = document.createElement('div');
        div.className = 'team';
        div.innerHTML = `<h2>${squadra.nome}</h2><ul>${squadra.giocatori.map(g => `<li>${g.nome} (${g.ruolo})</li>`).join('')}</ul>`;
        teamList.appendChild(div);
    });
}
