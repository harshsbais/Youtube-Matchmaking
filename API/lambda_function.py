import pymongo as mongo
from bson.json_util import dumps
import json

def lambda_handler(event, context):
    client = mongo.MongoClient("mongodb+srv://Nivek:Youtube123@matchmaking.3hoeh.mongodb.net/matchmaking")
    db = client.matchmaking
    query={}
    query["title"] = event["title"]
    response = db.channels.find(query)
    return{
        "statusCode": 200,
        "body": dumps(response)
    }