require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importando o modelo de usuário
const User = require('./models/User'); // Certifique-se de criar o arquivo models/User.js

const app = express();

// Configuração do CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permite requisições apenas do front-end local
    methods: ['GET', 'POST'], // Permite apenas métodos GET e POST
    allowedHeaders: ['Content-Type'], // Permite apenas cabeçalhos Content-Type
}));

app.use(express.json()); // Para fazer parsing de JSON

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB!'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rota de cadastro
app.post('/api/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).send('Todos os campos são obrigatórios');
      }
  
      const newUser = new User({ username, email, password });
  
      await newUser.save();
      res.status(201).send('Usuário cadastrado com sucesso');
    } catch (err) {
      console.error(err); // Logar o erro para depuração
      res.status(400).send('Erro ao cadastrar o usuário');
    }
  });
  
// Rota de login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).send('Credenciais inválidas');
        }

        res.status(200).send({ok:true});
    } catch (err) {
        console.error(err); // Logar o erro para depuração
        res.status(400).send('Erro ao realizar login');
    }
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
