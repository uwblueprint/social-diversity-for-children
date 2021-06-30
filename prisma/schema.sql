CREATE TYPE provinces AS ENUM(
  'NL',
  'PE',
  'NS',
  'NB',
  'QC',
  'ON',
  'MB',
  'SK',
  'AB',
  'BC',
  'YT',
  'NT',
  'NU'
);

CREATE TYPE weekdays AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- https://stackoverflow.com/questions/3191664/list-of-all-locales-and-their-short-codes
-- chinese, english, japanese, korean
CREATE TYPE locales AS ENUM ('zh', 'en', 'ja', 'ko');

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE,
  email_verified TIMESTAMPTZ,
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create email verification requests table
CREATE TABLE verification_requests (
  id SERIAL PRIMARY KEY NOT NULL,
  identifier TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create program table
CREATE TABLE programs (
  id SERIAL PRIMARY KEY NOT NULL,
  price INTEGER NOT NULL, -- price in cents, to make it integer
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  weekday weekdays NOT NULL,
  start_time_minutes INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  space_total INTEGER NOT NULL,
  space_available INTEGER NOT NULL,
  volunteer_space_total INTEGER NOT NULL,
  volunteer_space_available INTEGER NOT NULL,
  is_archived BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create parent table
CREATE TABLE parents (
  id SERIAL PRIMARY KEY NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  is_low_income BOOLEAN DEFAULT false,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  postal_code VARCHAR(10) NOT NULL,
  city_name VARCHAR(50) NOT NULL,
  province provinces NOT NULL,
  preferred_language locales NOT NULL,
  FOREIGN KEY(id) REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create volunteer table
CREATE TABLE volunteers (
  id SERIAL PRIMARY KEY NOT NULL,
  phone_number VARCHAR(50),
  is_valid BOOLEAN DEFAULT false,
  background_form_link TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  postal_code VARCHAR(10),
  city_name TEXT,
  province provinces,
  preferred_language locales,
  FOREIGN KEY(id) REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create volunteer registration table
CREATE TABLE volunteer_regs (
  volunteer_id INTEGER NOT NULL,
  program_id INTEGER NOT NULL,
  FOREIGN KEY(volunteer_id) REFERENCES volunteers(id),
  FOREIGN KEY(program_id) REFERENCES programs(id),
  is_valid BOOLEAN DEFAULT false,
  PRIMARY KEY (volunteer_id, program_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create coupon users table
CREATE TABLE coupon_users (
  program_id INTEGER NOT NULL,
  parent_id INTEGER NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE,
  coupon_id TEXT,
  PRIMARY KEY (parent_id, program_id)
);

-- create program waitlist table
CREATE TABLE program_waitlists(
  program_id INTEGER NOT NULL,
  parent_id INTEGER NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE,
  PRIMARY KEY (parent_id, program_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create student table
CREATE TABLE students(
  id SERIAL PRIMARY KEY NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  allergies TEXT NOT NULL,
  additional_info TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create table for relationship between parent and student
CREATE TABLE parent_of_students(
  parent_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  PRIMARY KEY (student_id, parent_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create table for registration with parents and students
CREATE TABLE parent_regs (
  parent_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  program_id INTEGER NOT NULL,
  is_valid BOOLEAN NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE,
  PRIMARY KEY (student_id, program_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create program admin users table
CREATE TABLE program_admins (
  id SERIAL PRIMARY KEY NOT NULL,
  FOREIGN KEY(id) REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create teacber table
CREATE TABLE teachers (
  id SERIAL PRIMARY KEY NOT NULL,
  email TEXT UNIQUE,
  FOREIGN KEY(id) REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create teacher registration table
CREATE TABLE teacher_regs (
  teacher_id INTEGER NOT NULL,
  program_id INTEGER NOT NULL,
  FOREIGN KEY(teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
  FOREIGN KEY(program_id) REFERENCES programs(id) ON DELETE CASCADE,
  PRIMARY KEY (program_id, teacher_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create program translation table
CREATE TABLE program_translations (
  program_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  language locales NOT NULL,
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE,
  PRIMARY KEY (program_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);