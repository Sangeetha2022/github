import { Request, Response } from "express";
import { ItemTagsDao } from "../dao/ItemTagsDao";
import { CustomLogger } from "../config/Logger";
import * as jwt from "jsonwebtoken";
let ItemTags = new ItemTagsDao();

export class ItemTagsService {
  constructor() {}

  public GpDelete(req: Request, callback) {
    new CustomLogger().showLogger(
      "info",
      "Enter into ItemTagsService.ts: GpDelete"
    );
    let ItemTagsId = req.params.id;
    ItemTags.GpDelete(ItemTagsId, (response) => {
      new CustomLogger().showLogger(
        "info",
        "Exit from ItemTagsService.ts: GpDelete"
      );
      callback(response);
    });
  }

  public GpSearch(req: Request, callback) {
    new CustomLogger().showLogger(
      "info",
      "Enter into ItemTagsService.ts: GpSearch"
    );
    let ItemTagsData = req.query;
    ItemTags.GpSearch(ItemTagsData, (response) => {
      new CustomLogger().showLogger(
        "info",
        "Exit from ItemTagsService.ts: GpSearch"
      );
      callback(response);
    });
  }

  public GpSearchForUpdate(req: Request, callback) {
    new CustomLogger().showLogger(
      "info",
      "Enter into ItemTagsService.ts: GpSearchForUpdate"
    );
    let ItemTagsData = req.body;
    ItemTags.GpSearchForUpdate(ItemTagsData, (response) => {
      new CustomLogger().showLogger(
        "info",
        "Exit from ItemTagsService.ts: GpSearchForUpdate"
      );
      callback(response);
    });
  }

  public GpUpdate(req: Request, callback) {
    new CustomLogger().showLogger(
      "info",
      "Enter into ItemTagsService.ts: GpUpdate"
    );
    let ItemTagsData = req.body;
    ItemTags.GpUpdate(ItemTagsData, (response) => {
      new CustomLogger().showLogger(
        "info",
        "Exit from ItemTagsService.ts: GpUpdate"
      );
      callback(response);
    });
  }

  public GpGetNounById(req: Request, callback) {
    new CustomLogger().showLogger(
      "info",
      "Enter into ItemTagsService.ts: GpGetNounById"
    );
    let ItemTagsId = req.params.id;
    ItemTags.GpGetNounById(ItemTagsId, (response) => {
      new CustomLogger().showLogger(
        "info",
        "Exit from ItemTagsService.ts: GpGetNounById"
      );
      callback(response);
    });
  }

  public GpGetAllValues(req: Request, callback) {
    new CustomLogger().showLogger(
      "info",
      "Enter into ItemTagsService.ts: GpGetAllValues"
    );

    ItemTags.GpGetAllValues((response) => {
      new CustomLogger().showLogger(
        "info",
        "Exit from ItemTagsService.ts: GpGetAllValues"
      );
      callback(response);
    });
  }

  public GpCreate(req: Request, callback) {
    new CustomLogger().showLogger(
      "info",
      "Enter into ItemTagsService.ts: GpCreate"
    );
    let ItemTagsData = req.body;
    ItemTags.GpCreate(ItemTagsData, (response) => {
      new CustomLogger().showLogger(
        "info",
        "Exit from ItemTagsService.ts: GpCreate"
      );
      callback(response);
    });
  }
}
