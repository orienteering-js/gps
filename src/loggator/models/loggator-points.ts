import { z } from "zod";
import type { PointsSchemaType } from "./loggator-points.models.ts";

export const pointsSchema: PointsSchemaType = z.object({ data: z.string() });

export type Points = z.infer<typeof pointsSchema>;
