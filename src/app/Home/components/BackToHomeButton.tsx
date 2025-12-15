import { useNavigate } from "react-router-dom";
import "./BackToHomeButton.css";

type BackToHomeButtonProps = {
  label?: string;
  className?: string;
};

export function BackToHomeButton({
  label = "Back to Home",
  className,
}: BackToHomeButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={`back-home-btn ${className ?? ""}`.trim()}
      onClick={() => navigate("/")}
    >
      {label}
    </button>
  );
}
