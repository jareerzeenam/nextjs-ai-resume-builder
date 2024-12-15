import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import ExperienceForm from "./forms/ExperienceForm";

export const steps: {
    title: string;
    component: React.ComponentType<EditorFormProps>;
    key: string;
}[] = [
        {
            title: "General Info",
            component: GeneralInfoForm,
            key: "general-info"
        },
        {
            title: "Personal Info",
            component: PersonalInfoForm,
            key: "personal-info"
        },
        {
            title: "Work Experience",
            component: ExperienceForm,
            key: "work-experience"
        }

    ]