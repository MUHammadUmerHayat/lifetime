import PouchDB from 'pouchdb';

PouchDB.plugin(require('relational-pouch'));

const localDB = new PouchDB('lifetime');
const remoteDB = 'http://localhost:5984/lifetime';

// create schema for states
localDB.setSchema([
  {
    singular: 'story',
    plural: 'stories',
  },
]);

// sync from and to remote
const opts = { live: true };
const syncError = () => console.error('Error syncing...');

localDB.replicate.to(remoteDB, opts, syncError);
localDB.replicate.from(remoteDB, opts, syncError);

export { localDB, remoteDB };
