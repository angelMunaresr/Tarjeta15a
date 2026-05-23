import SaveTheDate from "@/components/SaveTheDate";
import BubbleRise from "@/components/BubbleRise";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Save the Date | Marina",
  description: "¡Guarda la fecha para celebrar mis 15 años!",
};

export default function SaveTheDatePage() {
  return (
    <main className="fixed inset-0 overflow-hidden flex flex-col">
      <BubbleRise />
      <SaveTheDate />
    </main>
  );
}
