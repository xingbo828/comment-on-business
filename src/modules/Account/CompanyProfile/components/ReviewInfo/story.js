import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import ReviewInfo from './ReviewInfo';

const onChange = console.log
const ReviewInfoDemo = () => <div style={{margin: 'auto', width: '600px'}}><ReviewInfo onChange={onChange}/></div>

export default storiesOf('Profile', module)
.addDecorator(withKnobs)
.add('ReviewInfo', ReviewInfoDemo);
