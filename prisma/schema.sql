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
CREATE TYPE roles AS ENUM ('PARENT', 'PROGRAM_ADMIN', 'TEACHER', 'VOLUNTEER');
-- https://stackoverflow.com/questions/3191664/list-of-all-locales-and-their-short-codes
-- chinese, english, japanese, korean
CREATE TYPE locales AS ENUM ('zh', 'en', 'ja', 'ko');
CREATE TYPE program_formats AS ENUM ('online', 'in-person', 'blended');
-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE,
  email_verified TIMESTAMPTZ,
  role roles,
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
  online_format program_formats NOT NULL,
  tag TEXT NOT NULL, -- art, music, math etc (TODO we might need a tag table later)

  start_date TIMESTAMPTZ NOT NULL, -- earliest start date of all classes
  end_date TIMESTAMPTZ NOT NULL, -- latest end date of all classes

  is_archived BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classes (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT, 
  age_group TEXT, -- classes are always categorized by age group

  program_id INTEGER NOT NULL,
  FOREIGN KEY(program_id) REFERENCES programs(id) ON DELETE CASCADE,

  space_total INTEGER NOT NULL,
  space_available INTEGER NOT NULL,
  volunteer_space_total INTEGER NOT NULL,
  volunteer_space_available INTEGER NOT NULL,

  is_archived BOOLEAN DEFAULT false NOT NULL, -- its possible to archive classes separately

  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  weekday weekdays NOT NULL,
  start_time_minutes INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,

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
  FOREIGN KEY(id) REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- create volunteer table
CREATE TABLE volunteers (
  id SERIAL PRIMARY KEY NOT NULL,
  FOREIGN KEY(id) REFERENCES users(id) ON DELETE CASCADE,
  phone_number VARCHAR(50),
  is_valid BOOLEAN DEFAULT false,
  background_form_link TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  postal_code VARCHAR(10),
  city_name TEXT,
  province provinces,
  preferred_language locales,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- create volunteer registration table
CREATE TABLE volunteer_regs (
  volunteer_id INTEGER NOT NULL,
  class_id INTEGER NOT NULL,
  FOREIGN KEY(volunteer_id) REFERENCES volunteers(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  PRIMARY KEY (volunteer_id, class_id),
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
CREATE TABLE waitlists(
  class_id INTEGER NOT NULL,
  parent_id INTEGER NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  PRIMARY KEY (parent_id, class_id),
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
  class_id INTEGER NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  PRIMARY KEY (parent_id, student_id, class_id),
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
  FOREIGN KEY(id) REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- create teacher registration table
CREATE TABLE teacher_regs (
  teacher_id INTEGER NOT NULL,
  class_id INTEGER NOT NULL,
  FOREIGN KEY(teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  PRIMARY KEY (class_id, teacher_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- create program class translation table
CREATE TABLE class_translations (
  class_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT, -- might be null, in the figma the classes only had a name (ex. singing monkeys)
  language locales NOT NULL,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  PRIMARY KEY (class_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- create program  translation table
CREATE TABLE program_translations (
  program_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  language locales NOT NULL,
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE,
  PRIMARY KEY (program_id, language),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);