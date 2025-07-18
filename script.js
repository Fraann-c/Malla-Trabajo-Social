const malla = {
  "1° Semestre": [
    { id: "r1", nombre: "Fundamentos Psicosociales para la Intervención" },
    { id: "r2", nombre: "Fundamentos Epistemológicos para la Intervención", prerequisitos: ["r10"] },
    { id: "r3", nombre: "Fundamentos Sociojurídicos para la Intervención", prerequisitos: ["r11"] },
    { id: "r4", nombre: "Fundamentos Económicos para la Intervención" },
    { id: "r5", nombre: "Fundamentos del Trabajo Social", prerequisitos: ["r12"] },
    { id: "r6", nombre: "Electivo de Comunicación" }
  ],
  "2° Semestre": [
    { id: "r7", nombre: "Fundamentos Antropológicos para la Intervención" },
    { id: "r10", nombre: "Fundamentos Sociológicos para la Intervención", prerequisitos: ["r16"] },
    { id: "r11", nombre: "Derechos Humanos y Trabajo Social" },
    { id: "r12", nombre: "Trabajo Social e Intervención Social", prerequisitos: ["r13", "r14"] },
    { id: "r13", nombre: "Trabajo Social en Contextos Familiares I", prerequisitos: ["r15"] },
    { id: "r14", nombre: "Trabajo Social con Colectivos I", prerequisitos: ["r17"] },
    { id: "r15", nombre: "Gestión de la Diversidad" },
    { id: "r16", nombre: "Taller Modelos de Análisis para la Investigación/Intervención" },
    { id: "r17", nombre: "Electivo de Comunicación" }
  ],
  "3° Semestre": [
    { id: "r18", nombre: "Trabajo Social en Contextos Familiares II", prerequisitos: ["r13"] },
    { id: "r19", nombre: "Trabajo Social con Colectivos II", prerequisitos: ["r14"] },
    { id: "r20", nombre: "Proyectos Sociales I", prerequisitos: ["r21", "r22"] },
    { id: "r21", nombre: "Proyectos Sociales II" },
    { id: "r22", nombre: "Taller Integrado de Intervención I" },
    { id: "r23", nombre: "Políticas Públicas e Intervención Social", prerequisitos: ["r24"] },
    { id: "r24", nombre: "Trabajo Social y Políticas Públicas" },
    { id: "r25", nombre: "Electivo de Desarrollo del Pensamiento" }
  ],
  "4° Semestre": [
    { id: "r26", nombre: "Investigación Social", prerequisitos: ["r27", "r28"] },
    { id: "r27", nombre: "Investigación Social Cuantitativa" },
    { id: "r28", nombre: "Investigación Social Cualitativa" },
    { id: "r29", nombre: "Trabajo Social en Contextos Familiares II", prerequisitos: ["r22"] },
    { id: "r30", nombre: "Trabajo Social con Colectivos II", prerequisitos: ["r22"] },
    { id: "r31", nombre: "Proyectos Sociales II" },
    { id: "r32", nombre: "Trabajo Social y Políticas Públicas" }
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
