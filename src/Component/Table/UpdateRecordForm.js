/* eslint-disable eqeqeq */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

function UpdateRecordForm(props) {
  const [updateddata, setUpdatedData] = useState({});

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
      id : props.data.id
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.modify(updateddata);
    setUpdatedData({});
    props.onHide();
    props.onTostHide();
  }

 

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Record
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <form class="row g-3 " onSubmit={handleSubmit} >

          {Object.keys(props.data).map((item) => (
           
            item == "id" || item == "no" ? "" :

              <div class="col-md-6">
                <label htmlFor={item} class="form-label">{capitalizeFirstLetter(item)}</label>
                <input
                  type={typeof props.data[item] === 'string' ? 'text' : typeof props.data[item] === 'number' ? 'number' : "email"}
                  class="form-control"
                  id={item}
                  name={item}
                  value={updateddata[item] ? updateddata[item] : ""}
                  onChange={(e) => handleChange(e)}
                />
              </div>

          ))}
          <div className='text-end'>
              <Button variant="outline-primary" type="submit">Update</Button>
          </div>
          

        </form>


      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={props.onHide}>Close</Button>

      </Modal.Footer>

    </Modal>
  );
}

export default UpdateRecordForm;