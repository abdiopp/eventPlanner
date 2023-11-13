import { collection, doc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { firestore } from '../../../config/firebase'
import { AuthContext } from '../../../context/AuthContext'

export default function ReadEvents() {

    const [documents, setDocuments] = useState([])
    const [isJoining, setIsJoining] = useState(false)

    const { user } = useContext(AuthContext)




    const fetchDocuments = async () => {
        let array = [];

        const q = query(collection(firestore, "events"));

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
    }, [])





    const handleEventJoin = async (item) => {
        console.log('event =>', item.id)
    }


    return (
        <>
            <div className="bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col text-center text-info fw-bold fs-1 mb-5 mt-4">Nearby Events</div>
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

                                <button className='btn btn-primary text-white col-3  btn-sm me-1'
                                    onClick={() => handleEventJoin(event)}
                                >
                                    {!isJoining
                                        ? "Join Event"
                                        : <div className='spinner-border spinner-border-sm'></div>
                                    }
                                </button>
                            </div>
                            <hr />
                        </div>
                    })}
                </div>
            </div>







        </>
    )
}
