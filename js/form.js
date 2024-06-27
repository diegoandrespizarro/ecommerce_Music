const form = document.getElementById('form');
const taskName = document.getElementById('task-name');
const taskEmail = document.getElementById('task-email');
const formSelect = document.getElementById('form-select');
const taskComment = document.getElementById('task-comment');
const flexCheckDefault = document.getElementById('flexCheckDefault');
const urlContactos = 'https://667dcfda297972455f66640c.mockapi.io/api/FormulariodeContacto'

console.log(taskName, taskEmail, formSelect, taskComment, flexCheckDefault)

form.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const name = taskName.value.trim();
    const email = taskEmail.value.trim();
    const Select = formSelect.value;
    const Comment = taskComment.value.trim();
    const CheckDefault = flexCheckDefault.checked;

    const newcontact = {
        name: name,
        email: email,
        Select: Select,
        Comment: Comment,
        CheckDefault: CheckDefault,
    };

    try{
        const response = await fetch(urlContactos,{
            method: 'POST',
            body: JSON.stringify(newcontact),
            headers:{'Content-type':'application/json'}
        });

        if(response.ok){
            alert('Su consulta fue enviada')
            form.reset();
        }else{
            const errortext = await response.text();
            alert('Error al enviar su consulta', errortext )
        }

    } catch(error){
        alert('Error al enviar su consulta', error)
    }


})