import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
// import { useAuth0 } from '../../contexts/auth-context';
import {useForm} from "react-hook-form";


function User(): JSX.Element {
    let history = useHistory();
    // const { user, getIdTokenClaims } = useAuth0();
    const {register, handleSubmit, watch, errors} = useForm();

    interface IValues {
        [key: string]: any;
    }
    const [author, setAuthor] = useState<string>('');
    const [values, setValues] = useState<IValues>([]);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // useEffect(() => {
    //     if (user) {
    //         setAuthor(user.name)
    //     }
    // }, [user])

    const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        // e.preventDefault();
        setLoading(true);
        const formData = {
            username: values.username,
            given_name: values.given_name,
            family_name: values.family_name,
            phone_number: values.phone_number,
            email: values.email,
            profile_picture: values.profile_picture
        }
        const submitSuccess: boolean = await submitform(formData);
        setSubmitSuccess(submitSuccess);
        setValues({...values, formData});
        setLoading(false);
        setTimeout(() => {
            history.push('/');
        }, 1500);
    }

    const submitform = async (formData: {}) => {
        try {
            // const accessToken = await getIdTokenClaims();
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    // "authorization": `Bearer ${accessToken.__raw}`
                }),
                body: JSON.stringify(formData)
            });
            return response.ok;
        } catch (ex) {
            return false;
        }
    }
    const setFormValues = (formValues: IValues) => {
        setValues({...values, ...formValues})
    }
    const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        // e.preventDefault();
        console.log(e.currentTarget.value);
        setFormValues({ [e.currentTarget.name]: e.currentTarget.value })
    }

    return (
        <div className="profile-area">
            <div className={"col-md-12 form-wrapper"}>
                {/*<h2> Welcome! </h2>*/}
                {/*{!submitSuccess && (*/}
                {/*    <div className="alert alert-info" role="alert">*/}
                {/*        Please finish setting up your user below.*/}
                {/*    </div>*/}
                {/*)}*/}
                {submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        The form was successfully submitted!
                    </div>
                )}
                <form id={"create-user-form"} onSubmit={handleFormSubmission} noValidate={true}>
                    <h4 className={"mt-5 mb-3"}>Log In to Your Account</h4>
                    <div className="form-group col-md-12">
                        <label htmlFor="username"> Username </label>
                        <input type="text"
                               id="username"
                               ref={register({required: true})}
                               onChange={(e) => handleInputChanges(e)}
                               name="username" className="form-control"
                               placeholder="Enter username" />
                        {errors.username && errors.username.type === "required" && (
                            <div className="error">Please enter a username.</div>
                        )}
                    </div>
                    {/*<div className="form-group col-md-12">*/}
                    {/*    <label htmlFor="given_name"> First Name </label>*/}
                    {/*    <input type="text"*/}
                    {/*           id="given_name"*/}
                    {/*           onChange={(e) => handleInputChanges(e)}*/}
                    {/*           name="given_name"*/}
                    {/*           className="form-control"*/}
                    {/*           placeholder="Enter first name" />*/}
                    {/*</div>*/}
                    {/*<div className="form-group col-md-12">*/}
                    {/*    <label htmlFor="family_name"> Last Name </label>*/}
                    {/*    <input type="text"*/}
                    {/*           id="family_name"*/}
                    {/*           onChange={(e) => handleInputChanges(e)}*/}
                    {/*           name="family_name"*/}
                    {/*           className="form-control"*/}
                    {/*           placeholder="Enter last name" />*/}
                    {/*</div>*/}
                    {/*<div className="form-group col-md-12">*/}
                    {/*    <label htmlFor="phone_number"> Contact No. </label>*/}
                    {/*    <input type="text"*/}
                    {/*           id="phone_number"*/}
                    {/*           onChange={(e) => handleInputChanges(e)}*/}
                    {/*           name="phone_number"*/}
                    {/*           className="form-control"*/}
                    {/*           placeholder="Enter contact number" />*/}
                    {/*</div>*/}
                    <div className="form-group col-md-12">
                        <label htmlFor="email"> Email </label>
                        <input type="text"
                               id="email"
                               ref={register({required: true})}
                               onChange={(e) => handleInputChanges(e)}
                               name="email"
                               className="form-control"
                               placeholder="Enter email" />
                        {errors.email && errors.email.type === "required" && (
                            <div className="error">Please enter a valid email.</div>
                        )}
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="email"> Password </label>
                        <input type="text"
                               id="password"
                               ref={register({required: true})}
                               onChange={(e) => handleInputChanges(e)}
                               name="password"
                               className="form-control"
                               placeholder="Enter password" />
                        {errors.password && errors.password.type === "required" && (
                            <div className="error">Please enter a password.</div>
                        )}
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="email"> Confirm Password </label>
                        <input type="text"
                               id="confirm_password"
                               ref={register({required: true})}
                               onChange={(e) => handleInputChanges(e)}
                               name="confirm_password"
                               className="form-control"
                               placeholder="Confirm your password" />
                        {errors.confirm_password && errors.confirm_password.type === "required" && (
                            <div className="error">Please confirm your password.</div>
                        )}
                    </div>
                    {/*<div className="form-group col-md-12">*/}
                    {/*    <label htmlFor="user"> User Picture </label>*/}
                    {/*    /!*<div>*!/*/}
                    {/*    /!*    <input type="file"*!/*/}
                    {/*    /!*           id="profile_picture"*!/*/}
                    {/*    /!*           name="profile_picture"*!/*/}
                    {/*    /!*           onChange={ (e) => handleInputChanges(e) }*!/*/}
                    {/*    /!*    />*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*    <FileUploader/>*/}
                    {/*</div>*/}
                    <div className="form-group col-md-4 pull-right">
                        <button className="btn btn-success" type="submit">
                            Log In
                        </button>
                        {loading &&
                        <span className="fa fa-circle-o-notch fa-spin" />
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}
export default withRouter(User)