import React, { useEffect, useState } from 'react';
import {
    Button, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
    Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import api from '../services/api';

const DocenteTable = () => {
    const [docentes, setDocentes] = useState([]);
    const [selectedDocente, setSelectedDocente] = useState(null);
    const [open, setOpen] = useState(false);
    const [apellidoSearch, setApellidoSearch] = useState('');

    const fetchDocente = async () => {
        const res = await api.get('/Docente');
        setDocentes(res.data);
    };

    useEffect(() => {
        fetchDocente(); // obtener docentes al inicio
    }, []);

    //Mostrar datos con un boton GET ID
    /*const handleGetById = async (id) => {
        const res = await api.get(`/${id}`);
        alert(JSON.stringify(res.data, null, 2));
    };*/

    const handleGetByApellido = async () => {
        /*const res = await api.get(`/Docente/apellidos/${apellidoSearch}`);
        setDocentes(res.data);*/
        const res = await api.get(`/Docente`);
        const quitarTildes = (str) =>
            str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        const filtro = quitarTildes(apellidoSearch);
        const filtrados = res.data.filter(d =>
            quitarTildes(d.nombreCompleto).includes(filtro)
        );

        setDocentes(filtrados);
    };

    const handleDelete = async (id) => {
        await api.delete(`/Docente/${id}`);
        fetchDocente();
    };

    const handleOpenEdit = (docente) => {
        setSelectedDocente(docente);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedDocente(null);
        setOpen(false);
    };

    const handleSave = async () => {
        console.log("Datos enviados:", selectedDocente.id);
        if (selectedDocente.id) {
            await api.put(`/Docente/${selectedDocente.id}`, selectedDocente);
        } else {
            await api.post('/Docente', selectedDocente);
        }
        fetchDocente();
        handleClose();
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <h2>Docentes</h2>
            <TextField
                label="Buscar por apellidos"
                value={apellidoSearch}
                onChange={(e) => setApellidoSearch(e.target.value)}
                sx={{ marginBottom: 2, marginRight: 2 }}
            />
            <Button onClick={handleGetByApellido} variant="outlined">Buscar docente</Button>
            <Button onClick={() => handleOpenEdit({ nombres: '', apellidos: '', profesion: '', fechaNacimiento: '', correo: '' })} variant="contained" sx={{ float: 'right' }}>Agregar Docente</Button>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>    
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Docentes</TableCell>
                            <TableCell>Profesion</TableCell>
                            <TableCell>Fecha nacimiento</TableCell>
                            <TableCell>Correo</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {docentes.map((docente) => (
                            <TableRow key={docente.id}>
                                <TableCell>{docente.id}</TableCell>
                                <TableCell>{docente.nombreCompleto}</TableCell>
                                <TableCell>{docente.profesion}</TableCell>
                                <TableCell>{new Date(docente.fechaNacimiento).toLocaleDateString('es-PE')}</TableCell>
                                <TableCell>{docente.correo}</TableCell>
                                <TableCell>
                                    {/*<Button size="small" onClick={() => handleGetById(curso.id)}>GET ID</Button>*/}
                                    <Button size="small" onClick={() => handleOpenEdit(docente)}>Editar</Button>
                                    <Button size="small" color="error" onClick={() => handleDelete(docente.id)}>Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedDocente?.id ? 'Editar Docente' : 'Nuevo Docente'}</DialogTitle>
                <DialogContent>
                    <TextField label="Apellidos" fullWidth margin="dense" value={selectedDocente?.apellidos || ''} onChange={(e) => setSelectedDocente({ ...selectedDocente, apellidos: e.target.value })} />
                    <TextField label="Nombres" fullWidth margin="dense" value={selectedDocente?.nombres || ''} onChange={(e) => setSelectedDocente({ ...selectedDocente, nombres: e.target.value })} />
                    <TextField label="Profesion" fullWidth margin="dense" value={selectedDocente?.profesion || ''} onChange={(e) => setSelectedDocente({ ...selectedDocente, profesion: e.target.value })} />
                    <TextField label="Fecha de nacimiento" type="date" fullWidth margin="dense" value={selectedDocente?.fechaNacimiento?.slice(0, 10) || ''} onChange={(e) => setSelectedDocente({ ...selectedDocente, fechaNacimiento: e.target.value })} InputLabelProps={{ shrink: true }} />
                    <TextField label="Correo" fullWidth margin="dense" value={selectedDocente?.correo || ''} onChange={(e) => setSelectedDocente({ ...selectedDocente, correo: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default DocenteTable;