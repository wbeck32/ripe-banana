db.films.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$lookup: {
			    "from" : "studios",
			    "localField" : "studio",
			    "foreignField" : "_id",
			    "as" : "studiomatch"
			}
		},

		// Stage 2
		{
			$lookup: {
			    "from" : "reviews",
			    "localField" : "_id",
			    "foreignField" : "film",
			    "as" : "filmreviews"
			}
		},

		// Stage 3
		{
			$project: {
			   title:1, released:1, "studioName":{ $arrayElemAt: [ "$studiomatch.name", 0 ] }, "averageRatings": { $avg : "$filmreviews.rating" }
			}
		},

		// Stage 4
		{
			$sort: {
			"averageRatings": -1
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
