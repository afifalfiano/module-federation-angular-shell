// import('./bootstrap')
// 	.catch(err => console.error(err));

import { loadRemoteEntry } from '@angular-architects/module-federation';
import { environment } from './environments/environment';
let URL;
if(!environment.production) {
	URL = 'http://localhost:3000/remoteEntry.js';
  } else {
	URL = 'https://module-federation-angular-mfe1.vercel.app/remoteEntry.js';
  }
  
Promise.all([
	loadRemoteEntry({type: 'module', remoteEntry: URL}),
	// loadRemoteEntry({type: 'module', remoteEntry: 'http://localhost:3001/remoteEntry.js'}),
 ])
 .catch(err => console.error('Error loading remote entries', err))
 .then(() => import('./bootstrap'))
 .catch(err => console.error(err));
 