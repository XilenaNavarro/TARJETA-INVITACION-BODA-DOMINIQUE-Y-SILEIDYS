"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const weddingDate = new Date("2026-11-22T19:00:00");

function SectionTitle({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="section-title">
      <div className="section-icon" aria-hidden="true">
        {icon}
      </div>
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const stop = () => setPlaying(false);
    audio.addEventListener("timeupdate", update);
    audio.addEventListener("ended", stop);
    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("ended", stop);
    };
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
    <section className="music-section" aria-label="Cancion de los novios">
      <audio ref={audioRef} src="/cancion.mp3" preload="metadata" />
      <p>Dale play a nuestra canción</p>
      <div className="music-controls">
        <span aria-hidden="true">|‹</span>
        <button type="button" onClick={toggle} aria-label="Reproducir cancion">
          {playing ? "❚❚" : "▶"}
        </button>
        <span aria-hidden="true">›|</span>
      </div>
      <div className="progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
    </section>
  );
}

function Countdown() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const parts = useMemo(() => {
    const distance = Math.max(weddingDate.getTime() - now.getTime(), 0);
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance / 3600000) % 24);
    const minutes = Math.floor((distance / 60000) % 60);
    const seconds = Math.floor((distance / 1000) % 60);
    return [
      ["Días", days],
      ["Horas", hours],
      ["Min", minutes],
      ["Seg", seconds],
    ];
  }, [now]);

  return (
    <section className="countdown-section">
      <div className="countdown-grid">
        {parts.map(([label, value]) => (
          <div className="countdown-box" key={label}>
            <strong>{String(value).padStart(2, "0")}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
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
          ×
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
        <img src="/hero.jpg" alt="Carlos y Alejandra" />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p>Nos Casamos</p>
          <h1>Carlos y Alejandra</h1>
          <span />
          <h2>22 de Noviembre de 2026</h2>
        </div>
      </header>

      <MusicPlayer />
      <Countdown />

      <section className="quote-band">
        <p>
          "Ante Dios, con amor en el corazón y fe en el alma, sellamos nuestra
          promesa de caminar juntos por siempre."
        </p>
      </section>

      <section className="rsvp-section">
        <SectionTitle icon="♡" title="Confirmación de Asistencia" />
        <p>
          Para nosotros es muy importante contar contigo. Por favor confírmanos
          tu asistencia antes del
          <strong>20 - Noviembre - 2026</strong>
        </p>
        <button type="button" onClick={() => setModal("rsvp")}>
          Confirmar Asistencia
        </button>
      </section>

      <section className="schedule-section">
        <article>
          <div className="detail-icon">✚</div>
          <h2>Ceremonia</h2>
          <strong>6:00 pm</strong>
          <p>Parroquia Virgen del Carmen</p>
          <span>Calle 57 aa #00 00</span>
          <a href="https://www.google.com/maps" target="_blank">
            Cómo llegar
          </a>
        </article>
        <article>
          <div className="detail-icon">✦</div>
          <h2>Recepción</h2>
          <strong>7:30 pm</strong>
          <p>Eventos Medellin</p>
          <span>Calle 57 aa #00 00</span>
          <a href="https://www.google.com/maps" target="_blank">
            Cómo llegar
          </a>
        </article>
      </section>

      <section className="info-section">
        <img className="leaf leaf-one" src="/follaje.png" alt="" />
        <img className="leaf leaf-two" src="/follaje.png" alt="" />
        <img className="leaf leaf-three" src="/follaje.png" alt="" />

        <SectionTitle
          icon="◐"
          title="Código de Vestuario"
          subtitle="Para nosotros es importante que te sientas y te veas espectacular."
        />
        <div className="dress-grid">
          <article>
            <div>♕</div>
            <h3>Ellas</h3>
            <strong>Vestido Largo</strong>
            <p>
              Por favor evitar colores
              <br />
              <b>blanco, beige y rojo.</b>
            </p>
          </article>
          <article>
            <div>♚</div>
            <h3>Ellos</h3>
            <strong>Traje Formal</strong>
            <p>
              Queremos verte feliz
              <br />
              <b>y elegante.</b>
            </p>
          </article>
        </div>

        <hr />

        <SectionTitle
          icon="▣"
          title="Regalos"
          subtitle="El mejor regalo es tu presencia. Pero si deseas tener un detalle con nosotros, dispondremos de un buzón para sobres en la recepción."
        />
        <button className="pill dark" type="button" onClick={() => setModal("gift")}>
          Opción Virtual
        </button>

        <hr />

        <SectionTitle
          icon="◎"
          title="Captura el Momento"
          subtitle="¡Queremos ver la boda desde tus ojos! Sube tus fotos y videos para que todos podamos revivir este día."
        />
        <a className="pill outline" href="https://photos.google.com/u/0/?hl=es">
          Subir Fotos
        </a>

        <hr />

        <SectionTitle
          icon="♪"
          title="Playlist Boda"
          subtitle="Ayúdanos a crear la mejor fiesta. Escribe las canciones que no pueden faltar."
        />
        <button className="pill dark" type="button" onClick={() => setModal("playlist")}>
          Añadir Canciones
        </button>
      </section>

      <footer>
        <p>Carlos y Alejandra</p>
        <div>
          <span>Diseñado con amor por</span>
          <a href="https://evervy-invitaciones.web.app/" target="_blank">
            <img src="/evervy-logo.png" alt="Evervy Invitaciones Digitales" />
          </a>
        </div>
      </footer>

      {modal === "rsvp" ? (
        <Modal title="Confirma tu asistencia" onClose={() => setModal(null)}>
          <form className="form">
            <label>
              Nombre(s) Completo
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
                  <option key={item}>{item} Persona{item > 1 ? "s" : ""}</option>
                ))}
              </select>
            </label>
            <label>
              Mensaje / Alergias
              <textarea placeholder="Alguna restricción alimenticia o mensaje para los novios..." />
            </label>
            <button type="button" onClick={() => setModal(null)}>
              Confirmar asistencia
            </button>
          </form>
        </Modal>
      ) : null}

      {modal === "gift" ? (
        <Modal title="Lluvia de Sobres" onClose={() => setModal(null)}>
          <p className="modal-text">
            Gracias por acompañarnos. Si deseas hacerlo de forma virtual,
            puedes coordinar tu detalle directamente con los novios.
          </p>
        </Modal>
      ) : null}

      {modal === "playlist" ? (
        <Modal title="Playlist Boda" onClose={() => setModal(null)}>
          <form className="form">
            <label>
              Tu nombre
              <input placeholder="Ej: Familia Pérez" />
            </label>
            {[1, 2, 3, 4, 5].map((item) => (
              <label key={item}>
                Canción {item}
                <input placeholder={item === 1 ? "Canción - Artista" : "Opcional"} />
              </label>
            ))}
            <button type="button" onClick={() => setModal(null)}>
              Añadir a la lista
            </button>
          </form>
        </Modal>
      ) : null}
    </main>
  );
}
