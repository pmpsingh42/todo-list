'use strict';
const DS       = "/",
      PORT     = 5000,
      __DB     = "todoList",
      base_url = "http://localhost:"+PORT+DS;

module.exports = {
  admin : {
    path : "/manager"
  },
  admin_base_url: base_url+"manager/",
  API : {
    site  : '/api/',
    admin : '/admin_api/' 
  },
  base_url: base_url,
  constants : {

  },
	db: {
    name : __DB,
		URL: "mongodb://localhost/"+__DB,
		options: {
			user: '',
			pass: ''
		}
	},
  debug_mongo: true,
  DS: "/",
  image_destination: 'uploads',

  secret : new Buffer("@#$Ggf34#$Yfwv12&*_34sdVV5443g$#G$#TVS@#f3g2&^%JH#2fc2@@@@@^%f2f23f#@@#fg").toString('base64'),
  /*for sending emails*/
  server: {
    PORT: PORT
  }
};