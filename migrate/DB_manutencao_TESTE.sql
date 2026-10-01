CREATE DATABASE IF NOT EXISTS db_manutencaoDS_EM_TESTE;
USE db_manutencaoDS_EM_TESTE;

CREATE TABLE IF NOT EXISTS especialidades (
    id_especialidade INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    especialidade VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS logs_auditoria (
    id_log INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    usuario VARCHAR(100),
    acao VARCHAR(255),
    descricao VARCHAR(255),
    data_log DATE
);

CREATE TABLE IF NOT EXISTS tipos_maquinas (
    id_tipo_maquina INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tipo_maquina VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS usuarios (
    cpf VARCHAR(11) NOT NULL PRIMARY KEY,
    nome VARCHAR(100),
    sobrenome VARCHAR(100),
    email VARCHAR(255),
    senha VARCHAR(500)
);

CREATE UNIQUE INDEX UQ_EMAIL ON usuarios (email);

CREATE TABLE IF NOT EXISTS falhas (
    id_falha INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_tipo_maquina INT,
    falha VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS maquinas (
    id_maquina INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_tipo_maquina INT,
    numero_patrimonio VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255),
    manual_operacao VARCHAR(500),
    status_maquina VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS ordens_servicos (
    id_ordem INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_maquina INT,
    id_falha INT,
    cpf VARCHAR(11),
    status_ordem VARCHAR(100),
    tipo_manutencao VARCHAR(100),
    descricao_problema VARCHAR(255),
    data_inicio_manutencao DATE,
    data_termino_manutencao DATE,
    data_parada DATE,
    data_prev_inicio_manutencao DATE,
    data_prev_termino_manutencao DATE
);

CREATE TABLE IF NOT EXISTS tecnicos_especialidades (
    cpf VARCHAR(11) NOT NULL,
    id_especialidade INT NOT NULL
);

CREATE TABLE IF NOT EXISTS fases_manutencao (
    id_fase INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_ordem INT,
    status VARCHAR(100),
    fase VARCHAR(100),
    data DATE,
    observacao VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS imagens_maquinas (
    id_imagem INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_maquina INT,
    url_imagem VARCHAR(500)
);