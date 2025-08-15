import TaskForm from "../components/task-form";
import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { addStateTasks } from "../features/tasks/tasks";

function AddTask() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const decodedQuery = useMemo(() => {
    try {
      const searchParams = new URLSearchParams(search);
      const query = searchParams.get("query");
      if (query && query.length > 0) return atob(query);
      else return null;
    } catch (error) {
      return null;
    }
  });

  const onSuccess = useCallback((data) => {
    dispatch(addStateTasks(data));
  }, []);
  return (
    <>
      {/* <button
        type="button"
        className="ps-2 lg:ps-4 flex items-center gap-1"
        onClick={() => history.back()}
      >
        <i>
          <ChevronLeft size={20} />
        </i>
        Back
      </button> */}
      <TaskForm
        mode={"Add"}
        title={"Add Task"}
        today={decodedQuery == "today-task"}
        onSuccess={onSuccess}
      />
    </>
  );
}

export default AddTask;
