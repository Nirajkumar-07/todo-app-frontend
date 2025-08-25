import { useCallback, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import dayjs from "dayjs";
import {
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Ban, PenBox, Redo2, Trash2 } from "lucide-react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Link } from "react-router";
import {
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "../service/task.service";
import { useDispatch } from "react-redux";
import {
  deleteStateTask,
  updateStateTasks,
  updateStateTaskStatus,
} from "../features/tasks/tasks";
import Loader from "./loader";

function TaskList({ list, completed, today }) {
  const dispatch = useDispatch();
  const [dialogStyle, setDialogStyle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogData, setDialogData] = useState({
    taskId: null,
    status: null,
    form: null,
  });

  const dateTimeFormat = useMemo(
    () => (today ? "hh:mm A" : "DD/MM/YYYY hh:mm A"),
    []
  );

  const handleDeleteTask = useCallback(async (taskId) => {
    setLoading(true);
    const res = await deleteTask(taskId);
    if (res.success) {
      setDialogStyle(null);
      setDialogData((e) => ({ ...e, taskId: null }));
      dispatch(deleteStateTask(taskId));
    }
    setLoading(false);
  }, []);

  const handleUpdateTaskStatus = useCallback(async (taskId, status) => {
    setLoading(true);
    const res = await updateTaskStatus(taskId, !status);
    if (res.success) {
      setDialogStyle(null);
      setDialogData((e) => ({ ...e, taskId: null, status: null }));
      dispatch(updateStateTaskStatus({ taskId: taskId, status: !status }));
    }
    setLoading(false);
  }, []);

  const handleRedoTask = useCallback(async (taskId, formData) => {
    setLoading(true);
    const dateTime = formData.get("dateTime");
    const body = {
      title: formData.get("title"),
      description: formData.get("description"),
      dateTime: dayjs(dateTime).format("YYYY-MM-DD HH:mm:ss"),
      completed: false,
    };

    const res = await updateTask(taskId, body);
    if (res.success) {
      setDialogStyle(null);
      setDialogData((e) => ({ ...e, taskId: null, form: null }));
      dispatch(updateStateTasks(res.data));
    }
    setLoading(false);
  }, []);

  return (
    <>
      <div className="hidden">
        {completed ? (
          <Dialog
            open={dialogStyle === "redo-form"}
            onOpenChange={(e) => {
              if (e == false) {
                setDialogStyle(null);
                setDialogData((e) => ({ ...e, taskId: null, form: null }));
              }
            }}
          >
            <DialogContent className="xl:max-w-[33%]">
              <DialogHeader>
                <DialogTitle>Redo Task?</DialogTitle>
                <DialogDescription>
                  Are you want to redo this status?
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <form
                  action={(formData) =>
                    handleRedoTask(dialogData.taskId, formData)
                  }
                  id="redo-form"
                >
                  <input
                    type="text"
                    name="title"
                    hidden
                    className="hidden"
                    readOnly
                    value={dialogData.form?.title}
                  />
                  <input
                    type="text"
                    name="description"
                    hidden
                    className="hidden"
                    readOnly
                    value={dialogData.form?.description}
                  />
                  <DateTimePicker
                    className="w-full"
                    name="dateTime"
                    label="Date & Time"
                    defaultValue={dayjs().add(1, "hour")}
                    slotProps={{
                      textField: {
                        required: true,
                      },
                      popper: {
                        placement: "auto",
                      },
                    }}
                    disablePast
                  />
                </form>
                <DialogFooter>
                  <DialogClose>
                    <Button type="button" variant="outlined">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    color="warning"
                    variant="contained"
                    form="redo-form"
                  >
                    Redo
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog
            open={dialogStyle === "changeStatus"}
            onOpenChange={(e) => {
              if (e == false) {
                setDialogStyle(null);
                setDialogData((e) => ({ ...e, taskId: null, status: null }));
              }
            }}
          >
            <DialogContent className="xl:max-w-[33%]">
              <DialogHeader>
                <DialogTitle>Update status?</DialogTitle>
                <DialogDescription>
                  Are you want to change status?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button type="button" variant="outlined">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleUpdateTaskStatus(dialogData.taskId, dialogData.status)
                  }
                >
                  Update
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        <Dialog
          open={dialogStyle === "delete"}
          onOpenChange={(e) => {
            if (e == false) {
              setDialogStyle(null);
              setDialogData((e) => ({ ...e, taskId: null }));
            }
          }}
        >
          <DialogContent className="xl:max-w-[33%]">
            <DialogHeader>
              <DialogTitle>Delete Task?</DialogTitle>
              <DialogDescription>
                Are you want to delete this status?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button type="button" variant="outlined">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={() => handleDeleteTask(dialogData.taskId)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {loading && <Loader />}
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>{today ? "Time" : "Date & Time"}</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((item) => (
                <TableRow key={item.taskId}>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center whitespace-nowrap">
                      {new Date(item.dateTime) < new Date() ? (
                        <Tooltip
                          title="Expired"
                          placement="top-start"
                          className="ml-2 mr-3"
                          slotProps={{
                            popper: {
                              modifiers: [
                                {
                                  name: "offset",
                                  options: {
                                    offset: [0, -10],
                                  },
                                },
                              ],
                            },
                          }}
                        >
                          <Ban size={20} color="red" stroke="red" />
                        </Tooltip>
                      ) : (
                        <Checkbox
                          readOnly={completed}
                          checked={completed ? true : false}
                          onChange={(e) => {
                            if (!completed && e.target.checked) {
                              setDialogStyle("changeStatus");
                              setDialogData((e) => ({
                                ...e,
                                taskId: item.taskId,
                                status: item.completed,
                              }));
                            }
                          }}
                        />
                      )}
                      <Tooltip
                        title={item.description || item.title}
                        placement="top-start"
                        slotProps={{
                          popper: {
                            modifiers: [
                              {
                                name: "offset",
                                options: {
                                  offset: [0, -10],
                                },
                              },
                            ],
                          },
                        }}
                      >
                        {item.title}
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {dayjs(item.dateTime).format(dateTimeFormat)}
                  </TableCell>
                  <TableCell align="right" className="whitespace-nowrap">
                    {completed ? (
                      <IconButton
                        title="Redo"
                        style={{ transform: "rotateY(-180deg)" }}
                        onClick={() => {
                          setDialogStyle("redo-form");
                          setDialogData((e) => ({
                            ...e,
                            form: item,
                            taskId: item.taskId,
                          }));
                        }}
                      >
                        <Redo2 size={20} />
                      </IconButton>
                    ) : (
                      <Link to={`/task/update/${item.taskId}`}>
                        <IconButton title="Edit">
                          <PenBox size={20} />
                        </IconButton>
                      </Link>
                    )}
                    <IconButton
                      onClick={() => {
                        setDialogStyle("delete");
                        setDialogData((e) => ({ ...e, taskId: item.taskId }));
                      }}
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default TaskList;
