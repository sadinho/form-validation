export function validationPassword (
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