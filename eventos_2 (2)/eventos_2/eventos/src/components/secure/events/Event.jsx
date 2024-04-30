import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";

import EventsService from "../../../services/events.service";

const Event = () => {
    const navigate = useNavigate();


    const params = useParams();
    const [id, setId] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [location, setLocation] = useState("");
    const [notes, setNotes] = useState("");
    const [successful, setSuccessful] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!params.number) {
            return;
        }

        async function fetchData() {
            const response = await EventsService.getById(params.number);

            setId(response.data.id);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setCategory(response.data.category);
            setStartDate(new Date(response.data.startDate).toISOString().split('T')[0]);
            setEndDate(new Date(response.data.endDate).toISOString().split('T')[0]);
            setLocation(response.data.location);
            setNotes(response.data.notes);
        }

        fetchData();
    },[]);


    const form = useRef();
    const checkBtn = useRef();

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            EventsService.createORupdate(id,title,description,category,new Date(startDate).toISOString(),new Date(endDate).toISOString(),location,notes).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);

                    setId(response.data.id);
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    setCategory(response.data.category);
            setStartDate(new Date(response.data.startDate).toISOString().split('T')[0]);
            setEndDate(new Date(response.data.endDate).toISOString().split('T')[0]);
                    setLocation(response.data.location);
                    setNotes(response.data.notes);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();

        EventsService.deleteEvent(id).then(
            (response) => {
                navigate('/events-list');
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    }

    const required = (value) => {
        if (!value) {
            return (
                <div className="invalid-feedback d-block">
                    É obrigatório!
                </div>
            );
        }
    };

    const validLength = (value) => {
        if (value.length < 3 || value.length > 50) {
            return (
                <div className="invalid-feedback d-block">
                    O nome deve ter entre 3 e 20 caracteres!
                </div>
            );
        }
    };

    return (
        <main>
            <section>
                <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                    <div className="container-fluid py-5">
                        <Form onSubmit={handleRegister} ref={form} className="col-4">
                            <div>
                                <h1 className="h3 mb-3 fw-normal">Registo</h1>

                                <div className="form-group">
                                    <label>Título</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        validations={[required, validLength]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Descrição</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        validations={[required, validLength]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Categoria</label>
                                    <select defaultValue="MUSIC" required className='form-control' name='category' id="category" onChange={(e) => setCategory(e.target.value)}>
                                        <option value="MUSIC">Música</option>
                                        <option value="SPORTS">Desporto</option>
                                        <option value="ARTS">Arte</option>
                                        <option value="EDUCATION">Educação</option>
                                        <option value="OTHER">Outro</option>
                                        </select>
                                </div>
                                
                                <div className="form-group">
                                    <label>Data de Ínicio</label>
                                    <Input
                                        type="date"
                                        className="form-control"
                                        name="startDate"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Data de Termínio</label>
                                    <Input
                                        type="date"
                                        className="form-control"
                                        name="endDate"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Localização</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        validations={[required, validLength]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Notas</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="notes"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    {id ? (<button className="btn btn-success mt-2">Atualizar</button>) : <button className="btn btn-success mt-2">Criar</button>}

                                    {id && (<button onClick={handleDelete} className="btn btn-danger mt-2 mx-2">
                                        Eliminar
                                    </button>)}

                                    <Link to={"/events-list"} className="btn btn-secondary mt-2 mx-2">
                                        Voltar
                                    </Link>
                                </div>
                            </div>

                            {successful && (
                                <div className="alert alert-success mt-2" role="alert">
                                    Gravado com sucesso!
                                </div>
                            )}


                            {message && successful !== null && (
                                <div className="form-group">
                                    <div
                                        className={
                                            successful ? "alert alert-success" : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Event;