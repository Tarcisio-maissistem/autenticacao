import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import firebaseDb from "../firebase";
import 'firebase/database';
import swal from 'sweetalert';
//import * as moment from 'moment';
import 'moment/locale/pt-br';

const Contacts = () => {

    function venci(validade) {

        // Precisamos quebrar a string para retornar cada parte
        const dataSplit = validade.split('/');
        const year = dataSplit[0];
        const month = dataSplit[1];
        const day = dataSplit[2];
        // Agora podemos inicializar o objeto Date, lembrando que o mês começa em 0, então fazemos -1.
        validade = new Date(year, month - 1, day);

        const now = new Date(); // Data de hoje
        //const past = new Date(validade); // Outra data no passado
        const diff = Math.abs(now - validade); // Subtrai uma data pela outra
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).

        // Mostra a diferença em dias
        //console.log('diferenca de '+days);
        return days
    }

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
        if (currentId === '')
            // NOVO CADASTRO
            firebaseDb.child('cadastros').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        swal("Salvo!", "", "success")
                    setCurrentId('')

                    window.location.reload()// Recarregar Pagina após Cadastro --- (Provisório)
                }
            )
        else
            // EDITAR CADASTRO
            firebaseDb.child(`cadastros/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        swal("Atualizado!", "", "success");
                    setCurrentId('')

                    window.location.reload()// Recarregar Pagina após Cadastro --- (Provisório)
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
                swal("Cancelado!", "seu arquivo está seguro!", "error");
            }
        });
    }

    return (
        <>
            <div className="container">
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-6 text-center">Listagem de Clientes</h1>
                    </div>
                </div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bt_addCliente">Adicionar Cliente</button>

                <div className="modal fade bt_addCliente" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Cadastro de Clientes</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="col-md-auto">
                                    <div className="container">
                                        {/* Renderiza Modal com todos os campos e o ContactForm esta Recebendo 3 funções  */}
                                        <ContactForm {...({ addOrEdit, currentId, contactObjects })} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive">
                        <table className='table table-hover table-sm'>
                            <thead className="thead-light">
                                <tr>
                                    <th><strong>Nome</strong></th>
                                    <th>CPF/CNPJ</th>
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
                                            className={contactObjects[id].validade <= venci(contactObjects[id].validade) ? "table-danger" : "table-success"}>
                                            <td>{contactObjects[id].nome}</td>
                                            <td>{contactObjects[id].cpfcnpj}</td>
                                            <td>{contactObjects[id].contato}</td>
                                            <td>{contactObjects[id].telefone}</td>
                                            <td>{venci(contactObjects[id].validade)}</td>
                                            <td>
                                                <a className="btn text-primary ." onClick={() => { setCurrentId(id) }}>
                                                    <i className="fas fa-pencil-alt" data-toggle="modal" data-target=".bt_addCliente"></i>
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
            </div>
        </>
    );
}

export default Contacts;