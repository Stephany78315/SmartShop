'use strict'

var Article = require('../models/article');

//Creamos un objeto para disponer de todos los metodos de ruta uqe vamos a definir
var controller ={
    //Metodo para guardar un articulo:
    save: (req, res) => {
        var params = req.body;

        var article = new Article({
            title: params.title,
            content: params.content,
            author: params.author
        });

        

        //Guardamos el articulo:
        article.save()
            .then(articleStored => {
                if (!articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El artículo no se ha guardado'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });
            })
            .catch(err => {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al guardar el artículo'
                });
            });
    },

    getArticles: (req, res) => {
        Article.find({})
            .sort('-date')
            .exec()
            .then(articles => {
                if (!articles || articles.length === 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay artículos para mostrar'
                    });
                }
    
                return res.status(200).send({
                    status: 'success',
                    articles
                });
            })
            .catch(err => {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al extraer los datos'
                });
            });
    },
    

    //Metodo para elimina un articulo:
    delete: (req, res) => {
        const articleId = req.params.id;

        Article.findOneAndDelete({ _id: articleId })
            .then(articleRemoved => {
                if (!articleRemoved) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No se ha encontrado el artículo a eliminar'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleRemoved
                });
            })
            .catch(err => {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al eliminar el artículo'
                });
            });
    }
}

module.exports = controller;