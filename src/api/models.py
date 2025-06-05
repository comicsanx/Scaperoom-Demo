
from typing import List
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Float, ForeignKey,Boolean
from sqlalchemy.orm import Mapped, mapped_column,relationship

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_name: Mapped[str] = mapped_column(String(120), nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    best_time :  Mapped[float] = mapped_column(Float, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    user_games: Mapped[List['GameSession']] = relationship(back_populates = "user")
  

    def serialize(self):
        return {
            "id": self.id,
            "name" : self.name    
        }
    
    
class GameSession(db.Model):
    __tablename__ = 'game_sessions'

    id : Mapped[int] = mapped_column(primary_key=True)
    status:  Mapped[str] = mapped_column(nullable=False)
    acumuated_time : Mapped[float] = mapped_column(Float, nullable=True)
    total_time :  Mapped[float] = mapped_column(Float, nullable=True)
    current_level  :Mapped[int] = mapped_column(Float, nullable=False)
    user_id : Mapped[int] = mapped_column(ForeignKey("users.id")) 
    
    
    user: Mapped['User'] = relationship(back_populates = "user_games") 
   


def serialize(self):
        
        return {
            "id": self.id,
            "user_id": self.user_id,
            "status": self.status,
            "accumulated_time": self.accumulated_time,
            "final_total_time": self.final_total_time,
            "current_level": self.current_level
        }
