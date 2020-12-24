const mongoose            =   require('mongoose'), 
      schema              =   mongoose.Schema;

var userSchema = new schema({

    name: String,
    trash: {type: Boolean, default: false}
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'         
    }
});


module.exports = mongoose.model('user', userSchema);