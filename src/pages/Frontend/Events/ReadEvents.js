import { collection, doc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { firestore } from '../../../config/firebase'
import { AuthContext } from '../../../context/AuthContext'

export default function ReadEvents() {

    const [documents, setDocuments] = useState([])
    const [isJoining, setIsJoining] = useState(false)
    const [isprocessing, setIsProcessing] = useState(false)
    const [event, setevent] = useState({})

    const { user } = useContext(AuthContext)



    console.log('documents', documents)

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


    // const joinEvent = async (event) => {


    //     firestore.collection("events").doc.id.update({
    //         attendies: {
    //             user
    //         }
    //     }).then(function () {
    //         console.log("Frank food updated");
    //     });

    // let attendies = event.attendees || []
    // attendies.push(user.uid)
    // let formData = { document }
    // setIsProcessing(true)
    // try {
    //     await updateDoc(doc(firestore, "events", formData.id), formData);
    //     window.toastify("Event has been successfully joined", "success");

    //     let newDocuments = documents.map((doc) => {
    //         if (doc.id === event.id)
    //             return event
    //         return doc
    //     })

    //     setDocuments(newDocuments)
    // } catch (err) {
    //     console.error(err)
    //     window.toastify("Something went went wrong", "error")
    // }
    // setIsProcessing(false)

    // }

    // const joinEvent = () => {
    //     setIsJoining(true)
    //     firestore.collection("events").doc.id.update({
    //         attendies: {
    //             user
    //         }
    //     }).then(function () {
    //         console.log("Frank food updated");
    //     });
    // }

    // useEffect(() => {

    //     for (const document of documents) {
    //         // console.log(document);
    //  let findId = 
    //     }


    // }, [user])




    const handleEventJoin = async (item) => {
        console.log('event =>', item.id)
        const docRef = doc(firestore, "events", item.id)
        let { fullName, email, uid } = user;
        const formData = {
            fullName,
            email,
            uid
        }

        let findData = documents.find((eventDoc) => {
            return eventDoc.id === item.id
        })

        let attendiesData = findData?.attendies;
        attendiesData.push(formData)
        console.log(findData);

        try {
            await setDoc(docRef, findData, { merge: true })
            console.log("Data has been updated");
        } catch (error) {
            console.log(error);
        }


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
