import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ResumeServerData } from "./types"
import { ResumeValues } from "./validation"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File ? {
    name: value.name,
    size: value.size,
    type: value.type,
    lastModified: value.lastModified
  } : value
}


export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    title: data.title || undefined,
    description: data.description || undefined,
    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    jobTitle: data.jobTitle || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    phone: data.phone || undefined,
    email: data.email || undefined,
    website: data.website || undefined,
    experiences: data.experiences.map((exp) => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      location: exp.location || undefined,
      startDate: exp.startDate?.toISOString().split("T")[0],
      endDate: exp.endDate?.toISOString().split("T")[0],
      description: exp.description || undefined,
    })),
    educations: data.educations.map((edu) => ({
      school: edu.school || undefined,
      degree: edu.degree || undefined,
      field: edu.field || undefined,
      startDate: edu.startDate?.toISOString().split("T")[0],
      endDate: edu.endDate?.toISOString().split("T")[0],
      description: edu.description || undefined,
    })),
    skills: data.skills,
    colorHex: data.colorHex,
    borderStyle: data.borderStyle,
    summary: data.summary || undefined,

  }
}
