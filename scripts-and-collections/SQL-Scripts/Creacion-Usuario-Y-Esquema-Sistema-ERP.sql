DROP USER IF EXISTS 'diegogonzalez'@'localhost';

CREATE USER 'diegogonzalez'@'localhost' IDENTIFIED WITH mysql_native_password BY 'bbdd1122';


DROP SCHEMA IF EXISTS trabajotfgerp;

CREATE SCHEMA trabajotfgerp;


GRANT ALL PRIVILEGES ON trabajotfgerp.* TO 'diegogonzalez'@'localhost';

flush privileges;

USE trabajotfgerp;