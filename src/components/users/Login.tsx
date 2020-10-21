import React, {useContext, useState} from 'react';
import {withRouter, useHistory} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/auth-context";
import {authorizedAction} from "../../context/auth-actions";


function Login(): JSX.Element {
    let history = useHistory();
    const {register, handleSubmit, errors} = useForm();
    const {dispatch} = useContext(AuthContext);

    interface IValues {
        [key: string]: any;
    }

    const [values, setValues] = useState<IValues>([]);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement> | any): Promise<void> => {
        setLoading(true);
        const formData = {
            username: values.username,
            email: values.email,
            password: values.password
        }
        const submitSuccess: boolean = await submitform(formData);
        setSubmitSuccess(submitSuccess);
        setValues({...values, formData});
        setLoading(false);
        setTimeout(() => {
            history.push('/');
            dispatch(authorizedAction());
        }, 1500);
    }

    const submitform = async (formData: {}) => {
        try {
            await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/signin`, {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }),
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(json => {
                    // console.log(json);
                    localStorage.setItem('user', json.username);
                    localStorage.setItem('token', json.accessToken);
                })
                .catch(err => console.log(err));
            return true;
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }
    const setFormValues = (formValues: IValues) => {
        setValues({...values, ...formValues})
    }
    const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        setFormValues({[e.currentTarget.name]: e.currentTarget.value})
    }

    return (
        <div className="profile-area fixed-top-margin">
            <div className={"col-md-12 form-wrapper"}>
                {submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        The form was successfully submitted!
                    </div>
                )}
                <form id={"create-user-form"} onSubmit={handleSubmit(handleFormSubmission)} noValidate={true}>
                    <h4 className={"mt-5 mb-3"}>Log In to Your Account</h4>
                    <div className="form-group col-md-12">
                        <label htmlFor="username"> Username </label>
                        <input type="text"
                               id="username"
                               ref={register({required: true})}
                               onChange={(e) => handleInputChanges(e)}
                               name="username" className="form-control"
                               placeholder="Enter username"/>
                        {errors.username && errors.username.type === "required" && (
                            <div className="error">Please enter a username.</div>
                        )}
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="email"> Email </label>
                        <input type="text"
                               id="email"
                               ref={register({required: true})}
                               onChange={(e) => handleInputChanges(e)}
                               name="email"
                               className="form-control"
                               placeholder="Enter email"/>
                        {errors.email && errors.email.type === "required" && (
                            <div className="error">Please enter a valid email.</div>
                        )}
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="email"> Password </label>
                        <input type="password"
                               id="password"
                               ref={register({required: true})}
                               onChange={(e) => handleInputChanges(e)}
                               name="password"
                               className="form-control"
                               placeholder="Enter password"/>
                        {errors.password && errors.password.type === "required" && (
                            <div className="error">Please enter a password.</div>
                        )}
                    </div>
                    <div className="form-group col-md-4 pull-right">
                        <button className="btn btn-success"
                                type="submit"
                                // onClick={() => dispatch(authorizedAction())}
                        >
                            Sign in
                        </button>
                        {loading &&
                        <span className="fa fa-circle-o-notch fa-spin"/>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withRouter(Login)