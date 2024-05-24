import { Firestore } from '@google-cloud/firestore';

const storeData = async (id, data) => {
  const db = new Firestore({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: 'submissionmlgc-tutorial',
    databaseId: 'predictions',
  });

  const predictCollection = db.collection('predictions');

  return predictCollection.doc(id).set(data);
};

export default storeData;
