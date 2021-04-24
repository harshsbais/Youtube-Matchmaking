import pymongo as mongo
from bson.json_util import dumps
import numpy
import json
import shlex
import gensim

def lambda_handler(event, context):
    client = mongo.MongoClient("mongodb+srv://Nivek:Youtube123@matchmaking.3hoeh.mongodb.net/matchmaking")
    db = client.matchmaking
    query={}
    if event.get("keywords",False):
        word_vectors = gensim.models.KeyedVectors.load('word_vectors.kv')
        keywords=shlex.split(event["keywords"].lower())
        vector=np.array([0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0])
        for keyword in keywords:
            try:
                vector+=word_vectors.get_vector(keyword)
            except:
                pass
        vector=vector/len(keywords)
        channels=db.channels.find({})
        
        vec_dist_dict={}
        for channel in channels:
            channel_vec=np.array(channel["vector"])
            dist=np.linalg.norm(vector-channel_vec)
            vec_dist_dict["channel"]=dist
        response = sorted(vec_dist_dict.items(), key=lambda x: x[1])   #List of sorted key value pairs
        response = response[(event["page"]-1)*20:event["page"]*20]
        response = [response[i][0] for i in range(len(response))]
        response = db.channels.find({"title":{"$in":response}})
        return{
            "statusCode": 200,
            "body": dumps(response)
        }



    else:
        query["title"] = event["title"]
        response = db.channels.find(query)
        return{
            "statusCode": 200,
            "body": dumps(response)
        }