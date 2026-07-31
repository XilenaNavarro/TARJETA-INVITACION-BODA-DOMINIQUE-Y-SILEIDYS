"use client";

import { useEffect, useMemo, useState } from "react";

const weddingDate = new Date("2026-09-27T19:00:00");
const ceremonyStart = "20260927T180000";
const ceremonyEnd = "20260927T200000";
const ceremonyTitle = "Boda de Dominique y Sileidys (Ceremonia)";
const ceremonyAddress = "Cl. 30 # 18-85, Brr. 1 de Mayo, Santa Marta, Magdalena";
const ceremonyLocation = `Parroquia Virgen del Carmen, ${ceremonyAddress}`;
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
      ["d\u00edas", Math.floor(distance / 86400000)],
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
                <div
                  className={index === parts.length - 1 ? "reloj-col no-border" : "reloj-col"}
                  key={label}
                >
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
            <b>Google <em>(online)</em></b>
          </a>
          <a href={calendarLinks.office} target="_blank">
            <span className="cal-icon office">O</span>
            <b>Office 365 <em>(online)</em></b>
          </a>
          <a href={calendarLinks.outlook}>
            <span className="cal-icon outlook">O</span>
            <b>Outlook</b>
          </a>
          <a href={calendarLinks.outlookCom} target="_blank">
            <span className="cal-icon outlookcom">O</span>
            <b>Outlook.com <em>(online)</em></b>
          </a>
          <a href={calendarLinks.yahoo} target="_blank">
            <span className="cal-icon yahoo">Y</span>
            <b>Yahoo <em>(online)</em></b>
          </a>
          <small>ADDEVENT.COM</small>
        </div>
      ) : null}
    </div>
  );
}

export default function Home() {
  const [modal, setModal] = useState<"rsvp" | "map" | null>(null);

  return (
    <main>
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

      <section className="ceremonia-fiesta ceremonia-unica">
        <div className="ceremonia-fiesta-flor-der" />
        <article className="col-ceremonia">
          <div className="anim-anillos" />
          <h3>Ceremonia</h3>
          <div className="info-box">
            <h6>Dia</h6>
            <p>Domingo 27 de Septiembre - 6:00 pm</p>
            <CalendarMenu />
          </div>
          <div className="info-box">
            <h6>Lugar</h6>
            <p>Parroquia Virgen del Carmen</p>
            <p className="info-direccion">
              Cl. 30 # 18-85
              <br />
              Brr. 1 de Mayo
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
          <div className="anim-galeria" />
        </div>
        <div className="content-fotos">
          {[1, 2, 3].map((item) => (
            <div className="polaroid" key={item}>
              <img src={item === 1 ? "/hero.jpg" : "/fixdate-portada-3.webp"} alt="" />
            </div>
          ))}
        </div>
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
          <li>Agendar Ceremonia</li>
        </ul>
      </section>

      <footer>
        <p>
          Desarrollado con amor por <a href="https://fixdate.io/co/" target="_blank">Fixdate</a>
        </p>
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
    </main>
  );
}
