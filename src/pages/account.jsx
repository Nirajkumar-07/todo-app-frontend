import { useSelector } from "react-redux";
import { selectUser } from "../features/user/user";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import PasswordTextField from "../components/ui/password-textfield";
import { Button } from "@mui/material";
import { useActionState, useEffect } from "react";
import { changePassword } from "../actions/user.action";
import { useNavigate } from "react-router";

export default function Account() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [state, formAction] = useActionState(changePassword, undefined);

  useEffect(() => {
    if (state && state.success) {
      sessionStorage.clear();
      navigate("/signin");
    }
  }, [state]);

  return (
    <div className="w-full h-full flex flex-col gap-4 px-2 lg:px-4 bg-gray-50 py-2">
      <div>
        <h2 className="capitalize text-2xl lg:text-3xl border-none font-medium overflow-y-auto">
          Account
        </h2>
      </div>
      <div className="w-full h-full border rounded-md p-2 lg:p-4">
        <div className="bg-white rounded-md">
          <Tabs defaultValue="user">
            <TabsList className="grid grid-cols-2 pt-3">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="change-password">Change Password</TabsTrigger>
            </TabsList>
            <TabsContent value="user" className="px-2 lg:px-4 pb-3 pt-2">
              <div className="w-full grid content-start gap-2">
                <h3 className="text-xl lg:text-2xl font-medium mb-2">
                  {user?.username || "Username"}
                </h3>
                <div className="table">
                  <span>Email : </span>
                  <span>{user?.email || "user email"}</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="change-password"
              className="px-2 lg:px-4 pb-3 pt-2"
            >
              <div className="w-full">
                <form action={formAction} className="w-full">
                  <div className="w-full grid gap-4">
                    <div className="w-full flex max-lg:flex-col gap-4">
                      <PasswordTextField
                        name="current-password"
                        label="Current Password"
                        placeholder="Enter Current Password"
                        className="w-full"
                        error={state?.errors?.currentPassword ? true : false}
                        autoFocus
                        required
                      />
                      <PasswordTextField
                        name="new-password"
                        label="New Password"
                        placeholder="Enter New Password"
                        error={state?.errors?.newPassword ? true : false}
                        className="w-full"
                        required
                      />
                      <PasswordTextField
                        name="confirm-password"
                        label="Confirm New Password"
                        placeholder="Enter Confirm New Password"
                        className="w-full"
                        error={state?.errors?.confirmNewPassword ? true : false}
                        helperText={
                          state?.errors?.confirmNewPassword
                            ? "Confirm password mismatch"
                            : undefined
                        }
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button color="success" variant="contained" type="submit">
                        Save
                      </Button>
                    </div>
                    {state && !state.success && state.message && (
                      <p className="text-sm text-red-500">{state.message}</p>
                    )}
                  </div>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
