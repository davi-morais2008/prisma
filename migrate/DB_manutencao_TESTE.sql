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
    senha VARCHAR(500),
    status_usuario VARCHAR(100)
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

USE db_manutencaoDS_EM_TESTE;

-- 1. Tabela: especialidades
INSERT INTO especialidades (especialidade) VALUES 
('Mecânica Industrial'),
('Eletrotécnica'),
('Automação e Robótica');

-- 2. Tabela: logs_auditoria
INSERT INTO logs_auditoria (usuario, acao, descricao, data_log) VALUES 
('admin.sistema', 'INSERT', 'Novo usuário cadastrado: 12345678900', '2026-09-28'),
('tecnico.carlos', 'UPDATE', 'Status da OS 1 alterado para Em Andamento', '2026-10-01');

-- 3. Tabela: tipos_maquinas
INSERT INTO tipos_maquinas (tipo_maquina) VALUES 
('Prensa Hidráulica'),
('Torno CNC'),
('Esteira Transportadora');

-- 4. Tabela: usuarios
INSERT INTO usuarios (cpf, nome, sobrenome, email, senha) VALUES 
('12345678900', 'Carlos', 'Eduardo', 'carlos.eduardo@empresa.com', 'hash_senha_123'),
('98765432100', 'Mariana', 'Silva', 'mariana.silva@empresa.com', 'hash_senha_456'),
('45678912300', 'Roberto', 'Almeida', 'roberto.almeida@empresa.com', 'hash_senha_789');

-- 5. Tabela: falhas (ligada ao id_tipo_maquina)
INSERT INTO falhas (id_tipo_maquina, falha) VALUES 
(1, 'Vazamento no Cilindro Hidráulico'),
(2, 'Erro de Deslocamento no Eixo X'),
(3, 'Ruptura da Correia de Transmissão');

-- 6. Tabela: maquinas (ligada ao id_tipo_maquina)
INSERT INTO maquinas (id_tipo_maquina, numero_patrimonio, localizacao, manual_operacao, status_maquina) VALUES 
(1, 'PAT-2026-001', 'Setor de Estamparia - Galpão A', 'http://manuals.empresa.com/prensa-001.pdf', 'Em Manutenção'),
(2, 'PAT-2026-002', 'Setor de Usinagem - Galpão B', 'http://manuals.empresa.com/torno-002.pdf', 'Operacional'),
(3, 'PAT-2026-003', 'Setor de Logística - Linha 03', 'http://manuals.empresa.com/esteira-003.pdf', 'Parado');

-- 7. Tabela: ordens_servicos (ligada a maquinas, falhas e usuarios via CPF)
INSERT INTO ordens_servicos (
    id_maquina, id_falha, cpf, status_ordem, tipo_manutencao, descricao_problema,
    data_inicio_manutencao, data_termino_manutencao, data_parada, data_prev_inicio_manutencao, data_prev_termino_manutencao
) VALUES 
(1, 1, '12345678900', 'Em Andamento', 'Corretiva', 'Vazamento constante de fluido hidráulico.', '2026-10-01', NULL, '2026-10-01', '2026-10-01', '2026-10-03'),
(2, 2, '98765432100', 'Pendente', 'Preventiva', 'Calibração periódica do eixo X.', NULL, NULL, '2026-10-05', '2026-10-05', '2026-10-05'),
(3, 3, '12345678900', 'Concluída', 'Corretiva', 'Troca de correia partida durante a operação.', '2026-09-20', '2026-09-21', '2026-09-20', '2026-09-20', '2026-09-21');

-- 8. Tabela: tecnicos_especialidades (ligada a usuarios via CPF e especialidades)
INSERT INTO tecnicos_especialidades (cpf, id_especialidade) VALUES 
('12345678900', 1), -- Carlos tem especialidade em Mecânica Industrial
('12345678900', 3), -- Carlos também tem em Automação
('98765432100', 2); -- Mariana tem especialidade em Eletrotécnica

-- 9. Tabela: fases_manutencao (ligada a ordens_servicos via id_ordem)
INSERT INTO fases_manutencao (id_ordem, status, fase, data, observacao) VALUES 
(1, 'Em Andamento', 'Diagnóstico Inicial', '2026-10-01', 'Identificado desgaste na vedação do pistão.'),
(1, 'Em Andamento', 'Aguardando Peça', '2026-10-01', 'Solicitada nova junta de vedação ao almoxarifado.'),
(3, 'Concluída', 'Finalização e Testes', '2026-09-21', 'Equipamento testado por 30 minutos em carga total.');

-- 10. Tabela: imagens_maquinas (ligada a maquinas)
INSERT INTO imagens_maquinas (id_maquina, url_imagem) VALUES 
(1, 'http://storage.empresa.com/imagens/maquina_1_frente.jpg'),
(1, 'http://storage.empresa.com/imagens/maquina_1_vazamento.jpg'),
(2, 'http://storage.empresa.com/imagens/maquina_2_painel.jpg');