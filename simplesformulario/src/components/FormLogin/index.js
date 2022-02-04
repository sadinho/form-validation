import React, { useState } from 'react';
import { validationPassword, mensagesRender, buttonRender } from '../PasswordValidation/index.js';
import { requireValidate } from '../../Requisitions/PasswordValidateRequisitios/index.js';
import '../../w3.css';

export const Formulario = () => {
  const [mensagem1, setMensagem1] = useState();
  const [mensagem2, setMensagem2] = useState();
  const [mensagem3, setMensagem3] = useState();
  const [mensagem4, setMensagem4] = useState();
  const [msgSucess, setMsgSucess] = useState();
  const [ buttonHability, setButtonHability] = useState(false);
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
    setButtonHability(buttonHability);
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
  const renderMenssage = () => {
    return mensagesRender(
      mensagem1,
      mensagem2,
      mensagem3,
      mensagem4,
      buttonHability,
    );
  }

  const renderButton = () => {
    return buttonRender(msgSucess, buttonHability, isLoading);
  }

  return (
    <div className='w3-col m12 l12 s12 App-padding-left-right'>
      <div className="w3-row">
        <div className="w3-col">
          <header className='w3-left-align w3-margin-left w3-margin'>
            <h2 className='w3-left-align w3-margin'>Valide sua senha</h2>
          </header>
          <form className="w3-container" onSubmit={handleSubmit}>
            <div className="w3-left-align w3-margin" id="formBasicName">
              <input
                id='name'
                className="w3-input w3-border w3-round"
                type="text"
                placeholder="Nome"
                onChange={(evt) => setName(evt.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className='w3-left-align w3-margin' id="formBasicEmail">
              <input
                id='email'
                className="w3-input w3-border w3-round"
                type="email"
                placeholder="Email"
                onChange={(evt) => setEmail(evt.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className='w3-left-align w3-margin' id="formBasicPassword">
              <input
                id='senha'
                onKeyUp={validation}
                className="w3-input w3-border w3-round"
                type="password"
                placeholder="Senha"
                onChange={(evt) => setPassword(evt.target.value)}
                disabled={isLoading}
              />
            </div>
            {renderMenssage()}

            {renderButton()}
          </form>
        </div>
      </div>
    </div>
  );
}