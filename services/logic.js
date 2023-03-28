const db =require('./db')


//get all users
const getusers=()=>{
    return db.User.find().then(
        (result)=>{
            if(result){
                return {
                    statusCode: 200,
                    users:result
                }
            }else{
                return{
                    statusCode: 404,
                    message:'no data is available'
                }
            }
        }
    )
}

//create user

const adduser =(name,email,password,location,date)=>{
    return db.User.findOne({
        email
    }).then((result)=>{
        if(result){
            return{
                statusCode:401,
                message:'user already exists, try with another email id'
            }
        }
        else{
            //object creation for new user
            const newUser= new db.User({
               name,
               email,
               password,
               location,
               date
            })
            //to store in mongodb
            newUser.save()
            return{
                statusCode:200,
                message:'New data added successfully'
            }
        }
    })
}

//login
const login= (email,pswd)=>{
    console.log('inside logic login function ');
    //check email and pswd in mongodb
    return db.User.findOne({
        email,
        pswd
    }).then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    message:'login successfull...'
                }
            }
            else{
                return{
                    statusCode:403,
                    message:'Invalid email or password'
                }
            }
        }
    )

}

module.exports={
    getusers,
    adduser,
    login
    }