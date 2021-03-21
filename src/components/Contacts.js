import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";
import swal from 'sweetalert';
import * as moment from 'moment';
import 'moment/locale/pt-br';


const Contacts = () => {
    //let start = moment().format('l');
    //let end = moment().startOf('4').fromNow(); 
    //let dif = end - start


    let dia = moment().format("DD")
    let mes = moment().format("MM")
    let ano = moment().format("YYYY")
    let diaalerta = dia + '-' + mes + '-' + ano;


    //let alerta = moment().add(2, 'days').calendar("DD-MM-YYYY");


    //let diaVenci = moment().format("10-12-2020")//DIA COM MES JUNTOS

    //console.log(start)


    var [contactObjects, setContactObjects] = useState({})
    var [currentId, setCurrentId] = useState('')

    useEffect(() => {

        firebaseDb.child('cadastros').on('value', snapshot => {
            if (snapshot.val() != null)//cadastrando novo cliente no firebase
                setContactObjects({
                    ...snapshot.val()
                })
            else //Criando a Lista de Clientes inicial
                setCurrentId([])
        })

    }, [])

    const addOrEdit = obj => {
        if (currentId == '')
            firebaseDb.child('cadastros').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                    swal("Salvo!", "", "success");
                }
            )
        else
            firebaseDb.child(`cadastros/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        swal("Atualizado!", "", "success");
                    setCurrentId('')
                }
            )
    }

    const onDelete = key => {
        swal({
            title: "tem certeza?",
            text: "Você irá remover esse cadastro",
            icon: "warning",
            buttons:
                [
                    'Não!',
                    'Sim!'
                ],
            dangerMode: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                firebaseDb.child(`cadastros/${key}`).remove(
                    err => {
                        if (err)
                            console.log(err)
                        else
                            //window.location.reload();
                            swal("Removido!", "", "success");
                        setCurrentId('')
                    }
                )

            } else {
                swal("Cancelado!", "seu arquivo está seguro! ;)", "error");
            }
        });

    }


    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center"> Cadastro de Clientes </h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">

                    <ContactForm {...({ addOrEdit, currentId, contactObjects })} />

                    <div>
                        <p>{moment().subtract(15, 'days').calendar()}</p>
                    </div>

                </div>
                <div className="col-md-8">
                    <table className='table table-hover table-sm'>
                        <thead className="thead-light">
                            <tr>
                                <th><strong>Nome</strong></th>
                                <th>CPF ou CNPJ</th>
                                <th>Contato</th>
                                <th>Telefone</th>
                                <th>Validade</th>
                                <th width="95px">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contactObjects).map(id => {
                                    return <tr
                                        key={id}
                                        className={contactObjects[id].validade <= diaalerta ? "table-danger" : "table-success"}>
                                        <td>{contactObjects[id].nome}</td>
                                        <td>{contactObjects[id].cpfcnpj}</td>
                                        <td>{contactObjects[id].contato}</td>
                                        <td>{contactObjects[id].telefone}</td>
                                        <td>{moment().subtract(contactObjects[id].validade, 'days').calendar()}</td>
                                        <td>
                                            <a className="btn text-primary" onClick={() => { setCurrentId(id) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger" onClick={() => { onDelete(id) }}>
                                                <i className="fas fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Contacts;