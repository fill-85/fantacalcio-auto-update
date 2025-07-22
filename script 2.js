
async function loadTeams() {
    const response = await fetch('rose.json');
    const data = await response.json();

    const squadre = data.squadre;
    const selector = document.getElementById('teamSelector');
    const teamList = document.getElementById('teamList');

    // Pulisce selettore e contenuti
    selector.innerHTML = '';
    teamList.innerHTML = '';

    // Aggiunge opzioni al selettore
    squadre.forEach((squadra, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = squadra.nome;
        selector.appendChild(option);
    });

    // Mostra la prima squadra come default
    showTeam(0, squadre);
    selector.onchange = () => showTeam(selector.value, squadre);
}

function showTeam(index, squadre) {
    const squadra = squadre[index];
    const teamList = document.getElementById('teamList');

    teamList.innerHTML = `
        <h2>${squadra.nome}</h2>
        <ul>
            ${squadra.giocatori.map(g => `<li>${g.nome} - ${g.ruolo}</li>`).join('')}
        </ul>
    `;
}

window.onload = loadTeams;
