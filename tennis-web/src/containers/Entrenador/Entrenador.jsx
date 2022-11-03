import React from "react";
import Typography from "../../components/Typography/Typography";
import TableEntrenadores from "../../components/Tables/TableEntrenador";
import EntrenadorModal from "../../components/Modals/EntrenadorModal";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import httpClient from '../../lib/httpClient';


let entrenadorInit = {
    nombre: '',
    puntos: 0,
  };

const Entrenador = (props) => {

    const [entrenadoresList, setEntrenadoresList] = useState([]);
    const [entrenadorData, setEntrenadorData] = useState(entrenadorInit);
    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [hasErrorInForm, setHasErrorInForm] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // query de entrenadores a la db cada vez que se renderice
    useEffect(async () => {
        await getEntrenadores();
      }, []);

      //Verbos
    const getEntrenadores = async () => {
        console.log('entreee')
        try {
            const data = await httpClient.get('/entrenadores');
            setEntrenadoresList(data);
        } catch (error) {
            console.log(error);
        }
    };
    const agregarEntrenador = async () => {
        try {
        const data = await httpClient.post(`/entrenadores`, { data: entrenadorData });
        setEntrenadoresList([...entrenadoresList, data]);
        } catch (error) {
        console.log(error);
        }
        handleCloseModal();
    };

    const editarEntrenador = async (id) => {
        try {
          const data = await httpClient.put(`/entrenadores/${id}`, { data: entrenadorData });
          setEntrenadoresList(entrenadoresList.map((item) => (item.id === id ? data : item)));
        } catch (error) {
          console.log(error);
        }
        handleCloseModal();
    };
    
      const borrarEntrenador = async (id) => {
        try {
          await httpClient.delete(`/entrenadores/${id}`);
          setEntrenadoresList(entrenadoresList.filter((entrenador) => entrenador.id !== id));
        } catch (error) {
          console.log(error);
        }
      };


    // manejos del boton
    const handleDelete = async (id, event) => {
        event.preventDefault();
        if (window.confirm('Estas seguro?')) {
          await borrarEntrenador(id);
        }
    };

    const handleEdit = (editData, event) => {
        event.preventDefault();
        handleOpenModal(true, editData);
      };

    // funciones para manejar el modal

    const handleOpenModal = (editarEntrenador = false, entrenadorToEdit = null) => {
    setIsEdit(editarEntrenador);

    if (editarEntrenador) {
        setEntrenadorData(entrenadorToEdit);
    }

        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setIsEdit(false);
        setHasErrorInForm(false);
        setEntrenadorData(entrenadorInit);
        setErrorMsg('');
      };

    //manejos del form provenientes del modal

    const handleChangeInputForm = (property, value) => {
        value === '' ? setHasErrorInForm(true) : setHasErrorInForm(false);
    
        setEntrenadorData({ ...entrenadorData, [property]: value });
    };
    
    const handleSubmitForm = (e, form, isEdit) => {
        e.preventDefault();
        setHasErrorInForm(true);
    
        if (form.checkValidity()) isEdit ? editarEntrenador(entrenadorData.id) : agregarEntrenador();
    };
    
    return (
        <>
            <Typography id={'title-id'}>Entrenador</Typography>
            <div className="mb-2">
                <Button variant="success" onClick={() => handleOpenModal()}>Agregar entrenador</Button>
            </div>

            <TableEntrenadores
                dataForTable={entrenadoresList}
                edit={handleEdit}
                delete={(id, event) => handleDelete(id, event)}
            />

            <EntrenadorModal
                show={openModal}
                onHide={handleCloseModal}
                isEdit={isEdit}
                handleChange={handleChangeInputForm}
                entrenador={entrenadorData}
                validated={hasErrorInForm}
                handleSubmit={handleSubmitForm}
                errorMsg={errorMsg}
            />
        </>
    );
};

export default Entrenador;