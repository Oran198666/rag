import axios from "axios";
import { appConfig } from "../utils/app-config";

class RagService {

    public async buildIndex(): Promise<number> {
        const response = await axios.post<{ documents: number }>(appConfig.indexUrl);
        return response.data.documents;
    }

    public async search(question: string): Promise<string[]> {
        const response = await axios.post<{ chunks: string[] }>(appConfig.searchUrl, { question });
        return response.data.chunks;
    }

    public async ask(question: string): Promise<string> {
        const response = await axios.post<{ answer: string }>(appConfig.askUrl, { question });
        return response.data.answer;
    }
}

export const ragService = new RagService();