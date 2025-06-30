import mongoose from 'mongoose'


//aqui se conecta con la base de datos de mongoDB
export const conectarDB =async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    }catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // 1 significa fallo, 0 significa exito
    }
}