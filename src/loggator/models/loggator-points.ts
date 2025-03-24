import { z } from "zod";

export const pointsSchema = z.object({ data: z.string() });

export type Points = z.infer<typeof pointsSchema>;
