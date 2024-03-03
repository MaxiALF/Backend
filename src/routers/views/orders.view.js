import customRouter from "../customRouter.js";
import { orders, users } from "../../data/mongo/manager.mongo.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

export default class OrderRouter extends customRouter {
  init() {
    this.get(
      "/",
      ["USER", "PREM"],
      passCallBack("jwt"),
      async (req, res, next) => {
        try {
          const sortAndPaginate = {
            limit: req.query.limit || 20,
            page: req.query.page || 1,
            sort: { title: 1 },
            lean: true,
          };
          const user = await users.readByEmail(req.user.email);
          const filter = {
            user_id: user._id,
          };
          const all = await orders.read({ filter, sortAndPaginate, lean: true });
          console.log(all.docs[0].product_id);
          return res.render("orders", { title: "CART", orders: all.docs });
        } catch (error) {
          return res.render("orders", {
            title: "CART",
            message: "NO ORDERS YET!",
          });
        }
      }
    );
  }
}
