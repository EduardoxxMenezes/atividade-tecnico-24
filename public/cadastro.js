async function cadastrar() {
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    try{
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-type' : 'application/json'},
            body: JSON.stringify({ name, email, password})
        });

        const data = await response.json();
        document.getElementById('message').innerText = data.message || data.console.error;

    } catch (err) {
        document.getElementById('message').innerText = 'Erro no cadastro';
    }
}