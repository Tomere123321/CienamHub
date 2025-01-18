import { toast } from "react-hot-toast";

export const validateSession = (navigate, setTimeLeft, setShowWarning) => {
  const sessionTimeOut = localStorage.getItem("sessionTimeOut");

  if (!sessionTimeOut) {
    toast.error("You are not logged in!");
    navigate("/login");
    return;
  }

  const timeValue = parseInt(sessionTimeOut.slice(0, -1), 10);
  const timeUnit = sessionTimeOut.slice(-1);
  let sessionDurationMs;

  if (timeUnit === "m") {
    sessionDurationMs = timeValue * 60 * 1000;
  } else if (timeUnit === "h") {
    sessionDurationMs = timeValue * 60 * 60 * 1000;
  } else {
    toast.error("Invalid session timeout format!");
    localStorage.clear();
    navigate("/login");
    return;
  }

  const sessionEndTime = Date.now() + sessionDurationMs;

  if (!localStorage.getItem("sessionEndTime")) {
    localStorage.setItem("sessionEndTime", sessionEndTime.toString());
  }

  const currentTime = Date.now();
  const savedSessionEndTime = parseInt(localStorage.getItem("sessionEndTime"), 10);

  const timeRemaining = savedSessionEndTime - currentTime;
  if (setTimeLeft) setTimeLeft(Math.ceil(timeRemaining / 1000 / 60));

  if (timeRemaining <= 5 * 60 * 1000 && timeRemaining > 0) {
    if (setShowWarning) setShowWarning(true);
  }

  if (currentTime > savedSessionEndTime) {
    toast.error("Session has expired, Please Log In Again!");
    localStorage.clear();
    navigate("/login");
  }
};
export default validateSession;