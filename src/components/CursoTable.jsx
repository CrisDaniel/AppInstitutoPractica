import React, { useEffect, useState } from 'react';
import {
    Button, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import api from '../services/api';

const CursoTable = () => {
    const [cursos, setCursos] = useState([]);
    const [selectedCurso, setSelectedCurso] = useState(null);
    const [open, setOpen] = useState(false);
    const [cicloSearch, setCicloSearch] = useState('');

    const fetchCursos = async () => {
        const res = await api.get('/');
        setCursos(res.data);
    };

    useEffect(() => {
        fetchCursos();
    }, []);

    const handleGetById = async (id) => {
        const res = await api.get(`/${id}`);
        alert(JSON.stringify(res.data, null, 2));
    };

    const handleGetByCiclo = async () => {
        const res = await api.get(`/ciclo/${cicloSearch}`);
        setCursos(res.data);
    };

    const handleDelete = async (id) => {
        await api.delete(`/${id}`);
        fetchCursos();
    };

    const handleOpenEdit = (curso) => {
        setSelectedCurso(curso);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedCurso(null);
        setOpen(false);
    };

    const handleSave = async () => {
        if (selectedCurso.id) {
            await api.put(`/${selectedCurso.id}`, selectedCurso);
        } else {
            await api.post('/', selectedCurso);
        }
        fetchCursos();
        handleClose();
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <h2>Cursos</h2>
            <TextField
                label="Buscar por ciclo"
                value={cicloSearch}
                onChange={(e) => setCicloSearch(e.target.value)}
                sx={{ marginBottom: 2, marginRight: 2 }}
            />
            <Button onClick={handleGetByCiclo} variant="outlined">Buscar ciclo</Button>
            <Button onClick={() => handleOpenEdit({ curso: '', creditos: 0, horasSemanal: 0, ciclo: '', idDocente: 1 })} variant="contained" sx={{ float: 'right' }}>Agregar Curso</Button>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Curso</TableCell>
                            <TableCell>Créditos</TableCell>
                            <TableCell>Horas/Semana</TableCell>
                            <TableCell>Ciclo</TableCell>
                            <TableCell>Docente</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cursos.map((curso) => (
                            <TableRow key={curso.id}>
                                <TableCell>{curso.id}</TableCell>
                                <TableCell>{curso.curso}</TableCell>
                                <TableCell>{curso.creditos}</TableCell>
                                <TableCell>{curso.horasSemanal}</TableCell>
                                <TableCell>{curso.ciclo}</TableCell>
                                <TableCell>{curso.docente || curso.nombreDocente}</TableCell>
                                <TableCell>
                                    <Button size="small" onClick={() => handleGetById(curso.id)}>GET ID</Button>
                                    <Button size="small" onClick={() => handleOpenEdit(curso)}>Editar</Button>
                                    <Button size="small" color="error" onClick={() => handleDelete(curso.id)}>Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedCurso?.id ? 'Editar Curso' : 'Nuevo Curso'}</DialogTitle>
                <DialogContent>
                    <TextField label="Curso" fullWidth margin="dense" value={selectedCurso?.curso || ''} onChange={(e) => setSelectedCurso({ ...selectedCurso, curso: e.target.value })} />
                    <TextField label="Créditos" type="number" fullWidth margin="dense" value={selectedCurso?.creditos || 0} onChange={(e) => setSelectedCurso({ ...selectedCurso, creditos: Number(e.target.value) })} />
                    <TextField label="Horas Semanales" type="number" fullWidth margin="dense" value={selectedCurso?.horasSemanal || 0} onChange={(e) => setSelectedCurso({ ...selectedCurso, horasSemanal: Number(e.target.value) })} />
                    <TextField label="Ciclo" fullWidth margin="dense" value={selectedCurso?.ciclo || ''} onChange={(e) => setSelectedCurso({ ...selectedCurso, ciclo: e.target.value })} />
                    <TextField label="ID Docente" type="number" fullWidth margin="dense" value={selectedCurso?.idDocente || 0} onChange={(e) => setSelectedCurso({ ...selectedCurso, idDocente: Number(e.target.value) })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default CursoTable;
