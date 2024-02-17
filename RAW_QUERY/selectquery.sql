SELECT 
  employees.id AS employee_id,
  employees.nik,
  employees.name,
  employees.is_active,
  employee_profile.gender,
  CONCAT(DATE_PART('year', AGE(employee_profile.date_of_birth)), ' Years Old') AS age,
  education.name AS school_name,
  education.level,
  COALESCE(
    (
      SELECT STRING_AGG(relation_count, ', dan ')
      FROM (
        SELECT CONCAT(COUNT(employee_family.id), ' ', employee_family.relation_status) AS relation_count
        FROM employee_family
        WHERE employee_family.employee_id = employees.id
        GROUP BY employee_family.relation_status
      ) AS subquery
    ),
    '-'
  ) AS family_data
FROM 
  employees
  JOIN education ON education.employee_id = employees.id
  LEFT JOIN employee_profile ON employee_profile.employee_id = employees.id;
