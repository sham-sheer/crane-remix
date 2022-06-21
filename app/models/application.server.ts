import type { User, Application } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Application } from "@prisma/client";

export function getApplications() {
    return prisma.application.findMany();
}

export function getApplication({
  id,
  userId,
}: Pick<Application, "id"> & {
  userId: User["id"];
}) {
  return prisma.application.findFirst({
    where: { id, userId },
  });
}

export function createApplication({
  title,
  dob,
  userId,
}: Pick<Application, "title" | "dob"> & {
  userId: User["id"];
}) {
  return prisma.application.create({
    data: {
      title,
      dob,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteApplication({
  id,
  userId,
}: Pick<Application, "id"> & { userId: User["id"] }) {
  return prisma.application.deleteMany({
    where: { id, userId },
  });
}
