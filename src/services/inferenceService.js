import tf from '@tensorflow/tfjs-node';

const predictBinaryClassificationCancer = async (model, image) => {
  const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat();
  const prediction = model.predict(tensor);
  const scoreArray = await prediction.data();
  const score = scoreArray[0];
  const threshold = 0.5;
  const label = score >= threshold ? 'Cancer' : 'Non-cancer';
  const confidenceScore = score * 100;
  let suggestion;

  if (label === 'Cancer') {
    suggestion = 'Segera periksa ke dokter!';
  } else {
    suggestion = 'Anda sehat!';
  }
  return { confidenceScore, label, suggestion };
};

export default predictBinaryClassificationCancer;
