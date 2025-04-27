import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <ClipLoader color="blue" />
    </div>
  );
}
