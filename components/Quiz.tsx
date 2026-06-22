"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/curriculum";

/** Returns how many answers are correct given a selection map. */
export function scoreQuiz(
  questions: QuizQuestion[],
  selected: Record<number, number | undefined>,
): number {
  return questions.reduce(
    (n, q, i) => (selected[i] === q.answer ? n + 1 : n),
    0,
  );
}

export default function Quiz({
  questions,
  passed,
  onPass,
}: {
  questions: QuizQuestion[];
  passed: boolean;
  onPass: (score: number) => void;
}) {
  const [selected, setSelected] = useState<Record<number, number | undefined>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = questions.every((_, i) => selected[i] !== undefined);
  const correct = scoreQuiz(questions, selected);
  const isPerfect = correct === questions.length;

  const submit = () => {
    setSubmitted(true);
    if (isPerfect) onPass(correct / questions.length);
  };

  const retry = () => {
    setSelected({});
    setSubmitted(false);
  };

  return (
    <section className="quiz" aria-label="Lesson quiz">
      <h2>📝 Quiz</h2>
      <p className="quiz-sub">
        Answer all {questions.length} questions correctly to complete this lesson
        {passed ? " — you've already passed ✓" : "."}
      </p>

      {questions.map((q, qi) => (
        <div className="q-block" key={qi}>
          <div className="q-text">
            {qi + 1}. {q.question}
          </div>
          {q.options.map((opt, oi) => {
            const isSelected = selected[qi] === oi;
            let cls = "q-option";
            if (submitted) {
              if (oi === q.answer) cls += " correct";
              else if (isSelected) cls += " wrong";
            } else if (isSelected) {
              cls += " selected";
            }
            return (
              <label className={cls} key={oi}>
                <input
                  type="radio"
                  name={`q-${qi}`}
                  checked={isSelected}
                  disabled={submitted}
                  onChange={() => setSelected((s) => ({ ...s, [qi]: oi }))}
                />
                <span>{opt}</span>
              </label>
            );
          })}
          {submitted && <div className="q-explain">{q.explanation}</div>}
        </div>
      ))}

      {submitted && (
        <div className={`quiz-result ${isPerfect ? "pass" : "fail"}`}>
          {isPerfect ? (
            <>
              🎉 Perfect score — {correct}/{questions.length}. Lesson complete!
            </>
          ) : (
            <>
              You got {correct}/{questions.length}. You need all correct to pass —
              review the explanations above and try again.
            </>
          )}
        </div>
      )}

      <div className="quiz-actions">
        {!submitted ? (
          <button className="btn primary" onClick={submit} disabled={!allAnswered}>
            Submit answers
          </button>
        ) : (
          !isPerfect && (
            <button className="btn primary" onClick={retry}>
              Try again
            </button>
          )
        )}
      </div>
    </section>
  );
}
