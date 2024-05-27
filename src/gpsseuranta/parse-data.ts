import type { Route } from "@models/route.ts";

type Point = [number, number, number];

/**
 * Parse gps data of an orienteering live event from GPSSeuranta
 *
 * @param initData The raw string returned in the body of the response to a GET request to https://www.tulospalvelu.fi/gps/<EVENT_ID>/data.lst
 * @returns A map whose keys are competitors ids and values are competitors routes
 */
export function parseData(data: string): Record<string, Route> {
  const tracksMap: Record<string, Route> = {};
  const gpsSeurantaRawData = handle_gpsseuranta_data(data);
  const gpsSeurantaRawDataLength = gpsSeurantaRawData.length;

  type Point = [number, number, number];
  const pointsMap: Record<string, Point[]> = {};

  for (let i = 0; i < gpsSeurantaRawDataLength; i++) {
    const [id, time, lat, lon] = gpsSeurantaRawData[i];

    if (pointsMap[id] === undefined) {
      pointsMap[id] = [[+lon, +lat, +time + 1136070000]];
    } else {
      pointsMap[id].push([+lon, +lat, +time + 1136070000]);
    }
  }

  for (const id in pointsMap) {
    pointsMap[id].sort((point1, point2) => point1[2] - point2[2]);

    const pointsLength = pointsMap[id].length;
    tracksMap[id] = { latitudes: [], longitudes: [], times: [] };

    for (let i = 0; i < pointsLength; i++) {
      tracksMap[id].longitudes.push(pointsMap[id][i][0]);
      tracksMap[id].latitudes.push(pointsMap[id][i][1]);
      tracksMap[id].times.push(pointsMap[id][i][2]);
    }
  }

  return tracksMap;
}

function handle_gpsseuranta_data(gpsseuranta_data: string) {
  const rawLines: [string, number, number, number][] = [];
  var S = gpsseuranta_data.split("\n");
  var M = 1;
  let lastline: string | undefined = undefined;

  for (M = S.length - 1; M > -1; M--) {
    if (S[M].length > 10) {
      lastline = S[M];
      break;
    }
  }

  if (lastline !== undefined && lastline.length > 30) {
    lastline = lastline.substring(0, 29);
  }
  if (lastline !== undefined && lastline.length < 10) {
    lastline = "undef";
  }
  for (M = 0; M < S.length; M++) {
    var N = decode_gpsseuranta(S[M]);
    if (N != null) {
      rawLines.push(...N);
    }
  }
  return rawLines;
}

const code = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function decode_gpsseuranta(aa: string) {
  var points: [string, number, number, number][] = [];
  var O = aa.split(".");
  var id = O[0];
  if (O.length < 2) {
    return null;
  }
  var Z = O[1].split("_");
  var lon = +Z[1] / 50000;
  var lat = +Z[2] / 100000;
  var time = +Z[0] / 1;
  if (isNaN(lat) || isNaN(lon)) {
    lat = 0;
    lon = 0;
  }
  if (lon != 0 && lat != 0) {
    points.push([id, time, lat, lon]);
    var V = lat;
    var N = lon;
    var S = parseInt(time.toString());
    for (let k = 2; k < O.length; k++) {
      if (O[k].length < 3) {
        k = O.length + 1;
      } else {
        var Y = O[k].split("_");
        if (Y.length < 3) {
          time = S + code.indexOf(O[k].substring(0, 1)) - 31;
          lon = (N * 50000 + code.indexOf(O[k].substring(1, 2)) - 31) / 50000;
          lat = (V * 100000 + code.indexOf(O[k].substring(2, 3)) - 31) / 100000;
        } else {
          time = S + +Y[0] / 1;
          lon = N + +Y[1] / 50000;
          lat = V + +Y[2] / 100000;
        }
        if (!isNaN(lat) && !isNaN(lon)) {
          points.push([id, time, lat, lon]);
          V = lat;
          N = lon;
          S = time;
        }
      }
    }
  }
  return points;
}
