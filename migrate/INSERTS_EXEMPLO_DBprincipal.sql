USE db_manutencaoDS_EM;

-- 1. Inserção de Especialidades
INSERT INTO especialidades (especialidade) VALUES
('Eletrotécnica'),
('Mecânica Industrial'),
('Automação');

-- 2. Inserção de Tipos de Máquinas
INSERT INTO tipos_maquinas (tipo_maquina) VALUES
('Torno Mecânico'),
('Prensa Hidráulica'),
('Fresadora');

-- 3. Inserção dos Usuários Solicitados
INSERT INTO usuarios (cpf, nome, email, senha, status_usuario, rbac, descricao_usuario, imagem_perfil) VALUES
('47126589832', 'Guxta Pereira', 'gustavo.h.pereira13@aluno.senai.br', 'gu1234', 1, 'usuario', 'Técnico', 'Aluno do Curso Técnico em Eletromecânica'),
('00000000000', 'admin root', 'admin.root@sp.senai.br', 'senai603Prisma', 1, 'root', 'Administrador', 'Usuário administrador do sistema');

-- 4. Inserção de Setores
INSERT INTO setores (setor) VALUES
('Usinagem'),
('Prensas'),
('Manutenção Geral');

-- 5. Inserção de Falhas
INSERT INTO falhas (id_tipo_maquina, falha) VALUES
(1, 'Desalinhamento do barramento'),
(2, 'Vazamento no pistão hidráulico'),
(3, 'Superaquecimento do motor');

-- 6. Inserção de Máquinas
INSERT INTO maquinas (id_tipo_maquina, modelo_maquina, numero_patrimonio, id_setor, manual_operacao, status_maquina, is_inativa) VALUES
(1, 'Romi T240', 'PAT-2023-001', 1, 'https://manuais.local/romi-t240.pdf', 'Em Funcionamento', false),
(2, 'Schuler 100T', 'PAT-2023-002', 2, 'https://manuais.local/schuler-100t.pdf', 'Em Manutenção', false);

-- 7. Inserção de Ordens de Serviço (Contemplando Ativa, Finalizada e Cancelada)
-- Obs: A Ordem 2 (Finalizada) possui a data_termino_manutencao preenchida.
INSERT INTO ordens_servicos (
    id_especialidade, id_maquina, id_falha, cpf, status_ordem, tipo_manutencao, 
    descricao_problema, data_inicio_manutencao, data_termino_manutencao, data_parada, 
    data_prev_inicio_manutencao, data_prev_termino_manutencao
) VALUES
(
    1, 1, 1, '47126589832', 'Ativa', 'Corretiva', 
    'Ruído excessivo durante o movimento do barramento.', 
    '2026-11-01', NULL, '2026-11-01', '2026-11-01', '2026-11-05'
),
(
    2, 2, 2, '47126589832', 'Finalizada', 'Preventiva', 
    'Troca de reparos do cilindro hidráulico principal.', 
    '2026-10-10', '2026-10-12 16:30:00', '2026-10-10', '2026-10-10', '2026-10-13'
),
(
    3, 1, 3, '47126589832', 'Cancelada', 'Preditiva', 
    'Alarme falso disparado pelo sensor de temperatura.', 
    NULL, NULL, NULL, '2026-10-15', '2026-10-15'
);

-- 8. Inserção de Técnicos vs Especialidades
INSERT INTO tecnicos_especialidades (cpf, id_especialidade) VALUES
('47126589832', 1),
('47126589832', 2);

-- 10. Inserção de Imagens das Máquinas
INSERT INTO imagens_maquinas (id_maquina, url_imagem) VALUES
(1, 'https://imagens.local/maquinas/torno_romi_01.jpg'),
(2, 'https://imagens.local/maquinas/prensa_schuler_01.jpg');