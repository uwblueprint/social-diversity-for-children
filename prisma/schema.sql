CREATE TYPE provinces AS ENUM('NL', 'PE', 'NS', 'NB', 'QC', 'ON', 'MB', 'SK', 'AB', 'BC', 'YT', 'NT', 'NU');
CREATE TYPE weekdays AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  email_verified TIMESTAMPTZ,
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create email verification requests table
CREATE TABLE verification_requests (
  id SERIAL PRIMARY KEY NOT NULL,
  identifier VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create program table
CREATE TABLE program (
  program_id SERIAL PRIMARY KEY NOT NULL,
  price INTEGER NOT NULL, -- cents
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  weekday weekdays NOT NULL,
  start_time_minutes INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  space_total INTEGER NOT NULL,
  space_available INTEGER NOT NULL,  
  volunteer_space_total INTEGER NOT NULL,
  volunteer_space_available INTEGER NOT NULL,
  is_archived BOOLEAN DEFAULT false NOT NULL
);

-- create parent table
CREATE TABLE parent (
  parent_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  is_low_income BOOLEAN DEFAULT false,
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  postal_code VARCHAR(10) NOT NULL,
  city_name VARCHAR(50) NOT NULL,
  province provinces NOT NULL,
  preferred_language VARCHAR(20) NOT NULL
);

-- create volunteer table
CREATE TABLE volunteer (
  volunteer_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255)  NOT NULL,
  last_name VARCHAR(255)  NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone_number VARCHAR(50),
  is_valid BOOLEAN DEFAULT false,
  background_form_link TEXT,

  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  postal_code VARCHAR(10),
  city_name VARCHAR(255),
  province provinces,
  
  preferred_language VARCHAR(20) -- how long is a language name...
);

-- create volunteer registration table
CREATE TABLE volunteer_reg (
  volunteer_id INTEGER NOT NULL,
  program_id INTEGER NOT NULL,
  FOREIGN KEY(volunteer_id) REFERENCES volunteer(volunteer_id),
  FOREIGN KEY(program_id) REFERENCES program(program_id),
  is_valid BOOLEAN DEFAULT false,
  PRIMARY KEY (volunteer_id, program_id)
);

-- create coupon users table
CREATE TABLE coupon_users (
  program_id INTEGER,
  parent_id INTEGER,
  FOREIGN KEY (parent_id) REFERENCES parent(parent_id) ON DELETE CASCADE,
  FOREIGN KEY (program_id) REFERENCES program(program_id) ON DELETE CASCADE,
  coupon_id VARCHAR(255),
  PRIMARY KEY (parent_id, program_id)
);

-- create program waitlist table
CREATE TABLE  program_waitlist(
  program_id INTEGER,
  parent_id INTEGER,
  FOREIGN KEY (parent_id) REFERENCES parent(parent_id) ON DELETE CASCADE,
  FOREIGN KEY (program_id) REFERENCES program(program_id) ON DELETE CASCADE,
  PRIMARY KEY (parent_id, program_id)
);

-- create student table
CREATE TABLE student(
  student_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255)  NOT NULL,
  last_name VARCHAR(255)  NOT NULL,
  allergies VARCHAR(255) NOT NULL,
  additional_info VARCHAR(255) 
);

-- create table for relationship between parent and student
CREATE TABLE parent_of_student(
  parent_id INTEGER,
  student_id INTEGER,
  FOREIGN KEY (parent_id) REFERENCES parent(parent_id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
  PRIMARY KEY (student_id, parent_id)
);

-- create table for registration with parents and students
CREATE TABLE parent_reg (
  volunteer_id INTEGER NOT NULL,
  parent_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  program_id INTEGER NOT NULL,
  is_valid BOOLEAN NOT NULL,
  FOREIGN KEY (volunteer_id) REFERENCES volunteer(volunteer_id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES parent(parent_id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
  FOREIGN KEY (program_id) REFERENCES program(program_id) ON DELETE CASCADE,
  PRIMARY KEY (student_id, program_id)
);

-- create program admin users table
CREATE TABLE program_admin (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255)  NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE
);

-- create teacber table
CREATE TABLE teacher (
  teacher_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255)  NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE
);

-- create teacher registration table
CREATE TABLE teacher_reg (
  teacher_id INTEGER NOT NULL,
  program_id INTEGER NOT NULL,
  FOREIGN KEY(teacher_id) REFERENCES teacher(teacher_id) ON DELETE CASCADE,
  FOREIGN KEY(program_id) REFERENCES program(program_id) ON DELETE CASCADE,
  PRIMARY KEY (program_id, teacher_id)
);

-- create program translation table
CREATE TABLE program_translation (
  program_id INTEGER NOT NULL,
  name VARCHAR(255),
  description TEXT,
  language VARCHAR(20), -- how long is a language name
  FOREIGN KEY (program_id) REFERENCES program(program_id) ON DELETE CASCADE,
  PRIMARY KEY (program_id)
);