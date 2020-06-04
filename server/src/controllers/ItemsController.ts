import { Request, Response } from "express";
import knex from "../database/connection";

interface IRequestProps {
  sort?: "ASC" | "DESC";
}

class ItemsController {
  async index(request: Request, response: Response) {
    const { sort }: IRequestProps = request.params;

    const items = await knex("items").select("*");

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.3.1:3333/uploads/${item.image}`,
      };
    });

    return response.json(serializedItems);
  }
}

export default ItemsController;
