
// =====================================
// JOHANNA'S UNIVERSE
// =====================================

// PORTADA

const portada = document.getElementById("portada");
const contenido = document.getElementById("contenido");

document.getElementById("entrarRegalo")
  .addEventListener("click", () => {
    portada.classList.add("oculto");
    contenido.classList.remove("oculto");
    window.scrollTo(0, 0);
  });

// NAVEGACIÓN

function irA(seccion) {
  document.getElementById(seccion).scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

document.querySelectorAll("[data-ir]").forEach(boton => {
  boton.addEventListener("click", () => {
    irA(boton.dataset.ir);
  });
});

// =====================================
// MUNDOS INTERACTIVOS
// =====================================

const portal = document.getElementById("portal");
const tituloPortal = document.getElementById("tituloPortal");
const textoPortal = document.getElementById("textoPortal");
const aventuraPortal = document.getElementById("aventuraPortal");

let mundoActual = "";
let descubiertos = [];
let etapaFlor = 0;

const dedicatorias = {
  bob: `Dicen que el océano está lleno de tesoros,
pero yo tuve la suerte de encontrarte a ti.
Tú eres mi tesoro, mi vida. ♡`,

  spider: `Tu superpoder no es salvar ciudades,
es hacer que mis días sean más bonitos
solo por estar.
Eres mi heroína favorita, mi vida. ❤️`,

  kitty: `Johanna, mi deseo favorito eres tú.
Gracias por existir.
Feliz cumpleaños, mi vida. ♡`
};

// ABRIR LOS MUNDOS

document.querySelectorAll("[data-mundo]").forEach(boton => {
  boton.addEventListener("click", () => {
    mundoActual = boton.dataset.mundo;
    descubiertos = [];
    etapaFlor = 0;

    portal.classList.remove(
      "portal-bob",
      "portal-spider",
      "portal-kitty"
    );

    portal.classList.add("portal-" + mundoActual);
    portal.classList.add("activo");

    if (mundoActual === "bob") iniciarBob();
    if (mundoActual === "spider") iniciarSpider();
    if (mundoActual === "kitty") iniciarKitty();

    portal.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
});

// =====================================
// BOB ESPONJA: BÚSQUEDA DEL TESORO
// =====================================

const pistasBob = [
  "Pista 1: Este tesoro no aparece en ningún mapa.",
  "Pista 2: No está hecho de oro ni de diamantes.",
  "Pista 3: Tiene una sonrisa que hace más bonitos mis días."
];

function iniciarBob() {
  tituloPortal.textContent = "🫧 El tesoro de Fondo de Bikini";

  textoPortal.textContent =
    "Hay un tesoro escondido bajo el mar. Descubre las tres pistas para encontrarlo.";

  mostrarBurbujas();
}

function mostrarBurbujas() {
  aventuraPortal.innerHTML = `
    <div class="escenario-aventura">

      <div class="progreso-aventura">
        Pistas encontradas: ${descubiertos.length} de 3
      </div>

      <div class="objetos-aventura">
        ${[0, 1, 2].map(i => `
          <button
            class="objeto-aventura burbuja-aventura"
            data-pista="${i}"
            ${descubiertos.includes(i) ? "disabled" : ""}
            aria-label="Descubrir pista ${i + 1}">
            ${descubiertos.includes(i) ? "✓" : "🫧"}
          </button>
        `).join("")}
      </div>

      <div id="resultadoAventura"></div>

    </div>
  `;
}

function descubrirPista(numero) {
  if (descubiertos.includes(numero)) return;

  descubiertos.push(numero);
  mostrarBurbujas();

  const resultado = document.getElementById("resultadoAventura");

  if (descubiertos.length === 3) {
    resultado.innerHTML = `
      <div class="mensaje-aventura">
        ¡Encontraste todas las pistas! ✨
        <p>El tesoro está esperando por ti.</p>
      </div>

      <div class="cofre-aventura">🎁</div>

      <button class="boton-aventura" data-abrir-cofre>
        Abrir el cofre del tesoro ♡
      </button>
    `;
  } else {
    resultado.className = "mensaje-aventura";
    resultado.textContent = pistasBob[numero];
  }
}

function abrirCofre() {
  aventuraPortal.innerHTML = `
    <div class="escenario-aventura">

      <div class="cofre-aventura">💝</div>

      <h3>¡Encontraste el verdadero tesoro!</h3>

      <div class="mensaje-aventura">
        ${dedicatorias.bob}
      </div>

      <button class="boton-aventura" data-reiniciar>
        Buscar el tesoro otra vez ♡
      </button>

    </div>
  `;
}

// =====================================
// SPIDER-MAN: LA CARTA ATRAPADA
// =====================================

function iniciarSpider() {
  tituloPortal.textContent = "🕷️ Una misión para Johanna";

  textoPortal.textContent =
    "Una carta especial ha quedado atrapada en una telaraña. Retira las tres telarañas para descubrir su mensaje.";

  mostrarTelarañas();
}

function mostrarTelarañas() {
  const restantes = 3 - descubiertos.length;

  aventuraPortal.innerHTML = `
    <div class="escenario-aventura">

      <div class="progreso-aventura">
        Telarañas retiradas: ${descubiertos.length} de 3
      </div>

      <div class="carta-secreta">
        💌

        <div class="telarañas-encima
          ${restantes === 0 ? "liberada" : ""}">
          ${"🕸️".repeat(restantes)}
        </div>
      </div>

      <div class="objetos-aventura">
        ${[0, 1, 2].map(i => `
          <button
            class="objeto-aventura telaraña-aventura"
            data-telarana="${i}"
            ${descubiertos.includes(i) ? "disabled" : ""}
            aria-label="Retirar telaraña ${i + 1}">
            ${descubiertos.includes(i) ? "✨" : "🕸️"}
          </button>
        `).join("")}
      </div>

      <div id="resultadoAventura"></div>

    </div>
  `;
}

function quitarTelaraña(numero) {
  if (descubiertos.includes(numero)) return;

  descubiertos.push(numero);
  mostrarTelarañas();

  const resultado = document.getElementById("resultadoAventura");

  if (descubiertos.length === 3) {
    resultado.innerHTML = `
      <div class="mensaje-aventura">
        ¡Misión completada! ❤️
        <p>Has liberado la carta secreta.</p>
      </div>

      <button class="boton-aventura" data-abrir-carta>
        💌 Leer la carta secreta
      </button>
    `;
  } else {
    resultado.className = "mensaje-aventura";
    resultado.textContent =
      "¡Bien hecho! La carta está un poquito más libre.";
  }
}

function abrirCartaSecreta() {
  aventuraPortal.innerHTML = `
    <div class="escenario-aventura">

      <div class="flor-aventura">💌</div>

      <h3>Para mi heroína favorita ♡</h3>

      <div class="mensaje-aventura">
        ${dedicatorias.spider}
      </div>

      <button class="boton-aventura" data-reiniciar>
        Repetir la misión 🕸️
      </button>

    </div>
  `;
}

// =====================================
// HELLO KITTY: LA FLOR MÁGICA
// =====================================

const etapasFlor = [
  {
    icono: "🌰",
    texto: "Una pequeña semilla espera un poquito de cariño.",
    boton: "💧 Regar la semilla"
  },
  {
    icono: "🌱",
    texto: "¡Mira! Tu semilla ha comenzado a crecer.",
    boton: "☀️ Darle un poquito de sol"
  },
  {
    icono: "🌿",
    texto: "Ya casi está lista. Solo necesita un poquito más de amor.",
    boton: "💗 Darle mucho cariño"
  },
  {
    icono: "🌸",
    texto: "¡Tu flor mágica ha florecido!",
    boton: "💌 Descubrir su mensaje"
  }
];

function iniciarKitty() {
  tituloPortal.textContent = "🎀 El jardín secreto de Johanna";

  textoPortal.textContent =
    "En este jardín hay una flor muy especial. Ayúdala a crecer y descubre el mensaje que guarda para ti.";

  mostrarFlor();
}

function mostrarFlor() {
  const etapa = etapasFlor[etapaFlor];

  aventuraPortal.innerHTML = `
    <div class="escenario-aventura jardin-aventura">

      <div class="progreso-aventura">
        El jardín mágico de Johanna ♡
      </div>

      <div class="flor-aventura">
        ${etapa.icono}
      </div>

      <div class="mensaje-aventura">
        ${etapa.texto}
      </div>

      <button class="boton-aventura" data-cuidar-flor>
        ${etapa.boton}
      </button>

    </div>
  `;
}

function cuidarFlor() {
  if (etapaFlor < 3) {
    etapaFlor++;
    mostrarFlor();
  } else {
    aventuraPortal.innerHTML = `
      <div class="escenario-aventura jardin-aventura">

        <div class="flor-aventura">🌸💗🌸</div>

        <h3>Una flor hecha especialmente para ti</h3>

        <div class="mensaje-aventura">
          ${dedicatorias.kitty}
        </div>

        <button class="boton-aventura" data-reiniciar>
          Cultivar otra flor ♡
        </button>

      </div>
    `;
  }
}

// =====================================
// BOTONES DE LAS AVENTURAS
// =====================================

aventuraPortal.addEventListener("click", evento => {
  const boton = evento.target.closest("button");

  if (!boton) return;

  if (boton.hasAttribute("data-pista")) {
    descubrirPista(Number(boton.dataset.pista));
  }

  if (boton.hasAttribute("data-telarana")) {
    quitarTelaraña(Number(boton.dataset.telarana));
  }

  if (boton.hasAttribute("data-abrir-cofre")) {
    abrirCofre();
  }

  if (boton.hasAttribute("data-abrir-carta")) {
    abrirCartaSecreta();
  }

  if (boton.hasAttribute("data-cuidar-flor")) {
    cuidarFlor();
  }

  if (boton.hasAttribute("data-reiniciar")) {
    descubiertos = [];
    etapaFlor = 0;

    if (mundoActual === "bob") iniciarBob();
    if (mundoActual === "spider") iniciarSpider();
    if (mundoActual === "kitty") iniciarKitty();
  }
});

// CERRAR PORTAL

document.getElementById("cerrarPortal")
  .addEventListener("click", () => {
    portal.classList.remove(
      "activo",
      "portal-bob",
      "portal-spider",
      "portal-kitty"
    );

    aventuraPortal.innerHTML = "";
    irA("mundos");
  });

// =====================================
// CARTAS PARA JOHANNA
// =====================================

const cartasJohanna = {
  cosita: {
    titulo: "Para mi Cosita ♡",
    mensaje: `Mi Cosita:

Hay algo muy bonito en poder llamarte así,
porque es una forma pequeñita de expresar
todo el cariño que siento por ti.

Me encantan esos detalles que te hacen
ser tú, tus ocurrencias y esas pequeñas
cosas que consiguen alegrarme el día.

Espero que nunca olvides lo especial
que eres para mí.

Con mucho cariño. ♡`
  },

  carino: {
    titulo: "Para mi Cariño ♡",
    mensaje: `Mi Cariño:

Quiero que sepas que valoro muchísimo
cada momento que compartimos.

Los días normales se vuelven especiales
cuando tengo la oportunidad de vivirlos
contigo.

Deseo que este nuevo año de tu vida
esté lleno de momentos felices,
sueños cumplidos y mucha tranquilidad.

Te mereces cosas muy bonitas. ♡`
  },

  vida: {
    titulo: "Para mi vida ♡",
    mensaje: `Mi vida:

Si pudiera regalarte algo más grande
que este universo, sería la certeza
de lo importante que eres para mí.

Quiero seguir compartiendo contigo
risas, conversaciones, aventuras
y muchos recuerdos.

Gracias por ser parte de mi historia.

Feliz cumpleaños, Johanna.
Te quiero muchísimo. ♡`
  }
};

const cartaAbierta = document.getElementById("cartaAbierta");

document.querySelectorAll("[data-carta]").forEach(boton => {
  boton.addEventListener("click", () => {
    const carta = cartasJohanna[boton.dataset.carta];

    document.getElementById("tituloCarta").textContent =
      carta.titulo;

    document.getElementById("contenidoCarta").textContent =
      carta.mensaje;

    cartaAbierta.classList.add("activa");

    cartaAbierta.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
});

document.getElementById("cerrarCarta")
  .addEventListener("click", () => {
    cartaAbierta.classList.remove("activa");
    irA("cartas");
  });

// =====================================
// SORPRESA FINAL
// =====================================

let regaloAbierto = false;

document.getElementById("botonRegalo")
  .addEventListener("click", () => {
    if (regaloAbierto) return;

    regaloAbierto = true;

    document.getElementById("botonRegalo").textContent = "💝";

    document.getElementById("instruccionRegalo").textContent =
      "Esta sorpresa es para ti ♡";

    const mensaje = document.getElementById("mensajeFinal");
    mensaje.classList.add("activo");

    crearConfeti();

    mensaje.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });

// =====================================
// CONFETI
// =====================================

function crearConfeti() {
  if (window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches) {
    return;
  }

  const colores = [
    "#f7b8d6",
    "#a98bea",
    "#8fe5f1",
    "#ffffff",
    "#ffdc88",
    "#ee536c"
  ];

  for (let i = 0; i < 80; i++) {
    const pieza = document.createElement("span");

    pieza.className = "confeti";
    pieza.style.left = Math.random() * 100 + "vw";

    pieza.style.backgroundColor =
      colores[Math.floor(Math.random() * colores.length)];

    pieza.style.animationDuration =
      (3 + Math.random() * 3) + "s";

    pieza.style.animationDelay =
      (Math.random() * 1.5) + "s";

    document.body.appendChild(pieza);

    pieza.addEventListener(
      "animationend",
      () => pieza.remove(),
      { once: true }
    );

    // Limpieza de seguridad
    setTimeout(() => pieza.remove(), 7000);
  }
}