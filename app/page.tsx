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
  {"code": "inv-001", "name": "Familia Navarro Perez", "isGroup": true},
  {"code": "inv-002", "name": "Familia Navarro Aguas", "isGroup": true},
  {"code": "inv-003", "name": "Familia Jeschke", "isGroup": true},
  {"code": "inv-004", "name": "Familia Ramirez", "isGroup": true},
  {"code": "inv-005", "name": "Familia Villanueva", "isGroup": true},
  {"code": "inv-006", "name": "Familia Herrera", "isGroup": true},
  {"code": "inv-007", "name": "Maria Isabel Jaramillo", "isGroup": false},
  {"code": "inv-008", "name": "Familia Gayoso", "isGroup": true},
  {"code": "inv-009", "name": "Familia Gonzalez", "isGroup": true},
  {"code": "inv-010", "name": "Familia Montaño", "isGroup": true},
  {"code": "inv-011", "name": "Familia Barrios", "isGroup": true},
  {"code": "inv-012", "name": "Familia Romero", "isGroup": true},
  {"code": "inv-013", "name": "Xiomara Guzman", "isGroup": false},
  {"code": "inv-014", "name": "Familia Hernandez", "isGroup": true},
  {"code": "inv-015", "name": "Familia Perez", "isGroup": true},
  {"code": "inv-016", "name": "Familia Pretel Guzman", "isGroup": true},
  {"code": "inv-017", "name": "Familia Valbuena", "isGroup": true},
  {"code": "inv-018", "name": "Familia Delgado", "isGroup": true},
  {"code": "inv-019", "name": "Familia Vasquez", "isGroup": true},
  {"code": "inv-020", "name": "Familia Pretel", "isGroup": true},
  {"code": "inv-021", "name": "Familia Ramirez", "isGroup": true},
  {"code": "inv-022", "name": "Familia Marquez", "isGroup": true},
  {"code": "inv-023", "name": "Familia Berdugo", "isGroup": true},
  {"code": "inv-024", "name": "Carmen Cecilia Orozco", "isGroup": false},
  {"code": "inv-025", "name": "Familia Ortiz", "isGroup": true},
  {"code": "inv-026", "name": "Familia Peña", "isGroup": true},
  {"code": "inv-027", "name": "Leidys Florez", "isGroup": false},
  {"code": "inv-028", "name": "Familia Carrascal", "isGroup": true},
  {"code": "inv-029", "name": "Familia Martinez", "isGroup": true},
  {"code": "inv-030", "name": "Familia Prado", "isGroup": true},
  {"code": "inv-031", "name": "Melania Montero", "isGroup": false},
  {"code": "inv-032", "name": "Familia Peñaloza", "isGroup": true},
  {"code": "inv-033", "name": "Familia Lossada", "isGroup": true},
  {"code": "inv-034", "name": "Familia Pinzon", "isGroup": true},
  {"code": "inv-035", "name": "Rosmira y Gina", "isGroup": true},
  {"code": "inv-036", "name": "Betsy Liscano", "isGroup": false},
  {"code": "inv-037", "name": "Familia Aristizabal", "isGroup": true},
  {"code": "inv-038", "name": "Familia Perez Carrascal", "isGroup": true},
  {"code": "inv-039", "name": "Stella y Henry", "isGroup": true},
  {"code": "inv-040", "name": "Familia Villada", "isGroup": true},
  {"code": "inv-041", "name": "Familia Castillo", "isGroup": true},
  {"code": "inv-042", "name": "Familia Tinoco", "isGroup": true},
  {"code": "inv-043", "name": "Familia Herrera", "isGroup": true},
  {"code": "inv-044", "name": "Familia Acuña", "isGroup": true},
  {"code": "inv-045", "name": "Familia Herrera Alean", "isGroup": true},
  {"code": "inv-046", "name": "Familia Patiño", "isGroup": true},
  {"code": "inv-047", "name": "Familia Castañeda", "isGroup": true},
  {"code": "inv-048", "name": "Familia Hurtado", "isGroup": true},
  {"code": "inv-049", "name": "Familia Daza", "isGroup": true},
  {"code": "inv-050", "name": "Familia Martínez", "isGroup": true},
  {"code": "inv-051", "name": "Familia Ortiz Carrascal", "isGroup": true},
  {"code": "inv-052", "name": "Familia Polo", "isGroup": true},
  {"code": "inv-053", "name": "Isabel Carrascal", "isGroup": false},
  {"code": "inv-054", "name": "Familia Solano", "isGroup": true},
  {"code": "inv-055", "name": "Familia Perez Pretel", "isGroup": true},
  {"code": "inv-056", "name": "Juliana Marquez", "isGroup": false},
  {"code": "inv-057", "name": "Abadis Castañez", "isGroup": false},
  {"code": "inv-058", "name": "Evarista Acosta", "isGroup": false},
  {"code": "inv-059", "name": "Marta Castellar", "isGroup": false},
  {"code": "inv-060", "name": "Familia Pavajau", "isGroup": true},
  {"code": "inv-061", "name": "Adriana e hijos", "isGroup": true},
  {"code": "inv-062", "name": "Familia Ramirez", "isGroup": true},
  {"code": "inv-063", "name": "Elsy Castro", "isGroup": false},
  {"code": "inv-064", "name": "Everlides Requena", "isGroup": false},
  {"code": "inv-065", "name": "Fidelina Gutierrez", "isGroup": false},
  {"code": "inv-066", "name": "Iromaldis", "isGroup": false},
  {"code": "inv-067", "name": "Familia Fajardo", "isGroup": true},
  {"code": "inv-068", "name": "Jaqueline Trigos", "isGroup": false},
  {"code": "inv-069", "name": "Josefina Polo", "isGroup": false},
  {"code": "inv-070", "name": "Familia Amesti", "isGroup": true},
  {"code": "inv-071", "name": "Luz Marina Acosta", "isGroup": false},
  {"code": "inv-072", "name": "Familia Angulo", "isGroup": true},
  {"code": "inv-073", "name": "Socorro de Lora", "isGroup": false},
  {"code": "inv-074", "name": "Stella Fernanda Perez", "isGroup": false},
  {"code": "inv-075", "name": "Familia Pacheco", "isGroup": true},
  {"code": "inv-076", "name": "Familia Bermudez", "isGroup": true},
  {"code": "inv-077", "name": "Familia Palacios", "isGroup": true},
  {"code": "inv-078", "name": "Osiris Meza", "isGroup": false},
  {"code": "inv-079", "name": "Omaira", "isGroup": false},
  {"code": "inv-080", "name": "Familia Guio", "isGroup": true},
  {"code": "inv-081", "name": "Angelina Berdugo", "isGroup": false},
  {"code": "inv-082", "name": "Beatriz y Debbie", "isGroup": true},
  {"code": "inv-083", "name": "Nini", "isGroup": false},
  {"code": "inv-084", "name": "Familia Hernandez", "isGroup": true},
  {"code": "inv-085", "name": "Familia Fontanilla", "isGroup": true},
  {"code": "inv-086", "name": "Familia Martinez", "isGroup": true},
  {"code": "inv-087", "name": "Alix Castañez", "isGroup": false},
  {"code": "inv-088", "name": "Edicson Jimenez", "isGroup": false},
  {"code": "inv-089", "name": "Daniel Garcia", "isGroup": false},
  {"code": "inv-090", "name": "Familia Brito", "isGroup": true},
  {"code": "inv-091", "name": "Familia Obreo", "isGroup": true},
  {"code": "inv-092", "name": "Familia Diaz", "isGroup": true},
  {"code": "inv-093", "name": "Familia Eguis", "isGroup": true},
  {"code": "inv-094", "name": "Familia Villegas", "isGroup": true},
  {"code": "inv-095", "name": "Maria Moreno", "isGroup": false},
  {"code": "inv-096", "name": "Mildreth y Virni", "isGroup": true},
  {"code": "inv-097", "name": "Familia Navarro Coronel", "isGroup": true},
  {"code": "inv-098", "name": "Familia Coronel", "isGroup": true},
  {"code": "inv-099", "name": "Familia Martelo", "isGroup": true},
  {"code": "inv-100", "name": "Nora Torres", "isGroup": false},
  {"code": "inv-101", "name": "Maria Iuminada", "isGroup": false},
  {"code": "inv-102", "name": "Familia Mercado", "isGroup": true},
  {"code": "inv-103", "name": "Marisol e hijo", "isGroup": true},
  {"code": "inv-104", "name": "Familia Arrollo", "isGroup": true},
  {"code": "inv-105", "name": "Jaime Martinez", "isGroup": false},
  {"code": "inv-106", "name": "Georgina Villadiego", "isGroup": false},
  {"code": "inv-107", "name": "Eugenia Gonzalez", "isGroup": false},
  {"code": "inv-108", "name": "Familia Martinez", "isGroup": true},
  {"code": "inv-109", "name": "Familia Sanchez", "isGroup": true},
  {"code": "inv-110", "name": "Clara Mandon", "isGroup": false},
  {"code": "inv-111", "name": "Cindy", "isGroup": false},
  {"code": "inv-112", "name": "Barbara y familia", "isGroup": true},
  {"code": "inv-113", "name": "Anayibis Rada", "isGroup": false},
  {"code": "inv-114", "name": "Ana Maria Guarnizo", "isGroup": false},
  {"code": "inv-115", "name": "Andrea Bernal", "isGroup": false},
  {"code": "inv-116", "name": "Gema", "isGroup": false},
  {"code": "inv-117", "name": "Leonor Maldonado", "isGroup": false},
  {"code": "inv-118", "name": "Maria Iluminada", "isGroup": false},
  {"code": "inv-119", "name": "Familia Perez", "isGroup": true},
  {"code": "inv-120", "name": "Familia Granados", "isGroup": true},
  {"code": "inv-121", "name": "Belkis Urbina", "isGroup": false},
  {"code": "inv-122", "name": "Saury Morales", "isGroup": false},
  {"code": "inv-123", "name": "Familia Ariz", "isGroup": true},
  {"code": "inv-124", "name": "Familia Parra", "isGroup": true},
  {"code": "inv-125", "name": "Diosmaira Barela", "isGroup": false},
  {"code": "inv-126", "name": "Mailin", "isGroup": false},
  {"code": "inv-127", "name": "Familia Rodriguez", "isGroup": true},
  {"code": "inv-128", "name": "Rita Mercado", "isGroup": false},
  {"code": "inv-129", "name": "Jessica Ballestas", "isGroup": false},
  {"code": "inv-130", "name": "Maisa", "isGroup": false},
  {"code": "inv-131", "name": "Antonella", "isGroup": false},
  {"code": "inv-132", "name": "Familia Ramirez", "isGroup": true},
  {"code": "inv-133", "name": "Jairo Torregrosa", "isGroup": false},
  {"code": "inv-134", "name": "Familia Lara Ortiz", "isGroup": true},
  {"code": "inv-135", "name": "Familia Navarro Lara", "isGroup": true},
  {"code": "inv-136", "name": "Familia Lara Rodriguez", "isGroup": true},
  {"code": "inv-137", "name": "Familia Koslowski", "isGroup": true},
  {"code": "inv-138", "name": "Familia Jeschke", "isGroup": true},
  {"code": "inv-139", "name": "Familia Liedloff", "isGroup": true},
  {"code": "inv-140", "name": "Xilena Navarro", "isGroup": false},
  {"code": "inv-146", "name": "Familia Aldarraga Carrascal", "isGroup": true},
  {"code": "inv-147", "name": "Wilmer Monzalvo", "isGroup": false},
  {"code": "inv-148", "name": "Familia Navarro Zamora", "isGroup": true},
  {"code": "inv-149", "name": "María Navarro e hijos", "isGroup": true},
  {"code": "inv-150", "name": "Katherine y familia", "isGroup": true},
  {"code": "inv-151", "name": "Rosa Yolenis y familia", "isGroup": true},
  {"code": "inv-152", "name": "Keidys y familia", "isGroup": true},
  {"code": "inv-153", "name": "Dianis e hijo", "isGroup": true},
  {"code": "inv-154", "name": "Luis Alberto y familia", "isGroup": true},
  {"code": "inv-155", "name": "Osiris Meza", "isGroup": false},
  {"code": "inv-157", "name": "Familia Guio", "isGroup": true},
  {"code": "inv-158", "name": "Diosmaira Barela", "isGroup": false},
  {"code": "inv-159", "name": "Alonso y Karen", "isGroup": true},
  {"code": "inv-160", "name": "Mishelle y Leonardo", "isGroup": true},
  {"code": "inv-161", "name": "Hermanos Zamora", "isGroup": true},
];
const publicInvitationUrl = "https://invitacion-boda-sileidys.vercel.app";
const sharePreviewVersion = "20260824b";
const sentGuestsStorageKey = "dominique-sileidys-sent-guests-v2";
const googleSheetsEndpoint =
  process.env.NEXT_PUBLIC_RSVP_GOOGLE_SCRIPT_URL ??
  "https://script.google.com/macros/s/AKfycbxe_LVuoix1MV5JqRj6wSmKHAtDOxwcStu3kMNg1C7l83NiajAarCteafG4M5rppY7R/exec";

type InvitedGuest = (typeof invitedGuests)[number];

const defaultGuest = invitedGuests[0];

const isSingleGuest = (guest: InvitedGuest) => !guest.isGroup;

const guestCardMessageFor = (guest: InvitedGuest) =>
  isSingleGuest(guest)
    ? "Qué alegría compartir este momento contigo."
    : "Qué alegría compartir este momento con ustedes.";

const welcomeMessageFor = (guest: InvitedGuest) =>
  isSingleGuest(guest) ? "Te damos la bienvenida a nuestra boda." : "Les damos la bienvenida a nuestra boda.";

const invitationMessageFor = (guest: InvitedGuest) =>
  isSingleGuest(guest)
    ? "Queremos que seas parte de uno de los días más importantes para nosotros. Nos hará muy felices compartirlo contigo."
    : "Queremos que sean parte de uno de los días más importantes para nosotros. Nos hará muy felices compartirlo con ustedes.";

const invitationUrlFor = (guest: InvitedGuest) => {
  return `${publicInvitationUrl}/${guest.code}?v=${sharePreviewVersion}`;
};

const whatsappUrlFor = (guest: InvitedGuest) => {
  const url = new URL(googleSheetsEndpoint);
  url.searchParams.set("action", "whatsapp");
  url.searchParams.set("code", guest.code);
  return url.toString();
};

const sentStatusUrlFor = (callbackName: string) => {
  const url = new URL(googleSheetsEndpoint);
  url.searchParams.set("action", "sent-status");
  url.searchParams.set("callback", callbackName);
  return url.toString();
};

const whatsappMessageFor = (guest: InvitedGuest) =>
  [
    guest.name,
    invitationMessageFor(guest),
    invitationUrlFor(guest),
  ].join("\n\n");

const searchValue = (searchParams: HomeProps["searchParams"], key: string) => {
  const value = searchParams?.[key];
  return Array.isArray(value) ? value[0] : value;
};

type HomeProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

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

export default function Home({ searchParams }: HomeProps) {
  const initialCode =
    searchValue(searchParams, "codigo") ?? searchValue(searchParams, "code") ?? searchValue(searchParams, "inv");
  const initialGuest = invitedGuests.find((guest) => guest.code === initialCode) ?? defaultGuest;
  const shouldShowSendLinks = searchValue(searchParams, "envios") === "1" || searchValue(searchParams, "admin") === "1";
  const [modal, setModal] = useState<"rsvp" | "map" | "song" | "dress" | "tips" | null>(null);
  const [musicPrompt, setMusicPrompt] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpStep, setRsvpStep] = useState(0);
  const [inviteCode, setInviteCode] = useState(initialGuest.code);
  const [showSendLinks, setShowSendLinks] = useState(shouldShowSendLinks);
  const [sentGuestCodes, setSentGuestCodes] = useState<string[]>([]);
  const [ceremonyAnswer, setCeremonyAnswer] = useState("");
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "success" | "error">("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentGuest = invitedGuests.find((guest) => guest.code === inviteCode) ?? defaultGuest;
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
    setCeremonyAnswer("");
    setIsSubmittingRsvp(false);
    setRsvpStatus("idle");
  };

  const submitRsvp = async () => {
    if (!ceremonyAnswer || isSubmittingRsvp) return;

    if (!googleSheetsEndpoint) {
      setRsvpStatus("error");
      return;
    }

    setIsSubmittingRsvp(true);
    setRsvpStatus("idle");

    const payload = {
      submittedAt: new Date().toISOString(),
      code: currentGuest.code,
      name: currentGuest.name,
      recipientType: currentGuest.isGroup ? "Grupo/Familia" : "Individual",
      answer: ceremonyAnswer,
      invitationUrl: invitationUrlFor(currentGuest),
    };

    try {
      await fetch(googleSheetsEndpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });
      setRsvpStatus("success");
      window.setTimeout(closeRsvp, 900);
    } catch {
      setRsvpStatus("error");
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  const syncSentGuestCodes = (guestCodes: string[]) => {
    if (!guestCodes.length) return;

    void fetch(googleSheetsEndpoint, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "sync-sent",
        codes: guestCodes,
        syncedAt: new Date().toISOString(),
      }),
    });
  };

  const markGuestAsSent = (guestCode: string) => {
    setSentGuestCodes((currentCodes) => {
      if (currentCodes.includes(guestCode)) return currentCodes;
      const nextCodes = [...currentCodes, guestCode];
      window.localStorage.setItem(sentGuestsStorageKey, JSON.stringify(nextCodes));
      return nextCodes;
    });
    syncSentGuestCodes([guestCode]);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedCode = params.get("codigo") ?? params.get("code") ?? params.get("inv");
    const requestedGuest = invitedGuests.find((guest) => guest.code === requestedCode);

    if (requestedGuest) {
      setInviteCode(requestedGuest.code);
    }

    setShowSendLinks(params.get("envios") === "1" || params.get("admin") === "1");
  }, []);

  useEffect(() => {
    const savedCodes = window.localStorage.getItem(sentGuestsStorageKey);
    if (!savedCodes) return;

    try {
      const parsedCodes = JSON.parse(savedCodes);
      if (Array.isArray(parsedCodes)) {
        const localCodes = parsedCodes.filter((code): code is string => typeof code === "string");
        setSentGuestCodes(localCodes);
        syncSentGuestCodes(localCodes);
      }
    } catch {
      window.localStorage.removeItem(sentGuestsStorageKey);
    }
  }, []);

  useEffect(() => {
    if (!showSendLinks) return;

    const callbackName = `__dominiqueSileidysSentStatus_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const callbacks = window as unknown as Record<string, ((payload: { sentCodes?: unknown }) => void) | undefined>;
    const script = document.createElement("script");

    callbacks[callbackName] = (payload) => {
      const remoteCodes = payload.sentCodes;
      if (!Array.isArray(remoteCodes)) return;

      setSentGuestCodes((currentCodes) => {
        const mergedCodes = new Set([
          ...currentCodes,
          ...remoteCodes.filter((code): code is string => typeof code === "string"),
        ]);
        const nextCodes = Array.from(mergedCodes);
        window.localStorage.setItem(sentGuestsStorageKey, JSON.stringify(nextCodes));
        return nextCodes;
      });
    };

    script.src = sentStatusUrlFor(callbackName);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      delete callbacks[callbackName];
      script.remove();
    };
  }, [showSendLinks]);

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
              <small>Eclesiastés 4:12</small>
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
          <img className="icono-invitados" src="/boda-paleta.gif?v=3" alt="" />
          <h3 className="titulo-grupo">{currentGuest.name}</h3>
          <p>{guestCardMessageFor(currentGuest)}</p>
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
                    loading="lazy"
                    fetchPriority="low"
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
          Dominique
          <br className="mobile-break" />
          <span>&amp;</span>
          <br className="mobile-break" />
          Sileidys
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

      {showSendLinks ? (
        <section className="seccion-principal panel-envios-whatsapp">
          <div className="content-envios-whatsapp">
            <h2 className="title">Terceros para envío</h2>
            <div className="lista-envios-whatsapp">
              {invitedGuests.map((guest) => {
                const wasSent = sentGuestCodes.includes(guest.code);

                return (
                  <article className="envio-whatsapp" key={guest.code}>
                    <div className="envio-whatsapp-info">
                      <strong>{guest.name}</strong>
                    </div>
                    <span className={wasSent ? "estado-envio estado-enviado" : "estado-envio estado-pendiente"}>
                      {wasSent ? "Enviado" : "Pendiente"}
                    </span>
                    <a
                      className="boton"
                      href={whatsappUrlFor(guest)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => markGuestAsSent(guest.code)}
                    >
                      Enviar WhatsApp
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

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
              <span>{welcomeMessageFor(currentGuest)}</span>
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
                  Estás confirmando esta invitación <span>*</span>
                </p>
                <div className="rsvp-options rsvp-guest-options">
                  <div className="rsvp-option is-selected rsvp-locked-guest">
                    <strong>{currentGuest.name}</strong>
                  </div>
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
                <p className="rsvp-guest-summary">{currentGuest.name}</p>
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
                  <button className="boton rsvp-next" type="button" onClick={submitRsvp} disabled={!ceremonyAnswer || isSubmittingRsvp}>
                    {isSubmittingRsvp ? "Enviando..." : "Enviar confirmación"}
                  </button>
                </div>
                {rsvpStatus === "success" ? (
                  <p className="rsvp-status rsvp-status-success">Confirmación enviada.</p>
                ) : null}
                {rsvpStatus === "error" ? (
                  <p className="rsvp-status rsvp-status-error">Falta conectar Google Sheets.</p>
                ) : null}
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
