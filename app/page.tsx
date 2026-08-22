"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const weddingDate = new Date("2026-09-27T19:00:00");
const ceremonyStart = "20260927T153000";
const ceremonyEnd = "20260927T173000";
const partyStart = "20260927T190000";
const partyEnd = "20260928T000000";
const ceremonyTitle = "Boda de Dominique y Sileidys (Consejos Matrimoniales)";
const partyTitle = "Boda de Dominique y Sileidys (Recepción)";
const ceremonyVenue = "Salón del Reino de los Testigos de Jehová";
const ceremonyAddress = "Cl. 30 # 18-85, Brr. 1 de Mayo, Santa Marta, Magdalena";
const ceremonyLocation = `${ceremonyVenue}, ${ceremonyAddress}`;
const receptionVenue = "VIA Restaurante";
const receptionAddress = "Av. del Ferrocarril #12-49, Alcazáres, Santa Marta, Magdalena";
const receptionLocation = `${receptionVenue}, ${receptionAddress}`;
const ceremonyDescription = "Consejos matrimoniales de Dominique y Sileidys";
const partyDescription = "Celebración de boda de Dominique y Sileidys";
const ceremonyMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ceremonyLocation)}`;
const receptionMapsUrl = "https://maps.app.goo.gl/NaMDcEtK7Ai2cfM3A";
const receptionMapsQuery = encodeURIComponent(receptionLocation);
const receptionMapsEmbedUrl = `https://www.google.com/maps?q=${receptionMapsQuery}&output=embed`;
const spotifySongUrl =
  "https://open.spotify.com/intl-es/track/4UVKdTjE4WobaXwvjapVGn?si=jaPUkZQzT9i-_vh_NZBWeW&utm_source=whatsapp&nd=1&dlsi=4abc65e6672d4172";
const likedAlbumPhotos = Array.from({ length: 26 }, (_, index) => `/foto-google-favorita-${String(index + 1).padStart(2, "0")}.webp`);

const calendarLinks = {
  ceremony: {
    apple: `/dominique-sileidys-ceremonia.ics`,
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      ceremonyTitle,
    )}&dates=${ceremonyStart}/${ceremonyEnd}&details=${encodeURIComponent(
      ceremonyDescription,
    )}&location=${encodeURIComponent(ceremonyLocation)}`,
    outlook: `/dominique-sileidys-ceremonia.ics`,
  },
  reception: {
    apple: `/dominique-sileidys-recepcion.ics`,
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      partyTitle,
    )}&dates=${partyStart}/${partyEnd}&details=${encodeURIComponent(
      partyDescription,
    )}&location=${encodeURIComponent(receptionLocation)}`,
    outlook: `/dominique-sileidys-recepcion.ics`,
  },
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

function CalendarMenu({
  links = calendarLinks.ceremony,
  downloadName = "dominique-sileidys-ceremonia.ics",
  triggerClassName = "boton",
  menuClassName = "",
  label = "Agendar",
}: {
  links?: typeof calendarLinks.ceremony;
  downloadName?: string;
  triggerClassName?: string;
  menuClassName?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuIdRef = useRef(`calendar-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: MouseEvent | PointerEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (menuRef.current?.contains(target)) return;
      setOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick, true);
    document.addEventListener("touchend", closeOnOutsideClick, true);
    document.addEventListener("click", closeOnOutsideClick, true);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick, true);
      document.removeEventListener("touchend", closeOnOutsideClick, true);
      document.removeEventListener("click", closeOnOutsideClick, true);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  useEffect(() => {
    const closeOtherMenus = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;
      if (event.detail !== menuIdRef.current) setOpen(false);
    };

    window.addEventListener("calendar-menu-open", closeOtherMenus);
    return () => window.removeEventListener("calendar-menu-open", closeOtherMenus);
  }, []);

  const toggleMenu = () => {
    setOpen((value) => {
      const next = !value;
      if (next) {
        window.dispatchEvent(new CustomEvent("calendar-menu-open", { detail: menuIdRef.current }));
      }
      return next;
    });
  };

  return (
    <div className="calendar-menu" ref={menuRef}>
      <button className={triggerClassName} type="button" onClick={toggleMenu}>
        {label}
      </button>
      {open ? (
        <div className={menuClassName ? `calendar-options ${menuClassName}` : "calendar-options"}>
          <a href={links.apple} download={downloadName}>
            <span className="cal-icon apple">
              <img src="/apple-calendar.png" alt="" />
            </span>
            <b>Apple Calendar</b>
          </a>
          <a href={links.google} target="_blank" rel="noopener noreferrer">
            <span className="cal-icon google">G</span>
            <b>
              Google <em>(online)</em>
            </b>
          </a>
          <a href={links.outlook}>
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

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 780px)");
    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      const sections = [
        document.querySelector<HTMLElement>(".portada"),
        document.querySelector<HTMLElement>(".instagram"),
      ];

      sections.forEach((section) => {
        if (!section) return;
        if (!mobile.matches || reduceMotion.matches) {
          section.style.removeProperty("--mobile-parallax-y");
          return;
        }

        const rect = section.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        const offset = Math.max(-34, Math.min(34, progress * -42));
        section.style.setProperty("--mobile-parallax-y", `${offset.toFixed(1)}px`);
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    mobile.addEventListener("change", requestUpdate);
    reduceMotion.addEventListener("change", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      mobile.removeEventListener("change", requestUpdate);
      reduceMotion.removeEventListener("change", requestUpdate);
    };
  }, []);

  return (
    <main>
      <audio ref={audioRef} src="/cancion.mp3" loop preload="metadata" />

      <section className="portada">
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
          <div className="acompanantes-info">(1 acompañante)</div>
          <ul className="lista-invitados">
            <li>Familia invitada</li>
            <li>Persona especial</li>
          </ul>
          <p>Qué alegría compartir este momento contigo.</p>
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
            <p>Domingo 27 de septiembre - 3:30 p. m.</p>
            <CalendarMenu links={calendarLinks.ceremony} downloadName="dominique-sileidys-ceremonia.ics" />
          </div>
          <div className="info-box">
            <h6>Lugar</h6>
            <p className="direccion-principal direccion-ceremonia">{ceremonyVenue}</p>
            <p className="info-direccion">
              Cl. 30 # 18-85 Brr. 1 de Mayo
              <br />
              Santa Marta, Magdalena
            </p>
            <a className="boton" href={ceremonyMapsUrl} target="_blank" rel="noopener noreferrer">
              <img className="boton-icon" src="/destino-paleta.gif" alt="" />
              ¿Cómo llegar?
            </a>
          </div>
        </article>
        <article className="col-fiesta">
          <ReceptionIcon />
          <div className="event-ribbon">
            <h3>Recepción</h3>
          </div>
          <div className="info-box">
            <h6>Día</h6>
            <p>Domingo 27 de septiembre - 7:00 p. m.</p>
            <CalendarMenu links={calendarLinks.reception} downloadName="dominique-sileidys-recepcion.ics" />
          </div>
          <div className="info-box">
            <h6>Lugar</h6>
            <p className="direccion-principal direccion-recepcion">{receptionVenue}</p>
            <p className="info-direccion">
              Av. del Ferrocarril #12-49
              <br />
              Alcazáres, Santa Marta, Magdalena
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
          <h2 className="title">Acompáñanos</h2>
          <p className="subtitle">Tu presencia hará este día aún más especial.</p>
          <button className="boton" type="button" onClick={() => setModal("rsvp")}>
            CONFIRMAR ASISTENCIA
          </button>
        </div>
      </section>

      <section className="galeria">
        <div className="content-galeria">
          <h2 className="title">Retratos de Nuestro Amor</h2>
          <p className="subtitle">Instantes de nuestra historia que queremos compartir contigo.</p>
          <img className="section-gif-icon" src="/camara-paleta.gif" alt="" />
        </div>
        <div className="content-fotos">
          <div className="carrusel-fotos">
            {[...likedAlbumPhotos, ...likedAlbumPhotos].map((src, item) => (
              <div className={src.includes("foto-carrusel") ? "polaroid polaroid-suave" : "polaroid"} key={`${src}-${item}`}>
                <picture>
                  <source media="(max-width: 780px)" srcSet={src.replace(".webp", "-mobile.webp")} />
                  <img src={src} alt="" loading={item < 8 ? "eager" : "lazy"} decoding="async" />
                </picture>
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
        <p className="subtitle">Si deseas regalarnos algo más que tu hermosa presencia...</p>
        <img className="gift-price-icon" src="/precio-paleta.gif" alt="" />
      </section>

      <section className="instagram">
        <div className="instagram-wave" aria-hidden="true" />
        <div className="instagram-bottom-wave" aria-hidden="true" />
        <div className="capture-content">
          <img className="capture-icon" src="/camara-subir.png" alt="" />
          <p className="capture-eyebrow">Álbum compartido</p>
          <h2 className="title">Captura el momento</h2>
          <p className="subtitle">
            ¡Queremos ver la boda desde tus ojos! Sube tus fotos y videos para que todos podamos revivir este día.
          </p>
        </div>
        <a className="boton capture-upload-button" href="https://photos.app.goo.gl/Fs4Bf8ri3PbRMsCS8" target="_blank" rel="noopener noreferrer">
          <img src="/camara-subir.png" alt="" />
          Subir fotos
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
          <li>
            <CalendarMenu
              links={calendarLinks.reception}
              downloadName="dominique-sileidys-recepcion.ics"
              triggerClassName="footer-calendar-trigger"
              menuClassName="footer-calendar-options"
              label="Agendar Recepción"
            />
          </li>
          <li>
            <CalendarMenu
              links={calendarLinks.ceremony}
              downloadName="dominique-sileidys-ceremonia.ics"
              triggerClassName="footer-calendar-trigger"
              menuClassName="footer-calendar-options"
              label="Agendar Consejos Matrimoniales"
            />
          </li>
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
            <img className="music-modal-icon" src="/corazon-linea-paleta.gif" alt="Corazón" />
            <p className="music-modal-message">
              <strong>Elegimos caminar juntos,</strong>
              <span>y celebrarlo junto a quienes amamos.</span>
              <span>Bienvenidos a nuestra boda.</span>
              <em>Dominique &amp; Sileidys</em>
            </p>
            <div className="music-actions">
              <button className="boton" type="button" onClick={() => enterInvitation(true)}>
                Abrir invitación
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
              <input placeholder="Ej: Familia Pérez o Juan López" />
            </label>
            <label>
              ¿Podrás asistir?
              <select defaultValue="si">
                <option value="si">Sí, claro</option>
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
        <Modal title="Cómo llegar a la Recepción" onClose={() => setModal(null)}>
          <div className="map-modal-content">
            <iframe
              title="Mapa de VIA Restaurante"
              src={receptionMapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className="boton ampliar-mapa" href={receptionMapsUrl} target="_blank" rel="noopener noreferrer">
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
              <input placeholder="Ej: María López" />
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
            Te esperamos con vestuario elegante. Sugerimos tonos suaves, verdes, dorados o neutros para acompañar el
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
