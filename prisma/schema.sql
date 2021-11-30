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
CREATE TYPE difficulties AS ENUM ('LEARNING', 'PHYSICAL', 'SENSORY', 'OTHER');
CREATE TYPE therapy AS ENUM('PHYSIO', 'SPEECH_LANG', 'OCCUPATIONAL', 'COUNSELING', 'ART', 'OTHER');
CREATE TYPE heard_from AS ENUM ('FRIENDS_FAMILY', 'FLYERS', 'EMAIL', 'SOCIAL_MEDIA', 'OTHER');

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
  updated_at TIMESTAMPTZ
);
-- Create email verification requests table
CREATE TABLE verification_requests (
  id SERIAL PRIMARY KEY NOT NULL,
  identifier TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);
-- create program table
CREATE TABLE programs (
  id SERIAL PRIMARY KEY NOT NULL,
  online_format program_formats NOT NULL,
  tag TEXT NOT NULL, -- art, music, math etc (TODO we might need a tag table later)
  image_link TEXT,

  start_date TIMESTAMPTZ NOT NULL, -- earliest start date of all classes
  end_date TIMESTAMPTZ NOT NULL, -- latest end date of all classes

  is_archived BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);

CREATE TABLE classes (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT, 
  border_age INTEGER NOT NULL, -- represent pivot page in age group
  is_age_minimal BOOLEAN DEFAULT false NOT NULL, -- determine if border_age is used as "<age> and above" or "<age> and under"
  image_link TEXT,

  program_id INTEGER NOT NULL,
  stripe_price_id VARCHAR(50) NOT NULL, -- not sure if this can be > 50 characters though TODO
  FOREIGN KEY(program_id) REFERENCES programs(id) ON DELETE CASCADE,

  space_total INTEGER NOT NULL,
  volunteer_space_total INTEGER NOT NULL,

  is_archived BOOLEAN DEFAULT false NOT NULL, -- its possible to archive classes separately

  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  weekday weekdays NOT NULL,
  start_time_minutes INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);

-- create parent table
CREATE TABLE parents (
  id SERIAL PRIMARY KEY NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  is_low_income BOOLEAN DEFAULT false,
  preferred_language locales NOT NULL,
  proof_of_income_link TEXT,
  heard_from heard_from[],
  FOREIGN KEY(id) REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);
-- create volunteer table
CREATE TABLE volunteers (
  id SERIAL PRIMARY KEY NOT NULL,
  FOREIGN KEY(id) REFERENCES users(id) ON DELETE CASCADE,
  phone_number VARCHAR(50),
  date_of_birth TIMESTAMPTZ NOT NULL,
  address_line1 TEXT,
  criminal_record_check_link TEXT,
  criminal_check_approved BOOLEAN,
  criminal_check_expired BOOLEAN DEFAULT false,
  postal_code VARCHAR(10),
  city_name TEXT,
  province provinces,
  school TEXT,
  preferred_language locales,
  skills TEXT,
  hear_about_us TEXT, 
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);
-- create volunteer registration table
CREATE TABLE volunteer_regs (
  volunteer_id INTEGER NOT NULL,
  class_id INTEGER NOT NULL,
  FOREIGN KEY(volunteer_id) REFERENCES volunteers(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  PRIMARY KEY (volunteer_id, class_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);
-- create program waitlist table
CREATE TABLE waitlists(
  class_id INTEGER NOT NULL,
  parent_id INTEGER NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  PRIMARY KEY (parent_id, class_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);
-- create student table
CREATE TABLE students (
  id SERIAL PRIMARY KEY NOT NULL,
  parent_id INTEGER NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth TIMESTAMPTZ NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  postal_code VARCHAR(10),
  city_name TEXT,
  province provinces,
  school TEXT,
  grade INTEGER,
  difficulties difficulties[],
  other_difficulties TEXT,
  therapy therapy[],
  other_therapy TEXT,
  special_education BOOLEAN DEFAULT false,
  guardian_expectations TEXT,
  medication TEXT,
  allergies TEXT,
  additional_info TEXT,
  emerg_first_name TEXT NOT NULL,
  emerg_last_name TEXT NOT NULL,
  emerg_number VARCHAR(50) NOT NULL,
  emerg_relation_to_student TEXT NOT NULL,
  FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
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
  updated_at TIMESTAMPTZ
);
-- create program admin users table
CREATE TABLE program_admins (
  id SERIAL PRIMARY KEY NOT NULL,
  FOREIGN KEY(id) REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);
-- create teacber table
CREATE TABLE teachers (
  id SERIAL PRIMARY KEY NOT NULL,
  FOREIGN KEY(id) REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);
-- create teacher registration table
CREATE TABLE teacher_regs (
  teacher_id INTEGER NOT NULL,
  class_id INTEGER NOT NULL,
  FOREIGN KEY(teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  PRIMARY KEY (class_id, teacher_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);
-- create program class translation table
CREATE TABLE class_translations (
  class_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT, -- might be null, in the figma the classes only had a name (ex. singing monkeys)
  language locales NOT NULL,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  PRIMARY KEY (class_id, language),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
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
  updated_at TIMESTAMPTZ
);