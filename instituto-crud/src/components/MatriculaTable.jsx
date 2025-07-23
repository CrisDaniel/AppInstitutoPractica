import React, { useEffect, useState } from 'react';
import {
    Button, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
    Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import api from '../services/api';

const MatriculaTable = () => {
    const [matriculas, setMatriculas] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [selectedMatricula, setSelectedMatricula] = useState(null);
    const [open, setOpen] = useState(false);
    const [cicloSearch, setCicloSearch] = useState('');

    const fetchMatricula = async () => {
        const res = await api.get('/Matriculas');
        setMatriculas(res.data);
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
        fetchMatricula();
        fetchCursos();
        fetchEstudiantes();
    }, []);

    /*const handleGetByCiclo = async () => {
        const res = await api.get(`/Cursos/ciclo/${cicloSearch}`);
        setCursos(res.data);
    };*/

    const handleDelete = async (id) => {
        await api.delete(`/Matriculas/${id}`);
        fetchMatricula();
    };

    const handleOpenEdit = (matricula) => {
        setSelectedMatricula(matricula);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedMatricula(null);
        setOpen(false);
    };

    const handleSave = async () => {
        if (selectedMatricula.id) {
            await api.put(`/Matriculas/${selectedMatricula.id}`, selectedMatricula);
        } else {
            await api.post('/Matriculas', selectedMatricula);
        }
        fetchMatricula();
        handleClose();
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <h2>Matriculas</h2>
            {/*<TextField
                label="Buscar por ciclo"
                value={cicloSearch}
                onChange={(e) => setCicloSearch(e.target.value)}
                sx={{ marginBottom: 2, marginRight: 2 }}
            />
            <Button onClick={handleGetByCiclo} variant="outlined">Buscar ciclo</Button>*/}
            <Button onClick={() => handleOpenEdit({ idCurso: '', idEstudiante: '', fechaMatricula: '' })} variant="contained" sx={{ float: 'right' }}>Agregar Matricula</Button>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Curso</TableCell>
                            <TableCell>Estudiante</TableCell>
                            <TableCell>Fecha Matricula</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {matriculas.map((matricula) => (
                            <TableRow key={matricula.id}>
                                <TableCell>{matricula.id}</TableCell>
                                <TableCell>{matricula.curso}</TableCell>
                                {/*Tiene acceso directo a la propiedad nombre del estudiante*/}
                                <TableCell>{matricula.nombre}</TableCell>
                                <TableCell>{new Date(matricula.fechaMatricula).toLocaleDateString('es-PE')}</TableCell>
                                <TableCell>
                                    <Button size="small" onClick={() => handleOpenEdit(matricula)}>Editar</Button>
                                    <Button size="small" color="error" onClick={() => handleDelete(matricula.id)}>Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedMatricula?.id ? 'Editar Matricula' : 'Nueva Matricula'}</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Curso</InputLabel>
                        <Select
                            value={selectedMatricula?.idCurso || ''}
                            onChange={(e) =>
                                setSelectedMatricula({ ...selectedMatricula, idCurso: e.target.value })
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
                            value={selectedMatricula?.idEstudiante || ''}
                            onChange={(e) =>
                                setSelectedMatricula({ ...selectedMatricula, idEstudiante: e.target.value })
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
                    <TextField label="Fecha de matricula" type="date" fullWidth margin="dense" value={selectedMatricula?.fechaMatricula?.slice(0, 10) || ''} onChange={(e) => setSelectedMatricula({ ...selectedMatricula, fechaMatricula: e.target.value })} InputLabelProps={{ shrink: true }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default MatriculaTable;