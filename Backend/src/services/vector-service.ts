import "dotenv/config";
import { VectorStoreIndex as VectorIndex, Settings, MetadataMode } from "llamaindex";
import { OpenAI, OpenAIEmbedding } from "@llamaindex/openai";
import { PDFReader } from "@llamaindex/readers/pdf";
import path from "path";

class VectorService {

    private index: VectorIndex = null!;

    public async build(): Promise<number> {

        Settings.llm = new OpenAI({ model: "gpt-4o-mini" });
        Settings.embedModel = new OpenAIEmbedding({ model: "text-embedding-3-small" });

        const reader = new PDFReader();
        const documents = await reader.loadData(
            path.join(__dirname, "..", "assets", "cybersecurity.pdf")
        );

        console.log("Documents:", documents.length);
        const pages = documents.slice(10, 13);
        for (let i = 0; i < pages.length; i++) {
            const d = pages[i];
            console.log(`--- page ${i + 11} ---`);
            console.log(">>>>>> START");
            console.log(d.text.slice(0, 400));
            console.log("<<<<<< END");
        }

        this.index = await VectorIndex.fromDocuments(documents);

        return documents.length;
    }

    public async search(question: string, topK = 4): Promise<string[]> {
        const retriever = this.getIndex().asRetriever({ similarityTopK: topK });
        const nodes = await retriever.retrieve(question);
        return nodes.map(n => n.node.getContent(MetadataMode.NONE));
    }

    public getIndex(): VectorIndex {
        if (!this.index) throw new Error("Index not built yet.");
        return this.index;
    }

    public async ask(question: string): Promise<string> {
        const engine = this.getIndex().asQueryEngine({ similarityTopK: 4 });
        const response = await engine.query({ query: question });
        return response.message.content as string;
    }
}

export const vectorService = new VectorService();

