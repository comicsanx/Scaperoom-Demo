
from typing import List
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Float, ForeignKey, Boolean, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, timezone

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(String(80), nullable=False)
    password_hash: Mapped[str] = mapped_column(String(2256),nullable=False)
    avatar_filename: Mapped[str] = mapped_column(String(100), nullable=False, default="default_avatar.png")
    best_time: Mapped[float] = mapped_column(Float, nullable=True, default=None)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    # created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

    user_games: Mapped[List['GameSession']] = relationship(back_populates = "user", cascade="all, delete-orphan")
  

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,    
            "avatar_filename": self.avatar_filename,
            "best_time": self.best_time,
        }
     
class GameSession(db.Model):
    __tablename__ = 'game_sessions'

    id : Mapped[int] = mapped_column(primary_key=True)
    status:  Mapped[str] = mapped_column(nullable=False, default="playing")
    accumulated_time: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    total_time: Mapped[float] = mapped_column(Float, nullable=True)
    current_level: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    user_id : Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False) 
    
    user: Mapped['User'] = relationship(back_populates = "user_games") 
   
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "status": self.status,
            "accumulated_time": self.accumulated_time,
            # "total_time": self.total_time,
            "current_level": self.current_level
        }
