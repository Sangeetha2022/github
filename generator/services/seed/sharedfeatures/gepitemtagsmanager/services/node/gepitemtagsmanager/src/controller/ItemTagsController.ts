import { Request, Response } from "express";
import { ItemTagsService } from "../service/ItemTagsService";
import { CustomLogger } from "../config/Logger";
let ItemTags = new ItemTagsService();

export class ItemTagsController {
  constructor() {}

  public GpDelete(req: Request, res: Response) {
    ItemTags.GpDelete(req, (response) => {
      new CustomLogger().showLogger(
        "info",
        "Enter into ItemTagsController.ts: GpDelete"
      );
      res.status(200);
      res.json(response);
      new CustomLogger().showLogger(
        "info",
        "Exit from ItemTagsController.ts: GpDelete"
      );
    });
  }
  public GpSearch(req: Request, res: Response) {
    ItemTags.GpSearch(req, (response) => {
      new CustomLogger().showLogger(
        "info",
        "Enter into ItemTagsController.ts: GpSearch"
      );
      res.status(200);
      res.json(response);
      new CustomLogger().showLogger(
        "info",
        "Exit from ItemTagsController.ts: GpSearch"
      );
    });
  }
  public GpSearchForUpdate(req: Request, res: Response) {
    ItemTags.GpSearchForUpdate(req, (response) => {
      new CustomLogger().showLogger(
        "info",
        "Enter into ItemTagsController.ts: GpSearchForUpdate"
      );
      res.status(200);
      res.json(response);
      new CustomLogger().showLogger(
        "info",
        "Exit from ItemTagsController.ts: GpSearchForUpdate"
      );
    });
  }
  public GpUpdate(req: Request, res: Response) {
    ItemTags.GpUpdate(req, (response) => {
      new CustomLogger().showLogger(
        "info",
        "Enter into ItemTagsController.ts: GpUpdate"
      );
      res.status(200);
      res.json(response);
      new CustomLogger().showLogger(
        "info",
        "Exit from ItemTagsController.ts: GpUpdate"
      );
    });
  }
  public GpGetNounById(req: Request, res: Response) {
    ItemTags.GpGetNounById(req, (response) => {
      new CustomLogger().showLogger(
        "info",
        "Enter into ItemTagsController.ts: GpGetNounById"
      );
      res.status(200);
      res.json(response);
      new CustomLogger().showLogger(
        "info",
        "Exit from ItemTagsController.ts: GpGetNounById"
      );
    });
  }
  public GpGetAllValues(req: Request, res: Response) {
    ItemTags.GpGetAllValues(req, (response) => {
      new CustomLogger().showLogger(
        "info",
        "Enter into ItemTagsController.ts: GpGetAllValues"
      );
      res.status(200);
      res.json(response);
      new CustomLogger().showLogger(
        "info",
        "Exit from ItemTagsController.ts: GpGetAllValues"
      );
    });
  }
  public GpCreate(req: Request, res: Response) {
    ItemTags.GpCreate(req, (response) => {
      new CustomLogger().showLogger(
        "info",
        "Enter into ItemTagsController.ts: GpCreate"
      );
      res.status(200);
      res.json(response);
      new CustomLogger().showLogger(
        "info",
        "Exit from ItemTagsController.ts: GpCreate"
      );
    });
  }
}
