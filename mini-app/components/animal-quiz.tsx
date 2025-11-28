"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Question = {
  text: string;
  options: { label: string; animal: string }[];
};

const questions: Question[] = [
  {
    text: "What is your favorite activity?",
    options: [
      { label: "Chasing mice", animal: "cat" },
      { label: "Playing fetch", animal: "dog" },
      { label: "Nibbling carrots", animal: "rabbit" },
    ],
  },
  {
    text: "What is your preferred environment?",
    options: [
      { label: "Quiet corners", animal: "cat" },
      { label: "Open fields", animal: "dog" },
      { label: "Burrows", animal: "rabbit" },
    ],
  },
  {
    text: "What is your personality like?",
    options: [
      { label: "Independent", animal: "cat" },
      { label: "Friendly", animal: "dog" },
      { label: "Shy", animal: "rabbit" },
    ],
  },
];

export function AnimalQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSelect = (animal: string) => {
    setAnswers((prev) => [...prev, animal]);
    setCurrent((prev) => prev + 1);
  };

  const getResult = () => {
    const counts: Record<string, number> = {};
    answers.forEach((a) => {
      counts[a] = (counts[a] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] ?? "unknown";
  };

  if (current < questions.length) {
    const q = questions[current];
    return (
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-xl font-semibold">{q.text}</h2>
        <div className="flex flex-col gap-2">
          {q.options.map((opt) => (
            <Button key={opt.label} onClick={() => handleSelect(opt.animal)}>
              {opt.label}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  const result = getResult();
  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="text-2xl font-bold">You are a {result}!</h2>
      <p className="text-muted-foreground">
        Thanks for taking the quiz. Enjoy your new animal identity!
      </p>
    </div>
  );
}
