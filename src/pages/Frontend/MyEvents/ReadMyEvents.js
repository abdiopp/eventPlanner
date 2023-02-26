import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { firestore } from '../../../config/firebase';
import { AuthContext } from '../../../context/AuthContext';

export default function ReadMyEvents() {
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
    const { user } = useContext(AuthContext)

    const [documents, setDocuments] = useState([])
    const [event, setevent] = useState({})
    const [isProcessing, setIsProcessing] = useState(false)
    const [isProcessingDelete, setIsProcessingDelete] = useState(false)

    const handleChange = e => {
        let { name, value } = e.target
        setevent(s => ({ ...s, [name]: value }))
    }

    const fetchDocuments = async () => {
        let array = [];

        const q = query(collection(firestore, "events"), where("createdBy.uid", "==", user.uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            array.push(data)
            // doc.data() is never undefined for query doc snapshots
            // console.log(data);
        });

        setDocuments(array)
    }

    useEffect(() => {
        fetchDocuments()
        // eslint-disable-next-line
    }, [user])

    const handleUpdate = async () => {
        // console.log(event)

        let formData = { ...event }
        // eslint-disable-next-line
        formData.description = formData.description;
        formData.dateModified = serverTimestamp();
        formData.modifiedBy = {
            email: user.email,
            uid: user.uid
        }
        setIsProcessing(true)
        try {
            await setDoc(doc(firestore, "events", formData.id), formData, { merge: true });
            window.toastify("Event has been successfully updated", "success");

            let newDocuments = documents.map((doc) => {
                if (doc.id === event.id)
                    return event
                return doc
            })

            setDocuments(newDocuments)
        } catch (err) {
            console.error(err)
            window.toastify("Something went went wrong, Event isn't updated", "error")
        }
        setIsProcessing(false)
    }

    const handleDelete = async (event) => {
        setIsProcessingDelete(true)

        try {
            await deleteDoc(doc(firestore, "events", event.id));
            window.toastify("event has been successfully deleted", "success")

            let newDocuments = documents.filter((doc) => {
                return doc.id !== event.id
            })
            setDocuments(newDocuments)
            setIsProcessingDelete(false)

        } catch (err) {
            console.error(err)
            window.toastify("Something went wrong", "error")
        }
    }
    return (
        <>

            <div className="br-light">
                <div className="container">
                    <div className="row">
                        <div className="col text-center text-info fw-bold fs-1 mb-5 mt-4">Your Events</div>
                    </div>
                    <div className="row">
                        <div className="col col-md-2 fw-bold text-center mb-4">Title</div>
                        <div className="col col-md-2 fw-bold text-center mb-4">Organized by</div>
                        <div className="col col-md-2 fw-bold text-center mb-4">Subject</div>
                        <div className="col col-md-2 fw-bold text-center mb-4">Date</div>
                        <div className="col col-md-2 fw-bold text-center mb-4">Time</div>
                        <div className="col col-md-2 fw-bold text-center mb-4">Location</div>
                    </div>
                    {documents.map((event, i) => {
                        return <div className="event py-3" key={i}>
                            <div className="row text-center align-items-center justify-content-center">
                                <div className="col col-md-2">{event.title}</div>
                                <div className="col col-md-2">{event.createdBy.displayName}</div>
                                <div className="col col-md-2">{event.description}</div>
                                <div className="col col-md-2">{event.date}</div>
                                <div className="col col-md-2">{event.time}</div>
                                <div className="col col-md-2">{event.location}</div>
                            </div>
                            <div className="action buttons mt-2 row justify-content-center ">
                                <button className='btn btn-primary text-white col-3  btn-sm me-1' data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { setevent(event) }}>
                                    {!isProcessing
                                        ? "Edit"
                                        : <div className='spinner-border spinner-border-sm'></div>
                                    }
                                </button>
                                <button className='btn btn-danger col-3 btn-sm' disabled={isProcessingDelete} onClick={() => { handleDelete(event) }}>
                                    {!isProcessingDelete
                                        ? "Delete"
                                        : <div className='spinner-border spinner-border-sm'></div>
                                    }
                                </button>
                            </div>
                            <hr />
                        </div>
                    })}
                </div>
            </div>




            {/* Bootstrap Modal */}
            <div className="modal fade" id="editModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Update event</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="col-12">
                                <div className="form-group">
                                    <p className='fw-normal text-info'>Description</p>
                                    <textarea className="form-control my-1 w-100" name="description" value={event.description} onChange={handleChange} cols="30" rows="9" placeholder=" Description"></textarea>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <p className='fw-normal text-info'>Title</p>

                                    <input className="form-control my-1 valid" name="title" value={event.title} onChange={handleChange} type="text" placeholder="Enter Title" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <p className='fw-normal text-info'>Location</p>

                                    <input className="form-control my-1 valid" name="location" value={event.location} onChange={handleChange} type="text" placeholder="Location" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <p className='fw-normal text-info'>Time</p>

                                    <input className="form-control my-1 valid" name="time" value={event.time} onChange={handleChange} type="time" placeholder="Event Time" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <p className='fw-normal text-info'>Date</p>

                                    <input className="form-control my-1" name="date" value={event.date} onChange={handleChange} type="date" placeholder="event Date" />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="boxed-btn2" data-bs-dismiss="modal">Close</button>
                            <div className="form-group">
                                <button type="submit" className="button button-contactForm boxed-btn" onClick={handleUpdate}>Add Event</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
