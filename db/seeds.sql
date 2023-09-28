INSERT INTO department (name)
VALUES
    ("Cybersecurity"),
    ("Sanitation"),
    ("Imaging");

INSERT INTO role (title,salary,department_id)
VALUES
    ("Chief Security Officer","200000",1),
    ("Senior Security Specialist", "130000",1),
    ("Cleaning Crew Manager", "50000",2),
    ("Overnight Cleaning Crew","43000",2),
    ("Imaging Manager","85000",3),
    ("Imaging Clerk","50000",3);

INSERT INTO employee (first_name, last_name, role_id,manager_id)
VALUES
    ("Krystian","Kowalak",1,NULL),
    ("Sofia","Dupont",2,1),
    ("Jason","Smith",3,NULL),
    ("Joe","Kim",4,3),
    ("Janet","Hernandez",5,NULL),
    ("Emily","Carpacio",6,5);