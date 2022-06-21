import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Application } from "~/models/application.server";
import { deleteApplication } from "~/models/application.server";
import { getApplication } from "~/models/application.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  application: Application;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.applicationId, "applicationId not found");

  const application = await getApplication({ id: params.applicationId, userId });
  if (!application) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ application });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.applicationId, "applicationId not found");

  await deleteApplication({ userId, id: params.applicationId });

  return redirect("/applications");
};

export default function NoteDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.application.title}</h3>
      <p className="py-6">{data.application.dob}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Application not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
