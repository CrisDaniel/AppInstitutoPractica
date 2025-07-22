import React, { useEffect, useState } from 'react';
import {
    Button, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
    Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import api from '../services/api';

const EstudianteTable = () => {
    const [estudiante, setEstudiante] = useState([]);
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);
    const [open, setOpen] = useState(false);
    const [dniSearch, setDniSearch] = useState('');

    const fetchEstudiante = async () => {
        const res = await api.get('/Estudiantes');
        setEstudiante(res.data);
    };

    useEffect(() => {
        fetchEstudiante(); // obtener ESTUDIANTES al inicio
    }, []);

    //Mostrar datos con un boton GET ID
    /*const handleGetById = async (id) => {
        const res = await api.get(`/${id}`);
        alert(JSON.stringify(res.data, null, 2));
    };*/

    const handleGetByDni = async () => {
        const res = await api.get(`/Estudiantes/dni/${dniSearch}`);
        setEstudiante(res.data);
    };

    const handleDelete = async (id) => {
        await api.delete(`/Estudiantes/${id}`);
        fetchEstudiante();
    };

    const handleOpenEdit = (estudiante) => {
        setSelectedEstudiante(estudiante);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedEstudiante(null);
        setOpen(false);
    };

    const handleSave = async () => {
        console.log("Datos enviados:", selectedEstudiante);
        if (selectedEstudiante.id) {
            await api.put(`/Estudiantes/${selectedEstudiante.id}`, selectedEstudiante);
        } else {
            await api.post('/Estudiantes', selectedEstudiante);
        }
        fetchEstudiante();
        handleClose();
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <h2>Estudiantes</h2>
            <TextField
                label="Buscar por dni"
                value={dniSearch}
                onChange={(e) => setDniSearch(e.target.value)}
                sx={{ marginBottom: 2, marginRight: 2 }}
            />
            <Button onClick={handleGetByDni} variant="outlined">Buscar estudiante</Button>
            <Button onClick={() => handleOpenEdit({ nombre: '', dni: '', correo: '' })} variant="contained" sx={{ float: 'right' }}>Agregar Estudiante</Button>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Estudiante</TableCell>
                            <TableCell>Dni</TableCell>
                            <TableCell>Correo</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {estudiante.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.id}</TableCell>
                                <TableCell>{student.nombre}</TableCell>
                                <TableCell>{student.dni}</TableCell>
                                <TableCell>{student.correo}</TableCell>
                                <TableCell>
                                    <Button size="small" onClick={() => handleOpenEdit(student)}>Editar</Button>
                                    <Button size="small" color="error" onClick={() => handleDelete(student.id)}>Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedEstudiante?.id ? 'Editar Estudiante' : 'Nuevo Estudiante'}</DialogTitle>
                <DialogContent>
                    <TextField label="Nombre" fullWidth margin="dense" value={selectedEstudiante?.nombre || ''} onChange={(e) => setSelectedEstudiante({ ...selectedEstudiante, nombre: e.target.value })} />
                    <TextField label="Dni" fullWidth margin="dense" value={selectedEstudiante?.dni || ''} onChange={(e) => setSelectedEstudiante({ ...selectedEstudiante, dni: e.target.value })} />
                    <TextField label="Correo" fullWidth margin="dense" value={selectedEstudiante?.correo || ''} onChange={(e) => setSelectedEstudiante({ ...selectedEstudiante, correo: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default EstudianteTable;