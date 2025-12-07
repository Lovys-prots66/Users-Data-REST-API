CREATE DATABASE IF NOT EXISTS platform_api;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255),
  zip VARCHAR(10)
);

INSERT INTO users (id, first_name, last_name, email, zip) VALUES (1, 'Dawn', 'Rohan', 'Lindsay_Wilkinson36@yahoo.com', '5457');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (2, 'Shirley', 'Kirlin', 'Rufus.Schumm56@gmail.com', '0067');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (3, 'Gladys', 'White', 'Jan.Sporer@hotmail.com', '5706');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (4, 'Madeline', 'Renner', 'Rick.Gorczany@yahoo.com', '0971');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (5, 'Lisa', 'Yost', 'Erika.Bergstrom21@yahoo.com', '6197');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (6, 'Camille', 'Cremin', 'Ismael.Hirthe56@gmail.com', '3993');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (7, 'Angelo', 'Jacobs', 'Rita.Kunde77@hotmail.com', '3180');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (8, 'Carolyn', 'Schowalter', 'Wayne_Dickens53@yahoo.com', '8383');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (9, 'Nancy', 'Ortiz', 'Delores_Harvey-Abbott28@gmail.com', '5642');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (10, 'Ramiro', 'Kertzmann', 'Brenda_Bradtke57@yahoo.com', '0559');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (11, 'Miriam', 'Predovic', 'Tracy_Hermiston39@yahoo.com', '6733');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (12, 'Jeremiah', 'Predovic', 'Monique.Wiza47@gmail.com', '7932');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (13, 'Felix', 'Sporer', 'Francisco_McDermott99@yahoo.com', '4692');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (14, 'Alfonso', 'Sauer', 'Jerry.Bogisich65@gmail.com', '3177');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (15, 'Opal', 'Nikolaus', 'Ramiro.Schowalter79@gmail.com', '2965');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (16, 'Saul', 'Ryan-Purdy', 'Rufus_Langosh-Prosacco@hotmail.com', '6795');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (17, 'Nettie', 'Abshire', 'Geoffrey_Fadel21@yahoo.com', '8761');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (18, 'John', 'Weimann', 'Lawrence.Braun@gmail.com', '6545');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (19, 'Sam', 'Kessler', 'Janet.Kihn33@yahoo.com', '5932');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (20, 'Brian', 'Lehner', 'Alice_Dach-Larkin31@hotmail.com', '1486');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (21, 'Christina', 'Hilpert', 'Kathy.Howe@yahoo.com', '8738');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (22, 'Esther', 'Hermiston', 'Micheal.Hoppe2@gmail.com', '8565');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (23, 'Leslie', 'Kris', 'Francis_Mosciski20@hotmail.com', '1168');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (24, 'Chad', 'Upton', 'Ebony_Lindgren70@gmail.com', '6212');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (25, 'Diana', 'Strosin', 'Marilyn_Olson@hotmail.com', '9789');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (26, 'Tiffany', 'Oppe', 'Stephen.Abshire@yahoo.com', '5992');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (27, 'Lowell', 'McDermott', 'Marta_Toy75@yahoo.com', '7548');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (28, 'Sonja', 'Baumbach', 'Emanuel.Romaguera22@gmail.com', '2303');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (29, 'Neil', 'Walsh', 'Brandy_Berge@hotmail.com', '6987');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (30, 'Dorothy', 'Pfeffer', 'Lucille_Nitzsche-Will98@hotmail.com', '2831');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (31, 'Alma', 'Corkery', 'Tony.Marvin93@gmail.com', '8340');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (32, 'Keith', 'Murray', 'Doreen.Mohr@yahoo.com', '8682');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (33, 'Cecilia', 'Lynch', 'Melba_Douglas@hotmail.com', '7353');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (34, 'Grant', 'Ryan', 'Glen_Hermann41@yahoo.com', '8320');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (35, 'Nicole', 'Shields', 'Julius.Lebsack@hotmail.com', '5336');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (36, 'Mitchell', 'Larkin', 'Blanche.MacGyver-Christiansen88@hotmail.com', '4672');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (37, 'Mamie', 'Lindgren', 'Lorene.Raynor@yahoo.com', '4225');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (38, 'Vicky', 'Gislason', 'Lyle_Hahn@gmail.com', '9758');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (39, 'Christopher', 'Nitzsche', 'Inez_Rath12@hotmail.com', '4100');
INSERT INTO users (id, first_name, last_name, email, zip) VALUES (40, 'Peter', 'Halvorson', 'Jill.Thiel@gmail.com', '4384');