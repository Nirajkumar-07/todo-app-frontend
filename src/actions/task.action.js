import axios from "axios";
import handleErrors from "./common.action";
import { z } from "zod";
import { addTask, updateTask } from "../service/task.service";
import dayjs from "dayjs";

const taskSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  dateTime: z
    .string()
    .transform((val) => dayjs(val).format("YYYY-MM-DD HH:mm:ss")),
});

export async function addUpdateTask(mode, taskId, prevState, formData) {
  const form = taskSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    dateTime: formData.get("dateTime"),
  });

  if (!form.success) {
    return {
      success: false,
      errors: z.flattenError(form.error).fieldErrors,
    };
  }

  const body = {
    title: form.data.title,
    description: form.data.description,
    dateTime: form.data.dateTime,
  };

  const call = async function () {
    if (mode === "Add") {
      return await addTask(body);
    } else if (mode === "Update") {
      return await updateTask(taskId, body);
    }
  };

  const res = await call();
  return res;
}
