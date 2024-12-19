"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function deleteResume(id: string) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const resume = await prisma.resume.findUnique({
        where: {
            id,
            userId,
        },
    });

    if (!resume) {
        throw new Error("Resume not found");
    }

    if (resume.photoUrl) {
        await del(resume.photoUrl);
    }

    const experiences = await prisma.experience.findMany({
        where: {
            resumeId: id,
        },
    });

    if (experiences.length) {
        await prisma.experience.deleteMany({
            where: {
                resumeId: id,
            },
        });
    }

    const educations = await prisma.education.findMany({
        where: {
            resumeId: id,
        },
    });

    if (educations.length) {
        await prisma.education.deleteMany({
            where: {
                resumeId: id,
            },
        });
    }

    await prisma.resume.delete({
        where: {
            id,
        },
    });

    revalidatePath("/resumes");
}