let connection = require('../config/connection')

class Zone {

	constructor(row) {
		this.row = row
		
	}
	/**
	 * Constante contenant la fictive Clée Primaire de la table
	 */
	static ID() {
		return 'code_zone'
	}
	/**
	 * Constante contenant le nom de la table actuelle
	 */
	static TABLE() {
		return 'Zone'
	}


	get id () {
		return this.row.id
	}
	get codeZone () {
		return this.row.code_zone
	}

	get intitule () {
		return this.row.intitule
	}

	get latitudeCentre () {
		return this.row.latitude_centre
	}

	get longitudeCentre () {
		return this.row.longitude_centre
	}

	get rayon () {
		return this.row.rayon
	}

	get mettreEnCorbeille () {
		return this.row.mettre_en_corbeille
	}

	get statut () {
		return this.row.statut
	}

	get dateRegister () {
		return this.row.date_register
	}

	static genCodeZone() {
		let min = 1000000000
		let max = 9999999999
		let text= "Zone-"
        min = Math.ceil(min);
		max = Math.floor(max);
  		let nb  = Math.floor(Math.random() * (max - min +1)) + min
  		let code = text+nb
  		return code
	}

	static create(content, cb) {
		let ID		= Zone.ID()
		let TABLE 	= Zone.TABLE()
		let codeZone 	= content.codeZone
		let intitule	= content.intitule
		let latitudeCentre = content.latitudeCentre
		let longitudeCentre = content.longitudeCentre
		let mettreEnCorbeille		= content.mettreEnCorbeille
		let rayon		= content.rayon
		let statut		= content.statut
		let dateRegister= new Date()
		let sql = 'INSERT INTO '+ TABLE +' SET '+ ID +' = ?, intitule = ?, latitude_centre = ?, longitude_centre = ?, rayon = ?,'
		+' mettre_en_corbeille = ?, statut = ?, date_register = ?'
		connection.query(sql, [codeZone, intitule, latitudeCentre, longitudeCentre, rayon, mettreEnCorbeille, statut, dateRegister],
			(err, result) => {
				if (err) throw err
				let msg = "Zone bien ajoutée"
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
		let TABLE = Zone.TABLE()
		let sql = 'SELECT * FROM '+ TABLE +' WHERE '+ field +' = ?'
		connection.query(sql, [value], 
			(err, rows) => {
				if (err) throw err
				cb(rows.map((row) => new Zone(row)))
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
		let TABLE = Zone.TABLE()
		let sql = 'SELECT * FROM '+ TABLE +' WHERE '+ field1 +' = ? AND '+ field2 +' = ?'
		connection.query(sql, [value1, value2], 
			(err, rows) => {
				if (err) throw err
				cb(rows.map((row) => new Zone(row)))
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
		let TABLE = Zone.TABLE()
		let ID = Zone.ID()
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
		let TABLE = Zone.TABLE();
		connection.query('SELECT * FROM '+ TABLE +' ', (err, rows) => {
			if (err) throw err
			cb(rows.map((row) => new Zone(row)))
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
		let codeZone = row.codeZone
		let TABLE = Zone.TABLE()
		let ID = Zone.ID()
		let sql = 'DELETE FROM '+ TABLE +' WHERE '+ ID +' = ?'
		connection.query(sql, [codeZone], (err, result) => {
			if (err) throw err
			let msg = "Zone supprimé avec succès..."
			cb(msg)
		})
	}
}

module.exports = Zone