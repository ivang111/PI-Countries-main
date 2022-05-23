function agregarDieta(e) {
  let dieta = e.target.value.trim();
  if (!dietasSelect.includes(dieta)) {
    let toDivDiet = document.createElement("span");
    toDivDiet.className = "toDivDiet";
    toDivDiet.id = dieta;
    toDivDiet.textContent = dieta;
    let toButtonX = document.createElement("button");
    toButtonX.textContent = "X";
    toButtonX.className = "toDivX";
    toButtonX.id = `X${dieta}`;
    toButtonX.addEventListener(
      "click",
      function () {
        quitarDiet(this.id.trim());
      },
      false
    );
    toDivDiet.appendChild(toButtonX);
    let toDivGral = document.getElementById("divContenedor");
    toDivGral.appendChild(toDivDiet);
    dietasSelect.push(dieta);
  }
}

function quitarDiet(id) {
  let posicion = dietasSelect.indexOf(id.slice(1));
  if (posicion !== -1) {
    dietasSelect.splice(posicion, 1);
  }
  let top = document.getElementById("divContenedor");
  let nested = document.getElementById(id.slice(1));
  let removido = top.removeChild(nested);
  console.log(removido);
}