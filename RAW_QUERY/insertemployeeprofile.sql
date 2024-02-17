INSERT INTO employee_profile (id, employee_id, place_of_birth, date_of_birth, gender, is_married, prof_pict, created_by, updated_by, created_at, updated_at)
VALUES 
  (1, 1, 'Jakarta', '1997-05-02'::date, 'laki-laki', true, null, 'Admin', 'Admin', '2022-12-12'::timestamp, '2022-12-12'::timestamp),
  (2, 2, 'Sukabumi', '1996-05-02'::date, 'laki-laki', false, null, 'Admin', 'Admin', '2022-12-12'::timestamp, '2022-12-12'::timestamp);
