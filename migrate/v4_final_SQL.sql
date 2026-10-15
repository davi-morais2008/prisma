CREATE DATABASE IF NOT EXISTS db_manutencaoDS_EM;

USE db_manutencaoDS_EM;

CREATE TABLE IF NOT EXISTS especialidades (
 id_especialidade INT PRIMARY KEY NOT NULL auto_increment,
 especialidade VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS logs_auditoria (
 id_log INT PRIMARY KEY NOT NULL auto_increment,
 usuario VARCHAR(100),
 acao VARCHAR(255),
 descricao VARCHAR(255),
 data_log DATE
);

CREATE TABLE IF NOT EXISTS tipos_maquinas (
 id_tipo_maquina INT PRIMARY KEY NOT NULL auto_increment,
 tipo_maquina VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS usuarios (
 cpf VARCHAR(11) NOT NULL PRIMARY KEY,
 nome VARCHAR(100),
 email VARCHAR(255),
 senha VARCHAR(500),
 status_usuario VARCHAR(100),
 imagem_perfil VARCHAR(255)

);

CREATE UNIQUE INDEX UQ_EMAIL ON USUARIOS (email);

CREATE TABLE IF NOT EXISTS falhas (
 id_falha INT PRIMARY KEY NOT NULL auto_increment,
 id_tipo_maquina INT,
 falha VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS maquinas (
 id_maquina INT PRIMARY KEY NOT NULL auto_increment,
 id_tipo_maquina INT,
 modelo_maquina VARCHAR(100),
 numero_patrimonio VARCHAR(255) NOT NULL,
 localizacao VARCHAR(255),
 manual_operacao VARCHAR(500),
 status_maquina VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS ordens_servicos (
 id_ordem INT PRIMARY KEY NOT NULL auto_increment,
 id_maquina INT,
 id_falha INT,
 cpf VARCHAR(11),
 status_ordem VARCHAR(100),
 tipo_manutencao VARCHAR(100),
 descricao_problema VARCHAR(255),
 data_inicio_manutencao DATE,
 data_termino_manutencao DATETIME,
 data_parada DATE,
 data_prev_inicio_manutencao DATE,
 data_prev_termino_manutencao DATE
);

CREATE TABLE IF NOT EXISTS tecnicos_especialidades (
 cpf VARCHAR(11) NOT NULL,
 id_especialidade INT NOT NULL
);

CREATE TABLE IF NOT EXISTS fases_manutencao (
 id_fase INT PRIMARY KEY NOT NULL auto_increment,
 id_ordem INT,
 status VARCHAR(100),
 fase VARCHAR(100),
 data DATE,
 observacao VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS imagens_maquinas (
 id_imagem INT PRIMARY KEY NOT NULL auto_increment,
 id_maquina INT,
 url_imagem VARCHAR(500)
);
 
ALTER TABLE falhas ADD CONSTRAINT FK_falhas_0 FOREIGN KEY (id_tipo_maquina) REFERENCES tipos_maquinas (id_tipo_maquina);

ALTER TABLE maquinas ADD CONSTRAINT FK_maquinas_0 FOREIGN KEY (id_tipo_maquina) REFERENCES tipos_maquinas (id_tipo_maquina);

ALTER TABLE ordens_servicos ADD CONSTRAINT FK_ordens_servicos_0 FOREIGN KEY (id_maquina) REFERENCES maquinas (id_maquina);
ALTER TABLE ordens_servicos ADD CONSTRAINT FK_ordens_servicos_1 FOREIGN KEY (id_falha) REFERENCES falhas (id_falha);
ALTER TABLE ordens_servicos ADD CONSTRAINT FK_ordens_servicos_2 FOREIGN KEY (cpf) REFERENCES usuarios (cpf);

ALTER TABLE tecnicos_especialidades ADD CONSTRAINT FK_tecnicos_especialidades_0 FOREIGN KEY (cpf) REFERENCES usuarios (cpf);
ALTER TABLE tecnicos_especialidades ADD CONSTRAINT FK_tecnicos_especialidades_1 FOREIGN KEY (id_especialidade) REFERENCES especialidades (id_especialidade);

ALTER TABLE fases_manutencao ADD CONSTRAINT FK_fases_manutencao_0 FOREIGN KEY (id_ordem) REFERENCES ordens_servicos (id_ordem);

ALTER TABLE imagens_maquinas ADD CONSTRAINT FK_imagens_maquinas_0 FOREIGN KEY (id_maquina) REFERENCES maquinas (id_maquina);