import Swal from 'sweetalert2'

export const swal = (text) => {  
    let timerInterval;
    Swal.fire({
        title: text,
        timer: 1000,
        timerProgressBar: false,
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getHtmlContainer()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Swal.getTimerLeft()
              }
            }
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      })
      .then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
}

export const swalAuthAlert = (text) => {
    Swal.fire({
        position: 'top',
        title: text,
        showConfirmButton: false,
        timer: 1500
      })
}

export const swalError = (text) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: text
  })
}