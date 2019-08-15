const express = require('express')
const app = express()
const bcrypt = require('bcrypt-nodejs')
const Usuario = require('../models/usuario')
const _ = require('underscore')

app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0
    let limite = req.query.limite || 5

    let query = {
        estado: true
    }

    Usuario.find(query, 'nombre email img estado role google')
        .skip(Number(desde))
        .limit(Number(limite))
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.countDocuments(query, (err, total) => {
                res.json({
                    ok: true,
                    usuarios,
                    total
                })
            })

        })
})

app.post('/usuario', (req, res) => {

    let body = req.body
    let salt = bcrypt.genSaltSync(10)

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, salt),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.put('/usuario/:id', (req, res) => {
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])
    let id = req.params.id

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })
})

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id

    //// BORRADO COMPLETO DEL REGISTRO !
    // Usuario.findByIdAndRemove(id, (err, usuarioDB) => {
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, useFindAndModify: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: { message: 'Usuario no Encontrado' }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })
})

module.exports = app