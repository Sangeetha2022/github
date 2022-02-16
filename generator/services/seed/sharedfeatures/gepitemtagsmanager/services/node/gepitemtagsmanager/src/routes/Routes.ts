import { Request, Response, NextFunction } from "express";
import { ItemTagsController } from "../controller/ItemTagsController";

export class Routes {
  private ItemTags: ItemTagsController = new ItemTagsController();

  public routes(app): void {
    app.route("/health/entity-service").get((req: Request, res: Response) => {
      res.status(200).send({
        status: "up",
      });
    });
    app.route("/ItemTags/:id").delete(this.ItemTags.GpDelete);
    app.route("/ItemTags/get/search").get(this.ItemTags.GpSearch);
    app.route("/ItemTags/get/update").put(this.ItemTags.GpSearchForUpdate);
    app.route("/ItemTags").put(this.ItemTags.GpUpdate);
    app.route("/ItemTags/:id").get(this.ItemTags.GpGetNounById);
    app.route("/ItemTags").get(this.ItemTags.GpGetAllValues);
    app.route("/ItemTags").post(this.ItemTags.GpCreate);
  }
}
