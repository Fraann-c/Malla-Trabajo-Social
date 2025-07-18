const malla = {
  "1° Semestre": [
    { id: "r1", nombre: "Fundamentos Psicosociales para la Intervención" },
    { id: "r2", nombre: "Fundamentos Epistemológicos", prerequisitos: ["r3"] },
    { id: "r3", nombre: "Fundamentos Sociológicos" },
    { id: "r4", nombre: "Fundamentos Sociojurídicos", prerequisitos: ["r5"] },
    { id: "r5", nombre: "Derechos Humanos y Trabajo Social" },
    { id: "r6", nombre: "Fundamentos Económicos" },
    { id: "r7", nombre: "Fundamentos del Trabajo Social", prerequisitos: ["r8"] },
    { id: "r8", nombre: "Trabajo Social e Intervención Social" },
    { id: "r9", nombre: "Electivo de Comunicación" }
  ]
};

const aprobados = JSON.parse(localStorage.getItem("aprobados") || "[]");

function render() {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  Object.entries(malla).forEach(([semestre, ramos]) => {
    const box = document.createElement("div");
    box.className = "semestre";
    const titulo = document.createElement("div");
    titulo.className = "titulo-semestre";
    titulo.textContent = semestre;
    box.appendChild(titulo);

    ramos.forEach(ramo => {
      const el = document.createElement("div");
      el.className = "ramo";
      el.textContent = ramo.nombre;
      el.dataset.id = ramo.id;

      const cumplidos = !ramo.prerequisitos || ramo.prerequisitos.every(id => aprobados.includes(id));
      const estaAprobado = aprobados.includes(ramo.id);

      if (estaAprobado) el.classList.add("aprobado");
      else if (!cumplidos) el.classList.add("bloqueado");

      el.addEventListener("click", () => {
        if (!el.classList.contains("bloqueado")) {
          if (aprobados.includes(ramo.id)) {
            const i = aprobados.indexOf(ramo.id);
            aprobados.splice(i, 1);
          } else {
            aprobados.push(ramo.id);
          }
          localStorage.setItem("aprobados", JSON.stringify(aprobados));
          render();
        }
      });

      box.appendChild(el);
    });

    contenedor.appendChild(box);
  });
}

render();

