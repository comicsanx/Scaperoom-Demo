import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import Avatar_01 from '../assets/img/UI/Avatars/Avatar_01.png';
import Avatar_02 from '../assets/img/UI/Avatars/Avatar_02.png';
import Avatar_03 from '../assets/img/UI/Avatars/Avatar_03.png';
import Default_Avatar from '../assets/img/UI/Avatars/default_avatar.png';

const avatarImageMap = {
  "Avatar_01.png": Avatar_01,
  "Avatar_02.png": Avatar_02,
  "Avatar_03.png": Avatar_03,
  "default_avatar.png": Default_Avatar,
};

export const Signup = () => {
  const { signup } = useGame();
  const navigate = useNavigate()
  const [validate, setValidate] = useState(true)
  const [password, setpassword] = useState('')
  const [data, setData] = useState({
    'username': '',
    'email': '',
    'avatar_filename': '',
  })
  const handleEvent = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  const handlePassword = (e) => {
    const valor = e.target.value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
    setpassword(valor);
    setValidate(regex.test(valor));
  }

      const handleAvatar = (e) => {
      setData({
        ...data,
        avatar_filename: e.target.value
      });
    };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data_and_password = {
      ...data,
      password: password
    }
    try {
      const response = await signup(data_and_password)
      console.log('usuario registrado', response)
      navigate('/login')
    } catch (error) {
      console.log('hubo un error a la hora en registrar al usuario', error)
    }
  };
  return (
    <div className="card-container "  >
      <div className="card  align-items-center" style={{ width: "70rem" }} >
        <div className="card-header pt-3">
          FORMULARIO DE REGISTRO
        </div>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6 ps-4 ">
            <label htmlFor="Username" className="form-label">Username</label>
            <input type="text" className="form-control" id="validationCustom01" name='username' value={data.username} onChange={handleEvent} required />
          </div>
          <div className="col-md-6 ps-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="validationCustom04" name='email' value={data.email} onChange={handleEvent} required />
          </div>
          <div className="col-md-6 pe-4">
            <label htmlFor="Password" className="form-label">Password</label>
            <input type="password" className="form-control" id="validationCustom05" value={password} onChange={handlePassword} required />
            <span id="passwordHelpInline" className="form-text text-muted small">
              La contraseña debe tener al menos 6 digitos y contener: mayuscula, minuscula,caracter especial y número.
            </span>
            {!validate && (
              <div className="text-danger">La contraseña no cumple los requisitos</div>
            )}
          </div>

          <div className="col-md-6 ps-4">
              <label htmlFor="avatarSelect" className="form-label">Avatar</label>
              <select
                className="form-select"
                id="avatarSelect"
                name="avatar_filename"
                value={data.avatar_filename}
                onChange={handleAvatar}
                required
              >
                <option value="">Selecciona un avatar...</option>
                <option value="Avatar_01.png">Avatar 1</option>
                <option value="Avatar_02.png">Avatar 2</option>
                <option value="Avatar_03.png">Avatar 3</option>
                <option value="default_avatar.png">Vacío</option>
              </select>
              {data.avatar_filename && (
                <img
                  src={avatarImageMap[data.avatar_filename]} 
                  alt="Avatar seleccionado"
                  className="img-thumbnail mt-2"
                style={{ maxWidth: '150px', maxHeight: '150px' }}
                />
              )}
        </div>
        <div className="col-12 text-center mt-4 pb-3">
            <button className="btn btn-primary  " type='Submit' disabled={!validate} >Submit form</button>
        </div>
        </form>
      </div>
    </div>
  )
}