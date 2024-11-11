/* eslint-disable @typescript-eslint/no-unused-vars */
import { pixelArt } from "./legacy";
import { uberLogger } from "./lib/uberLogger";

const onOpen = () => {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("SCRIPTS").addItem("🔁 pixel art", "runPixelArt").addToUi();
};

const runPixelArt = () => {
  uberLogger.init({ tabName: "LOGS" });
  try {
    pixelArt();
  } catch (error) {
    uberLogger.error((error as Error).toString());
  }
};
