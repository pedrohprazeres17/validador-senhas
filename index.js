// 1. Importar o Express
const express = require('express');

// 2. Inicializar o Express
const app = express();

// 3. Definir a porta
const PORT = 3000;

// 4. Configurar o middleware para ler JSON
app.use(express.json());

// --- Nosso Endpoint de Validação ---
app.post('/validar-senha', (req, res) => {
    
    // 5. Extrair a senha
    const { senha } = req.body;

    if (!senha) {
        return res.status(400).json({ 
            valida: false, 
            erros: ["O campo 'senha' é obrigatório no corpo (body) da requisição."] 
        });
    }

    // --- FASE 3: Lógica de Validação (O "Guardião Lógico") --- // <<< MUDANÇA AQUI (INÍCIO)

    // Criamos uma lista vazia para guardar os erros
    const erros = [];

    // Regra 1: Mínimo de 8 caracteres
    if (senha.length < 8) {
        erros.push("A senha precisa ter no mínimo 8 caracteres");
    }

    // Regra 2: Pelo menos 1 letra maiúscula (Regex Bônus)
    // /[A-Z]/ procura por qualquer caractere de A até Z.
    // O .test(senha) retorna 'true' se achar, ou 'false' se não achar.
    // O "!" na frente inverte, então (!false) vira true e entra no 'if'.
    if (!/[A-Z]/.test(senha)) {
        erros.push("A senha precisa ter pelo menos 1 letra maiúscula");
    }

    // Regra 3: Pelo menos 1 número (Regex Bônus)
    // \d é o atalho Regex para "qualquer dígito (número)"
    if (!/\d/.test(senha)) {
        erros.push("A senha precisa ter pelo menos 1 número");
    }

    // Regra 4: Pelo menos 1 caractere especial (Regex Bônus)
    // [!@#$%^&*] procura por qualquer um desses caracteres.
    if (!/[!@#$%^&*]/.test(senha)) {
        erros.push("A senha precisa ter pelo menos 1 caractere especial (ex: !@#$%^&*)");
    }

    // --- Fim da Lógica de Validação --- // <<< MUDANÇA AQUI (FIM)


    // 6. Formular a Resposta (Agora é a resposta REAL)
    if (erros.length > 0) {
        // Se a lista de erros NÃO está vazia (tem 1 ou mais erros),
        // a senha é inválida.
        return res.status(400).json({
            "valida": false,
            "erros": erros  // Retorna a lista de erros que encontramos
        });
    } else {
        // Se a lista de erros ESTÁ vazia, a senha é válida.
        return res.status(200).json({ 
            "valida": true 
        });
    }
});

// --- Fim do Endpoint ---

// 7. Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor "O Validador de Senhas" rodando em http://localhost:${PORT}`);
    console.log("Aguardando requisições POST em /validar-senha");
});