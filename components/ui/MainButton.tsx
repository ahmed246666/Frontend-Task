
import { ArrowRight } from "lucide-react";

const MainButton = ({
  label,
  disabled,
  loading,
  mode,
  classname,
  noIcon,
}: {
  label: string;
  disabled?: boolean;
  loading: boolean;
  mode: "light" | "dark";
  classname?: string;
  noIcon?: boolean;
}) => {
  return (
    <button
      className={`${
        mode === "light" ? "bg-white" : "bg-black text-white"
      } py-3 px-5 flex items-center justify-center gap-6 group ${classname}`}
      disabled={loading || disabled}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>{label}</p>
          {!noIcon && (
            <>
              {mode === "light" ? (
                <ArrowRight
                  strokeWidth={1.5}
                  className="h-5 w-5 -rotate-45 group-hover:rotate-0 transition duration-700 shrink-0"
                />
              ) : (
                <ArrowRight
                  strokeWidth={1.5}
                  className="h-5 w-5 -rotate-45 group-hover:rotate-0 transition duration-700 shrink-0"
                />
              )}
            </>
          )}
        </>
      )}
    </button>
  );
};
export default MainButton;
