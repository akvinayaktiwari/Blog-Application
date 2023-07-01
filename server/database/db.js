import  mongoose from 'mongoose'


const Connection= async(username,password)=>{
    const URL=`mongodb://${username}:${password}@ac-ho4dqb5-shard-00-00.meets3d.mongodb.net:27017,ac-ho4dqb5-shard-00-01.meets3d.mongodb.net:27017,ac-ho4dqb5-shard-00-02.meets3d.mongodb.net:27017/?ssl=true&replicaSet=atlas-4n58id-shard-0&authSource=admin&retryWrites=true&w=majority
`;
    try{
        await mongoose.connect(URL,{useNewUrlParser:true});
        console.log('Database connected successfull')

    }
    catch(error){
        console.log("Error while connection",error);

    }
}
export default Connection;