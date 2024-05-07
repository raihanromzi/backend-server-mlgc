import tf from '@tensorflow/tfjs-node';

const loadModel = async () => tf.loadGraphModel(process.env.MODEL_URL);

export default loadModel;
