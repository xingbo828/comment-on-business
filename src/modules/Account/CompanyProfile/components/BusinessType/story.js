import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import BusinessType from './BusinessType';

const onChange = console.log
const value = { 
  googleInfo: { 
    desc: 'whatever',
    placeId: 'adfadf'
  }
}
const BusinessTypeDemo = () => <div style={{margin: 'auto', width: '600px'}}><BusinessType /></div>

export default storiesOf('Profile', module)
.addDecorator(withKnobs)
.add('BusinessType', BusinessTypeDemo);
