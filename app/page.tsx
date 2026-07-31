"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const weddingDate = new Date("2026-11-22T19:00:00");

const features = [
  "Nombres de invitados",
  "Envio ilimitado",
  "Musica de fondo",
  "Cuenta Regresiva",
  "Ubicacion e Indicaciones",
  "Lista de canciones",
  "Regalos",
  "Agenda",
  "Confirmacion de asistencia",
];

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
      ["hrs", Math.floor((distance / 3600000) % 24)],
      ["min", Math.floor((distance / 60000) % 60)],
      ["seg", Math.floor((distance / 1000) % 60)],
    ];
  }, [now]);

  return (
    <div className="countdown-card" aria-label="Cuenta regresiva para la boda">
      <span>Falta</span>
      <div>
        {parts.map(([label, value]) => (
          <p key={label}>
            <strong>{String(value).padStart(2, "0")}</strong>
            <small>{label}</small>
          </p>
        ))}
      </div>
      <i aria-hidden="true" />
    </div>
  );
}

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const stop = () => setPlaying(false);
    audio.addEventListener("ended", stop);
    return () => audio.removeEventListener("ended", stop);
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    await audio.play();
    setPlaying(true);
  };

  return (
    <section className="music-strip" aria-label="Musica de fondo">
      <audio ref={audioRef} src="/cancion.mp3" preload="metadata" />
      <button type="button" onClick={toggle} aria-label="Reproducir musica">
        {playing ? "Pausar musica" : "Reproducir musica"}
      </button>
    </section>
  );
}

function InvitationPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "phone-preview compact" : "phone-preview"}>
      <div className="phone-speaker" />
      <div className="invite-screen">
        <img className="screen-photo" src="/hero.jpg" alt="Carlos y Alejandra" />
        <div className="screen-shade" />
        <img className="leaf top-left" src="/follaje.png" alt="" />
        <div className="screen-content">
          <div className="date-line">
            <span />
            <p>22.11.2026</p>
            <span />
          </div>
          <h1>
            Carlos
            <b>&amp;</b>
            Alejandra
          </h1>
          <div className="thin-line" />
          <blockquote>
            Todos somos mortales, hasta el primer beso y la segunda copa de vino.
          </blockquote>
          <div className="chevron" aria-hidden="true" />
        </div>
        <div className="screen-wave" />
        <img className="leaf bottom-right" src="/follaje.png" alt="" />
        {!compact ? <Countdown /> : null}
        <div className="gold-frame" aria-hidden="true" />
      </div>
      <div className="phone-button" />
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <button className="modal-close" type="button" onClick={onClose}>
          x
        </button>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const [modal, setModal] = useState<"rsvp" | "gift" | "playlist" | null>(null);

  return (
    <main>
      <header className="hero">
        <nav className="topbar" aria-label="Menu principal">
          <a className="brand" href="#inicio">
            fixdate
          </a>
          <button className="menu-button" type="button" aria-label="Abrir menu">
            <span />
            <span />
            <span />
          </button>
        </nav>

        <section className="hero-grid" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow">Hojas</p>
            <h1>Elegancia y distincion</h1>
            <p>
              Un modelo en donde las hojas toman protagonismo, formando delicados
              ramos que decoran de manera fina y sutil. Verde esmeralda, blanco
              roto y pequenos detalles dorados envuelven nuestra invitacion.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={() => setModal("rsvp")}>
                Confirmar asistencia
              </button>
              <a href="https://wa.me/" target="_blank">
                Solicitar por Whatsapp
              </a>
            </div>
          </div>

          <div className="device-scene" aria-label="Vista previa de la invitacion">
            <div className="browser-preview">
              <div className="browser-bar" />
              <div className="browser-screen">
                <img src="/hero.jpg" alt="" />
                <div />
              </div>
            </div>
            <InvitationPreview />
            <div className="tablet-preview">
              <InvitationPreview compact />
            </div>
            <img className="scene-leaf leaf-a" src="/follaje.png" alt="" />
            <img className="scene-leaf leaf-b" src="/follaje.png" alt="" />
          </div>
        </section>

        <div className="hero-waves" aria-hidden="true">
          <span />
          <b />
        </div>
      </header>

      <MusicPlayer />

      <section className="intro-panel">
        <InvitationPreview />
        <div>
          <p className="section-kicker">Scrollea</p>
          <h2>Carlos &amp; Alejandra</h2>
          <p>
            Con la bendicion de Dios y la alegria de nuestras familias, queremos
            compartir contigo el comienzo de esta nueva historia.
          </p>
          <a href="#detalles">Ver detalles</a>
        </div>
      </section>

      <section className="details-band" id="detalles">
        <article>
          <span>Ceremonia</span>
          <h2>6:00 pm</h2>
          <p>Parroquia Virgen del Carmen</p>
          <a href="https://www.google.com/maps" target="_blank">
            Como llegar
          </a>
        </article>
        <article>
          <span>Recepcion</span>
          <h2>7:30 pm</h2>
          <p>Eventos Medellin</p>
          <a href="https://www.google.com/maps" target="_blank">
            Como llegar
          </a>
        </article>
      </section>

      <section className="included-section">
        <div className="included-copy">
          <h2>Que incluyen?</h2>
          <p>Todo lo que necesitas en tu invitacion.</p>
          <div className="feature-table">
            <div className="table-head">
              <span />
              <b>Incluido</b>
              <b>Que es?</b>
            </div>
            {features.map((feature) => (
              <div className="table-row" key={feature}>
                <strong>{feature}</strong>
                <span className="check">✓</span>
                <span className="help">?</span>
              </div>
            ))}
          </div>
        </div>
        <div className="included-phone">
          <div className="scroll-badge">
            <span>Scrollea!</span>
            <b>⌄⌄</b>
          </div>
          <InvitationPreview compact />
        </div>
      </section>

      <section className="action-section">
        <img src="/follaje.png" alt="" />
        <h2>Confirma tu asistencia</h2>
        <p>
          Para nosotros es muy importante contar contigo. Por favor confirmanos
          tu asistencia antes del 20 de noviembre de 2026.
        </p>
        <button type="button" onClick={() => setModal("rsvp")}>
          Confirmar asistencia
        </button>
      </section>

      <section className="cards-section">
        <article>
          <h3>Codigo de vestuario</h3>
          <p>Ellas: vestido largo. Ellos: traje formal. Evitar blanco, beige y rojo.</p>
        </article>
        <article>
          <h3>Regalos</h3>
          <p>
            Tu presencia es nuestro mejor regalo. Si deseas tener un detalle,
            tendremos lluvia de sobres.
          </p>
          <button type="button" onClick={() => setModal("gift")}>
            Opcion virtual
          </button>
        </article>
        <article>
          <h3>Playlist boda</h3>
          <p>Ayudanos a crear la mejor fiesta con esas canciones imperdibles.</p>
          <button type="button" onClick={() => setModal("playlist")}>
            Anadir canciones
          </button>
        </article>
      </section>

      <footer>
        <p>Carlos y Alejandra</p>
        <span>Disenado con amor por</span>
        <a href="https://evervy-invitaciones.web.app/" target="_blank">
          <img src="/evervy-logo.png" alt="Evervy Invitaciones Digitales" />
        </a>
      </footer>

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
            <button type="button" onClick={() => setModal(null)}>
              Enviar confirmacion
            </button>
          </form>
        </Modal>
      ) : null}

      {modal === "gift" ? (
        <Modal title="Lluvia de sobres" onClose={() => setModal(null)}>
          <p className="modal-text">
            Gracias por acompanarnos. Si deseas hacerlo de forma virtual, puedes
            coordinar tu detalle directamente con los novios.
          </p>
        </Modal>
      ) : null}

      {modal === "playlist" ? (
        <Modal title="Playlist boda" onClose={() => setModal(null)}>
          <form className="form">
            <label>
              Tu nombre
              <input placeholder="Ej: Familia Perez" />
            </label>
            {[1, 2, 3, 4, 5].map((item) => (
              <label key={item}>
                Cancion {item}
                <input placeholder={item === 1 ? "Cancion - Artista" : "Opcional"} />
              </label>
            ))}
            <button type="button" onClick={() => setModal(null)}>
              Anadir a la lista
            </button>
          </form>
        </Modal>
      ) : null}
    </main>
  );
}
