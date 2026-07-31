"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const weddingDate = new Date("2026-11-22T19:00:00");

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
    <section className="countdown-section" aria-label="Cuenta regresiva">
      <img className="count-leaf left" src="/follaje.png" alt="" />
      <div className="count-card">
        <span>Falta</span>
        <div>
          {parts.map(([label, value]) => (
            <p key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <small>{label}</small>
            </p>
          ))}
        </div>
      </div>
      <img className="count-leaf right" src="/follaje.png" alt="" />
    </section>
  );
}

function MusicButton() {
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
    <>
      <audio ref={audioRef} src="/cancion.mp3" preload="metadata" />
      <button
        className={playing ? "music-float active" : "music-float"}
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pausar musica" : "Reproducir musica"}
      >
        <span>&#9835;</span>
      </button>
    </>
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
      <MusicButton />

      <header className="invitation-hero" id="inicio">
        <img className="hero-photo" src="/hero.jpg" alt="Carlos y Alejandra" />
        <div className="hero-filter" />
        <img className="hero-leaf leaf-top" src="/follaje.png" alt="" />
        <img className="hero-leaf leaf-bottom" src="/follaje.png" alt="" />

        <div className="hero-center">
          <div className="date-line">
            <span />
            <p>22.11.2026</p>
            <span />
          </div>

          <h1>
            <span>Carlos</span>
            <b>&amp;</b>
            <span>Alejandra</span>
          </h1>

          <div className="name-line" />

          <blockquote>
            <span />
            Todos somos mortales,
            <br />
            hasta el primer beso y la segunda copa de vino
            <i />
          </blockquote>

          <a className="scroll-arrow" href="#contador" aria-label="Bajar">
            <span />
          </a>
        </div>

        <div className="phone-home" aria-hidden="true" />
      </header>

      <Countdown />

      <section className="intro-section">
        <img src="/follaje.png" alt="" />
        <p>Nos casamos</p>
        <h2>Carlos &amp; Alejandra</h2>
        <span>Con la bendicion de Dios y la alegria de nuestras familias.</span>
      </section>

      <section className="details-section" id="contador">
        <article>
          <span>Ceremonia</span>
          <h3>6:00 pm</h3>
          <p>Parroquia Virgen del Carmen</p>
          <small>Calle 57 aa #00 00</small>
          <a href="https://www.google.com/maps" target="_blank">
            Como llegar
          </a>
        </article>
        <article>
          <span>Recepcion</span>
          <h3>7:30 pm</h3>
          <p>Eventos Medellin</p>
          <small>Calle 57 aa #00 00</small>
          <a href="https://www.google.com/maps" target="_blank">
            Como llegar
          </a>
        </article>
      </section>

      <section className="rsvp-section">
        <h2>Confirma tu asistencia</h2>
        <p>
          Para nosotros es muy importante contar contigo. Por favor confirmanos
          tu asistencia antes del 20 de noviembre de 2026.
        </p>
        <button type="button" onClick={() => setModal("rsvp")}>
          Confirmar asistencia
        </button>
      </section>

      <section className="info-section">
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
