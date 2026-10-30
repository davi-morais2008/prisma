USE db_manutencaoDS_EM;

-- =============================================
-- 1. ESPECIALIDADES
-- =============================================
INSERT INTO especialidades (especialidade) VALUES
('Técnico em Eletromecânica'),
('Mecânica Industrial'),
('Automação Industrial'),
('Usinagem CNC'),
('Caldeiraria');

-- =============================================
-- 2. USUÁRIOS (Alunos, Técnicos e Administradores)
-- Note que o campo status_usuario é BOOL (1 = Ativo, 0 = Inativo)
-- =============================================
INSERT INTO usuarios (cpf, nome, email, senha, status_usuario, cargo, descricao_usuario) VALUES
('47126589832', 'Guxta Pereira', 'gustavo.h.pereira13@aluno.senai.br', 'gu1234', 1, 'Técnico', 'Aluno do Curso Técnico em Eletromecânica'),
('00000000000', 'admin root', 'admin.root@sp.senai.br', 'senai603Prisma', 1, 'Administrador', 'Usuário administrador do sistema'),
('12345678901', 'Carlos Eduardo Silva', 'carlos.silva@sp.senai.br', 'senha123', 1, 'Instrutor', 'Docente da Oficina de Mecânica'),
('98765432100', 'Mariana Souza', 'mariana.souza@aluno.senai.br', 'mari2024', 1, 'Técnico', 'Aluna de Automação Industrial'),
('55544433322', 'Roberto Almeida', 'roberto.almeida@sp.senai.br', 'maint2024', 1, 'Coordenador', 'Coordenador de Manutenção dos Laboratórios');

-- =============================================
-- 3. TÉCNICOS E SUAS ESPECIALIDADES
-- =============================================
INSERT INTO tecnicos_especialidades (cpf, id_especialidade) VALUES
('47126589832', 1), -- Guxta -> Eletromecânica
('12345678901', 2), -- Carlos -> Mecânica Industrial
('98765432100', 3), -- Mariana -> Automação Industrial
('47126589832', 4); -- Guxta -> Usinagem CNC

-- =============================================
-- 4. TIPOS DE MÁQUINAS
-- =============================================
INSERT INTO tipos_maquinas (tipo_maquina) VALUES
('Fresa Ferramenteira'),
('Torno Mecânico'),
('Centro de Usinagem CNC'),
('Prensa Hidráulica'),
('Bancada Didática de Pneumática');

-- =============================================
-- 5. FALHAS COMUNS
-- =============================================
INSERT INTO falhas (id_tipo_maquina, falha) VALUES
(1, 'Falha no freio do cabeçote'),
(1, 'Ruído excessivo nas engrenagens'),
(2, 'Vazamento de óleo no barramento'),
(2, 'Desalinhar da placa e ponta de eixo'),
(3, 'Erro de posicionamento no eixo Z'),
(4, 'Pressão insuficiente no pistão hidráulico'),
(5, 'Vazamento de ar comprimido nas conexões rápidas');

-- =============================================
-- 6. MÁQUINAS (Patrimônio SENAI)
-- =============================================
INSERT INTO maquinas (id_tipo_maquina, modelo_maquina, numero_patrimonio, localizacao, manual_operacao, status_maquina, is_inativa) VALUES
(1, 'Veker ISO 40', 'SENAI-85737498211', 'Oficina de Usinagem - Setor A', 'https://www.manuals.senai.br/fresa-veker.pdf', 'Operacional', 0),
(1, 'Clever X6325', 'SENAI-27384938244', 'Oficina de Usinagem - Setor A', 'https://www.manuals.senai.br/fresa-clever.pdf', 'Em Manutenção', 0),
(2, 'Nardini MS-205', 'SENAI-33498127399', 'Oficina de Tornearia - Setor B', 'https://www.manuals.senai.br/torno-nardini.pdf', 'Operacional', 0),
(3, 'Romi D 800', 'SENAI-99182371233', 'Laboratório CNC - Setor C', 'https://www.manuals.senai.br/romi-d800.pdf', 'Parada', 0),
(5, 'Festo Didactic TP 101', 'SENAI-11223344556', 'Lab. Automação - Sala 102', 'https://www.manuals.senai.br/festo-tp101.pdf', 'Operacional', 0);

-- =============================================
-- 7. IMAGENS DAS MÁQUINAS
-- =============================================
INSERT INTO imagens_maquinas (id_maquina, url_imagem) VALUES
(1, 'https://galpaodasmaquinas.com.br/storage/files/produtos/fresa-ferramenteira-veker-10326_1_desktop.webp'),
(3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Metal_lathe.jpg/800px-Metal_lathe.jpg'),
(4, 'https://www.romi.com/wp-content/uploads/2021/04/romi_d_800.jpg');

-- =============================================
-- 8. ORDENS DE SERVIÇO
-- Status permitidos: "Ativa", "Cancelada", "Finalizada"
-- =============================================
INSERT INTO ordens_servicos (id_maquina, id_falha, cpf, status_ordem, tipo_manutencao, descricao_problema, data_inicio_manutencao, data_termino_manutencao, data_parada, data_prev_inicio_manutencao, data_prev_termino_manutencao) VALUES
(1, 1, '47126589832', 'Finalizada', 'Preventiva', 'Inspeção e ajuste do sistema de freio do cabeçote', '2024-03-10', '2024-03-12', '2024-03-10', '2024-03-10', '2024-03-12'),
(1, 2, '47126589832', 'Finalizada', 'Corretiva', 'Troca de engrenagens do variador de velocidade', '2024-04-01', '2024-04-05', '2024-03-31', '2024-04-01', '2024-04-04'),
(2, 1, '12345678901', 'Ativa', 'Corretiva', 'Freio travando durante aula prática de usinagem', '2024-10-28', NULL, '2024-10-27', '2024-10-28', '2024-10-31'),
(3, 3, '12345678901', 'Finalizada', 'Preventiva', 'Troca de óleo do barramento e substituição dos raspadores', '2024-05-15', '2024-05-16', NULL, '2024-05-15', '2024-05-16'),
(4, 5, '98765432100', 'Ativa', 'Corretiva', 'Eixo Z apresentando alarme de sobrecarga no servomotor', NULL, NULL, '2024-10-29', '2024-11-01', '2024-11-03'),
(5, 7, '98765432100', 'Cancelada', 'Preventiva', 'Ajuste de mangueiras das bancadas didáticas', NULL, NULL, NULL, '2024-06-01', '2024-06-02');

-- =============================================
-- 9. FASES DE MANUTENÇÃO (Acompanhamento das OS)
-- =============================================
INSERT INTO fases_manutencao (id_ordem, status, fase, data, observacao) VALUES
(3, 'Ativa', 'Diagnóstico Técnico', '2024-10-28', 'Verificada necessidade de substituição das sapatas de freio'),
(3, 'Ativa', 'Aguardando Peça', '2024-10-29', 'Solicitada compra de componentes junto ao almoxarifado central'),
(5, 'Ativa', 'Análise de Falha', '2024-10-29', 'Identificado acúmulo de cavacos na fuso de esferas do eixo Z');

-- =============================================
-- 10. LOGS DE AUDITORIA
-- =============================================
INSERT INTO logs_auditoria (usuario, acao, descricao, data_log) VALUES
('gustavo.h.pereira13@aluno.senai.br', 'Criação de OS', 'Abertura da Ordem de Serviço ID 1 para a máquina Fresa Veker', '2024-03-10'),
('carlos.silva@sp.senai.br', 'Abertura de Chamado', 'Abertura da OS ID 3 devido a falhas durante aula prática', '2024-10-28'),
('admin.root@sp.senai.br', 'Atualização de Cadastro', 'Desativação temporária da prensa hidráulica para reforma', '2024-10-29');