import React, { useState } from 'react';
import { validationPassword } from '../PasswordValidation/index.js';
import { requireValidate } from '../../Requisitions/PasswordValidateRequisitios/index.js';
import '../../w3.css';

export const Formulario = () => {
  const [mensagem1, setMensagem1] = useState();
  const [mensagem2, setMensagem2] = useState();
  const [mensagem3, setMensagem3] = useState();
  const [mensagem4, setMensagem4] = useState();
  const [msgSucess, setMsgSucess] = useState();
  const [habilitarBotao, setHabilitarBotao] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validation = (password) => {
    const buttonHability = validationPassword(
      password.target.value,
      setMensagem1,
      setMensagem2,
      setMensagem3,
      setMensagem4,
    );
    setHabilitarBotao(buttonHability);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const object = {
      name: name,
      email: email,
      password: password,
    }

    try {
      setIsLoading(true);
      const result = await requireValidate(object);
      if (result.status === 201) {
        setMsgSucess({
          msg: 'Resultado enviado com sucesso!',
          classColor: 'w3-text-green',
        });
        console.log(result.statusText);
      } else {
        setMsgSucess({
          msg: 'Erro ao enviar resultado!',
          classColor: 'w3-text-red',
        });
        console.log(result.statusText);
      }
    } catch (error) {
      setMsgSucess({ error: 'Erro ao enviar resultado!' });
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className='w3-col m12 l12 s12 App-padding-left-right'>
      <div className="w3-row">
        <div className="w3-col">
          <header className='w3-left-align w3-margin-left'>
            <h1>Valide sua senha</h1>
          </header>
          <form className="w3-container" onSubmit={handleSubmit}>
            <div className="w3-left-align" id="formBasicName">
              <label htmlFor='name' >Nome</label>
              <input
                id='name'
                className="w3-input w3-border w3-round"
                type="text"
                placeholder="Digite seu nome"
                onChange={(evt) => setName(evt.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className='w3-left-align' id="formBasicEmail">
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                className="w3-input w3-border w3-round"
                type="email"
                placeholder="Digite seu email"
                onChange={(evt) => setEmail(evt.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className='w3-left-align' id="formBasicPassword">
              <label htmlFor='senha' className="senha">Senha</label>
              <input
                id='senha'
                onKeyUp={validation}
                className="w3-input w3-border w3-round"
                type="password"
                placeholder="Confirme sua senha"
                onChange={(evt) => setPassword(evt.target.value)}
                disabled={isLoading}
              />
            </div>
            {
              !habilitarBotao &&
              <div className='w3-left-align'>
                <p className='w3-text-red'>
                  <span className='w3-text-red'>
                    Senha inválida:
                  </span>
                  <br />
                </p>
              </div>
            }
            {
              mensagem1 && (
                <ul className='w3-text-red'>
                  <li className='w3-left-align'>{mensagem1.msg}</li>
                </ul>
              )
            }
            {
              mensagem2 &&
              <ul className='w3-text-red'>
                <li className='w3-left-align'>{mensagem2.msg}</li>
              </ul>
            }
            {
              mensagem3 &&
              <ul className='w3-text-red'>
                <li className='w3-left-align'>{mensagem3.msg}</li>
              </ul>
            }
            {
              mensagem4 &&
              <ul className='w3-text-red'>
                <li className='w3-left-align'>{mensagem4.msg}</li>
              </ul>
            }


            <div className='w3-right-align w3-margin-top'>
              {
                msgSucess && <ul className='w3-col l9 m9 s9'>
                  <li className={msgSucess.classColor}>{msgSucess.msg}</li>
                </ul>
              }
              {
                habilitarBotao &&

                <button className='
                w3-button
                w3-gray
                w3-round
                w3-border
                w3-border-black
                w3-text-dark-grey
                w3-margin-left'
                  type="submit"
                >
                  Enviar
                </button>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}