import { app } from './app';
import { env } from './env';

app.listen({
  host: '0.0.0.0', 
  port: env.PORT,
}).then(() => {
  console.log(`🚀 Servidor Moody rodando em http://localhost:${env.PORT}`);
});