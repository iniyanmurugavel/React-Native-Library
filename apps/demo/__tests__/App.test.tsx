/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { App } from 'sg-react-native-kit';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
