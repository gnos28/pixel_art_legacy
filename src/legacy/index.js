import { cellToString } from "../lib/sheet";

const _globales = {
  TABNAME_RGB_RAW: "RGB_RAW",
  TABNAME_IMAGE: "IMAGE",
};

const convertToNumber = (str) => {
  const maybeNumber = parseInt(str, 10);
  if (isNaN(maybeNumber)) return 0;
  return maybeNumber;
};

const convert10toHexa = (number10) => {
  if (typeof number10 !== "number") return "00";
  return number10.toString(16).toUpperCase().padStart(2, "0");
};

export const pixelArtUsecase = () => {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const rgbTab = spreadsheet.getSheetByName(_globales.TABNAME_RGB_RAW);
  if (rgbTab === null) throw new Error("rgbTab === null");

  const rgbRange = rgbTab.getRange(
    1,
    1,
    rgbTab.getMaxRows(),
    rgbTab.getMaxColumns()
  );
  const rgbRawValues = rgbRange.getValues();

  const rgbMatrix = rgbRawValues
    .filter((row) => cellToString(row[0]) !== "")
    .map((row) => {
      const match = cellToString(row[0]).match(/\d+ \d+ \d+/g);
      if (match === null) return [];

      return match.map((pixel) => {
        const splitPixel = pixel.split(" ");

        const rgb = {
          red: 0,
          green: 0,
          blue: 0,
        };

        if (splitPixel.length < 3) return rgb;

        rgb.red = convertToNumber(splitPixel[0]);
        rgb.green = convertToNumber(splitPixel[1]);
        rgb.blue = convertToNumber(splitPixel[2]);

        return rgb;
      });
    });

  const hexaMatrix = rgbMatrix.map((row) =>
    row.map((rgb) => {
      const { red, green, blue } = rgb;

      return `#${convert10toHexa(red)}${convert10toHexa(
        green
      )}${convert10toHexa(blue)}`;
    })
  );

  if (hexaMatrix.length === 0) return;

  const imageTab = spreadsheet.getSheetByName(_globales.TABNAME_IMAGE);
  if (imageTab === null) return;

  const imageRange = imageTab.getRange(
    1,
    1,
    hexaMatrix.length,
    hexaMatrix[0].length
  );

  imageRange.setBackgrounds(hexaMatrix);
};
