"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const weddingDate = new Date("2026-09-27T19:00:00");
const ceremonyStart = "20260927T180000";
const ceremonyEnd = "20260927T200000";
const partyStart = "20260927T200000";
const partyEnd = "20260928T010000";
const ceremonyTitle = "Boda de Dominique y Sileidys (Ceremonia)";
const partyTitle = "Boda de Dominique y Sileidys (Fiesta)";
const ceremonyAddress = "Cl. 30 # 18-85, Brr. 1 de Mayo, Santa Marta, Magdalena";
const ceremonyLocation = ceremonyAddress;
const ceremonyDescription = "Ceremonia de boda de Dominique y Sileidys";
const mapsQuery = encodeURIComponent(ceremonyAddress);
const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
const mapsOpenUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

const calendarLinks = {
  apple: `/dominique-sileidys-ceremonia.ics`,
  google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    ceremonyTitle,
  )}&dates=${ceremonyStart}/${ceremonyEnd}&details=${encodeURIComponent(
    ceremonyDescription,
  )}&location=${encodeURIComponent(ceremonyLocation)}`,
  office: `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
    ceremonyTitle,
  )}&startdt=2026-09-27T18:00:00&enddt=2026-09-27T20:00:00&body=${encodeURIComponent(
    ceremonyDescription,
  )}&location=${encodeURIComponent(ceremonyLocation)}`,
  outlook: `/dominique-sileidys-ceremonia.ics`,
  outlookCom: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
    ceremonyTitle,
  )}&startdt=2026-09-27T18:00:00&enddt=2026-09-27T20:00:00&body=${encodeURIComponent(
    ceremonyDescription,
  )}&location=${encodeURIComponent(ceremonyLocation)}`,
  yahoo: `https://calendar.yahoo.com/?v=60&title=${encodeURIComponent(
    ceremonyTitle,
  )}&st=${ceremonyStart}&et=${ceremonyEnd}&desc=${encodeURIComponent(
    ceremonyDescription,
  )}&in_loc=${encodeURIComponent(ceremonyLocation)}`,
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
      ["dias", Math.floor(distance / 86400000)],
      ["hs", Math.floor((distance / 3600000) % 24)],
      ["min", Math.floor((distance / 60000) % 60)],
      ["seg", Math.floor((distance / 1000) % 60)],
    ];
  }, [now]);

  return (
    <section className="cuenta-regresiva">
      <div className="franja-verde" />
      <div className="decor-conteo">
        <img className="hojas-conteo hojas-conteo-sup" src="/fixdate-hojas-fiesta.svg" alt="" />
        <img className="hojas-conteo hojas-conteo-inf" src="/fixdate-hojas-fiesta.svg" alt="" />
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
            <div className="corazon-falta" />
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
          <a href={calendarLinks.apple}>
            <span className="cal-icon apple">Apple</span>
            <b>Apple Calendar</b>
          </a>
          <a href={calendarLinks.google} target="_blank">
            <span className="cal-icon google">G</span>
            <b>
              Google <em>(online)</em>
            </b>
          </a>
          <a href={calendarLinks.office} target="_blank">
            <span className="cal-icon office">O</span>
            <b>
              Office 365 <em>(online)</em>
            </b>
          </a>
          <a href={calendarLinks.outlook}>
            <span className="cal-icon outlook">O</span>
            <b>Outlook</b>
          </a>
          <a href={calendarLinks.outlookCom} target="_blank">
            <span className="cal-icon outlookcom">O</span>
            <b>
              Outlook.com <em>(online)</em>
            </b>
          </a>
          <a href={calendarLinks.yahoo} target="_blank">
            <span className="cal-icon yahoo">Y</span>
            <b>
              Yahoo <em>(online)</em>
            </b>
          </a>
          <small>ADDEVENT.COM</small>
        </div>
      ) : null}
    </div>
  );
}

function HeartIcon() {
  return (
    <div className="animated-icon heart-icon" aria-hidden="true">
      <svg viewBox="0 0 128 128">
        <path d="M64 113 C39 101 8 76 8 43 C8 22 22 10 40 10 C51 10 59 16 64 25 C69 16 77 10 88 10 C106 10 120 22 120 43 C120 76 89 101 64 113 Z" />
      </svg>
    </div>
  );
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

function GiftIcon() {
  return (
    <div className="animated-icon gift-icon" aria-hidden="true">
      <svg viewBox="0 0 128 128">
        <path className="gift-box" d="M20 55 H108 V112 H20 Z" />
        <path className="gift-lid" d="M14 39 H114 V58 H14 Z" />
        <path className="gift-ribbon" d="M56 39 H72 V112 H56 Z" />
        <path className="gift-ribbon gift-ribbon-h" d="M20 72 H108" />
        <path className="gift-bow" d="M61 39 C35 33 35 14 53 17 C65 19 64 34 61 39 Z" />
        <path className="gift-bow" d="M67 39 C93 33 93 14 75 17 C63 19 64 34 67 39 Z" />
      </svg>
    </div>
  );
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
    await audio.play();
    setIsPlaying(true);
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
              no se rompe facilmente
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
          <HeartIcon />
          <h3>Ceremonia</h3>
          <div className="info-box">
            <h6>Dia</h6>
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
              Como llegar?
            </button>
          </div>
        </article>
        <article className="col-fiesta">
          <PartyIcon />
          <h3>Fiesta</h3>
          <div className="info-box">
            <h6>Dia</h6>
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
            <p className="direccion-principal">Celebracion con amor</p>
            <p className="info-direccion">
              Compartiremos despues de la ceremonia
              <br />
              Santa Marta, Magdalena
            </p>
            <button className="boton" type="button" onClick={() => setModal("map")}>
              Como llegar?
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
          <PartyIcon />
        </div>
        <div className="content-fotos">
          {[1, 2, 3, 4].map((item) => (
            <div className="polaroid" key={item}>
              <img src={item === 1 ? "/hero.jpg" : "/fixdate-portada-3.webp"} alt="" />
            </div>
          ))}
        </div>
      </section>

      <section className="fiesta">
        <h2 className="title">Fiesta</h2>
        <p className="subtitle">Hagamos juntos una fiesta epica. Aqui algunos detalles a tener en cuenta.</p>
        <div className="items-fiesta">
          <article className="item-fiesta">
            <img className="hojas-musica" src="/fixdate-hojas-fiesta.svg" alt="" />
            <div className="content-item-fiesta">
              <h3>Musica</h3>
              <PartyIcon />
              <p>Cual es la cancion que no debe faltar en la playlist de la fiesta?</p>
              <button className="boton" type="button" onClick={() => setModal("song")}>
                Sugerir cancion
              </button>
            </div>
          </article>
          <article className="item-fiesta">
            <div className="content-item-fiesta">
              <h3>Dress Code</h3>
              <div className="dress-icon" aria-hidden="true" />
              <p>
                Una orientacion para
                <br />
                tu vestuario
              </p>
              <button className="boton" type="button" onClick={() => setModal("dress")}>
                Ver mas
              </button>
            </div>
          </article>
          <article className="item-fiesta">
            <div className="content-item-fiesta">
              <h3>Tips y Notas</h3>
              <div className="tips-icon" aria-hidden="true" />
              <p>
                Informacion adicional
                <br />
                para tener en cuenta
              </p>
              <button className="boton" type="button" onClick={() => setModal("tips")}>
                + Info
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="regalos">
        <div className="regalos-flor-der" />
        <h2 className="title">Regalos</h2>
        <p className="subtitle">Si deseas regalarnos algo mas que tu hermosa presencia...</p>
        <GiftIcon />
        <button className="boton" type="button" onClick={() => setModal("gifts")}>
          Cuenta Bancaria - Lista Regalos
        </button>
      </section>

      <section className="instagram">
        <h2 className="title">Compartimos este dia junto a vos</h2>
        <p className="subtitle">Comparte tus fotos y videos de ese hermoso dia</p>
        <div className="anim-instagram" />
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
          <li>
            <button type="button" onClick={() => setModal("song")}>
              Sugerir cancion
            </button>
          </li>
          <li>Agendar Fiesta</li>
          <li>Agendar Ceremonia</li>
        </ul>
      </section>

      <footer>
        <p>
          Desarrollado con amor por <a href="https://fixdate.io/co/" target="_blank">Fixdate</a>
        </p>
      </footer>

      <button
        className={isPlaying ? "controlador-musica is-playing" : "controlador-musica"}
        type="button"
        aria-label={isPlaying ? "Pausar musica" : "Reproducir musica"}
        onClick={toggleMusic}
      >
        <span />
      </button>

      {musicPrompt ? (
        <Modal title="" onClose={() => enterInvitation(false)}>
          <div className="music-modal">
            <p>
              Bienvenidos a la invitacion de
              <br />
              Dominique y Sileidys
            </p>
            <span>La musica de fondo es parte de la experiencia</span>
            <div className="music-actions">
              <button className="boton" type="button" onClick={() => enterInvitation(true)}>
                Ingresar con musica
              </button>
              <button className="boton boton-secundario" type="button" onClick={() => enterInvitation(false)}>
                Ingresar sin musica
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
              Podras asistir?
              <select defaultValue="si">
                <option value="si">Si, claro</option>
                <option value="no">No puedo</option>
              </select>
            </label>
            <label>
              Numero de personas
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
              Enviar confirmacion
            </button>
          </form>
        </Modal>
      ) : null}

      {modal === "map" ? (
        <Modal title="Como llegar a la Ceremonia" onClose={() => setModal(null)}>
          <div className="map-modal-content">
            <iframe
              title="Mapa de la ceremonia"
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
        <Modal title="Sugerir Cancion" onClose={() => setModal(null)}>
          <form className="form">
            <label>
              Tu nombre
              <input placeholder="Ej: Maria Lopez" />
            </label>
            <label>
              Nombre de cancion y autor
              <input placeholder="Ej: Perfect - Ed Sheeran" />
            </label>
            <label>
              Link opcional
              <input placeholder="YouTube, Spotify, etc." />
            </label>
            <button className="boton" type="button" onClick={() => setModal(null)}>
              Sugerir cancion
            </button>
          </form>
        </Modal>
      ) : null}

      {modal === "dress" ? (
        <Modal title="Dress Code" onClose={() => setModal(null)}>
          <p className="modal-text">
            Te esperamos con vestuario elegante. Sugerimos tonos suaves, verdes, dorados o neutros para acompanar el
            estilo de la celebracion.
          </p>
        </Modal>
      ) : null}

      {modal === "tips" ? (
        <Modal title="Tips y Notas" onClose={() => setModal(null)}>
          <p className="modal-text">
            Llega con tiempo, confirma tu asistencia y guarda la ubicacion. Lo mas importante: ven preparado para
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
