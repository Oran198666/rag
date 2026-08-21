import { useState } from "react";
import { ragService } from "../../../services/rag-serviceFront";
import ReactMarkdown from "react-markdown";
import "./ask.css";

export function Ask() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [chunks, setChunks] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    async function send() {
        if (!question.trim()) return;
        setLoading(true);
        setAnswer("");
        setChunks([]);
        try {
            const found = await ragService.search(question);
            setChunks(found);
            const result = await ragService.ask(question);
            setAnswer(result);
        } catch (err: any) {
            setAnswer(err.response?.data?.message || err.message);
        }
        setLoading(false);
    }

    return (
        <div className="Ask">
            <h2>Ask about the cybersecurity handbook</h2>

            <textarea
                value={question} onChange={e => setQuestion(e.target.value)} placeholder="Type your question" />

            <button onClick={send} disabled={loading || !question.trim()}>
                {loading ? "Thinking..." : "Ask"}
            </button>

            {answer && <div className="answer"><ReactMarkdown>{answer}</ReactMarkdown></div>}

            {chunks.length > 0 && (
                <details>
                    <summary>Sources ({chunks.length})</summary>
                    {chunks.map((c, i) => <p key={i}>{c}</p>)}
                </details>
            )}
        </div>
    );
}
