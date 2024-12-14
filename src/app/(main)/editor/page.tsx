import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

export const metadata: Metadata = {
  title: "Design Your Resumes",
  description: "Resumes page",
};

export default function Page() {
  return <ResumeEditor />;
}
