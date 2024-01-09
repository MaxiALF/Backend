function propsUsers(req, res, next) {
    const { name } = req.body
    if (!name) {
        return res.json({
            statusCode: 400,
            response: `${req.method} ${req.url} name is required`,
        }) 
    } else {
        next()
    }
}

export default propsUsers;