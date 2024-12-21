"use server"

import { canCreateResume, canUseCustomizations } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob"
import path from "path";

export async function saveResume(values: ResumeValues) {
    const { id } = values;

    console.log("received values", values);

    const { photo, experiences, educations, ...resumeValues } = resumeSchema.parse(values)

    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not Authenticated")
    }

    //  get the subscription level of the user
    const subscriptionLevel = await getUserSubscriptionLevel(userId);

    if (!id) {
        const resumeCount = await prisma.resume.count({
            where: {
                userId
            }
        })

        if (!canCreateResume(subscriptionLevel, resumeCount)) {
            throw new Error("You have reached the limit of resumes you can create.")
        }
    }

    const existingResume = id ? await prisma.resume.findUnique({ where: { id, userId } }) : null

    if (id && !existingResume) {
        throw new Error("Resume not found!")
    }

    const hasCustomization = (resumeValues.borderStyle && resumeValues.borderStyle !== existingResume?.borderStyle) || (resumeValues.colorHex && resumeValues.colorHex !== existingResume?.colorHex)

    if (hasCustomization && !canUseCustomizations(subscriptionLevel)) {
        throw new Error("Customization is not allowed for your subscription level.")
    }

    let newPhotoUrl: string | undefined | null = undefined

    if (photo instanceof File) {
        if (existingResume?.photoUrl) {
            await del(existingResume.photoUrl)
        }

        const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
            access: "public"
        })

        newPhotoUrl = blob.url
    } else if (photo === null) {
        if (existingResume?.photoUrl) {
            await del(existingResume.photoUrl)
        }

        newPhotoUrl = null;
    }

    if (id) {
        return prisma.resume.update({
            where: { id },
            data: {
                ...resumeValues,
                photoUrl: newPhotoUrl,
                experiences: {
                    deleteMany: {},
                    create: experiences?.map(exp => ({
                        ...exp,
                        startDate: exp.startDate ? new Date(exp.startDate) : undefined,
                        endDate: exp.endDate ? new Date(exp.endDate) : undefined
                    }))
                },
                educations: {
                    deleteMany: {},
                    create: educations?.map(edu => ({
                        ...edu,
                        startDate: edu.startDate ? new Date(edu.startDate) : undefined,
                        endDate: edu.endDate ? new Date(edu.endDate) : undefined
                    }))
                },
                updatedAt: new Date(), // remove if its working fine
            }
        })
    } else {

        return prisma.resume.create({
            data: {
                ...resumeValues,
                userId,
                photoUrl: newPhotoUrl,
                experiences: {
                    create: experiences?.map(exp => ({
                        ...exp,
                        startDate: exp.startDate ? new Date(exp.startDate) : undefined,
                        endDate: exp.endDate ? new Date(exp.endDate) : undefined
                    }))
                },
                educations: {
                    create: educations?.map(edu => ({
                        ...edu,
                        startDate: edu.startDate ? new Date(edu.startDate) : undefined,
                        endDate: edu.endDate ? new Date(edu.endDate) : undefined
                    }))
                },

            }
        })

    }
}
