import React from 'react';
import TrafficIncident from './components/Traffic'; // Import your TrafficIncident component
import ErrorBoundary from './components/ErrorBoundry'; // Import the ErrorBoundary component

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <TrafficIncident />
    </ErrorBoundary>
  );
};

export default App;
