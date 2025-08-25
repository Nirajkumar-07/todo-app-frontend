import { useParams } from "react-router";
import TaskForm from "../components/task-form";
import { useCallback, useEffect, useState } from "react";
import { getTask } from "../service/task.service";
import history from "../lib/utils/history";
import { ChevronLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateStateTasks } from "../features/tasks/tasks";
import Loader from "../components/loader";

function UpdateTask() {
  const dispatch = useDispatch();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const { taskId } = useParams();

  useEffect(() => {
    (async () => {
      const taskRes = await getTask(taskId);
      setTask(taskRes.data);
      setLoading(false);
    })();
  }, []);

  const onSuccess = useCallback((data) => {
    dispatch(updateStateTasks(data));
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <button
        type="button"
        className="ps-2 lg:ps-4 flex items-center gap-1"
        onClick={() => history.back()}
      >
        <i>
          <ChevronLeft size={20} />
        </i>
        Back
      </button>
      {!task ? (
        <div className="w-full h-full flex justify-center items-center text-gray-400 text-3xl lg:text-6xl">
          The resource You&apos;re looking for, is not found.
        </div>
      ) : (
        <TaskForm
          defaultValue={{
            title: task.title,
            description: task.title,
            dateTime: task.dateTime,
          }}
          mode={"Update"}
          title={`Update Task`}
          taskId={taskId}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
}

export default UpdateTask;
