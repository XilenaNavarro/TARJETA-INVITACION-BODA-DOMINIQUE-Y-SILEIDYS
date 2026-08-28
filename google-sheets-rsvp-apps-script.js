const SHEET_NAME = "Confirmaciones";
const SENT_SHEET_NAME = "Envios";
const GUESTS = {
  "inv-001": {"name": "Familia Navarro Perez", "isGroup": true, "phone": "3105692536"},
  "inv-002": {"name": "Familia Navarro Aguas", "isGroup": true, "phone": "3134015707"},
  "inv-003": {"name": "Familia Jeschke", "isGroup": true, "phone": ""},
  "inv-004": {"name": "Familia Ramirez", "isGroup": true, "phone": "3004398352"},
  "inv-005": {"name": "Familia Villanueva", "isGroup": true, "phone": "3116609922"},
  "inv-006": {"name": "Familia Herrera", "isGroup": true, "phone": "3147192242"},
  "inv-007": {"name": "Maria Isabel Jaramillo", "isGroup": false, "phone": "3013526529"},
  "inv-008": {"name": "Familia Gayoso", "isGroup": true, "phone": "3118736328"},
  "inv-009": {"name": "Familia Gonzalez", "isGroup": true, "phone": "3116566452"},
  "inv-010": {"name": "Familia Montaño", "isGroup": true, "phone": "3022889186"},
  "inv-011": {"name": "Familia Barrios", "isGroup": true, "phone": "3004726675"},
  "inv-012": {"name": "Familia Romero", "isGroup": true, "phone": "3103699114"},
  "inv-013": {"name": "Xiomara Guzman", "isGroup": false, "phone": "3005515015"},
  "inv-014": {"name": "Familia Hernandez", "isGroup": true, "phone": "3008177104"},
  "inv-015": {"name": "Familia Perez", "isGroup": true, "phone": "3126526828"},
  "inv-016": {"name": "Familia Pretel Guzman", "isGroup": true, "phone": "3157422178"},
  "inv-017": {"name": "Familia Valbuena", "isGroup": true, "phone": "3157422178"},
  "inv-018": {"name": "Familia Delgado", "isGroup": true, "phone": "3017007090"},
  "inv-019": {"name": "Familia Vasquez", "isGroup": true, "phone": "3015245812"},
  "inv-020": {"name": "Familia Pretel", "isGroup": true, "phone": "3003723802"},
  "inv-021": {"name": "Familia Ramirez", "isGroup": true, "phone": "3167654773"},
  "inv-022": {"name": "Familia Marquez", "isGroup": true, "phone": "3057905496"},
  "inv-023": {"name": "Familia Berdugo", "isGroup": true, "phone": "3008173147"},
  "inv-024": {"name": "Carmen Cecilia Orozco", "isGroup": false, "phone": "3186379349"},
  "inv-025": {"name": "Familia Ortiz", "isGroup": true, "phone": "3133604959"},
  "inv-026": {"name": "Familia Peña", "isGroup": true, "phone": "3054885061"},
  "inv-027": {"name": "Leidys Florez", "isGroup": false, "phone": "3013979967"},
  "inv-028": {"name": "Familia Carrascal", "isGroup": true, "phone": "3182737501"},
  "inv-029": {"name": "Familia Martinez", "isGroup": true, "phone": "3015971598"},
  "inv-030": {"name": "Familia Prado", "isGroup": true, "phone": "3205091630"},
  "inv-031": {"name": "Melania Montero", "isGroup": false, "phone": "3015562748"},
  "inv-032": {"name": "Familia Peñaloza", "isGroup": true, "phone": "3145660130"},
  "inv-033": {"name": "Familia Lossada", "isGroup": true, "phone": "3027486702"},
  "inv-034": {"name": "Familia Pinzon", "isGroup": true, "phone": "3005712750"},
  "inv-035": {"name": "Rosmira y Gina", "isGroup": true, "phone": "3016131931"},
  "inv-036": {"name": "Betsy Liscano", "isGroup": false, "phone": "3106588041"},
  "inv-037": {"name": "Familia Aristizabal", "isGroup": true, "phone": "3212934406"},
  "inv-038": {"name": "Familia Perez Carrascal", "isGroup": true, "phone": "3182987852"},
  "inv-039": {"name": "Stella y Henry", "isGroup": true, "phone": "3007779800"},
  "inv-040": {"name": "Familia Villada", "isGroup": true, "phone": ""},
  "inv-041": {"name": "Familia Castillo", "isGroup": true, "phone": "3133059579"},
  "inv-042": {"name": "Familia Tinoco", "isGroup": true, "phone": "3226826432"},
  "inv-043": {"name": "Familia Herrera", "isGroup": true, "phone": "3202335528"},
  "inv-044": {"name": "Familia Acuña", "isGroup": true, "phone": "3183308407"},
  "inv-045": {"name": "Familia Herrera Alean", "isGroup": true, "phone": "3162218146"},
  "inv-046": {"name": "Familia Patiño", "isGroup": true, "phone": "3188273735"},
  "inv-047": {"name": "Familia Castañeda", "isGroup": true, "phone": "3138709775"},
  "inv-048": {"name": "Familia Hurtado", "isGroup": true, "phone": "3167658564"},
  "inv-049": {"name": "Familia Daza", "isGroup": true, "phone": "3172242275"},
  "inv-050": {"name": "Familia Martínez", "isGroup": true, "phone": "3044907601"},
  "inv-051": {"name": "Familia Ortiz Carrascal", "isGroup": true, "phone": "3167348259"},
  "inv-052": {"name": "Familia Polo", "isGroup": true, "phone": "3154211053"},
  "inv-053": {"name": "Isabel Carrascal", "isGroup": false, "phone": "3169388078"},
  "inv-054": {"name": "Familia Solano", "isGroup": true, "phone": "3012153434"},
  "inv-055": {"name": "Familia Perez Pretel", "isGroup": true, "phone": "3135244506"},
  "inv-056": {"name": "Juliana Marquez", "isGroup": false, "phone": "3225725615"},
  "inv-057": {"name": "Abadis Castañez", "isGroup": false, "phone": "3106850812"},
  "inv-058": {"name": "Evarista Acosta", "isGroup": false, "phone": "3053075088"},
  "inv-059": {"name": "Marta Castellar", "isGroup": false, "phone": "3107240866"},
  "inv-060": {"name": "Familia Pavajau", "isGroup": true, "phone": "3163357721"},
  "inv-061": {"name": "Adriana e hijos", "isGroup": true, "phone": "3007466343"},
  "inv-062": {"name": "Familia Ramirez", "isGroup": true, "phone": "3245361351"},
  "inv-063": {"name": "Elsy Castro", "isGroup": false, "phone": "3182095575"},
  "inv-064": {"name": "Everlides Requena", "isGroup": false, "phone": "3008165258"},
  "inv-065": {"name": "Fidelina Gutierrez", "isGroup": false, "phone": "3234129341"},
  "inv-066": {"name": "Iromaldis", "isGroup": false, "phone": "3172370966"},
  "inv-067": {"name": "Familia Fajardo", "isGroup": true, "phone": "3157384576"},
  "inv-068": {"name": "Jaqueline Trigos", "isGroup": false, "phone": "3002049883"},
  "inv-069": {"name": "Josefina Polo", "isGroup": false, "phone": "3006407869"},
  "inv-070": {"name": "Familia Amesti", "isGroup": true, "phone": "3115579913"},
  "inv-071": {"name": "Luz Marina Acosta", "isGroup": false, "phone": "3187895570"},
  "inv-072": {"name": "Familia Angulo", "isGroup": true, "phone": "3152470018"},
  "inv-073": {"name": "Socorro de Lora", "isGroup": false, "phone": "3014597124"},
  "inv-074": {"name": "Stella Fernanda Perez", "isGroup": false, "phone": "3128928188"},
  "inv-075": {"name": "Familia Pacheco", "isGroup": true, "phone": "3008526570"},
  "inv-076": {"name": "Familia Bermudez", "isGroup": true, "phone": "3007794049"},
  "inv-077": {"name": "Familia Palacios", "isGroup": true, "phone": "3162865973"},
  "inv-078": {"name": "Osiris Meza", "isGroup": false, "phone": ""},
  "inv-079": {"name": "Omaira", "isGroup": false, "phone": ""},
  "inv-080": {"name": "Familia Guio", "isGroup": true, "phone": ""},
  "inv-081": {"name": "Angelina Berdugo", "isGroup": false, "phone": "3155731547"},
  "inv-082": {"name": "Beatriz y Debbie", "isGroup": true, "phone": "3154046930"},
  "inv-083": {"name": "Nini", "isGroup": false, "phone": "3004093173"},
  "inv-084": {"name": "Familia Hernandez", "isGroup": true, "phone": "3184422739"},
  "inv-085": {"name": "Familia Fontanilla", "isGroup": true, "phone": "3017741936"},
  "inv-086": {"name": "Familia Martinez", "isGroup": true, "phone": "3007765551"},
  "inv-087": {"name": "Alix Castañez", "isGroup": false, "phone": "3006103777"},
  "inv-088": {"name": "Edicson Jimenez", "isGroup": false, "phone": "3113927377"},
  "inv-089": {"name": "Daniel Garcia", "isGroup": false, "phone": "3004820292"},
  "inv-090": {"name": "Familia Brito", "isGroup": true, "phone": "3105208796"},
  "inv-091": {"name": "Familia Obreo", "isGroup": true, "phone": "3182483104"},
  "inv-092": {"name": "Familia Diaz", "isGroup": true, "phone": "3016311584"},
  "inv-093": {"name": "Familia Eguis", "isGroup": true, "phone": "3006937733"},
  "inv-094": {"name": "Familia Villegas", "isGroup": true, "phone": "3169183479"},
  "inv-095": {"name": "Maria Moreno", "isGroup": false, "phone": "3108931724"},
  "inv-096": {"name": "Mildreth y Virni", "isGroup": true, "phone": "3114675112"},
  "inv-097": {"name": "Familia Navarro Coronel", "isGroup": true, "phone": "3185726652"},
  "inv-098": {"name": "Familia Coronel", "isGroup": true, "phone": "3024289129"},
  "inv-099": {"name": "Familia Martelo", "isGroup": true, "phone": "3217541154"},
  "inv-100": {"name": "Nora Torres", "isGroup": false, "phone": "3158007070"},
  "inv-101": {"name": "Maria Iuminada", "isGroup": false, "phone": "3222570019"},
  "inv-102": {"name": "Familia Mercado", "isGroup": true, "phone": "3016081140"},
  "inv-103": {"name": "Marisol e hijo", "isGroup": true, "phone": "3206883170"},
  "inv-104": {"name": "Familia Arrollo", "isGroup": true, "phone": "3016321889"},
  "inv-105": {"name": "Jaime Martinez", "isGroup": false, "phone": "3057479415"},
  "inv-106": {"name": "Georgina Villadiego", "isGroup": false, "phone": "3022131658"},
  "inv-107": {"name": "Eugenia Gonzalez", "isGroup": false, "phone": "3023605342"},
  "inv-108": {"name": "Familia Martinez", "isGroup": true, "phone": "3016800545"},
  "inv-109": {"name": "Familia Sanchez", "isGroup": true, "phone": "3014598761"},
  "inv-110": {"name": "Clara Mandon", "isGroup": false, "phone": "3052928218"},
  "inv-111": {"name": "Cindy", "isGroup": false, "phone": "3207138242"},
  "inv-112": {"name": "Barbara y familia", "isGroup": true, "phone": "3016847234"},
  "inv-113": {"name": "Anayibis Rada", "isGroup": false, "phone": "3148404944"},
  "inv-114": {"name": "Ana Maria Guarnizo", "isGroup": false, "phone": "3153012533"},
  "inv-115": {"name": "Andrea Bernal", "isGroup": false, "phone": "3014024937"},
  "inv-116": {"name": "Gema", "isGroup": false, "phone": ""},
  "inv-117": {"name": "Leonor Maldonado", "isGroup": false, "phone": "3145970605"},
  "inv-118": {"name": "Maria Iluminada", "isGroup": false, "phone": "3222570019"},
  "inv-119": {"name": "Familia Perez", "isGroup": true, "phone": "3116593068"},
  "inv-120": {"name": "Familia Granados", "isGroup": true, "phone": "3242456946"},
  "inv-121": {"name": "Belkis Urbina", "isGroup": false, "phone": "3019794424"},
  "inv-122": {"name": "Saury Morales", "isGroup": false, "phone": "3218827030"},
  "inv-123": {"name": "Familia Ariz", "isGroup": true, "phone": "3226682504"},
  "inv-124": {"name": "Familia Parra", "isGroup": true, "phone": "3007564634"},
  "inv-125": {"name": "Diosmaira Barela", "isGroup": false, "phone": ""},
  "inv-126": {"name": "Mailin", "isGroup": false, "phone": "3244146600"},
  "inv-127": {"name": "Familia Rodriguez", "isGroup": true, "phone": "3153525539"},
  "inv-128": {"name": "Rita Mercado", "isGroup": false, "phone": "3116775993"},
  "inv-129": {"name": "Jessica Ballestas", "isGroup": false, "phone": "3222937849"},
  "inv-130": {"name": "Maisa", "isGroup": false, "phone": "3247393996"},
  "inv-131": {"name": "Antonella", "isGroup": false, "phone": ""},
  "inv-132": {"name": "Familia Ramirez", "isGroup": true, "phone": "3017993471"},
  "inv-133": {"name": "Jairo Torregrosa", "isGroup": false, "phone": "3178873495"},
  "inv-134": {"name": "Familia Lara Ortiz", "isGroup": true, "phone": "3117095698"},
  "inv-135": {"name": "Familia Navarro Lara", "isGroup": true, "phone": "3107009192"},
  "inv-136": {"name": "Familia Lara Rodriguez", "isGroup": true, "phone": "3138306522"},
  "inv-137": {"name": "Familia Koslowski", "isGroup": true, "phone": ""},
  "inv-138": {"name": "Familia Jeschke", "isGroup": true, "phone": ""},
  "inv-139": {"name": "Familia Liedloff", "isGroup": true, "phone": ""},
  "inv-140": {"name": "Xilena Navarro", "isGroup": false, "phone": "3126708644"},
  "inv-143": {"name": "Familia Herrera Torregrosa", "isGroup": true, "phone": ""},
};
const PUBLIC_INVITATION_URL = "https://invitacion-boda-sileidys.vercel.app";
const SHARE_PREVIEW_VERSION = "20260824b";

function doGet(event) {
  const params = event.parameter || {};

  if (params.action === "whatsapp") {
    return redirectToWhatsapp(params.code || "");
  }

  if (params.action === "sent-status") {
    return jsonpOutput(params.callback || "", { ok: true, sentCodes: getSentCodes() });
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(event) {
  const data = JSON.parse((event.postData && event.postData.contents) || "{}");

  if (data.action === "sync-sent") {
    markWhatsappSentCodes(Array.isArray(data.codes) ? data.codes : []);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = getConfirmationsSheet();
  upsertConfirmation(sheet, data);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function redirectToWhatsapp(code) {
  const guest = GUESTS[code];

  if (!guest) {
    return HtmlService.createHtmlOutput("Invitado no encontrado.");
  }

  if (!guest.phone) {
    return HtmlService.createHtmlOutput("Este invitado no tiene telefono cargado.");
  }

  markWhatsappSent(code, guest);

  const message = [
    guest.name,
    invitationMessageFor(guest),
    invitationUrlFor(code),
  ].join("\n\n");

  const whatsappUrl = "https://api.whatsapp.com/send?phone=57" + guest.phone + "&text=" + encodeURIComponent(message);
  const escapedUrl = JSON.stringify(whatsappUrl);

  return HtmlService.createHtmlOutput(
    "<!doctype html><html><head><meta charset=\"utf-8\"><base target=\"_top\"></head>" +
    "<body style=\"font-family: Arial, sans-serif; padding: 28px; text-align: center; color:#405451;\">" +
    "<h2 style=\"margin:0 0 12px;\">Invitacion lista</h2>" +
    "<p style=\"margin:0 0 22px;\">Toca el boton para abrir WhatsApp y enviar el mensaje.</p>" +
    "<p><a id=\"whatsappLink\" href=\"" + whatsappUrl + "\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:14px 22px;border-radius:999px;background:#405451;color:white;text-decoration:none;font-weight:700;\">Abrir WhatsApp</a></p>" +
    "<p style=\"margin-top:18px;font-size:13px;color:#7a8581;\">Si WhatsApp no se abre automaticamente, usa el boton.</p>" +
    "<script>setTimeout(function () { try { window.open(" + escapedUrl + ", '_blank', 'noopener'); } catch (error) {} }, 300);</script>" +
    "</body></html>"
  );
}

function invitationUrlFor(code) {
  return PUBLIC_INVITATION_URL + "/" + encodeURIComponent(code) + "?v=" + encodeURIComponent(SHARE_PREVIEW_VERSION);
}

function invitationMessageFor(guest) {
  return guest.isGroup
    ? "Queremos que sean parte de uno de los días más importantes para nosotros. Nos hará muy felices compartirlo con ustedes."
    : "Queremos que seas parte de uno de los días más importantes para nosotros. Nos hará muy felices compartirlo contigo.";
}

function jsonpOutput(callback, payload) {
  if (!/^[A-Za-z_$][\w$]*$/.test(callback)) {
    return ContentService
      .createTextOutput(JSON.stringify(payload))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(callback + "(" + JSON.stringify(payload) + ");")
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function getSentCodes() {
  const sheet = getSentSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return [];
  }

  return sheet
    .getRange(2, 2, lastRow - 1, 1)
    .getValues()
    .flat()
    .filter(function (code) {
      return typeof code === "string" && code;
    });
}

function markWhatsappSent(code, guest) {
  const sheet = getSentSheet();
  const lastRow = sheet.getLastRow();
  const now = new Date();

  if (lastRow >= 2) {
    const codes = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
    for (var index = 0; index < codes.length; index += 1) {
      if (codes[index][0] === code) {
        sheet.getRange(index + 2, 1, 1, 5).setValues([[
          now,
          code,
          guest.name,
          guest.isGroup ? "Grupo/Familia" : "Individual",
          guest.phone,
        ]]);
        return;
      }
    }
  }

  sheet.appendRow([
    now,
    code,
    guest.name,
    guest.isGroup ? "Grupo/Familia" : "Individual",
    guest.phone,
  ]);
}

function markWhatsappSentCodes(codes) {
  codes.forEach(function (code) {
    const guest = GUESTS[code];
    if (guest) {
      markWhatsappSent(code, guest);
    }
  });
}

function upsertConfirmation(sheet, data) {
  const code = data.code || "";
  const row = [
    new Date(),
    code,
    data.name || "",
    data.recipientType || "",
    data.answer || "",
    data.invitationUrl || "",
    data.submittedAt || "",
  ];

  const existingRow = findRowByCode(sheet, code);

  if (existingRow) {
    sheet.getRange(existingRow, 1, 1, row.length).setValues([row]);
    return;
  }

  sheet.appendRow(row);
}

function findRowByCode(sheet, code) {
  const lastRow = sheet.getLastRow();

  if (!code || lastRow < 2) {
    return 0;
  }

  const codes = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  for (var index = 0; index < codes.length; index += 1) {
    if (codes[index][0] === code) {
      return index + 2;
    }
  }

  return 0;
}

function getSentSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SENT_SHEET_NAME) || spreadsheet.insertSheet(SENT_SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Fecha envio",
      "Codigo",
      "Invitado",
      "Tipo invitado",
      "Telefono",
    ]);
  }

  return sheet;
}

function getConfirmationsSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Fecha recibida",
      "Codigo",
      "Invitado",
      "Tipo invitado",
      "Respuesta",
      "Enlace invitacion",
      "Fecha navegador",
    ]);
  }

  return sheet;
}
