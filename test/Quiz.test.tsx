import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Quiz, { scoreQuiz } from "@/components/Quiz";
import type { QuizQuestion } from "@/lib/curriculum";

const questions: QuizQuestion[] = [
  {
    question: "1 + 1 = ?",
    options: ["1", "2", "3"],
    answer: 1,
    explanation: "Basic arithmetic.",
  },
  {
    question: "Capital of France?",
    options: ["Berlin", "Paris"],
    answer: 1,
    explanation: "Paris is the capital of France.",
  },
];

describe("scoreQuiz", () => {
  it("counts correct answers", () => {
    expect(scoreQuiz(questions, { 0: 1, 1: 1 })).toBe(2);
    expect(scoreQuiz(questions, { 0: 0, 1: 1 })).toBe(1);
    expect(scoreQuiz(questions, {})).toBe(0);
  });
});

describe("Quiz component", () => {
  it("disables submit until all questions are answered", () => {
    render(<Quiz questions={questions} passed={false} onPass={() => {}} />);
    const submit = screen.getByRole("button", { name: /submit answers/i });
    expect(submit).toBeDisabled();
  });

  it("calls onPass only on a perfect score", () => {
    const onPass = vi.fn();
    render(<Quiz questions={questions} passed={false} onPass={onPass} />);

    // Answer the first correctly, second incorrectly.
    fireEvent.click(screen.getByLabelText("2"));
    fireEvent.click(screen.getByLabelText("Berlin"));
    fireEvent.click(screen.getByRole("button", { name: /submit answers/i }));

    expect(onPass).not.toHaveBeenCalled();
    expect(screen.getByText(/you got 1\/2/i)).toBeInTheDocument();

    // Retry and answer everything correctly.
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    fireEvent.click(screen.getByLabelText("2"));
    fireEvent.click(screen.getByLabelText("Paris"));
    fireEvent.click(screen.getByRole("button", { name: /submit answers/i }));

    expect(onPass).toHaveBeenCalledTimes(1);
    expect(onPass).toHaveBeenCalledWith(1);
    expect(screen.getByText(/perfect score/i)).toBeInTheDocument();
  });
});
