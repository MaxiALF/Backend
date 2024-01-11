import { Router } from "express";
import orders from "../../data/fs/orders.fs.js";
import propsOrders from "../../middlewares/propsOrders.js"

const ordersRouter = Router()

ordersRouter.post ("/", propsOrders, async (req, res, next) => {
    try {
        const data = req.body;
        const response = await orders.create(data)
        return res.json ({
            statusCode: 201,
            response,
        });
    } catch (error) {
        return next(error)
    }
}); 


ordersRouter.get ("/", async (req, res, next) => {
    let data = await orders.read();
    
    try {
        return res.json({
            statusCode: 200,
            response: data,
        });
    } catch (error) {
        return next(error);
    }
    
});

ordersRouter.get ("/:uid", async (req, res, next) =>{
    try {
        const { uid } = req.params;
        const one = await orders.readOne(uid);
        return res.json({
            statusCode: 200,
            response: one,
            });
    } catch (error) {
        return next(error);
    }
});

ordersRouter.delete ("/:oid", async (req, res, next) =>{
    try {
        const { oid } = req.params;
        const response = await orders.destroy(oid);
        return res.json({
            statusCode: 200,
            response,
        })
    } catch (error) {
        return next(error);
    }
});

export default ordersRouter;