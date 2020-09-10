import React, { useState } from 'react';
import Swal from 'sweetalert2';
import M from "materialize-css";

import './style.css';
import api from '../../../services/api';

export default function NewCustomer(props) {
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('F');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [uf, setUf] = useState('');
    const [inscricaoEst, setInsricaoEst] = useState('');
    const [telefone, setTelefone] = useState('');
    const [labelCpfCnpj, setLabelCpfCnpj] = useState('CPF');
    const [labelNomeRazaoSocial, setLabelNomeRazao] = useState('Nome');

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, '');
    });

    function resetFields() {
        setNome('');
        setTipo('F');
        setCpfCnpj('');
        setEmail('');
        setEndereco('');
        setBairro('');
        setCidade('');
        setCep('');
        setUf('');
        setInsricaoEst('');
        setTelefone('');
        setLabelCpfCnpj('CPF');

        //M.updateTextFields;
    }

    function verifyFields(pNome, pTipo, pCpfCnpj, pEmail, pEndereco, pBairro, pCidade, pCep, pUf, pInscricaoEst, pTelefone) {
        var blancField = '';

        if (pNome === '') {
            blancField += 'Nome';
        }
        if (pTipo === '') {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'Tipo';
        }
        if (pCpfCnpj === '') {
            if (blancField !== '') {
                blancField += ', ';
            }
            if (pTipo === 'F') {
                blancField += 'CPF'
            } else {
                blancField += 'CNPJ';
            }
        }
        if (pEmail === '') {
            // TO DO: verificar se o formato está certo
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'Email';
        }
        if (pEndereco === '') {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'Endereço';
        }
        if (pBairro === '') {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'Bairro';
        }
        if (pCidade === '') {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'Cidade';
        }
        if (pCep === '') {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'CEP';
        }
        if (pUf === '') {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'UF';
        }
        if (pInscricaoEst === '' && pTipo === 'J') {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'Inscrição Estadual';
        }
        if (pTelefone === '') {
            if (blancField !== '') {
                blancField += ', ';
            }
            blancField += 'Telefone';
        }

        return blancField;
    }

    async function handleNewCustomer(event) {
        event.preventDefault();

        const blancFields = verifyFields(nome, tipo, cpfCnpj, email, endereco, bairro, cidade, cep, uf, inscricaoEst, telefone);
        if (blancFields) {
            Swal.fire({
                type: 'warning',
                title: `Os seguintes campos devem ser preenchidos corretamente:`,
                text: `${blancFields}`,
                showConfirmButton: true,
                confirmButtonText: "OK"
            });
        } else {
            const data = {
                nome, 
                tipo, 
                cpfCnpj, 
                email, 
                endereco, 
                bairro, 
                cidade, 
                cep, 
                uf, 
                inscricaoEst, 
                telefone
            };
            
            try {
                const response = await api.post('clients', data);
    
                Swal.fire({
                    type: 'success',
                    title: `Cliente ${nome} cadastrado com sucesso`,
                    timer: 1800,
                    showConfirmButton: false
                });
                
                resetFields();
                props.refreshCustomerList(); // atualiza a lista de clientes cadastrados
            } catch (err) {
                Swal.fire({
                    type: 'error',
                    title: `Erro ao cadastrar cliente ${nome}`,
                    text: 'Tente novamente',
                    showConfirmButton: true,
                    confirmButtonText: "OK"
                });
            } 
        }
    }

    /* 
                nome, 
                tipo, 
                cpfCnpj, 
                email, 
                endereco, 
                bairro, 
                cidade, 
                cep, 
                uf, 
                inscricaoEst, 
                telefone
    */

    function atualizaControles(pTipoPessoa) {
        if (pTipoPessoa === 'F') { // pessoa fisica
            setLabelCpfCnpj('CPF');
            setLabelNomeRazao('Nome');
            document.getElementById('inscricaoEst').disabled = true;
        } else { // pessoa juridica
            setLabelCpfCnpj('CNPJ');
            setLabelNomeRazao('Razão Social');
            document.getElementById('inscricaoEst').disabled = false;
        }
    }

    return(
        <div id="modalNewCustomer" className="modal modal-cliente">
            <div className="modal-content">
                <h1>Cadastrar novo cliente</h1>

                <div className="input-group">
                    <div className="input-radio">
                        <p>
                            <label>
                                <input 
                                    name="grupoTipo" 
                                    checked
                                    id="tipoF"
                                    type="radio"
                                    value="F"
                                    onFocus={e => {setTipo(e.target.value); atualizaControles(e.target.value);}}
                                    className="with-gap"
                                />
                                <span>Pessoa Física</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input
                                    name="grupoTipo" 
                                    id="tipoJ"
                                    type="radio"
                                    value="J"
                                    onFocus={e => {setTipo(e.target.value); atualizaControles(e.target.value);}}
                                    className="with-gap"
                                />
                                <span>Pessoa Jurídica</span>
                            </label>
                        </p>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">people</i>
                        <input 
                            id="nome"
                            type="text"
                            className="validate"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                        <label htmlFor="nome">{labelNomeRazaoSocial}</label>
                    </div>
                </div>
                
                <div className="input-group">
                    <div className="input-field">
                        <i className="material-icons prefix">call_to_action</i>
                        <input 
                            id="cpfCnpj"
                            type="text"
                            className="validate"
                            value={cpfCnpj}
                            onChange={e => setCpfCnpj(e.target.value)}
                        />
                        <label htmlFor="cpfCnpj">{labelCpfCnpj}</label>
                    </div>

                    <div className="input-field">
                        <i className="material-icons prefix">email</i>
                        <input 
                            id="email"
                            type="email"
                            className="validate"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-field">
                        <i className="material-icons prefix">local_phone</i>
                        <input 
                            id="telefone"
                            type="text"
                            className="validate"
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)}
                        />
                        <label htmlFor="telefone">Telefone</label>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">power_input</i>
                        <input 
                            id="inscricaoEst"
                            type="text"
                            disabled
                            className="validate"
                            value={inscricaoEst}
                            onChange={e => setInsricaoEst(e.target.value)}
                        />
                        <label htmlFor="inscricaoEst">Inscrição Estadual</label>
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-field">
                        <i className="material-icons prefix">location_on</i>
                        <input 
                            id="endereco"
                            type="text"
                            className="validate"
                            value={endereco}
                            onChange={e => setEndereco(e.target.value)}
                        />
                        <label htmlFor="endereco">Endereço</label>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">location_on</i>
                        <input 
                            id="bairro"
                            type="text"
                            className="validate"
                            value={bairro}
                            onChange={e => setBairro(e.target.value)}
                        />
                        <label htmlFor="bairro">Bairro</label>
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-field">
                        <i className="material-icons prefix">location_on</i>
                        <input 
                            id="cidade"
                            type="text"
                            className="validate"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
                        />
                        <label htmlFor="cidade">Cidade</label>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">location_on</i>
                        <input 
                            id="uf"
                            type="text"
                            className="validate"
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                        <label htmlFor="uf">UF</label>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">more</i>
                        <input 
                            id="cep"
                            type="text"
                            className="validate"
                            value={cep}
                            onChange={e => setCep(e.target.value)}
                        />
                        <label htmlFor="cep">CEP</label>
                    </div>
                </div>
            </div>

            <div className="modal-footer">
                <a href="#" onClick={resetFields} className="modal-close waves-effect btn botao-cancelar"><i className="material-icons left">clear</i>Sair</a>
                <a href="#" onClick={handleNewCustomer} className="waves-effect btn botao-confirmar"><i className="material-icons left">check</i>Confirmar</a>
            </div>
        </div>
    );
}