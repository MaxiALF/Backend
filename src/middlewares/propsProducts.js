function propsProducts(req, res, next) {
    const { title, price } = req.body
    if (!title || !price) {
        return res.json({
            statusCode: 400,
            response: `${req.method} ${req.url}  title & price are required`,
        }) 
    } else {
        return next()
    }
}

export default propsProducts; 