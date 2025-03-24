import { expect } from "jsr:@std/expect";
import { parseInit } from "./parse-init.ts";

const INIT_DATA = `VERSIO:3
RACENAME:Aus Sprint | Men
TIMEZONE:660
GRABINTERVAL:15
DASHLIMIT:45
LIVEBUFFER:30
MINBEFORESTART:3
NUMBEROFLOGOS:0
LIVE:0
CALIBRATION:151.6398346|-30.4842071|741|864|151.6467386|-30.4856402|2757|923|151.6434449|-30.4895741|2099|2368
MAXTIMEMINS:30
COMPETITOR:au248|20241006|1024|Martin Dent|M Dent
COMPETITOR:au239|20241006|1058|Remi Afnan|R Afna
COMPETITOR:au237|20241006|1059|Niko Stoner|N Ston
COMPETITOR:au245|20241006|1102|Toby Wilson|T Wils
COMPETITOR:au244|20241006|1103|David Stocks|D Stoc
COMPETITOR:au240|20241006|1105|Torren Arthur|T Arth
COMPETITOR:au238|20241006|1106|Oskar Mella|O Mell
COMPETITOR:au234|20241006|1107|Owen Radajewski|O Rada
COMPETITOR:au247|20241006|1110|Leith Soden|L Sode
COMPETITOR:au242|20241006|1111|Zefa Faavae|Z Faa
COMPETITOR:au249|20241006|1113|Felix Hunt|F Hunt
COMPETITOR:au241|20241006|1114|Patrick Jaffe|P Jaff
COMPETITOR:au246|20241006|1115|Ewan Shingler|E Shin
`;

const EXPECTED = {
  mapCalibration: [
    {
      gps: { lon: 151.6398346, lat: -30.4842071 },
      point: { x: 741, y: 864 },
    },
    {
      gps: { lon: 151.6434449, lat: -30.4895741 },
      point: { x: 2099, y: 2368 },
    },
    {
      gps: { lon: 151.6467386, lat: -30.4856402 },
      point: { x: 2757, y: 923 },
    },
  ],
  competitors: [
    { id: "au248", name: "Martin Dent" },
    { id: "au239", name: "Remi Afnan" },
    { id: "au237", name: "Niko Stoner" },
    { id: "au245", name: "Toby Wilson" },
    { id: "au244", name: "David Stocks" },
    { id: "au240", name: "Torren Arthur" },
    { id: "au238", name: "Oskar Mella" },
    { id: "au234", name: "Owen Radajewski" },
    { id: "au247", name: "Leith Soden" },
    { id: "au242", name: "Zefa Faavae" },
    { id: "au249", name: "Felix Hunt" },
    { id: "au241", name: "Patrick Jaffe" },
    { id: "au246", name: "Ewan Shingler" },
  ],
  name: "Aus Sprint | Men",
};

Deno.test("Parse GPSSeuranta init response", () => {
  const result = parseInit(INIT_DATA);
  expect(result).toMatchObject(EXPECTED);
});
