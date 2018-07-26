import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import ServiceAreas from './ServiceAreas';


const ServiceAreasDemo = () => <div style={{margin: 'auto', width: '600px'}}><ServiceAreas /></div>

export default storiesOf('Profile', module)
.addDecorator(withKnobs)
.add('ServiceAreas', ServiceAreasDemo);
