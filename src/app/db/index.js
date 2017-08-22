import PouchDB from 'pouchdb';

PouchDB.plugin(require('relational-pouch'));

const localDB = new PouchDB('lifetime');
const remoteDB = 'http://192.168.254.127:5984/lifetime';

// create schema for states
localDB.setSchema([
  {
    singular: 'story',
    plural: 'stories',
  },
]);

// sync from and to remote
const opts = { live: true, retry: true };
const onSyncError = () => console.error('Error syncing...');

// do one way, one-off sync from the server until completion
localDB.replicate.from(remoteDB).on('complete', (info) => {
  // then two-way, continuous, retriable sync
  localDB.sync(remoteDB, opts)
    .on('error', onSyncError);
}).on('error', onSyncError);

export { localDB, remoteDB };
