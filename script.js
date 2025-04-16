const searchInput = document.getElementById('search');
const portionInput = document.getElementById('portion');
const resultsBody = document.querySelector('#results tbody');
let data = [];

fetch('Taco.json')
    .then(response => response.json())
    .then(json => {
        data = json;
        displayResults(data); // Exibe todos os alimentos inicialmente
    });

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().split(' ');
    const filtered = data.filter(item => {
        const name = item["Descrição do Alimento"].toLowerCase();
        return query.every(word => name.includes(word));
    });
    displayResults(filtered);
});

portionInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().split(' ');
    const filtered = data.filter(item => {
        const name = item["Descrição do Alimento"].toLowerCase();
        return query.every(word => name.includes(word));
    });
    displayResults(filtered);
});

function displayResults(items) {
    resultsBody.innerHTML = '';
    const portion = parseFloat(portionInput.value) || 100;

    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${item["Descrição do Alimento"]}</td>
      <td>${format(item["Energia(kcal)"] * (portion / 100))}</td>
      <td>${format(item["Proteína(g)"] * (portion / 100))}</td>
      <td>${format(item["Carboidrato(g)"] * (portion / 100))}</td>
      <td>${format(item["Lipídeos(g)"] * (portion / 100))}</td>
      <td>${format(item["Fibra Alimentar(g)"] * (portion / 100))}</td>
    `;
        resultsBody.appendChild(row);
    });
}

function format(value) {
    const num = parseFloat(value);
    if (isNaN(num)) return value === "Tr" || value === "NA" ? value : '—';
    return num.toFixed(2);
}
