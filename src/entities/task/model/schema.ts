import z from "zod";
import { TASK_PRIORITY_KEYS, TASK_STATUSE_KEYS } from "./task.type";

export const taskSchema = z.object({
  title: z
    .string()
    .min(5, { error: "Title should have at least 5 characters" }),
  description: z.string().max(500).optional(),
  status: z.preprocess(
    (val) =>
      val && typeof val === "object" && "value" in val ? val.value : val,
    z.enum(TASK_STATUSE_KEYS, { error: "Status is required" })
  ),
  priority: z.enum(TASK_PRIORITY_KEYS, {
    error: "Priority is required",
  }),
  deadline: z.preprocess((val) => {
    if (val instanceof Date) {
      return val.toISOString();
    }
    return val;
  }, z.string().datetime({ message: "Deadline is required" })),
  tags: z.array(z.string()).min(1, "At least one tag must be selected"),
});
