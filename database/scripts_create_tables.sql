## SCRIPTS DE CRIAÇÃO DAS TABELAS DO PROJETO

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE lista_produtos_favoritos (
  id SERIAL PRIMARY KEY,
  id_cliente INTEGER REFERENCES clientes(id) ON DELETE CASCADE,
  titulo VARCHAR NOT NULL,
  imagem VARCHAR(300),
  preco FLOAT,
  avaliacao VARCHAR(100),
  contador INTEGER,
  UNIQUE (id_cliente, titulo)
);

