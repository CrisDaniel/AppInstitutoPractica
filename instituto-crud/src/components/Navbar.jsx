// src/Componentes/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ padding: '10px', background: '#333', color: 'white' }}>
            <Link to="/cursos" style={{ marginRight: '10px', color: 'white' }}>Cursos</Link>
            <Link to="/docentes" style={{ marginRight: '10px', color: 'white' }}>Docentes</Link>
            <Link to="/estudiantes" style={{color: 'white'}}>Estudiantes</Link>
        </nav>
    );
};

export default Navbar;
