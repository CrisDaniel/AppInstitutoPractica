// src/Componentes/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav
            style={{
                width: '100%',
                padding: '10px 20px',
                background: '#1976d2',
                color: 'white',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
            }}
        >
            <Link to="/cursos" style={{ marginRight: '10px', color: 'white' }}>Cursos</Link>
            <Link to="/docentes" style={{ marginRight: '10px', color: 'white' }}>Docentes</Link>
            <Link to="/estudiantes" style={{ marginRight: '10px', color: 'white' }}>Estudiantes</Link>
            <Link to="/matriculas" style={{ marginRight: '10px', color: 'white' }}>Matriculas</Link>
            <Link to="/notas" style={{ marginRight: '10px', color: 'white' }}>Notas</Link>
        </nav>
    );
};

export default Navbar;
