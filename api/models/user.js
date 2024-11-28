import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcrypt';

const saltRounds = 10;

const UserSchema = new Schema(
    {
        username: {type: String, require: true, unique: true},
        password: {type: String, require: true}
    }
);

UserSchema.pre('save', function(next){
    if (this.isNew || this.isModified('password')) {
       
        const document = this;

        hash(document.password, saltRounds, (err,hashedPassword) =>{
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    }else {
        next();
        }
});

UserSchema.method.isCorrectPassword = function(password,callback){
    compare(password, this.password,function(err, same){
        if (err) {
            callback(err);
        } else {
            callback(err,same)
        }
    });
}

export default model('User', UserSchema);