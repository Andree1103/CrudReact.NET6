import { useEffect, useState } from "react"
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap"
import ModalContact from "./Components/ModalContact"
import TablaContacto from "./Components/TablaContacto"

const App = () => {

    const [contactos, SetContactos] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar,setEditar] = useState(null)

    const mostrarContactos = async () => {
        const response = await fetch("api/contacto/Lista")

        if (response.ok) {
            const data = await response.json()
            SetContactos(data)
        } else {
            console.log("error en la Lista")
        }
    }

    useEffect(() => {
        mostrarContactos()
    }, [])

    const GuardarContact = async (contacto) => {

        const response = await fetch("api/contacto/Guardar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto)
        })
        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarContactos()
        }
    }
    const EditContact = async (contacto) => {

        const response = await fetch("api/contacto/Editar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto)
        })
        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarContactos()
        }
    }
    const DeleteContact = async (id) => {
        var respuesta = window.confirm("Desea eliminar el contacto?")
        if (!respuesta) {
            return
        }
        const response = await fetch("api/contacto/Eliminar/" + id, {
            method: 'DELETE'
        })
        if (response.ok) {
            mostrarContactos()
        }
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                        <h5>Lista de Contactos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>Nuevo Contacto</Button>
                            <hr></hr>
                            <TablaContacto data={contactos} setEditar={setEditar} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} DeleteContact={DeleteContact} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalContact mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} GuardarContact={GuardarContact}
                editar={editar} setEditar={setEditar} EditContact={EditContact} />
        </Container>
    )
}

export default App;