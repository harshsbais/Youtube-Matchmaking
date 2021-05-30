import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { signUp } from './dataHelpers';
function SignUp({ showSignupModal, setShowSignupModal }) {
    const [userData, setUserData] = useState({
        collab: false
    });
    const { user, password, id, collab, email } = userData;
    const setUserInfo = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData);
        let res = await signUp(email, password, user, id);
        console.log(res)
        if (userData.collab) {
            let res2 = await signUp(user, collab);
            console.log(res2);
        }
    }
    return (
        <Modal
            show={showSignupModal}
            onHide={(e) => setShowSignupModal(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <Form onSubmit={handleSubmit} style={{ color: "black", opacity: "87%" }}>
                    <center><h1 className="mb-5">SignUp to WeCon</h1></center>
                    <label htmlFor='user' style={{ margin: '20px 20px' }}>Username</label>
                    <input autocomplete="off" className="float-right mt-2" name='user' style={{ width: "45%" }} value={user} onChange={setUserInfo} />
                    <br />
                    <label htmlFor='user' style={{ margin: '20px 20px' }}>YouTube ID</label>
                    <input autocomplete="off" className="float-right mt-2" name='id' style={{ width: "45%" }} value={id} onChange={setUserInfo} />
                    <br />
                    <label htmlFor='user' style={{ margin: '20px 20px' }}>E-Mail</label>
                    <input autocomplete="off" className="float-right mt-2" name='email' style={{ width: "45%" }} value={email} onChange={setUserInfo} />
                    <br />
                    <label htmlFor='user' style={{ margin: '20px 20px' }}>Password</label>
                    <input autocomplete="off" type="password" className="float-right" name='password' style={{ width: "45%" }} value={password} onChange={setUserInfo} />
                    <br />
                    <span><label>Willing to Collaborate</label></span>
                    <span style={{ margin: "7px 10px" }}><input type="checkbox" onChange={() => setUserData({ ...userData, "collab": !collab })} defaultChecked={collab} /></span>
                    <button className="ml-3 mt-1 float-right" style={{ background: 'none', color: 'black', border: 'none' }}><i className="fa fa-arrow-right"></i></button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default SignUp

