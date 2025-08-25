import { useActionState, useEffect } from "react";
import { addUpdateTask } from "../actions/task.action";
import { Button, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import history from "../lib/utils/history";
import Loader from "./loader";

function TaskForm({ defaultValue, title, mode, taskId, today, onSuccess }) {
  const addUpdateTaskWithModeToken = addUpdateTask.bind(null, mode, taskId);
  const [state, formAction, isPending] = useActionState(
    addUpdateTaskWithModeToken,
    undefined
  );

  useEffect(() => {
    if (state && state.success) {
      onSuccess(state?.data);
      history.back();
    }
  }, [state]);
  return (
    <div className="w-full h-full flex justify-center items-center px-2 py-4">
      {isPending && <Loader />}
      <div className="border rounded-md shadow-sm px-2 lg:px-4 py-4 w-full md:w-3/4 lg:max-w-[40rem]">
        <h2 className="uppercase text-2xl lg:text-3xl font-bold mb-4 text-center">
          {title}
        </h2>
        <form action={formAction} className="w-full !text-start">
          <div className="w-full grid gap-4">
            <TextField
              name="title"
              label="Title"
              variant="outlined"
              placeholder="Enter Title"
              defaultValue={defaultValue?.title}
              error={state?.errors?.title ? true : false}
              autoFocus
              required
            />
            <DateTimePicker
              name="dateTime"
              label="Date & Time"
              defaultValue={
                today
                  ? dayjs().add(1, "hour")
                  : defaultValue?.dateTime
                  ? dayjs(defaultValue?.dateTime)
                  : undefined
              }
              slotProps={{
                textField: {
                  required: true,
                  error: state?.errors?.dateTime ? true : false,
                },
                popper: {
                  placement: "auto",
                },
              }}
              disablePast
            />
            <TextField
              name="description"
              label="Description"
              defaultValue={defaultValue?.description}
              multiline
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="!py-2"
            >
              {mode}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
