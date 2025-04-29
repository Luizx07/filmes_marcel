#Cria banco
create database db_controle_filmes_ab;

#Ativa/entrar banco
use db_controle_filmes_ab;

#Criar tabela
create table tbl_filme(
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    duracao time not null,
    sinopse text not null,
    data_lancamento date not null,
    foto_capa varchar(200),
    link_trailer varchar(200)
);

create table tbl_genero(
	id int not null primary key auto_increment,
    generos varchar (80) not null
);

create table tbl_legenda(
	id int not null primary key auto_increment,
    legendas_idioma varchar (80) not null
);

create table tbl_idioma(
	id int not null primary key auto_increment,
    idiomas varchar (70) not null
);

create table tbl_produtora(
	id int not null primary key auto_increment,
    nome_produtora varchar (70) not null
);

create table tbl_faixa_etaria(
	id int not null primary key auto_increment,
    faixa_etaria varchar (70) not null
);

create table nacionalidade(
	id int not null primary key auto_increment,
    nacionalidade varchar (70) not null
);


show tables;

desc tbl_filme;

select * from tbl_filme