\echo 'Delete and recreate student_store db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE life_tracker;
CREATE DATABASE life_tracker;
\connect life_tracker

\i life-tracker-schema.sql
\i life-tracker-seed.sql
