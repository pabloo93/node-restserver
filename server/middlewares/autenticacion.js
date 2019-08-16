const jwt = require('jsonwebtoken')

///////////////////////
// VERIFICACION DEL TOKEN
///////////////////////
let verificaToken = (req, res, next) => {

    let token = req.get('Authorization')

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decoded.usuario
        next()
    })
}

let verificaAdminRole = (req, res, next) => {
    let token = req.get('Authorization')

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }

        if (decoded.usuario.role !== 'ADMIN_ROLE') {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'el usuario no posee permisos'
                }
            })
        }

        req.isAdmin = true
        next()
    })
}

module.exports = {
    verificaToken,
    verificaAdminRole
}