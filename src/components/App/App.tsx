import React from 'react';
import clsx from 'clsx';

import { Container } from 'react-bootstrap';

import LoadQRCodes from '@components/LoadQRCodes';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.module.scss';

const App = () => {
    return (
        <Container fluid className={clsx(['page', 'g-2'])}>
            <LoadQRCodes />
        </Container>
    );
};

export default App;
