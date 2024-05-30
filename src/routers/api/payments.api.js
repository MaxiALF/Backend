import customRouter from "../customRouter.js"
import checkout from "../../controllers/payments.controller.js"

class paymentsRouter extends customRouter{
    init(){
        this.post("/checkout", checkout)
    }
}

export default paymentsRouter