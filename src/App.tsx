// import React from 'react';
// import CelebrityManager from './component/celebrity-main';


// // Update with your component path

// const App: React.FC = () => {
//   return (
//     <div>
//      <CelebrityManager />
//     </div>
//   );
// };

// export default App;

import React from 'react';
import CelebrityManager from './component/celebrity-main';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <CelebrityManager />
      </div>
    </div>
  );
};

export default App;


