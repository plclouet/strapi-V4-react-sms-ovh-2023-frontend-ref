//import styles from "./Signin.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function Signin() {
  const { signin, user } = useContext(AuthContext);

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Il faut préciser votre email")
      .email("l'email n'est pas valide"),
    password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(6, "Mot de passe trop court"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (credentials) => {
    try {
      clearErrors();
      await signin(credentials);
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });

  return (
    <>
      {user ? (
        <Navigate to="/profilpage" />
      ) : (
        <div className="container d-flex justify-content-center">

       
        <div className="card col-12 col-md-6 login-card mt-2 hv-center p-2">
          <form
            onSubmit={submit}
           // className={`${styles.form} d-flex flex-column card p-20`}
           className="p-3"
          >
            <h2 className="mb-10">Connexion</h2>
            <div className="p-3 d-flex flex-column">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" {...register("email")} />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>
            <div className="p-3 d-flex flex-column">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>
            {errors.generic && (
              <div className="mb-10">
                <p className="form-error">{errors.generic.message}</p>
              </div>
            )}
            <div className="m-3">
              <button disabled={isSubmitting} className="btn btn-primary">
                Connexion
              </button>
            </div>
          </form>
        </div>
        </div>
      )}
    </>
  );
}

export default Signin;