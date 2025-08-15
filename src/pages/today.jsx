import { useCallback, useEffect, useMemo, useState } from "react";
import Separator from "../components/ui/separator";
import TaskList from "../components/task-list";
import { Link } from "react-router";
import { Button, Fab } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTodayTasks } from "../features/tasks/tasks";
import { Plus } from "lucide-react";

export default function Today() {
  const params = new URLSearchParams({ query: btoa("today-task") });
  const todayTasks = useSelector(selectTodayTasks);

  const pendingTasks = useMemo(
    () => todayTasks.filter((task) => task.completed == false),
    [todayTasks]
  );
  const completedTasks = useMemo(
    () => todayTasks.filter((task) => task.completed == true),
    [todayTasks]
  );

  return (
    <div className="w-full h-full flex flex-col gap-4 px-2 lg:px-4 bg-gray-50 py-2">
      <div>
        <h2 className="capitalize text-2xl lg:text-3xl border-none font-medium overflow-y-auto">
          Today Tasks
        </h2>
      </div>
      <div
        className={
          "w-full h-full border rounded-md p-2 lg:p-4" +
          (todayTasks && todayTasks.length > 0
            ? " grid grid-cols-1 xl:grid-cols-2 content-start gap-8"
            : "")
        }
      >
        {!todayTasks || todayTasks.length <= 0 ? (
          <>
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="text-gray-400 text-2xl lg:text-3xl">
                  <p>You have not any today task.</p>
                  <p>Click below to add tasks.</p>
                </div>
                <Link to={`/task/add?${params.toString()}`}>
                  <Button variant="contained" color="primary">
                    Add Task
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full rounded-md flex flex-col gap-2 lg:px-4 pt-4 pb-2 h-fit">
              <h4 className="text-lg lg:text-xl font-medium">Pending Task</h4>
              <Separator className="mb-2 mt-1" />
              {pendingTasks?.length > 0 ? (
                <TaskList list={pendingTasks} today />
              ) : (
                <span className="text-sm text-gray-400 text-center w-full">
                  No data
                </span>
              )}
            </div>
            <div className="w-full rounded-md flex flex-col gap-2 lg:px-4 pt-4 pb-2 h-fit">
              <h4 className="text-lg lg:text-xl font-medium">Completed Task</h4>
              <Separator className="mb-2 mt-1" />
              {completedTasks?.length > 0 ? (
                <TaskList list={completedTasks} completed today />
              ) : (
                <span className="text-sm text-gray-400 text-center w-full">
                  No data
                </span>
              )}
            </div>
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
