 GoCar - Sistema de Aluguel de Carros

O **GoCar** é uma aplicação Full Stack moderna para reserva de veículos, desenvolvida para oferecer uma experiência fluida de catálogo e cadastro de usuários. O projeto utiliza tecnologias atuais de desenvolvimento web e está com deploy automatizado.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

* **Front-end:** HTML5, CSS3 (Variáveis, Flexbox, Grid) e JavaScript Assíncrono.
* **Back-end:** Node.js com framework Express.
* **Banco de Dados:** MySQL (Relacional).
* **Infraestrutura:** Deploy realizado no **Railway** para o Web Service e o Banco de Dados.

---

## 🛠️ Funcionalidades

* **Catálogo Dinâmico:** Os veículos são buscados diretamente do banco de dados MySQL em tempo real.
* **Sistema de Cadastro:** Registro de novos usuários com persistência de dados.
* **Interface Responsiva:** Design adaptável para diferentes tamanhos de tela com suporte a **Dark Mode**.
* **Feedback ao Usuário:** Notificações via Toasts e esqueletos de carregamento (Skeletons) para uma melhor UX.

---

## 📂 Estrutura do Projeto

```text
GoCar/
├── public/              # Arquivos estáticos (Front-end)
│   ├── img/             # Imagens dos veículos
│   ├── index.html       # Página principal
│   └── gocar.js         # Lógica do lado do cliente e Fetch API
├── server.js            # Servidor Node.js e rotas da API
├── package.json         # Dependências e scripts do projeto
└── README.md            # Documentação do projeto
