import {
  postPredictHandler,
  NotFoundHandler,
  getPredictHistoryHandler,
} from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/predict',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 1 * 1024 * 1024,
      },
    },
  },
  {
    method: 'GET',
    path: '/predict/histories',
    handler: getPredictHistoryHandler,
  },
  {
    method: '*',
    path: '/{any*}',
    handler: NotFoundHandler,
  },
];

export default routes;
