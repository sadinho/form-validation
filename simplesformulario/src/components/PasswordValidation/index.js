export function validationPassword(
  password,
  setMensagem1,
  setMensagem2,
  setMensagem3,
  setMensagem4,
) {

  if (password.length < 6 || password.length > 6) {
    let msg1 = {
      classColor: 'text-danger',
      msg: 'Senha deve ter 6 dígitos',
      validate: false,
    }
    setMensagem1(msg1);
    return false;
  }

  if (password < 184759 || password > 856920) {
    let msg3 = {
      classColor: 'text-danger',
      msg: 'Senha deve estar entre 184759-856920',
      validate: false,
    }
    setMensagem3(msg3);
    return false;
  }

  const arrayMsg = password.split('');
  let decrements = false;
  for (let i = 1; i < arrayMsg.length; i++) {
    console.log(arrayMsg[i] < arrayMsg[i - 1]);
    if (arrayMsg[i] < arrayMsg[i - 1]) {
      decrements = true;
    }
  }
  if (decrements) {
    let msg4 = {
      classColor: 'text-danger',
      msg: 'Senha deve conter números crecentes ou de um mesmo valor',
      validate: false,
    }
    setMensagem4(msg4);
    return false;
  }

  const arrayMsgAdjacentes = password.split('');
  let adjacentes = true;
  for (let i = 1; i < arrayMsgAdjacentes.length; i++) {
    if (arrayMsgAdjacentes[i] === arrayMsgAdjacentes[i - 1]) {
      adjacentes = false;
    }
  }
  if (adjacentes) {
    let msg2 = {
      classColor: 'text-danger',
      msg: 'Senha deve ter 2 dígitos adjacentes iguais',
      validate: false,
    }
    setMensagem2(msg2);
    return false;
  }
  setMensagem1();
  setMensagem2();
  setMensagem3();
  setMensagem4();
  return true;
}

export function mensagesRender(
  mensagem1,
  mensagem2,
  mensagem3,
  mensagem4,
  buttonHability,
) {
  return (
    <div className='w3-left-align w3-margin' id="formBasicMensages">
      {
        !buttonHability &&
        mensagem1 &&
        <div className='w3-left-align'>
          <p className='w3-text-red'>
            <span className='w3-text-red'>
              Senha inválida
            </span>
            <br />
          </p>
        </div>
      }
      {
        buttonHability &&
        <div className='w3-left-align'>
          <p className='w3-text-green'>
            <span className='w3-text-green'>
              Senha válida!
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
    </div>
  )
}

export function buttonRender(msgSucess, buttonHability, isLoading) {
  return (
    <>
      <div className='w3-right-align w3-margin-top w3-hide-medium w3-hide-large'>
        {
          msgSucess &&
          <span className={msgSucess.classColor}>{msgSucess.msg}</span>
        }

        <button className='
                w3-button
                w3-gray
                w3-round
                w3-border
                w3-border-black
                w3-text-dark-grey
                w3-col
                w3-display-bottommiddle'
          type="submit"
          disabled={!buttonHability || isLoading}
        >
          Enviar
        </button>

      </div>
      <div className='w3-right-align w3-margin-top w3-hide-small'>
        {
          msgSucess && <div className='w3-col l9 m9 s9'>
            <span className={msgSucess.classColor}>{msgSucess.msg}</span>
          </div>
        }

        <button className='
                w3-button
                w3-gray
                w3-round
                w3-border
                w3-border-black
                w3-text-dark-grey
                w3-margin-left'
          type="submit"
          disabled={!buttonHability || isLoading}
        >
          Enviar
        </button>

      </div>
    </>
  )
}