import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserImage } from "../features/user/user";
import avatar from "../assets/images/avatar.jpg";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import PasswordTextField from "../components/ui/password-textfield";
import { Button, IconButton } from "@mui/material";
import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { changePassword } from "../actions/user.action";
import { useNavigate } from "react-router";
import { uploadImage } from "../service/user.service";
import { CloudUploadIcon, Edit, Edit2 } from "lucide-react";
import styled from "@emotion/styled";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import Cropperjs from "cropperjs";
import "cropperjs/dist/cropper.css";
import browserCompression from "browser-image-compression";
import Loader from "../components/loader";
import { useFormStatus } from "react-dom";

const VisuallyHiddenInput = styled("input")({
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  display: "none",
});

export default function Account() {
  const dispatch = useDispatch();
  const cropperRef = useRef();
  const imageRef = useRef();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [imageDialog, setImageDialog] = useState({
    url: null,
    name: null,
    open: false,
  });
  const [state, formAction, isPending] = useActionState(
    changePassword,
    undefined
  );

  useEffect(() => {
    if (state && state.success) {
      sessionStorage.clear();
      navigate("/signin");
    }
  }, [state]);

  const handleImageLoad = useCallback(() => {
    if (imageRef.current) {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }
      cropperRef.current = new Cropperjs(imageRef.current, {
        aspectRatio: 1,
        cropBoxResizable: true,
        viewMode: 1,
        guides: false,
        dragMode: "none",
        background: false,
        zoomable: false,
        responsive: true,
      });
    }
  }, []);

  const handleCropImage = useCallback((userProp, filename) => {
    if (!cropperRef.current) return;

    const canvas = cropperRef.current.getCroppedCanvas();
    canvas.toBlob((blob) => {
      if (!blob) return;
      (async () => {
        try {
          setImageDialog({ open: false, url: null, name: null });
          setLoading(true);
          const compressedFile = await browserCompression(blob, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1080,
          });
          const file = new File(
            [compressedFile],
            userProp.username + "-" + filename,
            {
              type: "image/jpeg",
            }
          );
          const formData = new FormData();
          formData.append("image", file);
          const res = await uploadImage(formData);
          if (res.success) {
            dispatch(updateUserImage(res.data.image));
          }
          setLoading(false);
        } catch (error) {
          console.log("compression error =>", error);
        }
      })();
    }, "image/jpeg");
  }, []);

  const handleUpload = useCallback(async (event) => {
    const image = event.target.files[0];
    const imageUrl = URL.createObjectURL(image);
    setImageDialog({ url: imageUrl, name: image.name, open: true });
    event.target.value = null;
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4 px-2 lg:px-4 bg-gray-50 py-2">
      {(loading || isPending) && <Loader />}
      <div>
        <h2 className="capitalize text-2xl lg:text-3xl border-none font-medium overflow-y-auto">
          Account
        </h2>
      </div>
      <div className="w-full h-full border rounded-md p-2 lg:p-4">
        <div className="rounded-md">
          <Tabs defaultValue="user">
            <TabsList className="grid grid-cols-2 pt-3 bg-white rounded-md shadow">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="change-password">Change Password</TabsTrigger>
            </TabsList>
            <TabsContent
              value="user"
              className="px-2 lg:px-4 pb-3 pt-2 mt-4 bg-white rounded-md shadow"
            >
              <div className="w-full flex items-start gap-6 lg:p-2">
                <div className="flex justify-center items-center">
                  <div className="relative">
                    <img
                      src={user?.image || avatar}
                      alt={user?.username || "Logo"}
                      height={500}
                      width={500}
                      className="w-32 h-32 object-contain rounded-full border"
                    />
                    <div className="absolute border rounded-full bg-white bottom-4 -right-2">
                      <IconButton
                        role={undefined}
                        variant="outlined"
                        component="label"
                      >
                        <Edit2 />
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          onChange={handleUpload}
                        />
                      </IconButton>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-medium mb-2">
                    {user?.username || "Username"}
                  </h3>
                  <div className="table">
                    <span>Email : </span>
                    <span>{user?.email || "user email"}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="change-password"
              className="px-2 lg:px-4 pb-3 pt-2 mt-4 bg-white rounded-md shadow"
            >
              <div className="w-full pt-2">
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
      <div className="hidden">
        <Dialog
          open={imageDialog.open}
          onOpenChange={(e) => {
            if (!e) setImageDialog((p) => ({ ...p, open: false }));
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crop Image</DialogTitle>
            </DialogHeader>
            <div className="w-full max-h-[45rem] overflow-auto flex flex-col gap-4 h-full">
              <div className="w-full h-full overflow-hidden">
                <img
                  ref={imageRef}
                  onLoad={handleImageLoad}
                  src={imageDialog.url}
                  alt="Cropper-Image"
                  className="h-full"
                  id="image"
                />
              </div>
            </div>
            <DialogFooter className="w-full flex justify-end">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCropImage(user, imageDialog.name)}
              >
                Crop
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
