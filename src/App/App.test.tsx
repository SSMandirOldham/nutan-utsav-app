import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from '../config';

describe('App', () => {
  function renderApp(route: string) {
    window.history.replaceState({}, 'Test page', route);
    return render(
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <App />
      </FirebaseAppProvider>,
    );
  }

  test.each([
    { path: '/', testId: 'progress-trackers-page' },
    { path: '/add-your-niyam-count', testId: 'add-niyam-progress-page' },
  ])('should display $testId at $path', ({ path, testId }) => {
    renderApp(path);

    screen.getByTestId(testId);
  });
});
