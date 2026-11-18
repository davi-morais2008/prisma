CREATE DATABASE IF NOT EXISTS db_manutencaoDS_EM;

USE db_manutencaoDS_EM;

CREATE TABLE IF NOT EXISTS especialidades (
    id_especialidade INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    especialidade VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS tipos_maquinas (
    id_tipo_maquina INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tipo_maquina VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
    cpf VARCHAR(11) NOT NULL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(500) NOT NULL,
    status_usuario BOOL DEFAULT FALSE,
    descricao_usuario VARCHAR(255),
    imagem_perfil VARCHAR(255),
    rbac VARCHAR(100) DEFAULT 'usuario',
    CONSTRAINT UQ_EMAIL UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS falhas (
    id_falha INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_tipo_maquina INT NOT NULL,
    falha VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS setores (
    id_setor INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    setor VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS maquinas (
    id_maquina INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_tipo_maquina INT NOT NULL,
    id_setor INT NOT NULL,
    modelo_maquina VARCHAR(100),
    numero_patrimonio VARCHAR(255) NOT NULL,
    manual_operacao VARCHAR(500),
    status_maquina VARCHAR(100),
    custo_acumulado DECIMAL(10, 2) DEFAULT 0.00,
    is_inativa BOOL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS ordens_servicos (
    id_ordem INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_especialidade INT,
    id_maquina INT NOT NULL,
    id_falha INT,
    cpf_solicitante VARCHAR(11) NOT NULL,
    cpf VARCHAR(11) DEFAULT NULL,
    status_ordem VARCHAR(100) default 'Pendente',
    fase_manutencao VARCHAR(250) DEFAULT 'Aguardando Início',
    tipo_manutencao VARCHAR(100),
    descricao_problema VARCHAR(255),
    data_inicio_manutencao DATE DEFAULT NULL,
    data_termino_manutencao DATE DEFAULT NULL,
    data_parada DATE,
    data_prev_inicio_manutencao DATE NULL,
    data_prev_termino_manutencao DATE NULL
);

CREATE TABLE IF NOT EXISTS requisicoes_pecas (
    id_requisicao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_ordem INT NOT NULL,
    nome_peca VARCHAR(250) NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    custo_unitario DECIMAL(10, 2) DEFAULT NULL,
    status_requisicao VARCHAR(50) DEFAULT 'Pendente'
);

CREATE TABLE IF NOT EXISTS tecnicos_especialidades (
    cpf VARCHAR(11) NOT NULL,
    id_especialidade INT NOT NULL,
    PRIMARY KEY (cpf, id_especialidade)
);

CREATE TABLE IF NOT EXISTS imagens_maquinas (
    id_imagem INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_maquina INT NOT NULL,
    url_imagem VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS ordem_inspecao (
    id_ordem_inspecao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_maquina INT NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    descricao_inspecao VARCHAR(250),
    status_inspecao BOOL DEFAULT TRUE,
    status_processo VARCHAR(100) default 'PENDENTE',
    data_inspec DATE
);

-- Chaves Estrangeiras (Foreign Keys)
ALTER TABLE ordem_inspecao ADD CONSTRAINT FK_inspecao_0 FOREIGN KEY (id_maquina) REFERENCES maquinas (id_maquina);
ALTER TABLE ordem_inspecao ADD CONSTRAINT FK_inspecao_1 FOREIGN KEY (cpf) REFERENCES usuarios (cpf);


ALTER TABLE falhas ADD CONSTRAINT FK_falhas_0 FOREIGN KEY (id_tipo_maquina) REFERENCES tipos_maquinas (id_tipo_maquina);

ALTER TABLE maquinas ADD CONSTRAINT FK_maquinas_0 FOREIGN KEY (id_tipo_maquina) REFERENCES tipos_maquinas (id_tipo_maquina);
ALTER TABLE maquinas ADD CONSTRAINT FK_maquinas_1 FOREIGN KEY (id_setor) REFERENCES setores (id_setor);

ALTER TABLE ordens_servicos ADD CONSTRAINT FK_ordens_servicos_0 FOREIGN KEY (id_maquina) REFERENCES maquinas (id_maquina);
ALTER TABLE ordens_servicos ADD CONSTRAINT FK_ordens_servicos_1 FOREIGN KEY (id_falha) REFERENCES falhas (id_falha);
ALTER TABLE ordens_servicos ADD CONSTRAINT FK_ordens_servicos_2 FOREIGN KEY (cpf) REFERENCES usuarios (cpf);
ALTER TABLE ordens_servicos ADD CONSTRAINT FK_ordens_servicos_3 FOREIGN KEY (id_especialidade) REFERENCES especialidades (id_especialidade);
ALTER TABLE ordens_servicos ADD CONSTRAINT FK_ordens_servicos_4 FOREIGN KEY (cpf_solicitante) REFERENCES usuarios (cpf);

ALTER TABLE requisicoes_pecas ADD CONSTRAINT FK_requisicoes_pecas_0 FOREIGN KEY (id_ordem) REFERENCES ordens_servicos (id_ordem);

ALTER TABLE tecnicos_especialidades ADD CONSTRAINT FK_tecnicos_especialidades_0 FOREIGN KEY (cpf) REFERENCES usuarios (cpf);
ALTER TABLE tecnicos_especialidades ADD CONSTRAINT FK_tecnicos_especialidades_1 FOREIGN KEY (id_especialidade) REFERENCES especialidades (id_especialidade);

ALTER TABLE imagens_maquinas ADD CONSTRAINT FK_imagens_maquinas_0 FOREIGN KEY (id_maquina) REFERENCES maquinas (id_maquina);