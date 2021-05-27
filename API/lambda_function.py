from numpy.lib.function_base import insert
import pymongo as mongo
import googleapiclient.discovery
import googleapiclient.errors
import numpy as np
import json
import shlex


class youtube:
    def __init__(self, db):
        self.yt=self.start_api(api_key="AIzaSyAAlGIQhyobWdE0rF7XUWGbelFw4diVgjk")
        self.db=db
    def start_api(self, api_key="AIzaSyAAlGIQhyobWdE0rF7XUWGbelFw4diVgjk"):
        api_service_name = "youtube"
        api_version = "v3" 
        api_key="AIzaSyAAlGIQhyobWdE0rF7XUWGbelFw4diVgjk"
        yt = googleapiclient.discovery.build(api_service_name, api_version, developerKey=api_key)
        return yt
    def channel_info(self, ids):
        infos = []
        info = self.yt.channels().list(part=["brandingSettings", "id", "statistics", "topicDetails", "snippet"], fields="items", id=ids)
        info = info.execute()
        infos += info["items"]
        response = []
        for json in infos:
            response.append(self.clean_channel_json(json))
        return response
    def clean_channel_json(self, json):
        new_json={}
        new_json["id"]=json["id"]
        new_json["title"]=json["brandingSettings"]["channel"]["title"]
        new_json["description"]=json["brandingSettings"]["channel"].get("description")
        new_json["keywords"]=json["brandingSettings"]["channel"].get("keywords")
        new_json["country"]=json["brandingSettings"]["channel"].get("country")
        new_json["viewCount"]=int(json["statistics"].get("viewCount", "0"))
        new_json["subscriberCount"]=int(json["statistics"].get("subscriberCount","0"))
        new_json["videoCount"]=int(json["statistics"].get("videoCount","0"))
        new_json["image"]=json["snippet"]["thumbnails"]["high"]["url"]
        new_json["topics"]=[]
        if json.get("topicDetails") != None:
            json_topics=json["topicDetails"].get("topicCategories",[])
            for i in range(len(json_topics)):
                new_json["topics"].append(json_topics[i].replace("https://en.wikipedia.org/wiki/",""))
        return new_json
    def channel_to_database(self, json):
        for channel in json:
            self.db.channels.update_one({"title":channel["title"]}, {"$set": channel}, upsert=True)
        return len(json)


def lambda_handler(event, context):
    client = mongo.MongoClient("mongodb+srv://Nivek:Youtube123@matchmaking.3hoeh.mongodb.net/matchmaking")
    db = client.matchmaking
    query={}
    #When we do a query by keywords to search for similar channels
    if event.get("keyword_query",False):
        subscriber_range=event["subscriber_range"].split("-")
        if event.get("timezone_range",False):
            with open("word_vectors.json") as json_file:
                word_vectors=json.load(json_file)
            keywords=shlex.split(event["keywords"].lower())
            vector=np.array([0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0])
            for keyword in keywords:
                try:
                    vector+=np.array(word_vectors[keyword])
                except:
                    pass
            vector=vector/len(keywords)
            channels=db.channels.find(
                {"$and":
                    [{"timezone":
                        {"$gte":event["timezone"]-event["timezone_range"]}}, 
                    {"timezone":
                        {"$lte":event["timezone"]+event["timezone_range"]}},
                    {"subscriberCount":
                        {"$gte":int(subscriber_range[0])}},
                    {"subscriberCount":
                        {"$lte":int(subscriber_range[1])}}]
                })
        
            vec_dist_dict={}
            for channel in channels:
                channel_vec=np.array(channel["vector"])
                dist=np.linalg.norm(vector-channel_vec)
                vec_dist_dict[channel["title"]]=dist
            response = sorted(vec_dist_dict.items(), key=lambda x: x[1])   #List of sorted key value pairs
            response = response[(int(event["page"])-1)*20:int(event["page"])*20]
            response = [response[i][0] for i in range(len(response))]
            response = list(db.channels.find({"title":{"$in":response}}, {"_id":0}))
            return{
                "statusCode": 200,
                "body": response
            }
        #If timezones where not used to do the query
        else:
            with open("word_vectors.json") as json_file:
                word_vectors=json.load(json_file)
            keywords=shlex.split(event["keywords"].lower())
            vector=np.array([0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0])
            for keyword in keywords:
                try:
                    vector+=np.array(word_vectors[keyword])
                except:
                    pass
            vector=vector/len(keywords)
            channels=db.channels.find(
                {"$and":
                    [{"subscriberCount":
                        {"$gte":int(subscriber_range[0])}},
                    {"subscriberCount":
                        {"$lte":int(subscriber_range[1])}}]
                })
        
            vec_dist_dict={}
            for channel in channels:
                channel_vec=np.array(channel["vector"])
                dist=np.linalg.norm(vector-channel_vec)
                vec_dist_dict[channel["title"]]=dist
            response = sorted(vec_dist_dict.items(), key=lambda x: x[1])   #List of sorted key value pairs
            response = response[(int(event["page"])-1)*20:int(event["page"])*20]
            response = [response[i][0] for i in range(len(response))]
            response = list(db.channels.find({"title":{"$in":response}}, {"_id":0}))
            return{
                "statusCode": 200,
                "body": response
            }
    #Whenever we want to find the closest channels to a specific channel
    if event.get("title_query"):
        subscriber_range=event["subscriber_range"].split("-")
        if event.get("timezone_range",False):
            channel_info=list(db.channels.find({"title":event["title"]}))[0]
            vector=np.array(channel_info["vector"])
            vec_dist_dict={}
            channels=db.channels.find(
                {"$and":
                    [{"timezone":
                        {"$gte":event["timezone"]-event["timezone_range"]}}, 
                    {"timezone":
                        {"$lte":event["timezone"]+event["timezone_range"]}},
                    {"subscriberCount":
                        {"$gte":int(subscriber_range[0])}},
                    {"subscriberCount":
                        {"$lte":int(subscriber_range[1])}}]
                })
            for channel in channels:
                channel_vec=np.array(channel["vector"])
                dist=np.linalg.norm(vector-channel_vec)
                vec_dist_dict[channel["title"]]=dist
            response = sorted(vec_dist_dict.items(), key=lambda x: x[1])   #List of sorted key value pairs
            response = response[(int(event["page"])-1)*20:int(event["page"])*20]
            response = [response[i][0] for i in range(len(response))]
            response = list(db.channels.find({"title":{"$in":response}}, {"_id":0}))
            return{
                "statusCode": 200,
                "body": response
            }
        #If timezones where not used to do the query
        else:
            channel_info=list(db.channels.find({"title":event["title"]}))[0]
            vector=np.array(channel_info["vector"])
            vec_dist_dict={}
            channels=db.channels.find(
                {"$and":
                    [{"subscriberCount":
                        {"$gte":int(subscriber_range[0])}},
                    {"subscriberCount":
                        {"$lte":int(subscriber_range[1])}}]
                })
            vec_dist_dict={}
            for channel in channels:
                channel_vec=np.array(channel["vector"])
                dist=np.linalg.norm(vector-channel_vec)
                vec_dist_dict[channel["title"]]=dist
            response = sorted(vec_dist_dict.items(), key=lambda x: x[1])   #List of sorted key value pairs
            response = response[(int(event["page"])-1)*20:int(event["page"])*20]
            response = [response[i][0] for i in range(len(response))]
            response = list(db.channels.find({"title":{"$in":response}}, {"_id":0}))
            return{
                "statusCode": 200,
                "body": response
            }
    #Whenever we want to register a user to collab 
    if event.get("collab_reg", False):
        user_data=db.users.find({"user":event["user"]})
        user_data=list(user_data)[0]
        query["id"] = user_data["id"]
        if event["collab"]=="True":
            collab=True
        else:
            collab=False
        db.channels.update_one(query, {"$set":{"collab":collab}})
        return{
            "statusCode": 200,
            "body": "Updated "+query["id"]
        }
    #Log in to your user
    if event.get("log_in", False):
        user_data=db.users.find({"user":event["user"]})
        user_data=list(user_data)[0]
        if event["password"]==user_data["password"]:
            return{
                "statusCode": 200,
                "body": "Log in Succesful"
            }
        else:
            return{
                "statusCode": 200,
                "body": "Failed to Log in"
            }
    #Sign-up for the first time
    if event.get("sign_up", False):
        db.users.insert_one({"channel_id":event["id"], "user":event["user"], "email":event["email"], "password":event["password"]})
        if list(db.channels.find({"id":event["id"]}))==[]:
            yt=youtube(db)
            yt.channel_to_database(yt.channel_info(event["id"]))
        channel_title=list(db.channels.find({"id":event["id"]}))[0]["title"]
        db.users.update_one({"id":event["id"]}, {"$set":{"title":channel_title}})
        return{
                "statusCode": 200,
                "body": "Succesfully Created User"
            }