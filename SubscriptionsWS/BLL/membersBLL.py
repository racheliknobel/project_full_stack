from pymongo import MongoClient
from bson import ObjectId




class Members_db:
     # Database connection MongoDB - movies collection
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["SubscriptionsDB"]
        self.__collection = self.__db["members"]

    def get_all_members(self):
        members = list(self.__collection.find({}))
        return members
    
    def get_movie_by_id(self,id):
        movie = self.__collection.find_one({"_id": ObjectId(id)})
        return movie
    
    def create_all_members(self,members):
        msg = self.__collection.insert_many(members)
        return f"create_all_members {msg}" 


    def create_member(self,member):
        msg = self.__collection.insert_one(member)
        return f"create_all_members {msg}" 
    
    def update_member(self,id,member):
        msg = self.__collection.update_one({"_id" : ObjectId(id)},{"$set": member})
        return f"Update member {msg}"
    
    def delete_member(self,id):
        msg = self.__collection.delete_one({"_id" : ObjectId(id)})
        return f"Delete member {msg}"

