"use client";

import StepPlayer from "./StepPlayer";
import CodeBlock from "./CodeBlock";

// Renders one selected lesson in the main area: eyebrow + title + hook, the
// diagram stage, then the reading column. Handles both lesson shapes:
// FDE lessons (day/code/mistake/fde) and System Design lessons
// (number/concepts/tradeoff/number/interview).
export default function LessonView({ kind, lesson, done, onToggleDone }) {
  const isFde = kind === "fde";
  const eyebrow = isFde
    ? `FDE Course · Module 1 — Software Engineering Foundation · Day ${lesson.day}`
    : `System Design · Module 1 — Foundations of Scale · Lesson ${lesson.number}`;
  const idLabel = isFde ? `Day ${lesson.day}` : `Lesson ${lesson.number}`;

  return (
    <article className="lesson-view">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="lesson-title">{lesson.title}</h1>
      <p className="lesson-hook">{lesson.hook}</p>

      {!isFde && lesson.concepts ? (
        <div className="chips" style={{ marginBottom: 4 }}>
          {lesson.concepts.map((c) => (
            <span className="chip" key={c}>{c}</span>
          ))}
        </div>
      ) : null}

      {lesson.nodes && lesson.steps ? (
        <StepPlayer
          key={isFde ? `fde-${lesson.day}` : `sd-${lesson.id}`}
          nodes={lesson.nodes}
          steps={lesson.steps}
        />
      ) : null}

      <div className="reading">
        <h3>The concept</h3>
        <p>{lesson.concept}</p>

        {isFde ? (
          <>
            <h3>Example — run this</h3>
            <CodeBlock code={lesson.code} output={lesson.output} />
            <div className="callout warn">
              <strong>Common mistake:</strong> {lesson.mistake}
            </div>
            <div className="callout">
              <strong>The FDE angle:</strong> {lesson.fde}
            </div>
          </>
        ) : (
          <>
            <div className="callout warn">
              <strong>The trade-off:</strong> {lesson.tradeoff}
            </div>
            <div className="callout">
              <strong>Number to remember:</strong> {lesson.number}
            </div>
            <h3>The interview line</h3>
            <p>“{lesson.interview}”</p>
          </>
        )}

        <h3>{isFde ? "Your 15-minute assignment" : "Your mini assignment"}</h3>
        <p>{lesson.assign}</p>

        <button
          className={`btn${done ? "" : " primary"}`}
          onClick={onToggleDone}
          style={{ marginTop: 6 }}
        >
          {done ? `✓ ${idLabel} completed — tap to undo` : `Mark ${idLabel} complete`}
        </button>
      </div>
    </article>
  );
}
