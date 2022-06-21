import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link, NavLink, Outlet } from "@remix-run/react";

import { getApplications } from "~/models/application.server";

import type { Application } from "@prisma/client";

type LoaderData = { applications: Array<Application> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    applications: await getApplications(),
  };
  return json(data);
};

export default function Users() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Applications</Link>
        </h1>
        </header>

        <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Application
          </Link>

          <hr />

          {data.applications.length === 0 ? (
            <p className="p-4">No applications yet</p>
          ) : (
            <ol>
              {data.applications.map((application) => (
                <li key={application.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={application.id}
                  >
                    📝 {application.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>

    </div>
  );
}