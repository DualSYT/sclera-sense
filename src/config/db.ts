import mongoose, { ConnectOptions } from 'mongoose';
import { ENV } from './envConfig';

const dbConnect = async () => {
  const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(ENV.DB_URL, options);
    console.log('Mongo Discord Message Conectado');
  } catch (error) {
    console.error('Error en la conexion a la base de datos:', error);
  }
};

export { dbConnect };
