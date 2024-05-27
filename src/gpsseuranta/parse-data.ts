import type { Route } from "@models/route.ts";

/**
 * Parse gps data of an orienteering live event from GPSSeuranta
 *
 * @param initData The raw string returned in the body of the response to a GET request to https://www.tulospalvelu.fi/gps/<EVENT_ID>/data.lst
 * @returns A map whose keys are competitors ids and values are competitors routes
 */
export function parseData(dataFile: string): Record<string, Route> {
  const CODE = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  const tracksMap: Record<string, Route> = {};
  let trackIndex = 0;

  dataFile
    .trim()
    .split("\n")
    .map((s) => s.trim())
    .flatMap((dataLine: string) => {
      const returnedArray: [string, number, number, number][] = [];
      const lineRawArray = dataLine.split(".");
      lineRawArray.pop();
      const id = lineRawArray[0];
      const firstPoint = lineRawArray[1].split("_");
      const time = +firstPoint[0];
      const lon = +firstPoint[1] / 50000;
      const lat = +firstPoint[2] / 100000;
      returnedArray.push([id, time + 1136070000, lon, lat]);
      const length = lineRawArray.length;

      for (let i = 2; i < length; i++) {
        if (lineRawArray[i].includes("_")) {
          const point = lineRawArray[i].split("_");
          const newTime = time + +point[0];
          const newLon = lon + +point[1] / 50000;
          const newLat = lat + +point[2] / 100000;

          returnedArray.push([id, newTime + 1136070000, newLon, newLat]);

          break;
        }

        const newTime =
          time + CODE.indexOf(lineRawArray[i].substring(0, 1)) - 31;

        const newLon =
          (lon * 50000 + CODE.indexOf(lineRawArray[i].substring(1, 2)) - 31) /
          50000;

        const newLat =
          (lat * 100000 + CODE.indexOf(lineRawArray[i].substring(2, 3)) - 31) /
          100000;

        returnedArray.push([id, newTime + 1136070000, newLon, newLat]);
      }

      return returnedArray;
    })
    .sort((point1, point2) => point1[1] - point2[1])
    .forEach(([id, time, lon, lat]) => {
      if (tracksMap[id] === undefined) {
        tracksMap[id] = {
          latitudes: [],
          longitudes: [],
          times: [],
        };

        trackIndex++;
      }

      if (tracksMap[id].times.at(-1) === time) return;

      tracksMap[id].latitudes.push(lat);
      tracksMap[id].times.push(time);
      tracksMap[id].longitudes.push(lon);
    });

  return tracksMap;
}
