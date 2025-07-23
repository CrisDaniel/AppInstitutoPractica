import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import CursoTable from './components/CursoTable';
import DocenteTable from './components/DocenteTable';
import EstudianteTable from './components/EstudianteTable';
import MatriculaTable from './components/MatriculaTable';
import Navbar from './components/Navbar';
import { CssBaseline, Container } from '@mui/material';
import Box from '@mui/material/Box';

const App = () => {
    return (
        <Router>
            <CssBaseline />
            {/* Navbar centrado */}
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Navbar />
            </Box>
            <Container
                maxWidth="md"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    mt: 4
                }}
            >
                <Routes>
                    <Route path="/cursos" element={<CursoTable />} />
                    <Route path="/docentes" element={<DocenteTable />} />
                    <Route path="/estudiantes" element={<EstudianteTable />} />
                    <Route path="/matriculas" element={<MatriculaTable />} />
                    <Route path="*" element={<CursoTable />} /> {/* Redirección por defecto */}
                </Routes>
            </Container>
            
        </Router>
    )
    /*return (
        <>
            <CssBaseline />
            <Container sx={{ marginTop: 1}}>
                <CursoTable />
            </Container>
        </>
    );*/
};

export default App;
