import React, { useState, useEffect } from "react";
import moment from 'moment'

const ContactForm = (props) => {

    let dia = moment().format("DD")
    let mes = moment().format("MM")
    let ano = moment().format("YYYY")
    let dataCadastro = dia + '-' + mes + '-' + ano;

    const valoresIniciais = {
        nome: '',
        razao: '',
        telefone: '',
        email: '',
        cpfcnpj: '',
        contato: '',
        rua: '',
        numero: '',
        cep: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        atualizado: '',
        sistema:'',
        validade: '',
        obs: '',
        dataCadastro: dataCadastro
    }

    var [valores, setValores] = useState(valoresIniciais)

    useEffect(() => {
        if (props.currentId === '')
        setValores({
                ...valoresIniciais
            })
        else
            setValores({
                ...props.contactObjects[props.currentId]
            })
    }, [props.currentId, props.contactObjects]);

    const handleInputChange = e => {
        var { name, value } = e.target
        setValores({
            ...valores,
            [name]: value
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        props.addOrEdit(valores)
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <input className="form-control" placeholder="Nome" name="nome"
                    value={valores.nome}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <input className="form-control" placeholder="Razão Social" name="razao"
                    value={valores.razao}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Telefone" name="telefone"
                        value={valores.telefone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Email" name="email"
                        value={valores.email}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                    </div>
                    <input minLength="11" maxLength="14" className="form-control" placeholder="CNPJ ou CPF" name="cpfcnpj"
                        value={valores.cpfcnpj}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Contato" name="contato"
                        value={valores.contato}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <label><strong>Endereço</strong></label>
            <div className="form-row">
                <div className="form-group input-group col-md-8">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Logradouro" name="rua"
                        value={valores.rua}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group input-group col-md-4">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="n°" name="numero"
                        value={valores.numero}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group input-group col-md-5">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                    </div>
                    <input maxLength='8' className="form-control" placeholder="CEP" name="cep"
                        value={valores.cep}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group input-group col-md-7">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Complemento" name="complemento"
                        value={valores.complemento}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Bairro" name="bairro"
                        value={valores.bairro}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Cidade" name="cidade"
                        value={valores.cidade}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>

                    <input className="form-control" placeholder="Estado" name="estado"
                        value={valores.estado}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <label><strong>Sistemas</strong></label>


            <div className="form-row">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Sistema</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01">
                        <option defaultValue>Nenhum...</option>
                        <option value="Gdoor PRO">Gdoor PRO</option>
                        <option value="Gdoor SLIM">Gdoor SLIM</option>
                        <option value="GrFood">GrFood</option>
                        <option value="TEF">TEF</option>
                        <option value="Acronyn Fiscal">Acronyn Fiscal</option>
                        <option value="Acronyn Gestão">Acronyn Gestão</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Validade</label>
                    </div>
                    <input className="form-control" type="date" name="validade"
                        value={valores.validade}
                        onChange={handleInputChange}
                    />
                </div>
            </div>


            <div className="form-group">
                <textarea className="form-control" placeholder="Observação" name="obs"
                    value={valores.obs}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <input
                    type="submit"
                    value={props.currentId == '' ? "Salvar" : "Atualizar"}
                    className="btn btn-primary btn-block"

                />
            </div>

        </form>
    );
}

export default ContactForm;