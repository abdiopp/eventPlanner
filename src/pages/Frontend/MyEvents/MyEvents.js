import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { firestore } from '../../../config/firebase'
import { toast } from "react-toastify";
import { AuthContext } from '../../../context/AuthContext';




const initialState = {
    description: '',
    title: '',
    date: '',
    time: '',
    location: '',
}

export default function MyEvents() {
    window.toastify = (msg, type) => {
        switch (type) {
            case "success":
                toast.success(msg);
                break;
            case "error":
                toast.error(msg);
                break;
            default:
                toast(msg);
        }
    };

    const [state, setState] = useState(initialState)
    const { user, isAuthenticated } = useContext(AuthContext)
    const [isProcessing, setIsProcessing] = useState(false)


    const handleChange = (e) => {

        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        console.log(state);
    }

    // connect with firebase
    const handleSubmit = e => {
        e.preventDefault();

        let { title, location, description, date, time } = state

        title = title.trim()
        location = location.trim()
        description = description.trim();
        time = time.trim();

        // setState(s => ({ ...s, title, location, description }))

        if (title.length < 3) {
            return window.toastify("Please enter Event Title correctly", "error")
        }
        if (location.length < 3) {
            return window.toastify("Please enter Event Location correctly", "error")
        }
        if (description.length < 10) {
            return window.toastify("Please enter Event Description correctly", "error")
        }
        if (!time) {
            return window.toastify("Please enter Event Time correctly", "error")
        }

        if (!date) {
            return window.toastify("Please Select Event Date correctly", "error");

        }

        if (!isAuthenticated) {
            return window.toastify("Please Login", "error");

        }
        let formData = {
            title, location, description, time, date, attendies: [],
        }
        formData.dateCreated = serverTimestamp();
        formData.id = Math.random().toString(36).slice(2);
        formData.createdBy = {
            email: user.email,
            uid: user.uid,
            displayName: user.fullName
        }

        createDocument(formData);
    }

    const createDocument = async (formData) => {
        setIsProcessing(true)
        try {
            await setDoc(doc(firestore, "events", formData.id), formData);
            window.toastify("Event has been successfully added", "success");
        } catch (err) {
            window.toastify("Something went went wrong, Event isn't added.", "error")
        }
        setIsProcessing(false)
    }



    return (
        <>
            {/* <!-- slider_area_start --> */}
            <div className="slider_area slider_bg_1">
                <div className="slider_text">
                    <div className="container">
                        <div className="position_relv">
                            <div className="row">
                                <div className="col-xl-8">
                                    <div className="title_text title_text2 ">
                                        <h3>Your Events</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- slider_area_end --> */}

            <div className="slider_bg_1">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card p-5  mx-auto" style={{ maxWidth: 620, margin: 100 }}>
                                <h1 className="text-center mb-5">Add Event</h1>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <textarea className="form-control my-1 w-100" name="description" onChange={handleChange} cols="30" rows="9" placeholder=" Description"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input className="form-control my-1 valid" name="title" onChange={handleChange} type="text" placeholder="Enter Title" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input className="form-control my-1 valid" name="location" onChange={handleChange} type="text" placeholder="Location" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input className="form-control my-1 valid" name="time" onChange={handleChange} type="time" placeholder="Event Time" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className="form-control my-1" name="date" onChange={handleChange} type="date" placeholder="event Date" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <button type="submit" className="button button-contactForm boxed-btn" disabled={isProcessing} onClick={handleSubmit}>
                                        {!isProcessing ? 'Add Event'
                                            : <div className='spinner-border spinner-border-sm'></div>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
