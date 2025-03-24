import type { Points } from "./models/loggator-points.ts";

type RunnerTrack = {
  lats: number[];
  lons: number[];
  times: number[];
};

/**
 * Parse gps data of a live event from Loggator
 *
 * @param points A string containing the gps data for a Loggator livevent
 * @returns A map whose keys are competitors ids and values are competitors routes
 */
export function getTracksMapFromLoggatorData(
  points: Points
): Record<string, RunnerTrack> {
  const tracksMap: Record<string, RunnerTrack> = {};
  let trackIndex = 0;

  points.data.split(";").forEach((point) => {
    const [deviceId, ...rest] = point.split(",");

    if (deviceId === undefined || rest.length !== 5)
      throw new Error("Wrong format for loggator points");

    const [lat, lon, _, time] = rest.map((str) => {
      const num = parseFloat(str);
      if (isNaN(num)) throw new Error("Wrong format for loggator points");
      return num;
    });

    if (tracksMap[deviceId] === undefined) {
      tracksMap[deviceId] = {
        times: [],
        lats: [],
        lons: [],
      };

      trackIndex++;
    }

    tracksMap[deviceId].lats.push(lat);
    tracksMap[deviceId].times.push(time);
    tracksMap[deviceId].lons.push(lon);
  });

  return tracksMap;
}
