import { HumanizeClient } from "./humanize-client";

export const metadata = {
  title: "Humanize AI Text - Free Tool",
  description: "Transform AI-generated text to appear more human-like by removing telltale markers",
};

export default function HumanizePage() {
  return (
    <div className="min-h-screen bg-background">
      <HumanizeClient />
    </div>
  );
}
