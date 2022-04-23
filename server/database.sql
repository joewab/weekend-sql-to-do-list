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
('Dishes', 'Larry', 'wash the dang dishes Larry', 'new sponges are under the sink', false),
('Vaccuming', 'Larry', 'Vaccuum the living room plz', 'clean the filter after', false),
('Cocktails', 'Fred', 'make me a cocktail', 'I dont like that new gin you buy', false),
('Shopping', 'Edna', 'restock the fridge', 'theres some cash in the drawer', false);