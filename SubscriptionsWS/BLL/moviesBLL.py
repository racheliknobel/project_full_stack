from pymongo import MongoClient
from bson import ObjectId




class Movies_db:
     # Database connection MongoDB - movies collection
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["SubscriptionsDB"]
        self.__collection = self.__db["movies"]

    def get_all_movies(self):
        movies = list(self.__collection.find({}))
        return movies
    
    def get_movie_by_id(self, id):
        movie = self.__collection.find_one({"_id": ObjectId(id)})
        return movie
     
    def create_movie(self,movie):
        msg = self.__collection.insert_one(movie)
        return f"create_all_movies {msg}" 
    
    def update_movie(self,id, movie):
        msg = self.__collection.update_one({"_id": ObjectId(id)},{"$set": movie})
        return f"Update movie {msg}"
    
    def delete_movie(self,id):
        msg = self.__collection.delete_one({"_id": ObjectId(id)})
        return f"Delete movie {msg}"
