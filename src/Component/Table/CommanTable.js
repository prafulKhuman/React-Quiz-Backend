import DataTable from 'react-data-table-component';
import { useState} from 'react';
import "./../Coustom.css";
import Toast from 'react-bootstrap/Toast';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';





const paginationComponentOptions = {
    rowsPerPageText: 'Show Record Per Page',
    rangeSeparatorText: 'Of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
};

const customStyles = {
    headRow: {
        style: {
            width: "96vw"
        },
    },
    rows: {
        style: {
            minHeight: '45px',
            border: '1px solid #dddddd',
            fontSize: '15px',
            width: "96vw",
            
        },
    },
    headCells: {
        style: {
            paddingLeft: '20px',
            paddingRight: '8px',
            fontSize: '15px',
            fontWeight: 'bold',
            border: '1px solid #dddddd',
            
        },
    },
    cells: {
        style: {
            paddingLeft: '20px',
            paddingRight: '8px',
            border: '1px solid #dddddd',
            
        },
    },
};

const Loader = <div class="text-center" style={{ marginTop: "10px" }}>
    <div class="spinner-border" role="status" style={{ width: "5rem", height: "5rem" }}>
        <span class="visually-hidden">Loading...</span>
    </div>
</div>


function CommanTable({ rowConfig, columnConfig, loading, error , handleDelete , modify , updateRecord}) {

    const [selectedRow, setSelectedRow] = useState([]);
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);
    const [toggleCleared, setToggleCleared] = useState(false);

    const [selectedRecordCount, setSelectedRecordCount] = useState(0);
   

    const handleChange = ({ selectedRows }) => {
       
        if(updateRecord !== "NO" && selectedRows.length === 0){
            updateRecord(selectedRows)
        }
        setSelectedRow(selectedRows);
        const rowCount = selectedRows.length;
        setSelectedRecordCount(rowCount);
        
        if(rowCount > 1)
        {
            setShow(false);
            setShowError(true)
        }else if(rowCount === 0){
            setShow(false); 
            setShowError(false)
        }else if(rowCount === 1){
            setShowError(false)
            setShow(true);
        }

    };

    const handleUpdate = (SelectedRow) => {
        updateRecord(SelectedRow);
        setShow(false);
        setToggleCleared(!toggleCleared);
    }
   
    const handleShow = (data) => {
        const response = Object.keys(data).map((key) => {
                const style = ( key === "rules" ? {lineHeight: "160%"} : {lineHeight: "80%"} );
           return  <p style={style}>{key} :: {data[key]}</p>

         })

         return response ;
    }
    const ExpandedComponent = ({ data }) => <div className='row-extend'>{handleShow(data)}</div>;
    
    return (
        <>
            <div className='m-table'>
                <DataTable
                    columns={columnConfig}
                    data={rowConfig}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    highlightOnHover
                    pointerOnHover 
                    customStyles={customStyles}
                    selectableRows
                    progressPending={loading}
                    progressComponent={Loader}
                    onSelectedRowsChange={handleChange}
                    expandableRows 
                    expandableRowsComponent={ExpandedComponent}
                    clearSelectedRows={toggleCleared}
                    
                />
            </div>
            <div className='toster-action'>
                <Toast onClose={() => setShow(false)} show={show} >
                    <Toast.Header>
                        <strong className="me-auto">Selected Record - <span>{selectedRecordCount}</span></strong>
                      
                    </Toast.Header>
                    <Toast.Body>
                        <Container>
                            <Row>
                                <Col sm={6} style={{marginLeft:"2em"}}><Button variant="outline-danger" onClick={()=> { handleDelete(selectedRow[0]) ; setShow(false) ; setToggleCleared(!toggleCleared);}}>Delete</Button></Col>
                               {updateRecord !== "NO" &&  <Col sm={4}> <Button variant="outline-primary" onClick={()=> handleUpdate(selectedRow[0])}>Update</Button> </Col> } 
                            </Row>
                            
                        </Container>
                        
                        
                    </Toast.Body>       
                </Toast>
            </div>
            <div className='toster-action'>
                <Toast  show={showError} >
                    <Toast.Header>
                        <strong className="me-auto"><span style={{color: "red"}}>Warraning..</span></strong>
                      
                    </Toast.Header>
                    <Toast.Body>
                       <p>Select Only One Record...</p>
                    </Toast.Body>
                </Toast>
            </div>

           
        </>
    );
};

export default CommanTable;



