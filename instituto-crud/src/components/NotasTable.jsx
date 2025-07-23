import React, { useEffect, useState } from 'react';
import {
    Button, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
    Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import api from '../services/api';

const NotasTable = () => {
    const [notas, setNotas] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [selectedNotas, setSelectedNotas] = useState(null);
    const [open, setOpen] = useState(false);
    const [cicloSearch, setCicloSearch] = useState('');

    const fetchNotas = async () => {
        const res = await api.get('/Notas');
        setNotas(res.data);
    };

    const fetchCursos = async () => {
        const res = await api.get('/Cursos');
        setCursos(res.data);
    };

    const fetchEstudiantes = async () => {
        const res = await api.get('/Estudiantes');
        setEstudiantes(res.data);
    };

    useEffect(() => {
        fetchNotas();
        fetchCursos();
        fetchEstudiantes();
    }, []);

    /*const handleGetByCiclo = async () => {
        const res = await api.get(`/Cursos/ciclo/${cicloSearch}`);
        setCursos(res.data);
    };*/

    const handleDelete = async (id) => {
        await api.delete(`/Notas/${id}`);
        fetchNotas();
    };

    const handleOpenEdit = (nota) => {
        setSelectedNotas(nota);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedNotas(null);
        setOpen(false);
    };

    const handleSave = async () => {
        if (selectedNotas.id) {
            await api.put(`/Notas/${selectedNotas.id}`, selectedNotas);
        } else {
            await api.post('/Notas', selectedNotas);
        }
        fetchNotas();
        handleClose();
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <h2>Notas</h2>
            {/*<TextField
                label="Buscar por ciclo"
                value={cicloSearch}
                onChange={(e) => setCicloSearch(e.target.value)}
                sx={{ marginBottom: 2, marginRight: 2 }}
            />
            <Button onClick={handleGetByCiclo} variant="outlined">Buscar ciclo</Button>*/}
            <Button onClick={() => handleOpenEdit({ idCurso: '', idEstudiante: '', ponderacion: '' })} variant="contained" sx={{ float: 'right' }}>Agregar Matricula</Button>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Curso</TableCell>
                            <TableCell>Estudiante</TableCell>
                            <TableCell>Ponderacion</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notas.map((nota) => (
                            <TableRow key={nota.id}>
                                <TableCell>{nota.id}</TableCell>
                                <TableCell>{nota.curso}</TableCell>
                                {/*Tiene acceso directo a la propiedad nombre del estudiante*/}
                                <TableCell>{nota.nombre}</TableCell>
                                <TableCell>{nota.ponderacion}</TableCell>
                                <TableCell>
                                    <Button size="small" onClick={() => handleOpenEdit(nota)}>Editar</Button>
                                    <Button size="small" color="error" onClick={() => handleDelete(nota.id)}>Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedNotas?.id ? 'Editar Nota' : 'Nueva Nota'}</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Curso</InputLabel>
                        <Select
                            value={selectedNotas?.idCurso || ''}
                            onChange={(e) =>
                                setSelectedNotas({ ...selectedNotas, idCurso: e.target.value })
                            }
                            label="Curso"
                        >
                            {cursos.map((curso) => (
                                <MenuItem key={curso.id} value={curso.id}>
                                    {curso.curso}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Estudiante</InputLabel>
                        <Select
                            value={selectedNotas?.idEstudiante || ''}
                            onChange={(e) =>
                                setSelectedNotas({ ...selectedNotas, idEstudiante: e.target.value })
                            }
                            label="Estudiante"
                        >
                            {estudiantes.map((estudiante) => (
                                <MenuItem key={estudiante.id} value={estudiante.id}>
                                    {estudiante.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField label="Ponderacion" type="number" fullWidth margin="dense" value={selectedNotas?.ponderacion || 0} onChange={(e) => setSelectedNotas({ ...selectedNotas, ponderacion: Number(e.target.value) })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default NotasTable;