const SHEET_NAME = "Flashcards";

function doGet(e) {
  const action = e.parameter.action;
  let result;

  try {
    if (action === "getAll") {
      result = getAllCards();
    } else if (action === "setAprendido") {
      result = setAprendido(parseInt(e.parameter.row), e.parameter.value === "true");
    } else if (action === "resetAll") {
      result = resetAll();
    } else {
      result = { success: false, error: "Unknown action: " + action };
    }
  } catch (err) {
    result = { success: false, error: err.toString() };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  return doGet(e);
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange(1, 1, 1, 7).setValues([[
      "Chino", "Pinyin", "Español", "Frase_Chino", "Frase_Pinyin", "Frase_Español", "Aprendido"
    ]]);
    sheet.getRange(1, 1, 1, 7).setFontWeight("bold");
  }
  return sheet;
}

function getAllCards() {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return { success: true, cards: [] };
  const data = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
  const cards = data
    .map((row, i) => ({
      row: i + 2,
      chino: row[0] ? row[0].toString() : "",
      pinyin: row[1] ? row[1].toString() : "",
      espanol: row[2] ? row[2].toString() : "",
      fraseChino: row[3] ? row[3].toString() : "",
      frasePinyin: row[4] ? row[4].toString() : "",
      fraseEspanol: row[5] ? row[5].toString() : "",
      aprendido: row[6] === true || row[6] === "TRUE"
    }))
    .filter(c => c.chino !== "");
  return { success: true, cards };
}

function setAprendido(row, value) {
  const sheet = getSheet();
  sheet.getRange(row, 7).setValue(value);
  return { success: true };
}

function resetAll() {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return { success: true };
  for (let i = 2; i <= lastRow; i++) {
    sheet.getRange(i, 7).setValue(false);
  }
  return { success: true };
}
