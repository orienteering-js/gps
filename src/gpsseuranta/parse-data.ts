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

  const pointsMap: Record<string, Point[]> = {};

  for (let i = 0; i < gpsSeurantaRawDataLength; i++) {
    const [id, time, lat, lon] = gpsSeurantaRawData[i].split(";");

    if (pointsMap[id] === undefined) {
      pointsMap[id] = [[+lon, +lat, +time + 1136070000]];
    } else {
      pointsMap[id].push([+lon, +lat, +time + 1136070000]);
    }
  }

  for (const id in pointsMap) {
    pointsMap[id].sort(sortingFunction);

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

const sortingFunction = (point1: Point, point2: Point) => point1[2] - point2[2];

function handle_gpsseuranta_data(Q: string) {
  var O: string[] = new Array();
  var S = Q.split("\n");
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
    var R = S[M].split(".");
    var N = decode_gpsseuranta(S[M]);
    if (N != null) {
      O = O.concat(N);
    }
  }
  return O;
}

function decode_gpsseuranta(aa: string) {
  var Q: string[] = new Array();
  var O = aa.split(".");
  var X = O[0];
  if (O.length < 2) {
    return null;
  }
  var Z = O[1].split("_");
  var M = +Z[1] / 50000;
  var U = +Z[2] / 100000;
  var R = +Z[0] / 1;
  if (isNaN(U) || isNaN(M)) {
    U = 0;
    M = 0;
  }
  if (M != 0 && U != 0) {
    var W = X + ";" + R.toFixed().padStart(12, "0") + ";" + U + ";" + M + "\n";
    Q.push(W);
    var T = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var V = U;
    var N = M;
    var S = parseInt(R.toString());
    for (let k = 2; k < O.length; k++) {
      if (O[k].length < 3) {
        k = O.length + 1;
      } else {
        var Y = O[k].split("_");
        if (Y.length < 3) {
          R = S + T.indexOf(O[k].substring(0, 1)) - 31;
          M = (N * 50000 + T.indexOf(O[k].substring(1, 2)) - 31) / 50000;
          U = (V * 100000 + T.indexOf(O[k].substring(2, 3)) - 31) / 100000;
        } else {
          R = S + +Y[0] / 1;
          M = N + +Y[1] / 50000;
          U = V + +Y[2] / 100000;
        }
        var W: string;
        if (isNaN(U) || isNaN(M)) {
        } else {
          W =
            X + ";" + R.toFixed().padStart(12, "0") + ";" + U + ";" + M + "\n";
          Q.push(W);
          V = U;
          N = M;
          S = R;
        }
      }
    }
  }
  return Q;
}
