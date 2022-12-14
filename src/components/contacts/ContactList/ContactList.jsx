import React , {useEffect ,useState} from "react";
import {Link} from 'react-router-dom';
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

let ContactList = () => {

    let [state ,setState] = useState ({
        loading : false,
        contacts :[],
        errorMessage : ''
    });

    useEffect(() => {
        (async function() {
        try {
            setState({...state, loading:true});
            let response = await ContactService.getAllContacts();
            setState ({
                    ...state,
                    loading: false,
                    contacts:response.data
            });
        }
        catch(error){
            setState({
                ...state,
                loading: false,
                errorMessage : error.message
            });
        }
    })();
    },[]);

    let {loading,contacts,errorMessage} = state;

    return ( 
        <React.Fragment>
            
            <section className="contact-search p-3">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3 fw-bold">Contact Manager
                                <Link to = {'/contact/add'} className='btn btn-primary ms-2'>
                                    <i className="fa-solid fa-circle-plus me-1"/> New</Link>
                                </p>
                                <p className="fst-italic">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, maiores, pariatur, quod animi dolorem vel iusto dolores repellat excepturi quisquam maxime! Vel, tenetur ad! Nisi totam adipisci sequi necessitatibus cumque?</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <form className="row">
                                    <div className="col">
                                    <div className="mb-2">
                                        <input type="text" className="form-control" placeholder="Search Name" defaultValue="Search Name" />
                                    </div>
                                    </div>
                                    <div className="col">
                                    <div className="mb-2">
                                    <input type="Submit" className="btn btn-outline-dark" value="Search" />
                                    </div>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading ? <Spinner/> : <React.Fragment>
                        <section className="contact-list">
                <div className="container">
                    <div className="row">

                    {
                        contacts.length > 0 &&
                        contacts.map(contacts => {
                            return (
                                <div className="col-md-6 " key={contacts.id}>
                                <div className="card my-2">
                                    <div className="card-body">
                                       <div className="row align-items-center d-flex justify-content-around">
                                       <div className="col-md-4">
                                                <img src={contacts.photo} alt=""className="contact-img" style={{width : "175px",height:"175px"}}/>
                                        </div>
                                        <div className="col-md-7 ">
                                                <ul className="list-group">
                                                    <li className="list-group-item list-group-item-action my-1">
                                                        Name : <span className="fw-bold">{contacts.name}</span>
                                                    </li> 
                                                    <li className="list-group-item list-group-item-action my-1 ">
                                                        Mobile : <span className="fw-bold">{contacts.mobile}</span>
                                                    </li>    
                                                    <li className="list-group-item list-group-item-action my-1">
                                                        Email : <span className="fw-bold">{contacts.email}</span>
                                                    </li>                            
                                                </ul>
                                        </div>
                                        <div className="col-md-1 d-flex flex-column align-items-center">
                                                <Link to={`/contact/view/${contacts.id}`} className="btn btn-warning my-1">
                                                    <i className="fa fa-eye"></i>
                                                </Link>
                                                <Link to={'/contact/edit/:contactId'} className="btn btn-primary my-1">
                                                    <i className="fa fa-pen"></i>
                                                </Link>
                                                <button className="btn btn-danger my-1">
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                        </div>
                                       </div>
                                    </div>
                                </div>
    
                            </div>
                            )
                        })
                    }

                       

                    
                    </div>
                </div>
            </section>
                </React.Fragment>
            }

            

            
        </React.Fragment>
    );
};
export default ContactList;