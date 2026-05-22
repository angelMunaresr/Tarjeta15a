import SaveTheDate from "@/components/SaveTheDate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Save the Date | Marina",
  description: "¡Guarda la fecha para celebrar mis 15 años!",
};

export default function SaveTheDatePage() {
  return (
    <main className="w-full min-h-screen overflow-hidden bg-navy-dark flex flex-col justify-center items-center">
      <SaveTheDate />
    </main>
  );
}
