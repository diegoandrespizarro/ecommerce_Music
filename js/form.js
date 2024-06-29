const form = document.getElementById('form');
const taskName = document.getElementById('task-name');
const taskEmail = document.getElementById('task-email');
const taskAffair = document.getElementById('task-affair');
const taskComment = document.getElementById('task-comment');
const urlContactos = 'https://667dcfda297972455f66640c.mockapi.io/api/FormulariodeContacto'


form.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const name = taskName.value.trim();
    const email = taskEmail.value.trim();
    const affair = taskAffair.value.trim();
    const Comment = taskComment.value.trim();
    if(!email.includes('@')){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email incorrecto!",
          });
        return;
    }


    const newcontact = {
        name: name,
        email: email,
        affair: affair,
        Comment: Comment,
    }

    
    try{
        const response = await fetch(urlContactos,{
            method: 'POST',
            body: JSON.stringify(newcontact),
            headers:{'Content-type':'application/json'}
        });

        if(response.ok){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Enviado con Éxito!",
                showConfirmButton: false,
                timer: 1500
              });
            form.reset();
        }else{
            const errortext = await response.text();
            alert('Error al enviar su consulta', errortext)
        }

    } catch(error){
        alert('Error al enviar su consulta', error)
    }    





})
