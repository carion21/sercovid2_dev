let connection = require('../config/connection')

class Individu {

	constructor(row) {
		this.row = row
	}
	/**
	 * Constante contenant la fictive Clée Primaire de la table
	 */
	static ID() {
		return 'code_individu'
	}
	/**
	 * Constante contenant le nom de la table actuelle
	 */
	static TABLE() {
		return 'Individu'
	}


	get id () {
		return this.row.id
	}
	get codeIndividu () {
		return this.row.code_individu
	}

	get nom () {
		return this.row.nom
	}

	get prenom () {
		return this.row.prenom
	}

	get sexe () {
		return this.row.sexe
	}

	get age () {
		return this.row.age
    }
    
    get villeResidence () {
		return this.row.ville_residence
	}

	get statut () {
		return this.row.statut
	}

	get estActif () {
		return this.row.est_actif
	}

	get estCible () {
		return this.row.est_cible
	}
	
	get telephone () {
		return this.row.telephone
	}

	get autrephone () {
		return this.row.autrephone
	}

	get motdepasse () {
		return this.row.motdepasse
    }
    
    get cleApi () {
		return this.row.cle_api
	}

	get phoneparrain () {
		return this.row.phoneparrain
	}

	get dateRegister () {
		return this.row.date_register
    }
    
    static genCodeIndividu() {
		let min = 1000000
		let max = 9999999
		let text = "Individu-"
		min = Math.ceil(min);
  		max = Math.floor(max);
  		let nb  = Math.floor(Math.random() * (max - min +1)) + min
  		let code = text+nb
  		return code
    }
    
    static genCleApi() {
		let min = 1000000
		let max = 9999999
		let text = "cleapi-"
		min = Math.ceil(min);
  		max = Math.floor(max);
          let nb1  = Math.floor(Math.random() * (max - min +1)) + min
          let nb2  = Math.floor(Math.random() * (max - min +1)) + min
  		let code = text+nb1+"-_-"+nb2
  		return code
	}

	static create(content, cb) {
		let ID 		= Individu.ID()
		let TABLE 	= Individu.TABLE()
		let codeIndividu	= content.codeIndividu
		let nom		= content.nom
		let prenom	= content.prenom
        let sexe	= content.sexe
        let age 	= content.age
        let villeResidence 	= content.villeResidence
        //let statut  	= content.statut
		let statut	= 0
		let estCible = 0
		let estActif = 0
		let telephone = content.telephone
		let autrephone = content.autrephone
		let motdepasse = content.motdepasse
		let phoneparrain = content.phoneparrain
		let cleApi = content.cleApi
		let dateRegister= new Date()
		let sql = 'INSERT INTO '+ TABLE +' SET '+ ID +' = ?, nom = ?, prenom = ?, sexe = ?, age = ?,' 
		+'ville_residence = ?, statut = ?, est_cible = ?, est_actif = ?, telephone = ?, autrephone = ?, motdepasse = ?, phoneparrain = ?, cle_api = ?, date_register = ?'
		connection.query(sql, [codeIndividu, nom, prenom, sexe, age, villeResidence, statut, estCible, estActif, telephone, autrephone, motdepasse, phoneparrain, cleApi, dateRegister],
			(err, result) => {
				if (err) throw err
				let msg = "Individu bien ajouté"
				cb(msg)
			})

	}


	/**
	 * trouver une ligne de la table
	 * @param  {string}   field [Champ à viser]
	 * @param  {string or any}   value [valeur du champ à viser]
	 * @param  {Function} cb    [CallBack]
	 * @return {Object Array}         [ligne de la table]
	 */
	static findByOneField(field, value, cb) {
		let TABLE = Individu.TABLE()
		let sql = 'SELECT * FROM '+ TABLE +' WHERE '+ field +' = ?'
		connection.query(sql, [value], 
			(err, rows) => {
				if (err) throw err
				cb(rows.map((row) => new Individu(row)))
			})
	}

	/**
	 * trouver une ligne de la table
	 * @param  {string}   field1 [premier Champ à viser]
	 * @param  {string or any}   value1 [valeur du premier champ à viser]
	 * @param  {string}   field2 [second Champ à viser]
	 * @param  {string or any}   value2 [valeur du second champ à viser]
	 * @param  {Function} cb    [CallBack]
	 * @return {Object Array}         [ligne de la table]
	 */
	static findByTwoField(field1, value1, field2, value2, cb) {
		let TABLE = Individu.TABLE()
		let sql = 'SELECT * FROM '+ TABLE +' WHERE '+ field1 +' = ? AND '+ field2 +' = ?'
		connection.query(sql, [value1, value2], 
			(err, rows) => {
				if (err) throw err
				cb(rows.map((row) => new Individu(row)))
			})
	}

	/**
	 * trouver une ligne de la table
	 * @param  {string}   field1 [premier Champ à viser]
	 * @param  {string or any}   value1 [valeur du premier champ à viser]
	 * @param  {string}   field2 [second Champ à viser]
	 * @param  {string or any}   value2 [valeur du second champ à viser]
	 * @param  {Function} cb    [CallBack]
	 * @return {Object Array}         [ligne de la table]
	 */
	static findByThreeField(field1, value1, field2, value2, field3, value3,cb) {
		let TABLE = Individu.TABLE()
		let sql = 'SELECT * FROM '+ TABLE +' WHERE '+ field1 +' = ? AND '+field2 +' = ? AND '+ field3 +' = ?'
		connection.query(sql, [value1, value2, value3], 
			(err, rows) => {
				console.log(sql);

				if (err) throw err
				cb(rows.map((row) => new Individu(row)))
			})
	}

	/**
	 * remplacement d'une valeur d'un champ de la table
	 * @param  {string}   IdFieldValue [valeur de l'identifiant, Ex: code_...]
	 * @param  {string}   field   [champ a viser]
	 * @param  {string or any}   value   [valeur du champ à viser]
	 * @param  {Function} cb      [callback]
	 * @return {void}           [confirmation]
	 */
	static replaceByOneField (IdFieldValue, field, value, cb) {
		let TABLE = Individu.TABLE()
		let ID = Individu.ID()
		let sql = 'UPDATE '+ TABLE +' SET '+ field +' = ? WHERE '+ ID +' = ?'
		connection.query(sql, [value, IdFieldValue], 
			(err, results) => {
				if (err) throw err
				let msg = "mise à jour effectuée avec succès..."
				cb(msg)
			})
	}

	/**
	 * retourner tout le contenu de la table
	 * @param  {Function} cb [callback]
	 * @return {array}      [tableau contenant les lignes de la table]
	 */
	static all(cb) {
		let TABLE = Individu.TABLE();
		connection.query('SELECT * FROM '+ TABLE +' ', (err, rows) => {
			if (err) throw err
			cb(rows.map((row) => new Individu(row)))
		})
		//connection.end()
	}

	/**
	 * supprimer une ligne de la table
	 * @param  {Object}   row [Objet à viser]
	 * @param  {Function} cb  [CallBack]
	 * @return {void}       [confirmation]
	 */
	static remove(row, cb) {
		let codeIndividu = row.codeIndividu
		let TABLE = Individu.TABLE()
		let ID = Individu.ID()
		let sql = 'DELETE FROM '+ TABLE +' WHERE '+ ID +' = ?'
		connection.query(sql, [codeIndividu], (err, result) => {
			if (err) throw err
			let msg = "Individu supprimé avec succès..."
			cb(msg)
		})
	}
}

module.exports = Individu