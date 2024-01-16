import DataTable from 'react-data-table-component';
import { useState, useEffect, useCallback, useMemo } from 'react';
import "./../Coustom.css";
import Toast from 'react-bootstrap/Toast';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UpdateRecordForm from './UpdateRecordForm';




const paginationComponentOptions = {
    rowsPerPageText: 'Show Record Per Page',
    rangeSeparatorText: 'Of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
};

const customStyles = {
    rows: {
        style: {
            minHeight: '45px',
            border: '1px solid #dddddd',
            fontSize: '15px',
            
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


function CommanTable({ rowConfig, columnConfig, loading, error , handleDelete , modify}) {

    const [selectedRow, setSelectedRow] = useState([]);
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showUpdateData, setShowUpdateData] = useState([]);
    const [selectedRecordCount, setSelectedRecordCount] = useState(0);
   

    const handleChange = ({ selectedRows }) => {
        setSelectedRow(selectedRows);
        const rowCount = selectedRows.length;
        setSelectedRecordCount(rowCount);
        
        if(rowCount > 1)
        {
            setShowError(true)
        }else if(rowCount === 0){
            setShowError(false)
        }

        if (rowCount === 1) {
            setShowError(false)
            setShow(true);
        } else {
            setShow(false);
        }
    };

    const handleUpdate = (SelectedRow) => {
        setShowUpdate(true);
        setShowUpdateData(SelectedRow)
    }
   
    const handleShow = (data) => {
        const response = Object.keys(data).map((key) => {
           return  <p>{key} :: {data[key]}</p>

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
                                <Col sm={6} style={{marginLeft:"2em"}}><Button variant="outline-danger" onClick={()=> handleDelete(selectedRow[0].id)}>Delete</Button></Col>
                                <Col sm={4}> <Button variant="outline-primary" onClick={()=> handleUpdate(selectedRow[0])}>Update</Button> </Col>
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

            <UpdateRecordForm  
                show={showUpdate}
                onHide={() => setShowUpdate(false)}
                data={showUpdateData}
                onTostHide={() => setShow(false)}
                modify = {(data)=> modify(data)}
            />
           
        </>
    );
};

export default CommanTable;



