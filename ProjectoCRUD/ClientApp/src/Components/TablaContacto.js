
import { Table, Button  } from "reactstrap"


const TablaContacto = ({ data, setEditar, mostrarModal, setMostrarModal, DeleteContact }) => {

    const enviarData = (contacto) => {
        setEditar(contacto)
        setMostrarModal(!mostrarModal)
    }


    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">Sin regsitros</td>
                        </tr>
                    ) : (
                            data.map((item) => (
                                <tr key={item.idContacto}>
                                    <td>{item.nombre}</td>
                                    <td>{item.correo}</td>
                                    <td>{item.telefono}</td>
                                    <td>
                                        <Button color="primary" size="sm" className="me-2" onClick={()=> enviarData(item)}>Editar</Button>
                                        <Button color="danger" size="sm" onClick={() => DeleteContact(item.idContacto) }>Eliminar</Button>
                                    </td>
                                </tr>
                            ))
                    )
                }
            </tbody>
        </Table>
    )
}

export default TablaContacto