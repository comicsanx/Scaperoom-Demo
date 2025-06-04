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

    game: Mapped['GameSession'] = relationship(back_populates = "user_game",uselist=False)
    attempts : Mapped[List['FinalPuzzle']]= relationship(back_populates = 'user')
    used_hint : Mapped[List['UsedHint']] = relationship(back_populates = 'user')



    def serialize(self):
        return {
            "id": self.id,
            'name' : self.name    
        }
    
    
class GameSession(db.Model):
    __tablename__ = 'game'

    id : Mapped[int] = mapped_column(primary_key=True)
    time_screen_1  : Mapped[float] = mapped_column(Float,nullable=False, default = 0)
    time_screen_2 : Mapped[float] = mapped_column(Float,nullable=False, default = 0)
    current_screen: Mapped[int] = mapped_column(nullable=False )
    last_resume_time: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    id_user : Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True) 

#     La lógica sería:
        # Cuando el jugador entra a la pantalla, last_resume_time se actualiza con el datetime.now().
        # Cuando pausa o cambia pantalla, calculas la diferencia entre datetime.now() y 
        # last_resume_time, y la sumas a time_screen_1 o time_screen_2.
        # Luego pones last_resume_time a None para indicar que está pausado.

   
    used_hint : Mapped[List['UsedHint']] = relationship(back_populates= 'game_session')
    final_puzzle: Mapped['FinalPuzzle'] =  relationship(back_populates="session",uselist=False)
    user_game: Mapped['User'] = relationship(back_populates = "game")


    def serialize(self):
             
             return {
                  "id": self.id,
                  'time_screen_1': self.time_screen_1,
                  'time_screen_2': self.time_screen_2,
                  'current_screen' : self.current_screen,
                  'last_resume_time': self.last_resume_time

             }
    
    

class Hint(db.Model):
    __tablename__ = 'hints'

    id : Mapped[int] = mapped_column(primary_key=True)
    enigma_id :  Mapped[int] = mapped_column(Integer,nullable=False)
    text : Mapped[str] = mapped_column(nullable=False)
    order : Mapped[int] = mapped_column(nullable=False)

    used_by_users: Mapped[List['UsedHint']] = relationship(back_populates='hint')


    def serialize(self):
             
             return {
                  'id': self.id,
                  'enigma_id' : self.enigma_id,
                  'text': self.text,
                  'order': self.order

             }

    

class UsedHint(db.Model):
    __tablename__ = 'used_hints' 
      
    id: Mapped[int] = mapped_column(primary_key=True)
    game_session_id  = Mapped[int] = mapped_column(ForeignKey('game.id'),) 
    hint_id : Mapped[int] = mapped_column(ForeignKey('hints.id'), ) 
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))

    
    user: Mapped['User'] = relationship(back_populates='used_hint')
    hint: Mapped['Hint'] = relationship(back_populates='used_by_users')
    game_session : Mapped['GameSession'] = relationship(back_populates= 'used_hint')

    def serialize(self):
             return{
                   
                  'id': self.id,
                  'game_session_id': self.game_session_id,
                  'hint_id': self.hint_id,
                  'user_id': self.user_id
              
             }


    
    

class FinalPuzzle (db.Model):
    __tablename__ = 'final_puzzle'

    id : Mapped[int] = mapped_column(primary_key=True)
    user_answer : Mapped[str] = mapped_column(nullable=False)
    solved : Mapped[bool] = mapped_column(nullable=False, default=False)
    game_session_id : Mapped[int] = mapped_column(ForeignKey('game.id'))
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))

    session :Mapped['GameSession']= relationship(back_populates="final_puzzle")
    user: Mapped['User']= relationship(back_populates = 'attempts')

    def serialize(self):
             return{
                    'id': self.id,
                    'user_answer':self. user_answer,
                    'solved': self.solved,
                    'game_session_id': self.game_session_id,
                    'user_id': self.user_id
                    }