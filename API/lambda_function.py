import pymongo as mongo
from bson.json_util import dumps
import numpy as np
import json
import shlex

def lambda_handler(event, context):
    print(event)
    client = mongo.MongoClient("mongodb+srv://Nivek:Youtube123@matchmaking.3hoeh.mongodb.net/matchmaking")
    db = client.matchmaking
    query={}
    if event.get("keywords",False):
        if event.get("timezone_range",False):
            with open("word_vectors.json") as json_file:
                word_vectors=json.load(json_file)
            keywords=shlex.split(event["keywords"].lower())
            print("keywords", keywords)
            vector=np.array([0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0])
            for keyword in keywords:
                try:
                    vector+=np.array(word_vectors[keyword])
                except:
                    pass
            vector=vector/len(keywords)
            print("vector", vector)
            channels=db.channels.find(
                {"$and":
                    [{"timezone":
                        {"$gte":event["timezone"]-event["timezone_range"]}}, 
                    {"timezone":
                        {"$lte":event["timezone"]+event["timezone_range"]}}
                ]})
        
            vec_dist_dict={}
            for channel in channels:
                channel_vec=np.array(channel["vector"])
                dist=np.linalg.norm(vector-channel_vec)
                vec_dist_dict[channel["title"]]=dist
            response = sorted(vec_dist_dict.items(), key=lambda x: x[1])   #List of sorted key value pairs
            response = response[(event["page"]-1)*20:event["page"]*20]
            response = [response[i][0] for i in range(len(response))]
            response = list(db.channels.find({"title":{"$in":response}}, {"_id":0}))
            return{
                "statusCode": 200,
                "body": response
            }
        else:
            with open("word_vectors.json") as json_file:
                word_vectors=json.load(json_file)
            keywords=shlex.split(event["keywords"].lower())
            print("keywords", keywords)
            vector=np.array([0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0])
            for keyword in keywords:
                try:
                    vector+=np.array(word_vectors[keyword])
                except:
                    pass
            vector=vector/len(keywords)
            print("vector", vector)
            channels=db.channels.find({})
        
            vec_dist_dict={}
            for channel in channels:
                channel_vec=np.array(channel["vector"])
                dist=np.linalg.norm(vector-channel_vec)
                vec_dist_dict[channel["title"]]=dist
            response = sorted(vec_dist_dict.items(), key=lambda x: x[1])   #List of sorted key value pairs
            response = response[(event["page"]-1)*20:event["page"]*20]
            response = [response[i][0] for i in range(len(response))]
            response = list(db.channels.find({"title":{"$in":response}}, {"_id":0}))
            return{
                "statusCode": 200,
                "body": response
            }

    else:
        query["title"] = event["title"]
        response = list(db.channels.find(query, {"_id":0}))
        return{
            "statusCode": 200,
            "body": response
        }