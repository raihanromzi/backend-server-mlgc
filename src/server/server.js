import Hapi from '@hapi/hapi';
import logger from '../app/logging.js';
import routes from './routes.js';
import loadModel from '../services/loadModel.js';
import InputError from '../error/InputError.js';

const httpServer = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 9000,
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  const model = await loadModel();

  server.app.model = model;

  server.route(routes);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof InputError) {
      return h
        .response({
          status: 'fail',
          message: `Terjadi kesalahan dalam melakukan prediksi`,
        })
        .code(400);
    }

    if (response.isBoom && response.output.statusCode === 413) {
      return h
        .response({
          status: 'fail',
          message:
            'Payload content length greater than maximum allowed: 1000000',
        })
        .code(413);
    }

    return h.continue;
  });

  await server.start();

  logger.info(`Asclepius Server running on ${server.info.uri}`);
};

export default httpServer;
