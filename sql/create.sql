CREATE TABLE users (
    id            SMALLSERIAL,
    login         VARCHAR(30)  NOT NULL,
    password_hash VARCHAR(128) NOT NULL,
    password_salt VARCHAR(64)  NOT NULL,

    PRIMARY KEY(id),
    UNIQUE(login)
);



-- загружаемые изображения
CREATE TABLE images (
    id          SERIAL,
    mini_name   VARCHAR(41) NOT NULL,
    full_name   VARCHAR(41) NOT NULL,
    mini_width  SMALLINT NOT NULL,
    mini_height SMALLINT NOT NULL,
    full_width  SMALLINT NOT NULL,
    full_height SMALLINT NOT NULL,

    PRIMARY KEY(id),
    UNIQUE(mini_name),
    UNIQUE(full_name)
);

CREATE TABLE section_images (
    id         SERIAL,
    image_id   INT NOT NULL,
    section_id SMALLINT NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE sections (
    id   SMALLSERIAL,
    name VARCHAR(50) NOT NULL,

    PRIMARY KEY(id),
    UNIQUE(name)
);

CREATE TABLE slides (
    id       SMALLSERIAL,
    image_id INT NOT NULL,

    PRIMARY KEY(id),
    UNIQUE(image_id)
);

CREATE TABLE project_images (
    id         SERIAL,
    image_id   INT NOT NULL,
    project_id INT NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE projects (
    id   SMALLSERIAL,
    name VARCHAR(50) NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE sessions (
    id      SERIAL,
    hash    VARCHAR(36) NOT NULL,
    user_id SMALLINT NOT NULL,
    ip      INET NOT NULL,
    date    TIMESTAMP WITHOUT TIME ZONE,
    browser VARCHAR(50) NOT NULL,
    os      VARCHAR(50) NOT NULL,

    PRIMARY KEY(id),
    UNIQUE(hash)
);
