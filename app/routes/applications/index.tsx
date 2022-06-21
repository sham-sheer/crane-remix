import { Link } from "@remix-run/react";

export default function ApplicationIndexPage() {
  return (
    <p>
      No application selected. Select a note on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new application.
      </Link>
    </p>
  );
}
