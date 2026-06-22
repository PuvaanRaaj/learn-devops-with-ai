import CopyButton from "./CopyButton";

/** Highlighted, copy-pasteable AI prompt shown at the top of each lesson. */
export default function AiPrompt({ prompt }: { prompt: string }) {
  return (
    <div className="ai-card">
      <div className="ai-head">
        <strong>🤖 AI Prompt — stuck? paste this</strong>
        <CopyButton text={prompt} label="Copy prompt" />
      </div>
      <p className="ai-prompt">“{prompt}”</p>
    </div>
  );
}
