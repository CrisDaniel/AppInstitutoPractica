import React from 'react';
import CursoTable from './components/CursoTable';
import { CssBaseline, Container } from '@mui/material';

const App = () => {
    return (
        <>
            <CssBaseline />
            <Container sx={{ marginTop: 1}}>
                <CursoTable />
            </Container>
        </>
    );
};

export default App;
