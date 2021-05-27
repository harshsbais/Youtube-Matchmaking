Instructions for the Youtube Matchmaking API

We have the following 4 resources sign-up, log-in, collab and query.

sign-up: This is used to register a new user into the database. It requires the following data:
	user : Username created by the new user
	id : Youtube channel id of the user
	email : email used to contact and verify user
	password : password used by the user

log-in: This is used to log in an user using their credentials.
	user : username that is trying to log-in
	password : password submitted by the user

collab: This is used to know if a user wants to announce they are looking for collaborations or to sign out of this.
	user : username that is looking for collabs
	collab : "True" if the user is looking to collaborate "False" (or any other value) if not.

query: This is used to search by keywords for similar channels to the input query
	keywords : a string that contains all the words the user input
	page : page of results shown. Pages contain 20 channels each.
	subscriber_range : "integer-integer" It is the range of subscribers the user is looking for. E.g. "1000-10000"
	(optional)
	timezone : Timezone the user lives in input as an integer e.g. 5 for +5 UTC or -10 for -10 UTC
	timezone_range : An integer representing the range of timezones the user would be willing to collab. E.g. 2 for plus or minus 2 hours their local time.

query/title: This is used to search the closest channels to a specified channel
	title : name of the channel used to compare
	page : page of results shown. Pages contain 20 channels each.
	subscriber_range : "integer-integer" It is the range of subscribers the user is looking for. E.g. "1000-10000"
	(optional)
	timezone : Timezone the user lives in input as an integer e.g. 5 for +5 UTC or -10 for -10 UTC
	timezone_range : An integer representing the range of timezones the user would be willing to collab. E.g. 2 for plus or minus 2 hours their local time.