import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full grid gap-4">
      <h2>404</h2>
      <span>Page Not Found</span>
      <button
        type="button"
        className="py-3 px-4 rounded-md bg-blue-500 text-white"
        onClick={() => navigate("/dashboard")}
      >
        Go Dashboard
      </button>
    </div>
  );
}
