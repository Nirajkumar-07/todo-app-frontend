import { useSelector } from "react-redux";
import { selectUser } from "../features/user/user";
import Card from "../components/ui/card";
import { LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardData } from "../service/dashboard.service";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Badge from "../components/ui/badge";
import { ListAlt, PendingActions, TaskAlt, Today } from "@mui/icons-material";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState();
  const user = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      const res = await getDashboardData();
      if (res.success) setDashboardData(res.data);
    })();
  }, []);
  return (
    <div className="w-full h-full flex flex-col gap-4 px-2 lg:px-4 bg-gray-50 py-2">
      <div>
        <h1 className="capitalize text-2xl lg:text-3xl border-none font-medium overflow-y-auto">
          Welcome Back, {user?.username}
        </h1>
      </div>
      <div className="w-full h-full border rounded-md p-2 lg:p-4 grid content-start gap-8">
        <div className="w-full h-full grid gap-3 content-start">
          <h3 className="font-semibold text-lg lg:text-xl uppercase">All</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <Card
              icon={<ListAlt sx={{ fontSize: 55, stroke: "none" }} />}
              title="All Task"
              count={dashboardData?.total_task || 0}
            />
            <Card
              icon={<TaskAlt sx={{ fontSize: 55, stroke: "none" }} />}
              title="Completed Task"
              count={dashboardData?.total_comleted_task || 0}
            />
            <Card
              icon={<PendingActions sx={{ fontSize: 55, stroke: "none" }} />}
              title="Pending Task"
              count={dashboardData?.total_pending_task || 0}
            />
          </div>
        </div>
        <div className="w-full h-full grid gap-3 content-start">
          <h3 className="font-semibold text-lg lg:text-xl uppercase">Today</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <Card
              icon={<Today sx={{ fontSize: 55, stroke: "none" }} />}
              title="All Task"
              count={dashboardData?.total_today_task || 0}
            />
            <Card
              icon={<TaskAlt sx={{ fontSize: 55, stroke: "none" }} />}
              title="Completed Task"
              count={dashboardData?.total_today_completed_task || 0}
            />
            <Card
              icon={<PendingActions sx={{ fontSize: 55, stroke: "none" }} />}
              title="Pending Task"
              count={dashboardData?.total_today_pending_task || 0}
            />
          </div>
        </div>
        {dashboardData?.recent_task_list &&
          dashboardData?.recent_task_list.length > 0 && (
            <div className="w-full h-full grid gap-3 content-start max-xl:mb-4">
              <h3 className="font-semibold text-lg lg:text-xl uppercase">
                Recently Added
              </h3>
              <TableContainer component={Paper} sx={{ maxHeight: "13rem" }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Task</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardData?.recent_task_list?.map((task) => (
                      <TableRow key={task.taskId}>
                        <TableCell
                          title={task?.description || task.title}
                          className="whitespace-nowrap"
                        >
                          {task.title}
                        </TableCell>
                        <TableCell>
                          {task.completed ? (
                            <Badge variant="success">Completed</Badge>
                          ) : (
                            <Badge variant="destructive">Pending</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
      </div>
    </div>
  );
}

export default Dashboard;
