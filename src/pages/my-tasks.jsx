import { useSelector } from "react-redux";
import { selectFilteredTasks } from "../features/tasks/tasks";
import TaskList from "../components/task-list";
import { Link } from "react-router";
import { Button, Fab } from "@mui/material";
import { Plus } from "lucide-react";

export default function MyTasks() {
  const completedTasks = useSelector((state) =>
    selectFilteredTasks(state, true)
  );

  return (
    <div className="w-full h-full flex flex-col gap-4 px-2 lg:px-4 bg-gray-50 py-2">
      <div>
        <h2 className="capitalize text-2xl lg:text-3xl border-none font-medium overflow-y-auto">
          My Tasks
        </h2>
      </div>
      <div className="w-full h-full border rounded-md p-2 lg:p-4">
        {!completedTasks || completedTasks.length <= 0 ? (
          <>
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="text-gray-400 text-2xl lg:text-3xl">
                  <p>You have not completed any task yet.</p>
                  <p>Click below to see all pending tasks.</p>
                </div>
                <Link to={"/vital-tasks"}>
                  <Button variant="contained" color="primary">
                    Pending tasks
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <TaskList list={completedTasks} completed />
          </>
        )}
      </div>
      <div className="lg:hidden">
        <Fab
          LinkComponent={Link}
          color="primary"
          variant="circular"
          size="medium"
          to="/task/add"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 30,
          }}
        >
          <Plus size={20} />
        </Fab>
      </div>
    </div>
  );
}
