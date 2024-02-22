const sql = require("../config/db.js");

const Netflix = (netflix) => {
    this.id = netflix.id;
    this.title = netflix.title;
    this.type = netflix.type;
};


Netflix.listeNetflix = (req) => {
    return new Promise((resolve, reject) => {
        let requete = `SELECT show_id, title FROM netflix_titles WHERE show_type = ?`;
        let params = [req.params.type_titre];
        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        });
    });
};
module.exports = Netflix;