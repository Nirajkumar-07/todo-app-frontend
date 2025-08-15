import { useNavigate, useParams } from "react-router";
import { errorPages } from "../lib/data";
import Timer from "../components/timer";

export default function ErrorPage() {
  const navigate = useNavigate();
  const { title } = useParams();
  if (errorPages[title].code === 401) sessionStorage.clear();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h2 className="text-6xl lg:text-9xl font-bold text-gray-300 mb-12">
        {errorPages[title].code}
      </h2>
      <p className="text-red-500 text-2xl lg:text-4xl mb-6">
        {errorPages[title].title}
      </p>
      <p className="text-sm text-gray-500">
        You will redirect in{" "}
        <Timer time={3} onTimerEnd={() => navigate("/signin")} /> seconds...
      </p>
    </div>
  );
}
