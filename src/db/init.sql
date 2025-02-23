CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(40) NOT NULL,
	password VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS studies (
	id SERIAL PRIMARY KEY,
	topic VARCHAR(100) NOT NULL,
	qnt_reviews INT NOT NULL CHECK (qnt_reviews BETWEEN 0 AND 10),
	date DATE NOT NULL,
	user_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews (
	id SERIAL PRIMARY KEY,
	topic VARCHAR(100) NOT NULL,
	status VARCHAR(25) NOT NULL,
	date DATE NOT NULL,
	study_id INT REFERENCES studies(id) ON DELETE CASCADE
);