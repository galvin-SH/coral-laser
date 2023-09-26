INSERT INTO department (name)
VALUES
    ("Cybersecurity"),
    ("Sanitation"),
    ("Imaging");

SELECT * FROM department;

INSERT INTO role (title,salary,department_id)
VALUES
    ("Chief Security Officer","200000",1),
    ("Senior Security Specialist", "130000",1),
    ("Cleaning Crew Manager", "50000",2),
    ("Overnight Cleaning Crew","43000",2),
    ("Imaging Manager","85000",3),
    ("Imaging Clerk","50000",3);

SELECT title, salary, name AS department
FROM role
LEFT JOIN department
ON role.department_id = department.id;