import { z } from "zod";

/**
 * Zod schema of event property of returned object of the Loggator event API
 */
export const internalEventSchema = z.object({
  id: z.number(),
  name: z.string(),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  publish_date: z.string().datetime(),
  map_id: z.number(),
  slug: z.string(),
});

/**
 * Zod schema of competitor property of returned object of the Loggator event API
 */
export const competitorSchema = z.object({
  id: z.number(),
  device_id: z.number(),
  name: z.string(),
  marker_color: z.string(),
  shortname: z.string(),
  startnumber: z.any().optional(),
  start_time: z.string().datetime(),
  position: z.number(),
  end_time: z.string().datetime(),
  club: z.string(),
  tags: z.array(z.any()),
  device_battery: z.number(),
});

/**
 * Zod schema of settings property of returned object of the Loggator event API
 */
export const settingsSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
  zoom: z.string(),
  tail_length: z.string(),
  replay_speed: z.string(),
  live_delay: z.string(),
  publish_competitors: z.string(),
  show_battery_info: z.string(),
  show_distance_info: z.string(),
  show_relative_time: z.string(),
});

/**
 * Zod schema of point property of returned object of the Loggator event API
 */
export const pointSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

/**
 * Zod schema of coordinates property of returned object of the Loggator event API
 */
export const coordinatesSchema = z.object({
  bottomLeft: pointSchema,
  bottomRight: pointSchema,
  topRight: pointSchema,
  topLeft: pointSchema,
});

/**
 * Zod schema of map property of returned object of the Loggator event API
 */
export const mapSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
  coordinates: coordinatesSchema,
  tiles: z.string(),
  name: z.string(),
});

/**
 * Zod schema of returned object of the Loggator event API
 */
export const eventSchema = z.object({
  event: internalEventSchema,
  competitors: z.array(competitorSchema),
  tracks: z.string(),
  settings: settingsSchema,
  map: z.union([mapSchema, z.object({})]),
  overlays: z.array(z.any()),
});

export type InternalEvent = z.infer<typeof internalEventSchema>;
export type Competitor = z.infer<typeof competitorSchema>;
export type Settings = z.infer<typeof settingsSchema>;
export type Point = z.infer<typeof pointSchema>;
export type Coordinates = z.infer<typeof coordinatesSchema>;
export type Map = z.infer<typeof mapSchema>;
export type Event = z.infer<typeof eventSchema>;
