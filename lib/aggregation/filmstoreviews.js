db.films.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$lookup: {
			    "from" : "reviews",
			    "localField" : "_id",
			    "foreignField" : "field",
			    "as" : "matches"
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
