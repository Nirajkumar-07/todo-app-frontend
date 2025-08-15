import { unstable_HistoryRouter as Router, Routes, Route } from "react-router";
import Signin from "./pages/singin";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import AddTask from "./pages/addTask";
import UpdateTask from "./pages/update-task";
import IndexPage from "./pages/indexPage";
import NavigationSetup from "./components/navigation-setup";
import ErrorPage from "./pages/error";
import AuthWrapper from "./components/auth-wrapper";
import history from "./lib/utils/history";
import ManiLayout from "./layouts/main-layout";
import Today from "./pages/today";
import VitalTasks from "./pages/vital-tasks";
import MyTasks from "./pages/my-tasks";
import Account from "./pages/account";

function App() {
  return (
    <div className="w-full h-full">
      <Router history={history}>
        <NavigationSetup />
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/error/:title" element={<ErrorPage />} />
          <Route
            path="/"
            element={
              <AuthWrapper>
                <IndexPage />
              </AuthWrapper>
            }
          />
          <Route element={<ManiLayout />}>
            <Route
              path="/dashboard"
              element={
                <AuthWrapper>
                  <Dashboard />
                </AuthWrapper>
              }
            />
            <Route
              path="/today"
              element={
                <AuthWrapper>
                  <Today />
                </AuthWrapper>
              }
            />
            <Route
              path="/vital-tasks"
              element={
                <AuthWrapper>
                  <VitalTasks />
                </AuthWrapper>
              }
            />
            <Route
              path="/my-tasks"
              element={
                <AuthWrapper>
                  <MyTasks />
                </AuthWrapper>
              }
            />
            <Route
              path="/account"
              element={
                <AuthWrapper>
                  <Account />
                </AuthWrapper>
              }
            />
            <Route
              path="/task/add"
              element={
                <AuthWrapper>
                  <AddTask />
                </AuthWrapper>
              }
            />
            <Route
              path="/task/update/:taskId"
              element={
                <AuthWrapper>
                  <UpdateTask />
                </AuthWrapper>
              }
            />
            <Route path="*" />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
