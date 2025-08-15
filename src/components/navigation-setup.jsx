import { useEffect } from "react";
import { useNavigate } from "react-router";
import { setNavigator } from "../lib/utils/navigation";

export default function NavigationSetup() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, []);

  return <></>;
}
