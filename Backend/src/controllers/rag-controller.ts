import express, { Request, Response, NextFunction, Router } from "express";

import { vectorService } from "../services/vector-service";

class RagController {
    public router: Router = express.Router();

    public constructor() {
        this.router.post("/api/index", this.buildIndex);
        this.router.post("/api/search", this.search);
        this.router.post("/api/ask", this.ask);
    }

    private async buildIndex(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const count = await vectorService.build();
        }
        catch (err: any) { next(err); }
    }

    private async search(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const chunks = await vectorService.search(request.body.question);
            response.json({ chunks });
        }
        catch (err: any) { next(err); }
    }

    private async ask(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const answer = await vectorService.ask(request.body.question);
            response.json({ answer })
        }
        catch (err: any) { next(err); }
    }
}
export const ragController = new RagController();