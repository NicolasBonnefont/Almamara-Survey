async function carregarFuncionario() {
  event.preventDefault()
  let CodFilial = ''

  await axios.get('/funcionario/' + document.getElementById('matricula').value)
    .then(function (response) {
      CodFilial = response.data.CodFilial
      document.getElementById('nome').value = response.data.NomeFuncionario
      document.getElementById('filial').value = response.data.NomeFilial
      document.getElementById('responsavel').disabled = false
      document.getElementById('temperatura').disabled = false
      document.getElementById('gerente').disabled = false
    })
    .catch(function (err) {
      console.log(err.response.status)
      window.setTimeout(function () {
        document.getElementById('matricula').focus();
      }, 2000);
      Swal.fire({
        allowOutsideClick: false,
        position: 'center',
        icon: 'error',
        title: 'Funcionário não localizado !',
        showConfirmButton: false,
        timer: 1500

      }).then((result) => {

        if (result.dismiss === Swal.DismissReason.timer) {
          document.getElementById('FormPesquisa').reset()
          limparCampos()
        }
      })

    })

  if (CodFilial) {
    await axios.get('/gerente/' + CodFilial)
      .then(function (response) {
        document.getElementById('gerente').value = response.data.Nome
      })
  }
}


async function enviaPesquisa() {
  event.preventDefault()
  Swal.fire({
    allowOutsideClick: false,
    position: 'center',
    icon: 'success',
    title: 'Pesquisa enviada com sucesso !',
    showConfirmButton: false,
    timer: 2500

  }).then((result) => {

    if (result.dismiss === Swal.DismissReason.timer) {
      location.replace('/')
    }
  })
}
function limparCampos() {
  document.getElementById('nome').value = ''
  document.getElementById('filial').value = ''
  document.getElementById('gerente').value = ''
  document.getElementById('responsavel').disabled = true
  document.getElementById('temperatura').disabled = true
  document.getElementById('gerente').disabled = true
  document.getElementById('FormPesquisa').reset()

}
