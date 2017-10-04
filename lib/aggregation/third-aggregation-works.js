db.actors.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$lookup: {
			    "from" : "films",
			    "localField" : "_id",
			    "foreignField" : "cast.actor",
			    "as" : "act"
			}
		},

		// Stage 2
		{
			$project: {name: 1,"numberOfFilms": { "$size": "$act" }}
			
			
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
