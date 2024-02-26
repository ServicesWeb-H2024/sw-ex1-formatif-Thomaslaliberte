const Netflix = require("../model/netflix.model.js");

exports.listeNetflix = (req, res) => {
    if (req.query.page < 0) {
        res.status(400);
        res.send({
            erreur: "la page doit etre un chiffre positif"
        });
        return;
    }
    if (!parseInt(req.query.page)) {
        res.status(400);
        res.send({
            erreur: "la page doit etre un chiffre"
        });
        return;
    }
    if (req.params.type_titre != "Movie" && req.params.type_titre != "TV Show") {
        res.status(400);
        res.send({
            erreur: "le type doit etre 'Movie' ou 'TV Show'"
        });
        return;
    }
    Netflix.listeNetflix(req)
        .then((netflix) => {
            if (!netflix[0]) {
                res.status(404);
                res.send({
                    message: `aucun film/show trouvé`
                });
                return;
            }
            if (Object.keys(netflix).length > req.query.page * 10) {
                let page = parseInt(req.query.page) + 1;
                if (req.query.page != null) {

                    // ligne trop longue + oublie du lien pour TV_Show
                    res.send({ netflix: netflix.slice(req.query.page * 10 - 10, req.query.page * 10), url_page_suivante: "/api/netflix/titres/Movie?page=" + page });
                }
                else {
                    // ligne trop longue
                    res.send({ netflix: netflix.slice(0, 10), url_page_suivante: "/api/netflix/titres/Movie?page=2" });

                }
            }
            else {
                if (req.query.page != null) {
                    // ligne trop longue
                    res.send({ netflix: netflix.slice(req.query.page * 10 - 10, req.query.page * 10), url_page_suivante: null });
                }
                else {
                    res.send({ netflix: netflix.slice(0, 10), url_page_suivante: null });

                }
            }


        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la récupération des films/shows "
            });
        });

}