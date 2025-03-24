import type { z } from "zod";

export type PointsSchemaType = z.ZodObject<
  {
    data: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    data: string;
  },
  {
    data: string;
  }
>;
