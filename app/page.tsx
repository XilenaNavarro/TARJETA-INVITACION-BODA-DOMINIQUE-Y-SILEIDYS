"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

const weddingDate = new Date("2026-09-27T19:00:00");
const ceremonyStart = "20260927T153000";
const ceremonyEnd = "20260927T173000";
const partyStart = "20260927T190000";
const partyEnd = "20260928T000000";
const ceremonyTitle = "Boda de Dominique y Sileidys (Consejos matrimoniales)";
const partyTitle = "Boda de Dominique y Sileidys (Recepción)";
const ceremonyVenue = "Salón del Reino de los Testigos de Jehová";
const ceremonyAddress = "Cl. 30 # 18-85, Brr. 1 de Mayo, Santa Marta, Magdalena";
const ceremonyLocation = `${ceremonyVenue}, ${ceremonyAddress}`;
const receptionVenue = "VIA Restaurante";
const receptionAddress = "Av. del Ferrocarril #12-49, Alcázares, Santa Marta, Magdalena";
const receptionLocation = `${receptionVenue}, ${receptionAddress}`;
const ceremonyDescription = "Consejos matrimoniales de Dominique y Sileidys";
const partyDescription = "Celebración de boda de Dominique y Sileidys";
const ceremonyMapsUrl = "https://maps.app.goo.gl/UouRBxdRUWGK7ENA9";
const receptionMapsUrl = "https://maps.app.goo.gl/NaMDcEtK7Ai2cfM3A";
const receptionMapsQuery = encodeURIComponent(receptionLocation);
const receptionMapsEmbedUrl = `https://www.google.com/maps?q=${receptionMapsQuery}&output=embed`;
const spotifySongUrl =
  "https://open.spotify.com/intl-es/track/4UVKdTjE4WobaXwvjapVGn?si=jaPUkZQzT9i-_vh_NZBWeW&utm_source=whatsapp&nd=1&dlsi=4abc65e6672d4172";
const hiddenAlbumPhotos = new Set([11, 24, 25, 26]);
const likedAlbumPhotos = Array.from({ length: 26 }, (_, index) => index + 1)
  .filter((photoNumber) => !hiddenAlbumPhotos.has(photoNumber))
  .map((photoNumber) => `/foto-google-favorita-${String(photoNumber).padStart(2, "0")}.webp`);
const invitedGuests = [
  { name: "Familia invitada", detail: "3 pases reservados" },
];

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
    if (!now) {
      return [
        ["días", 0],
        ["hs", 0],
        ["min", 0],
        ["seg", 0],
      ];
    }

    const distance = Math.max(weddingDate.getTime() - now.getTime(), 0);
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
          ×
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
  const menuId = useId();

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
      if (event.detail !== menuId) setOpen(false);
    };

    window.addEventListener("calendar-menu-open", closeOtherMenus);
    return () => window.removeEventListener("calendar-menu-open", closeOtherMenus);
  }, [menuId]);

  const toggleMenu = () => {
    setOpen((value) => {
      const next = !value;
      if (next) {
        window.dispatchEvent(new CustomEvent("calendar-menu-open", { detail: menuId }));
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

export default function Home() {
  const [modal, setModal] = useState<"rsvp" | "map" | "song" | "dress" | "tips" | null>(null);
  const [musicPrompt, setMusicPrompt] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpStep, setRsvpStep] = useState(0);
  const [selectedGuest, setSelectedGuest] = useState(invitedGuests[0].name);
  const [ceremonyAnswer, setCeremonyAnswer] = useState("");
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

  const closeRsvp = () => {
    setModal(null);
    setRsvpStep(0);
    setSelectedGuest(invitedGuests[0].name);
    setCeremonyAnswer("");
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

      <section className="ceremonia-fiesta ceremonia-unica">
        <div className="ceremonia-fiesta-flor-der" />
        <article className="col-ceremonia">
          <RingsIcon />
          <div className="event-ribbon">
            <h3>Consejos matrimoniales</h3>
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
              Cl. 30 # 18-85, Brr. 1 de Mayo
              <br />
              Santa Marta, Magdalena
            </p>
            <a className="boton" href={ceremonyMapsUrl} target="_blank" rel="noopener noreferrer">
              <img className="boton-icon" src="/destino-paleta.gif" alt="" />
              ¿Cómo llegar?
            </a>
          </div>
        </article>
      </section>

      <section className="onda-entre-secciones" aria-hidden="true">
        <img src="/ondas-3.svg?v=21" alt="" />
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
          <h2 className="title">Retratos de nuestro amor</h2>
          <p className="subtitle">Instantes de nuestra historia que queremos compartir contigo.</p>
          <img className="section-gif-icon" src="/camara-paleta.gif" alt="" />
        </div>
        <div className="content-fotos">
          <div className="carrusel-fotos">
            {[...likedAlbumPhotos, ...likedAlbumPhotos].map((src, item) => (
              <div className={src.includes("foto-carrusel") ? "polaroid polaroid-suave" : "polaroid"} key={`${src}-${item}`}>
                <picture>
                  <source media="(max-width: 780px)" srcSet={src.replace(".webp", "-mobile.webp")} />
                  <img
                    src={src}
                    alt=""
                    width="360"
                    height="450"
                    loading="eager"
                    fetchPriority={item < 8 ? "high" : "auto"}
                    decoding="async"
                  />
                </picture>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fiesta">
        <h2 className="title">Código de vestimenta</h2>
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

      <section className="instagram">
        <div className="instagram-bottom-wave" aria-hidden="true" />
        <div className="capture-content">
          <img className="capture-icon" src="/camara-subir.png" alt="" />
          <p className="capture-eyebrow">Álbum compartido</p>
          <h2 className="title">Captura el momento</h2>
          <p className="subtitle">
            Nuestra historia también se contará desde tus ojos. Comparte tus fotos y videos y ayúdanos a guardar cada
            recuerdo de este día.
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
              links={calendarLinks.ceremony}
              downloadName="dominique-sileidys-ceremonia.ics"
              triggerClassName="footer-calendar-trigger"
              menuClassName="footer-calendar-options"
              label="Agendar consejos matrimoniales"
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
              <span>Bienvenido a nuestra boda.</span>
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
        <Modal title="Confirmar asistencia" onClose={closeRsvp}>
          <div className="rsvp-flow">
            {rsvpStep === 0 ? (
              <>
                <p className="rsvp-question">
                  ¿Quién está confirmando? <span>*</span>
                </p>
                <div className="rsvp-options rsvp-guest-options">
                  {invitedGuests.map((guest) => (
                    <button
                      className={selectedGuest === guest.name ? "rsvp-option is-selected" : "rsvp-option"}
                      type="button"
                      key={guest.name}
                      onClick={() => setSelectedGuest(guest.name)}
                    >
                      <strong>{guest.name}</strong>
                      <small>{guest.detail}</small>
                    </button>
                  ))}
                </div>
                <div className="rsvp-actions rsvp-actions-end">
                  <button className="boton rsvp-next" type="button" onClick={() => setRsvpStep(1)}>
                    Siguiente →
                  </button>
                </div>
              </>
            ) : null}

            {rsvpStep === 1 ? (
              <>
                <p className="rsvp-guest-summary">{selectedGuest}</p>
                <p className="rsvp-question">
                  ¿Asistes a los consejos matrimoniales? <span>*</span>
                </p>
                <div className="rsvp-options rsvp-answer-options">
                  {["Sí, asistiré", "No asistiré"].map((answer) => (
                    <button
                      className={ceremonyAnswer === answer ? "rsvp-option is-selected" : "rsvp-option"}
                      type="button"
                      key={answer}
                      onClick={() => setCeremonyAnswer(answer)}
                    >
                      {answer}
                    </button>
                  ))}
                </div>
                <div className="rsvp-actions">
                  <button className="boton rsvp-prev" type="button" onClick={() => setRsvpStep(0)}>
                    ← Anterior
                  </button>
                  <button className="boton rsvp-next" type="button" onClick={closeRsvp}>
                    Enviar confirmación
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </Modal>
      ) : null}

      {modal === "map" ? (
        <Modal title="Cómo llegar a la recepción" onClose={() => setModal(null)}>
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
        <Modal title="Código de vestimenta" onClose={() => setModal(null)}>
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

    </main>
  );
}
