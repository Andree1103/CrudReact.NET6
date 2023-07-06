import { useEffect, useState } from "react"
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button } from "reactstrap"


const modelocontacto = {
    idContacto:0,
    nombre: "",
    correo: "",
    telefono:""
}



const ModalContact = ({ mostrarModal, setMostrarModal, GuardarContact, editar, setEditar, EditContact }) => {

    const [contacto, setContacto] = useState(modelocontacto);

    const actualizarData = (e) => {
        //console.log(e.target.name + " : " + e.target.value)
        setContacto(
            {
                ...contacto,
                [e.target.name]: e.target.value
            }
        )
    }
    
    const enviarData = () => {
        if (contacto.idContacto == 0) {
            GuardarContact(contacto)
        } else {
            EditContact(contacto)
        }
        setContacto(modelocontacto)
    }

    useEffect(() => {
        if (editar != null) {
            setContacto(editar)
        } else {
            setContacto(modelocontacto)
        }
    }, [editar])

    const closeModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(editar)
    }

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {contacto.idContacto == 0 ? "Nuevo Contacto": "Editar Contacto"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarData(e)} value={contacto.nombre} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizarData(e)} value={contacto.correo} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Telefono</Label>
                        <Input name="telefono" onChange={(e) => actualizarData(e)} value={contacto.telefono} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" size="sm" onClick={enviarData}>Guardar</Button>
                <Button color="danger" size="sm" onClick={closeModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}
export default ModalContact