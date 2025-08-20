import fs from "fs/promises";
import { v2 as Translate } from "@google-cloud/translate";

// Create client
const translate = new Translate.Translate();

async function translateText(text, targetLang) {
  try {
    const [translation] = await translate.translate(text, targetLang);
    return translation;
  } catch (err) {
    console.error(`Error translating to ${targetLang}:`, err);
    return text; // fallback
  }
}

async function autoTranslateFile() {
  const enDataRaw = await fs.readFile("src/i18n/en.json", "utf-8");
  const enData = JSON.parse(enDataRaw);

  const siData = {};
  const taData = {};

  for (const [key, value] of Object.entries(enData)) {
    siData[key] = await translateText(value, "si"); // Sinhala
    console.log(`Translated "${key}" → Sinhala: ${siData[key]}`);

    taData[key] = await translateText(value, "ta"); // Tamil
    console.log(`Translated "${key}" → Tamil: ${taData[key]}`);
  }

  await fs.writeFile("src/i18n/si.json", JSON.stringify(siData, null, 2));
  console.log("✅ Sinhala translations saved to si.json");

  await fs.writeFile("src/i18n/ta.json", JSON.stringify(taData, null, 2));
  console.log("✅ Tamil translations saved to ta.json");
}

autoTranslateFile();
