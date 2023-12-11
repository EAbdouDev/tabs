"use client"; // Error components must be Client Components

import { useStatus } from "@states/Status";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const updateStatus = useStatus((state) => state.updateStatus);
  const updateMessage = useStatus((state) => state.updateMessage);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    updateStatus(true);
    updateMessage(error.message);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
