from datetime import datetime
from typing import List
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, DateTime, Float, ForeignKey, Integer,Boolean
from sqlalchemy.orm import Mapped, mapped_column,relationship

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    # game: Mapped['Game'] = relationship(back_populates = "user_game",uselist=False)
  

    def serialize(self):
        return {
            "id": self.id,
            'name' : self.name    
        }
    
    
class Game(db.Model):
    __tablename__ = 'game'

    id : Mapped[int] = mapped_column(primary_key=True)
    # time_screen_1  : Mapped[float] = mapped_column(Float,nullable=False, default = 0)
    # time_screen_2 : Mapped[float] = mapped_column(Float,nullable=False, default = 0)
    # current_screen: Mapped[int] = mapped_column(nullable=False )
  
    # id_user : Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True) 
    # user_game: Mapped['User'] = relationship(back_populates = "game")


    def serialize(self):
             
             return {
                  "id": self.id,
               

             }
    
class Session(db.Model):
    __tablename__ = 'game'