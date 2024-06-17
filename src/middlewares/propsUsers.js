function propsUsers(req, res, next) {
    const { email } = req.body
    if (!email) {
        return res.json({
            statusCode: 400,
            message: `${req.method} ${req.url} email is required`,
        }) 
    } else {
        next()
    }
}

export default propsUsers;