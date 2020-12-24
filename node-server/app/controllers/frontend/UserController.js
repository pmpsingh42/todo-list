const path = require("path"),
	  error  = require(path.resolve(`./app/config/libs/error`)),
	  mongoose =   require('mongoose'), 

	  App  = require(path.resolve("./app/controllers/frontend/AppController")),


	  User = require(path.resolve("./app/models/User"));;


class UserController extends App {
	constructor(){
		super();

		/**/
		this.save = this.save.bind(this);
		this.getUser = this.getUser.bind(this);
		this.getOne = this.getOne.bind(this);
		this.delete = this.delete.bind(this);
		this.updateUser = this.updateUser.bind(this);

	}

	


	/**
	 * authenticate user against passed credentials
	 */
	async save(req, res) {
		try {

			let data = req.body;
			console.log('data',req);
			if (data.name  == '') {
				return res.json({success: false, message: 'please fill all the mandtory fields'});
			}
			let user = new User(data);
			user.save ();
			res.json({success: true, message: 'Data is successfully saved'})
		} catch(error) {
			res.json({success: false, message: error});

		}
	}

	async getUser(req, res) {
		try {
			let users = await User.find({trash: false});
			res.json({success: true, data: users});

		} catch (error) {
			res.json({success: false, message: error});
		}
	}

	async getOne(req, res) {
		try {
			let id = req.query.id;
			let user = await User.findOne({_id: mongoose.Types.ObjectId(id)});
			res.json({success: true, data: user});

		} catch (error) {
			res.json({success: false, message: error});
		}
	}

	async delete (req, res) {
		try {
			let id = req.body.id;
			 await User.findOneAndUpdate({
				_id: mongoose.Types.ObjectId(id)
			}, {trash: true}, {new: true});
			res.json({success: true, message: 'user has been successfully removed'});
		} catch(error) {
			res.json({success: false, message: error});

		}
	}

	async updateUser (req, res) {
		try {
			let data = req.body;
				 await User.findOneAndUpdate({
				_id: mongoose.Types.ObjectId(data.id)
			}, data, {new: true});
			res.json({success: true, message: 'user deatil has been successfully updated'});

		} catch(error) {
			res.json({success: false, message: error});

		}
	}

}

module.exports = UserController;