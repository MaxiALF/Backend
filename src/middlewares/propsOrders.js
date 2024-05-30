function propsOrders(req, res, next) {
    const { uid, pid } = req.body
    if (!uid || !pid) {
        return res.json({
            statusCode: 400,
            response: `${req.method} ${req.url} uid & pid is required`,
        }) 
    } else {
        return next()
    }
}

export default propsOrders; 