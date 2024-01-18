import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function QuestionTable({ RowConfig }) {
    const [selectedRows, setSelectedRows] = React.useState([]);
	const [toggleCleared, setToggleCleared] = React.useState(false);
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);
    const [selectedRecordCount, setSelectedRecordCount] = useState(0);

    const response = RowConfig.map((row) => {
        return {
            Question: row.question,
            OptionA: row.options[0].value,
            OptionB: row.options[1].value,
            OptionC: row.options[2].value,
            OptionD: row.options[3].value,
            Status: row.options[0].status === true ? "OptionA" : row.options[1].status === true ? "OptionB" : row.options[2].status === true ? "OptionC" : row.options[3].status === true ? "OptionD" : "Not Select"
        }
    })
    console.log(response);
    const customStyles = {
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                width: "91vw"
            },
        },
        rows: {
            style: {
                minHeight: '45px',
                border: '1px solid #dddddd',
                fontSize: '15px',
                width: "91vw",


            },
        },
        headCells: {
            style: {
                paddingLeft: '20px',
                paddingRight: '8px',
                fontSize: '15px',
                fontWeight: 'bold',
                border: '1px solid #dddddd',
                width: "29%",
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

    const columns = [
        {
            name: 'Question',
            selector: row => row.Question,
        },
        {
            name: 'OptionA',
            selector: row => row.OptionA,
        },
        {
            name: 'OptionB',
            selector: row => row.OptionB,
        },
        {
            name: 'OptionC',
            selector: row => row.OptionC,
        },
        {
            name: 'OptionD',
            selector: row => row.OptionD,
        },
        {
            name: 'Status',
            selector: row => row.Status,
        },
    ];


    const handleShow = (data) => {
        const response = Object.keys(data).map((key) => {
            return <p style={{ lineHeight: "160%", textWrap: "wrap" }}>{key} :: {data[key]}</p>

        })

        return response;
    }
    const ExpandedComponent = ({ data }) => <div className='row-extend'>{handleShow(data)}</div>;





    const handleRowSelected =({selectedRows}) => {
		setSelectedRows(selectedRows);
	};

	const contextActions = React.useMemo(() => {
		const handleDelete = () => {
			
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.Question )}?`)) {
				setToggleCleared(!toggleCleared);
				
			}
		};

		return (
			<Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} >
				Delete
			</Button>
		);
	}, [ response ,  selectedRows , toggleCleared]);

    


    return (
        <><DataTable
            title="Question List"
            columns={columns}
            data={response}
            selectableRows
            // contextActions={contextActions}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared} 
            pagination
            highlightOnHover
            pointerOnHover
            expandableRows
            customStyles={customStyles}
            expandableRowsComponent={ExpandedComponent}
        
        />
            
            
            <div className='toster-action'>
                <Toast onClose={() => setShow(false)} show={show}>
                    <Toast.Header>
                        <strong className="me-auto">Selected Record - <span>{selectedRecordCount}</span></strong>

                    </Toast.Header>
                    <Toast.Body>
                        <Container>
                            <Row>
                                {/* <Col sm={6} style={{ marginLeft: "2em" }}><Button variant="outline-danger" onClick={() => handleDelete(selectedRow[0].id)}>Delete</Button></Col>
                                <Col sm={4}> <Button variant="outline-primary" onClick={() => handleUpdate(selectedRow[0])}>Update</Button> </Col> */}
                            </Row>

                        </Container>


                    </Toast.Body>
                </Toast>
            </div><div className='toster-action'>
                <Toast show={showError}>
                    <Toast.Header>
                        <strong className="me-auto"><span style={{ color: "red" }}>Warraning..</span></strong>

                    </Toast.Header>
                    <Toast.Body>
                        <p>Select Only One Record...</p>
                    </Toast.Body>
                </Toast>
            </div>
        </>

    );

}

export default QuestionTable;