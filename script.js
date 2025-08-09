const visited = JSON.parse(localStorage.getItem("visitedCountries") || "[]");

// Liste aller Länder, die du in der SVG erwartest
const countries = [
  { code: "DE", name: "Deutschland" },
  { code: "FR", name: "Frankreich" },
  { code: "IT", name: "Italien" },
  { code: "US", name: "USA" },
  { code: "BR", name: "Brasilien" },
  { code: "JP", name: "Japan" },
  { code: "EG", name: "Ägypten" },
  { code: "ZA", name: "Südafrika" }
  // ... erweitere hier
];

const countriesList = allIds.map(code => ({ code, name: code }));
console.log(JSON.stringify(countriesList, null, 2));


// SVG laden
fetch("world_map.svg")
  .then(res => res.text())
  .then(svgText => {
    document.getElementById("map-container").innerHTML = svgText;
    initMap();
    initList();
  });

function initMap() {
  countries.forEach(({ code }) => {
    const el = document.getElementById(code);
    if (!el) return;

    el.style.fill = visited.includes(code) ? "green" : "black";
    el.addEventListener("click", () => {
      toggleCountry(code);
      updateDisplay(code);
    });
  });
}

function initList() {
  const list = document.getElementById("country-list");
  list.innerHTML = "";

  countries.forEach(({ code, name }) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = visited.includes(code);
    checkbox.addEventListener("change", () => {
      toggleCountry(code);
      updateDisplay(code);
    });

    label.appendChild(checkbox);
    label.append(" " + name);
    list.appendChild(label);
    list.appendChild(document.createElement("br"));
  });
}

function toggleCountry(code) {
  const index = visited.indexOf(code);
  if (index > -1) {
    visited.splice(index, 1);
  } else {
    visited.push(code);
  }
  localStorage.setItem("visitedCountries", JSON.stringify(visited));
}

function updateDisplay(code) {
  const el = document.getElementById(code);
  if (el) {
    el.style.fill = visited.includes(code) ? "green" : "black";
  }
  initList(); // Liste neu zeichnen
}
