/* eslint-disable @typescript-eslint/no-unused-vars */
import { pixelArtUsecase } from "./legacy";
import { uberLogger } from "./lib/uberLogger";

const onOpen = () => {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("SCRIPTS").addItem("🔁 pixel art", "runPixelArt").addToUi();
};

const runPixelArt = () => {
  uberLogger.init({ tabName: "LOGS" });
  try {
    pixelArtUsecase();
  } catch (error) {
    uberLogger.error((error as Error).toString());
  }
};
