import * as mongoose from "mongoose";
import ItemTagsModel from "../models/ItemTags";
import { CustomLogger } from "../config/Logger";

export class ItemTagsDao {
  private ItemTags = ItemTagsModel;
  constructor() {}

  public async GpDelete(ItemTagsId, callback) {
    new CustomLogger().showLogger(
      "info",
      "Enter into ItemTagsDao.ts: GpDelete"
    );

    this.ItemTags.findByIdAndRemove(ItemTagsId)
      .then((result) => {
        new CustomLogger().showLogger(
          "info",
          "Exit from ItemTagsDao.ts: GpDelete"
        );

        callback(result);
      })
      .catch((error) => {
        callback(error);
      });
  }
  public async GpSearch(ItemTagsData, callback) {
    new CustomLogger().showLogger(
      "info",
      "Enter into ItemTagsDao.ts: GpSearch"
    );

    let andkey;
    let and_obj = {};
    let orkey;
    let or_obj = {};

    Object.entries(ItemTagsData).forEach(([key, value]) => {
      if (value !== "") {
        andkey = key;
        and_obj[andkey] = value;
      } else {
        orkey = key;
        or_obj[orkey] = { $ne: "" };
      }
    });
    this.ItemTags.find({
      $and: [
        {
          $or: [or_obj],
        },
        and_obj,
      ],
    })
      .then((result) => {
        new CustomLogger().showLogger(
          "info",
          "Exit from ItemTagsDao.ts: GpSearch"
        );

        callback(result);
      })
      .catch((error) => {
        callback(error);
      });
  }
  public async GpSearchForUpdate(ItemTagsData, callback) {
    new CustomLogger().showLogger(
      "info",
      "Enter into ItemTagsDao.ts: GpSearchForUpdate"
    );

    this.ItemTags.findOneAndUpdate({ _id: ItemTagsData._id }, ItemTagsData, {
      new: true,
    })
      .then((result) => {
        new CustomLogger().showLogger(
          "info",
          "Exit from ItemTagsDao.ts: GpSearchForUpdate"
        );

        callback(result);
      })
      .catch((error) => {
        callback(error);
      });
  }
  public async GpUpdate(ItemTagsData, callback) {
    new CustomLogger().showLogger(
      "info",
      "Enter into ItemTagsDao.ts: GpUpdate"
    );

    this.ItemTags.findOneAndUpdate({ _id: ItemTagsData._id }, ItemTagsData, {
      new: true,
    })
      .then((result) => {
        new CustomLogger().showLogger(
          "info",
          "Exit from ItemTagsDao.ts: GpUpdate"
        );

        callback(result);
      })
      .catch((error) => {
        callback(error);
      });
  }
  public async GpGetNounById(ItemTagsId, callback) {
    new CustomLogger().showLogger(
      "info",
      "Enter into ItemTagsDao.ts: GpGetNounById"
    );

    this.ItemTags.findById(ItemTagsId)
      .then((result) => {
        new CustomLogger().showLogger(
          "info",
          "Exit from ItemTagsDao.ts: GpGetNounById"
        );

        callback(result);
      })
      .catch((error) => {
        callback(error);
      });
  }
  public async GpGetAllValues(callback) {
    new CustomLogger().showLogger(
      "info",
      "Enter into ItemTagsDao.ts: GpGetAllValues"
    );

    this.ItemTags.find()
      .then((result) => {
        new CustomLogger().showLogger(
          "info",
          "Exit from ItemTagsDao.ts: GpGetAllValues"
        );

        callback(result);
      })
      .catch((error) => {
        callback(error);
      });
  }
  public async GpCreate(ItemTagsData, callback) {
    new CustomLogger().showLogger(
      "info",
      "Enter into ItemTagsDao.ts: GpCreate"
    );

    let temp = new ItemTagsModel(ItemTagsData);

    temp
      .save()
      .then((result) => {
        new CustomLogger().showLogger(
          "info",
          "Exit from ItemTagsDao.ts: GpCreate"
        );

        callback(result);
      })
      .catch((error) => {
        callback(error);
      });
  }
}
