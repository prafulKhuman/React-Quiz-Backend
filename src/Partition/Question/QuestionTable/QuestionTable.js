import DataTable from 'react-data-table-component';
import React , {useState , useEffect} from 'react';
function QuestionTable({RowConfig}) {
    const [selectedRows, setSelectedRows] = useState([]);


    const response =  RowConfig.map((row)=>{
        return  {
          Question: row.question ,
          OptionA : row.options[0].value ,
          OptionB : row.options[1].value ,
          OptionC : row.options[2].value ,
          OptionD : row.options[3].value ,
          Status :  row.options[0].status === true ? "OptionA" : row.options[1].status === true ? "OptionB" : row.options[2].status === true ? "OptionC" : row.options[3].status === true ? "OptionD" : "Not Select"
         }
      })
     console.log(response);
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
           return  <p>{key} :: {data[key]}</p>

         })

         return response ;
    }
    const ExpandedComponent = ({ data }) => <div className='row-extend'>{handleShow(data)}</div>;

    

    


    return (
        <DataTable
            columns={columns}
            data={response}
            selectableRows
            pagination 
            title="Question List"
            // onSelectedRowsChange={handleRowSelected}
            // contextActions={contextActions}
            highlightOnHover
            pointerOnHover 
            expandableRows 
            customStyles={customStyles}
            expandableRowsComponent={ExpandedComponent}
        />
    );

}

export default QuestionTable;