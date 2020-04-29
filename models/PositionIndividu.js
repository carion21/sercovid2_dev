let connection = require('../config/connection')

class PositionIndividu {

	constructor(row) {
		this.row = row
	}
	/**
	 * Constante contenant la fictive Clée Primaire de la table
	 */
	static ID() {
		return 'code_position_individu'
	}
	/**
	 * Constante contenant le nom de la table actuelle
	 */
	static TABLE() {
		return 'PositionIndividu'
	}

	get id () {
		return this.row.id
	}
	get codePositionIndividu () {
		return this.row.code_position_individu
	}

	get codeIndividu () {
		return this.row.code_individu
	}

	get latitude () {
		return this.row.latitude
	}

	get longitude () {
		return this.row.longitude
	}

	get dateRegister () {
		return this.row.date_register
	}

	static genCodePositionIndividu() {
		let min = 1000000000
		let max = 9999999999
		let text= "PositionIndividu-"
		min = Math.ceil(min);
  		max = Math.floor(max);
		let nb1  = Math.floor(Math.random() * (max - min +1)) + min
		let nb2  = Math.floor(Math.random() * (max - min +1)) + min
		let nb3  = Math.floor(Math.random() * (max - min +1)) + min
  		let code = text+nb1+"-_-"+nb2+"-_-"+nb3
  		return code
	}

	static create(content, cb) {
		let ID 		= PositionIndividu.ID()
		let TABLE 	= PositionIndividu.TABLE()
		let codePositionIndividu 	= content.codePositionIndividu
		let codeIndividu = content.codeIndividu
		let latitude		= content.latitude
		let longitude	= content.longitude
		//let dateRegister= new Date()
		let dateRegister= content.dateRegister
		let sql = 'INSERT INTO '+ TABLE +' SET '+ ID +' = ?, code_individu = ?, latitude = ?, longitude = ?,' 
		+' date_register = ?'
		connection.query(sql, [codePositionIndividu, codeIndividu, latitude, longitude, dateRegister],
			(err, result) => {
				if (err) throw err
				let msg = "PositionIndividu bien ajouté"
				cb(msg)
			})

	}

	/**
	 * 
	 * @param {*} field 
	 * @param {*} value 
	 * @param {*} cb 
	 */
	static findFirstByOneField(field, value, cb){
		let TABLE = PositionIndividu.TABLE()
	//	let sql = 'SELECT * FROM '+ TABLE +' WHERE '+ field +' = ?, AND date_register = min(date_register)'
		let sql = 	'SELECT * FROM '+ TABLE + ' WHERE date_register = ('+
						'	SELECT MIN(date_register) FROM ' + TABLE + 
						'	GROUP BY '+ field + 
						'	HAVING '+ field + ' = "' + value + '" )'
		connection.query(sql, [value], 
			(err, rows) => {
				console.log(sql)
				if (err) throw err
				cb(rows.map((row) => new PositionIndividu(row)))
			})
	}
	/**
	 * 
	 * @param {*} field 
	 * @param {*} value 
	 * @param {*} cb 
	 */
	static findLastByOneField(field, value, cb){
		let TABLE = PositionIndividu.TABLE()
	//	let sql = 'SELECT * FROM '+ TABLE +' WHERE '+ field +' = ?, AND date_register = max(date_register)'
		let sql = 	'SELECT * FROM '+ TABLE + ' WHERE date_register = ('+
						'	SELECT MAX(date_register) FROM ' + TABLE + 
						'	GROUP BY '+ field + 
						'	HAVING '+ field + ' = "' + value + '" )'
		connection.query(sql, [value], 
			(err, rows) => {
				console.log(sql)
				if (err) throw err
				cb(rows.map((row) => new PositionIndividu(row)))
			})
	}

	static findBetweenByOneField(fieldWhere, valueWhere, fieldBetween, valueBetween1, valueBetween2, cb){
		let TABLE = PositionIndividu.TABLE()
	//	let sql = 'SELECT * FROM '+ TABLE +' WHERE '+ field +' = ?, AND date_register = max(date_register)'
		let sql = 	'SELECT * FROM '+ TABLE +
						' 	WHERE '+fieldWhere+' = "'+valueWhere+'"'+
						'	AND ' + fieldBetween + ' BETWEEN  '+ valueBetween1 + '  AND  ' + valueBetween2
		connection.query(sql, 
			(err, rows) => {
				console.log(sql)
				if (err) throw err
				cb(rows.map((row) => new PositionIndividu(row)))
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
		let TABLE = PositionIndividu.TABLE()
		let sql = 'SELECT * FROM '+ TABLE +' WHERE '+ field +' = ?'
		connection.query(sql, [value], 
			(err, rows) => {
				if (err) throw err
				cb(rows.map((row) => new PositionIndividu(row)))
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
		let TABLE = PositionIndividu.TABLE()
		let sql = 'SELECT * FROM '+ TABLE +' WHERE '+ field1 +' = ? AND '+ field2 +' = ?'
		connection.query(sql, [value1, value2], 
			(err, rows) => {
				if (err) throw err
				cb(rows.map((row) => new PositionIndividu(row)))
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
		let TABLE = PositionIndividu.TABLE()
		let ID = PositionIndividu.ID()
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
		let TABLE = PositionIndividu.TABLE();
		connection.query('SELECT * FROM '+ TABLE +' ', (err, rows) => {
			if (err) throw err
			cb(rows.map((row) => new PositionIndividu(row)))
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
		let codePositionIndividu = row.codePositionIndividu
		let TABLE = PositionIndividu.TABLE()
		let ID = PositionIndividu.ID()
		let sql = 'DELETE FROM '+ TABLE +' WHERE '+ ID +' = ?'
		connection.query(sql, [codePositionIndividu], (err, result) => {
			if (err) throw err
			let msg = "PositionIndividu supprimé avec succès..."
			cb(msg)
		})
	}
}

module.exports = PositionIndividu