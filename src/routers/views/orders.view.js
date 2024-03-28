import customRouter from "../customRouter.js";
import orders from "../../data/mongo/orders.mongo.js";
import users from "../../data/mongo/users.mongo.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

export default class OrderRouter extends customRouter {
  init() {
    this.get(
      "/",
      ["USER", "PREM", "PUBLIC"],
      passCallBack("jwt"),
      async (req, res, next) => {
        try {
          const sortAndPaginate = {
            limit: req.query.limit || 20,
            page: req.query.page || 1,
            sort: { price: 1 },
          };
          const user = await users.readByEmail(req.user.email);
          const filter = {
            user_id: user._id,
          };
          const all = await orders.read({ filter, sortAndPaginate });
          console.log(all.docs[0].product_id);
          return await res.render("orders", { orders: all.docs });
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
