-- DROP DATABASE IF EXISTS popularSearch

CREATE DATABASE popularSearch;

USE popularSearch;

CREATE TABLE keywords (
  id int NOT NULL AUTO_INCREMENT,
  keyword varchar(250) NOT NULL,
  count int DEFAULT 0,
  PRIMARY KEY (id)
);
