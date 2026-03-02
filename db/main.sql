CREATE DATABASE IF NOT EXISTS media_host_db;

USE media_host_db;

CREATE TABLE IF NOT EXISTS roles (
    roleID INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    roleID INT NOT NULL,
    FOREIGN KEY (roleID)
        REFERENCES roles(roleID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS media_type (
    media_typeID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    mime_type VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS media (
    mediaID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    file_path VARCHAR(255) NOT NULL,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    media_typeID INT NOT NULL,
    FOREIGN KEY (media_typeID)
        REFERENCES media_type(media_typeID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS category (
    categoryID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    parentID INT NULL,

    FOREIGN KEY (parentID)
        REFERENCES category(categoryID)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS media_category (
    mediaID INT NOT NULL,
    categoryID INT NOT NULL,
    PRIMARY KEY (mediaID, categoryID),
    FOREIGN KEY (mediaID)
        REFERENCES media(mediaID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (categoryID)
        REFERENCES category(categoryID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);