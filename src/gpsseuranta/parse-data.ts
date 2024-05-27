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
    pointsMap[id].sort(sortFunction);

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

const sortFunction = (point1: Point, point2: Point) => point1[2] - point2[2];

function handle_gpsseuranta_data(gpsseuranta_data: string) {
  const points: [string, number, number, number][] = [];
  const rawLines = gpsseuranta_data.split("\n");
  const rawLinesLength = rawLines.length;

  for (let i = 0; i < rawLinesLength; i++) {
    const decodedLines = decode_gpsseuranta(rawLines[i]);

    if (decodedLines != null) {
      points.push(...decodedLines);
    }
  }

  return points;
}

const code = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function decode_gpsseuranta(rawLine: string) {
  const points: [string, number, number, number][] = [];
  const splitedLine = rawLine.split(".");
  const id = splitedLine[0];

  if (splitedLine.length < 2) return null;

  const rawPoint = splitedLine[1].split("_");
  let lon = +rawPoint[1] / 50000;
  let lat = +rawPoint[2] / 100000;
  let time = +rawPoint[0] / 1;

  if (isNaN(lat) || isNaN(lon)) {
    lat = 0;
    lon = 0;
  }

  if (lon != 0 && lat != 0) {
    points.push([id, time, lat, lon]);

    var V = lat;
    var N = lon;
    var S = parseInt(time.toString());

    for (let k = 2; k < splitedLine.length; k++) {
      if (splitedLine[k].length < 3) {
        k = splitedLine.length + 1;
      } else {
        var Y = splitedLine[k].split("_");

        if (Y.length < 3) {
          time = S + code.indexOf(splitedLine[k].substring(0, 1)) - 31;
          lon =
            (N * 50000 + code.indexOf(splitedLine[k].substring(1, 2)) - 31) /
            50000;
          lat =
            (V * 100000 + code.indexOf(splitedLine[k].substring(2, 3)) - 31) /
            100000;
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
