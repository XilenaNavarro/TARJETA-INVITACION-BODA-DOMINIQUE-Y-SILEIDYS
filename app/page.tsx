"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const weddingDate = new Date("2026-09-27T19:00:00");
const ceremonyStart = "20260927T180000";
const ceremonyEnd = "20260927T200000";
const partyStart = "20260927T200000";
const partyEnd = "20260928T010000";
const ceremonyTitle = "Boda de Dominique y Sileidys (Consejos Matrimoniales)";
const partyTitle = "Boda de Dominique y Sileidys (Recepción)";
const ceremonyAddress = "Cl. 30 # 18-85, Brr. 1 de Mayo, Santa Marta, Magdalena";
const ceremonyLocation = ceremonyAddress;
const ceremonyDescription = "Consejos matrimoniales de Dominique y Sileidys";
const mapsQuery = encodeURIComponent(ceremonyAddress);
const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
const mapsOpenUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const spotifySongUrl =
  "https://open.spotify.com/intl-es/track/4UVKdTjE4WobaXwvjapVGn?si=jaPUkZQzT9i-_vh_NZBWeW&utm_source=whatsapp&nd=1&dlsi=4abc65e6672d4172";

const calendarLinks = {
  apple: `/dominique-sileidys-ceremonia.ics`,
  google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    ceremonyTitle,
  )}&dates=${ceremonyStart}/${ceremonyEnd}&details=${encodeURIComponent(
    ceremonyDescription,
  )}&location=${encodeURIComponent(ceremonyLocation)}`,
  outlook: `/dominique-sileidys-ceremonia.ics`,
};

function Countdown() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const parts = useMemo(() => {
    const current = now ?? weddingDate;
    const distance = Math.max(weddingDate.getTime() - current.getTime(), 0);
    return [
      ["días", Math.floor(distance / 86400000)],
      ["hs", Math.floor((distance / 3600000) % 24)],
      ["min", Math.floor((distance / 60000) % 60)],
      ["seg", Math.floor((distance / 1000) % 60)],
    ];
  }, [now]);

  return (
    <section className="cuenta-regresiva">
      <div className="franja-verde" />
      <img className="hojas-contador-izq" src="/hojas-contador-izq.svg" alt="" />
      <div className="decor-conteo">
        <img className="marco-contador" src="/marco-contador.svg" alt="" />
        <div className="box-aros">
          <div className="box-circulo">
            <span className="falta">Falta</span>
            <div className="reloj">
              {parts.map(([label, value], index) => (
                <div className={index === parts.length - 1 ? "reloj-col no-border" : "reloj-col"} key={label}>
                  <span className="number">{String(value).padStart(2, "0")}</span>
                  <span className="time">{label}</span>
                </div>
              ))}
            </div>
            <img className="corazon-falta" src="/dia-de-san-valentin-paleta.gif" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className={title ? "modal" : "modal modal-musica"}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar">
          x
        </button>
        {title ? <h3>{title}</h3> : null}
        {children}
      </div>
    </div>
  );
}

function CalendarMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="calendar-menu">
      <button className="boton" type="button" onClick={() => setOpen((value) => !value)}>
        Agendar
      </button>
      {open ? (
        <div className="calendar-options">
          <a href={calendarLinks.apple} download="dominique-sileidys-ceremonia.ics">
            <span className="cal-icon apple">
              <img src="/apple-calendar.png" alt="" />
            </span>
            <b>Apple Calendar</b>
          </a>
          <a href={calendarLinks.google} target="_blank">
            <span className="cal-icon google">G</span>
            <b>
              Google <em>(online)</em>
            </b>
          </a>
          <a href={calendarLinks.outlook}>
            <span className="cal-icon outlook">O</span>
            <b>Outlook</b>
          </a>
          <small>ADDEVENT.COM</small>
        </div>
      ) : null}
    </div>
  );
}

function RingsIcon() {
  return <img className="animated-icon soft-gif-icon" src="/libro-abierto-paleta.gif" alt="" />;
}

function PartyIcon() {
  return (
    <div className="animated-icon party-icon" aria-hidden="true">
      <svg viewBox="0 0 128 128">
        <path className="party-cone" d="M16 112 L50 42 C57 62 73 78 95 88 Z" />
        <path className="party-cone-shadow" d="M50 42 C57 62 73 78 95 88 L76 96 C61 86 47 69 40 52 Z" />
        <path className="party-highlight" d="M22 103 L45 55 C50 67 58 78 69 86 Z" />
        <path className="party-ribbon" d="M72 28 C93 15 87 6 69 9 C54 12 55 25 73 24 C90 23 95 39 76 44" />
        <path className="party-streamer" d="M81 64 C94 54 109 51 121 52" />
        <circle className="dot dot-a" cx="24" cy="64" r="6" />
        <circle className="dot dot-b" cx="98" cy="18" r="7" />
        <circle className="dot dot-c" cx="103" cy="54" r="6" />
        <circle className="dot dot-d" cx="82" cy="102" r="6" />
        <path className="curl curl-a" d="M19 11 C33 2 41 16 29 30 C23 38 21 49 28 55" />
        <path className="curl curl-b" d="M108 76 C121 73 124 86 111 92 C104 95 101 102 111 106" />
      </svg>
    </div>
  );
}

function ReceptionIcon() {
  return <img className="animated-icon reception-icon" src="/fiesta-paleta.gif" alt="" />;
}

export default function Home() {
  const [modal, setModal] = useState<"rsvp" | "map" | "song" | "dress" | "tips" | "gifts" | null>(null);
  const [musicPrompt, setMusicPrompt] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const instagramRef = useRef<HTMLElement | null>(null);
  const instagramCollageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateInstagramParallax = () => {
      const section = instagramRef.current;
      const collage = instagramCollageRef.current;
      if (!section || !collage) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clampedProgress = Math.min(1, Math.max(0, progress));
      const movement = (0.5 - clampedProgress) * 260;

      collage.style.setProperty("--instagram-parallax", `${movement}px`);
    };

    updateInstagramParallax();
    window.addEventListener("scroll", updateInstagramParallax, { passive: true });
    window.addEventListener("resize", updateInstagramParallax);

    return () => {
      window.removeEventListener("scroll", updateInstagramParallax);
      window.removeEventListener("resize", updateInstagramParallax);
    };
  }, []);

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      window.open(spotifySongUrl, "_blank", "noopener,noreferrer");
      setIsPlaying(false);
    }
  };

  const enterInvitation = async (withMusic: boolean) => {
    setMusicPrompt(false);
    if (!withMusic) return;
    try {
      await playMusic();
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await playMusic();
      return;
    }
    audio.pause();
    setIsPlaying(false);
  };

  return (
    <main>
      <audio ref={audioRef} src="/cancion.mp3" loop preload="metadata" />

      <section className="portada">
        <div className="portada-flor-izq-sup" />
        <div className="portada-flor-der-inf" />
        <div className="portada-flor-izq-inf" />
        <div className="content-portada">
          <div className="box-nombres-fecha-portada">
            <span className="fecha">27.09.2026</span>
            <h1>
              Dominique
              <br className="mobile-break" />
              <span>&amp;</span>
              <br className="mobile-break" />
              Sileidys
            </h1>
            <div className="line" />
          </div>
          <div className="box-frase-portada">
            <p>
              <img src="/fixdate-comilla-apertura.svg" alt="" />
              <br />
              Una cuerda triple
              <br />
              no se rompe fácilmente
              <small>ECLESIASTES 4:12</small>
              <br />
              <img src="/fixdate-comilla-cierre.svg" alt="" />
            </p>
          </div>
          <a className="flecha-continuar" href="#cuenta" aria-label="Continuar" />
        </div>
      </section>

      <div id="cuenta">
        <Countdown />
      </div>

      <section className="seccion-principal bloque-grupo-invitados">
        <div className="card-grupo-invitados">
          <div className="pases-total">3</div>
          <h3 className="titulo-grupo">INVITADOS</h3>
          <div className="acompanantes-info">(1 acompanante)</div>
          <ul className="lista-invitados">
            <li>Familia invitada</li>
            <li>Persona especial</li>
          </ul>
          <p>Sera un dia inolvidable y queremos vivirlo contigo.</p>
        </div>
      </section>

      <section className="ceremonia-fiesta">
        <div className="ceremonia-fiesta-flor-der" />
        <article className="col-ceremonia">
          <RingsIcon />
          <div className="event-ribbon">
            <h3>Consejos Matrimoniales</h3>
          </div>
          <div className="info-box">
            <h6>Día</h6>
            <p>Domingo 27 de Septiembre - 6:00 pm</p>
            <CalendarMenu />
          </div>
          <div className="info-box">
            <h6>Lugar</h6>
            <p className="direccion-principal">Cl. 30 # 18-85</p>
            <p className="info-direccion">
              Brr. 1 de Mayo
              <br />
              Santa Marta, Magdalena
            </p>
            <button className="boton" type="button" onClick={() => setModal("map")}>
              <img className="boton-icon" src="/destino-paleta.gif" alt="" />
              ¿Cómo llegar?
            </button>
          </div>
        </article>
        <article className="col-fiesta">
          <ReceptionIcon />
          <div className="event-ribbon">
            <h3>Recepción</h3>
          </div>
          <div className="info-box">
            <h6>Día</h6>
            <p>Domingo 27 de Septiembre - 8:00 pm</p>
            <a
              className="boton"
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                partyTitle,
              )}&dates=${partyStart}/${partyEnd}&details=${encodeURIComponent(
                "Celebracion de boda de Dominique y Sileidys",
              )}&location=${encodeURIComponent(ceremonyLocation)}`}
              target="_blank"
            >
              Agendar
            </a>
          </div>
          <div className="info-box">
            <h6>Lugar</h6>
            <p className="direccion-principal">Salón Jardín del Lago</p>
            <p className="info-direccion">
              Cl. 22 # 14-58
              <br />
              Santa Marta, Magdalena
            </p>
            <button className="boton" type="button" onClick={() => setModal("map")}>
              <img className="boton-icon" src="/destino-paleta.gif" alt="" />
              ¿Cómo llegar?
            </button>
          </div>
        </article>
      </section>

      <section className="seccion-principal confirmacion-asistencia">
        <div className="box-confirmacion">
          <h2 className="title">Confirmar Asistencia</h2>
          <p className="subtitle">Es importante que confirmes tu asistencia</p>
          <button className="boton" type="button" onClick={() => setModal("rsvp")}>
            Confirmar asistencia
          </button>
        </div>
      </section>

      <section className="galeria">
        <div className="content-galeria">
          <h2 className="title">Retratos de Nuestro Amor</h2>
          <p className="subtitle">Un minuto, un segundo, un instante que queda en la eternidad</p>
          <img className="section-gif-icon" src="/camara-paleta.gif" alt="" />
        </div>
        <div className="content-fotos">
          <div className="carrusel-fotos">
            {[
              "/foto-carrusel-viaje.webp",
              "/foto-carrusel-pareja-sol.webp",
              "/foto-carrusel-cena.webp",
              "/foto-carrusel-iglesia.webp",
              "/foto-carrusel-playa-atardecer.webp",
              "/foto-carrusel-sendero.webp",
              "/foto-carrusel-viaje.webp",
              "/foto-carrusel-pareja-sol.webp",
              "/foto-carrusel-cena.webp",
              "/foto-carrusel-iglesia.webp",
              "/foto-carrusel-playa-atardecer.webp",
              "/foto-carrusel-sendero.webp",
            ].map((src, item) => (
              <div className={src.includes("foto-carrusel") ? "polaroid polaroid-suave" : "polaroid"} key={`${src}-${item}`}>
                <img src={src} alt="" loading="eager" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fiesta">
        <h2 className="title">Código de Vestimenta</h2>
        <p className="subtitle">Para nosotros es importante que te sientas y te veas espectacular.</p>
        <div className="items-fiesta">
          <article className="item-fiesta dress-fiesta-card">
            <div className="content-item-fiesta">
              <img className="dress-gif-icon" src="/vestido-paleta.gif" alt="" />
              <h3>Ellas</h3>
              <p className="dress-code-main">Vestido formal</p>
            </div>
          </article>
          <article className="item-fiesta dress-fiesta-card">
            <div className="content-item-fiesta">
              <img className="dress-gif-icon" src="/corbata-paleta.gif" alt="" />
              <h3>Ellos</h3>
              <p className="dress-code-main">Traje formal</p>
            </div>
          </article>
        </div>
      </section>

      <section className="regalos">
        <div className="regalos-flor-der" />
        <h2 className="title">Regalos</h2>
        <p className="subtitle">Si deseas regalarnos algo mas que tu hermosa presencia...</p>
        <img className="gift-price-icon" src="/precio-paleta.gif" alt="" />
      </section>

      <section className="instagram" ref={instagramRef}>
        <div className="instagram-flower-collage" ref={instagramCollageRef} aria-hidden="true">
          {[
            "/flor-collage-azul.png",
            "/flor-collage-roja.png",
            "/flor-collage-rosa.png",
            "/flor-collage-blanca.png",
            "/flor-collage-tulipan.png",
            "/flor-collage-campanilla.png",
            "/flor-collage-arbol.png",
            "/flor-collage-narciso.png",
          ].map((src) => (
            <img src={src} alt="" key={src} />
          ))}
        </div>
        <h2 className="title">Compartimos este dia junto a vos</h2>
        <p className="subtitle">Comparte tus fotos y videos de ese hermoso dia</p>
        <a className="hashtag" href="https://www.instagram.com/" target="_blank">
          #dominiqueysileidys
        </a>
        <a className="boton" href="https://www.instagram.com/" target="_blank">
          Ver en Instagram
        </a>
      </section>

      <section className="footer-invitacion">
        <h4>
          Dominique <span>&amp;</span> Sileidys
        </h4>
        <ul>
          <li>
            <button type="button" onClick={() => setModal("rsvp")}>
              Confirmar asistencia
            </button>
          </li>
          <li>Agendar Recepción</li>
          <li>Agendar Consejos Matrimoniales</li>
        </ul>
      </section>

      <button
        className={isPlaying ? "controlador-musica is-playing" : "controlador-musica"}
        type="button"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        onClick={toggleMusic}
      >
        <span className="music-wave music-wave-one" aria-hidden="true" />
        <span className="music-wave music-wave-two" aria-hidden="true" />
        <span className="music-note" aria-hidden="true">♪</span>
      </button>

      {musicPrompt ? (
        <Modal title="" onClose={() => enterInvitation(false)}>
          <div className="music-modal">
            <p>
              Bienvenidos a la invitación de
              <br />
              <strong>Dominique y Sileidys</strong>
            </p>
            <span>La música de fondo es parte de la experiencia</span>
            <div className="music-actions">
              <button className="boton" type="button" onClick={() => enterInvitation(true)}>
                Ingresar con música
              </button>
              <button className="boton boton-secundario" type="button" onClick={() => enterInvitation(false)}>
                Ingresar sin música
              </button>
            </div>
          </div>
        </Modal>
      ) : null}

      {modal === "rsvp" ? (
        <Modal title="Confirma tu asistencia" onClose={() => setModal(null)}>
          <form className="form">
            <label>
              Nombre completo
              <input placeholder="Ej: Familia Perez o Juan Lopez" />
            </label>
            <label>
              ¿Podrás asistir?
              <select defaultValue="si">
                <option value="si">Si, claro</option>
                <option value="no">No puedo</option>
              </select>
            </label>
            <label>
              Número de personas
              <select defaultValue="1">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <option key={item}>
                    {item} Persona{item > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Mensaje
              <textarea placeholder="Restricciones alimenticias o mensaje para los novios" />
            </label>
            <button className="boton" type="button" onClick={() => setModal(null)}>
              Enviar confirmación
            </button>
          </form>
        </Modal>
      ) : null}

      {modal === "map" ? (
        <Modal title="Cómo llegar a Consejos Matrimoniales" onClose={() => setModal(null)}>
          <div className="map-modal-content">
            <iframe
              title="Mapa de consejos matrimoniales"
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className="boton ampliar-mapa" href={mapsOpenUrl} target="_blank">
              Ampliar mapa
            </a>
          </div>
        </Modal>
      ) : null}

      {modal === "song" ? (
        <Modal title="Sugerir Canción" onClose={() => setModal(null)}>
          <form className="form">
            <label>
              Tu nombre
              <input placeholder="Ej: Maria Lopez" />
            </label>
            <label>
              Nombre de canción y autor
              <input placeholder="Ej: Perfect - Ed Sheeran" />
            </label>
            <label>
              Link opcional
              <input placeholder="YouTube, Spotify, etc." />
            </label>
            <button className="boton" type="button" onClick={() => setModal(null)}>
              Sugerir canción
            </button>
          </form>
        </Modal>
      ) : null}

      {modal === "dress" ? (
        <Modal title="Código de Vestimenta" onClose={() => setModal(null)}>
          <div className="dress-modal-content">
            <div className="dress-modal-icon" aria-hidden="true">
              <img src="/corbata-paleta.gif" alt="" />
            </div>
            <p className="modal-text">
            Te esperamos con vestuario elegante. Sugerimos tonos suaves, verdes, dorados o neutros para acompanar el
            estilo de la celebración.
            </p>
          </div>
        </Modal>
      ) : null}

      {modal === "tips" ? (
        <Modal title="Tips y Notas" onClose={() => setModal(null)}>
          <p className="modal-text">
            Llega con tiempo, confirma tu asistencia y guarda la ubicación. Lo más importante: ven preparado para
            celebrar con nosotros.
          </p>
        </Modal>
      ) : null}

      {modal === "gifts" ? (
        <Modal title="Regalos" onClose={() => setModal(null)}>
          <p className="modal-text">
            Tu presencia es nuestro mayor regalo. Si deseas tener un detalle adicional, puedes coordinarlo directamente
            con los novios.
          </p>
        </Modal>
      ) : null}
    </main>
  );
}
