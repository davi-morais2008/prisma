INSERT INTO especialidades(especialidade)
VALUES('Técnico em Eletromecânica');

INSERT INTO usuarios
VALUES('47126589832', 'Guxta', 'Pêra', 'gustavo.h.pereira13@aluno.senai.br', 'gu1234', 'Ativo');

INSERT INTO tecnicos_especialidades
VALUES('47126589832', 1);

INSERT INTO tipos_maquinas(tipo_maquina)
VALUES('Fresa');

INSERT INTO falhas(id_tipo_maquina, falha)
VALUES(1, 'Falha no freio');

INSERT INTO maquinas(id_tipo_maquina, numero_patrimonio, localizacao, manual_operacao, status_maquina)
VALUES(1, '85737498211', 'Setor A', 'https://www.youtube.com/', 'Ativo');

INSERT INTO imagens_maquinas(id_maquina, url_imagem)
VALUES(1, 'https://galpaodasmaquinas.com.br/storage/files/produtos/fresa-ferramenteira-veker-10326_1_desktop.webp');

INSERT INTO ordens_servicos(id_maquina, id_falha, cpf, status_ordem, tipo_manutencao, descricao_problema, data_inicio_manutencao, data_termino_manutencao, data_parada, data_prev_inicio_manutencao, data_prev_termino_manutencao)
VALUES(1, 1, 47126589832, 'Finalizada', 'Preventiva', 'Problema no freio da máquina', '2008-08-26', '2008-08-29', '2008-08-26', '2008-08-26', '2008-08-29');

INSERT INTO fases_manutencao(id_ordem, status, fase, data, observacao)
VALUES(1, 'Em andamento', 'Trocando o Freio', '2008-08-28', 'Precisa de peça nova.');