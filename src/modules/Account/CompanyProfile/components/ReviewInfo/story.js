import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import ReviewInfo from './';

const onChange = console.log
const value = { 
  googleInfo: { 
    desc: 'whatever',
    placeId: 'adfadf'
  }
}
const ReviewInfoDemo = () => <div style={{margin: 'auto', width: '600px'}}><ReviewInfo value={value} onChange={onChange} google={window.google} /></div>

export default storiesOf('Profile', module)
.addDecorator(withKnobs)
.add('ReviewInfo', ReviewInfoDemo);
