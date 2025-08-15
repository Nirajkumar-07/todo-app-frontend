import * as userService from "../service/user.service";
import { z } from "zod";

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmNewPassword: z
    .string()
    .refine((val) => (val === false ? false : true)),
});

export async function changePassword(prevState, formData) {
  const form = changePasswordSchema.safeParse({
    currentPassword: formData.get("current-password"),
    newPassword: formData.get("new-password"),
    confirmNewPassword:
      formData.get("confirm-password") === formData.get("new-password")
        ? formData.get("confirm-password")
        : false,
  });

  if (!form.success) {
    return {
      success: false,
      errors: z.flattenError(form.error).fieldErrors,
    };
  }

  const body = {
    currentPassword: form.data.currentPassword,
    newPassword: form.data.newPassword,
    confirmNewPassword: form.data.confirmNewPassword,
  };

  const res = await userService.changePassword(body);
  return res;
}
