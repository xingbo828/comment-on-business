import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import { configure, addDecorator } from '@storybook/react';
import 'antd/dist/antd.css';

const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
}

addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>
      {story()}
    </MemoryRouter>
));

function loadStories() {
  requireAll(require.context("../src", true, /story\.jsx?$/));
}


configure(loadStories, module);
