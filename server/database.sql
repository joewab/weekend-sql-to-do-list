CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(100),
	"person_responsible" VARCHAR(100),
	"description" VARCHAR(500),
	"helpful_notes" VARCHAR(500),
	"complete" BOOLEAN
);

INSERT INTO "tasks"
("task", "person_responsible", "description", "helpful_notes", "complete") 
VALUES
('Zebra hunt', 'Jimmy', 'find all the zebras!', 'they are not hidden very well', true),
('Grease up Kelly', 'Kelly', 'Kelly, you have to grease yourself if youre gonna get through that hole', 'the grease tastes pretty good too!', false),
('Fix bathroom', 'Varathor', 'bathrm iz broke fix plzzz', 'dont use your sword to fix it, it doesnt fix everything Varathor', false),
('Floor cleaning', 'Eddie', 'clean the fire off the floor', 'use water to clean the fire off the floor', false);
