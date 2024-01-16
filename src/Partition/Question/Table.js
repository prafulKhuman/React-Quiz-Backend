import "./Table.css";
import React , {useState} from "react";
function Table({rowConfig , columnConfig , tableHading}) {
    

    const { loading, error, data } = rowConfig;

    
    console.log(error , "error");
   
    return (
        <div class="mrl-3 mrr-3" >
            <table id="example" className="table table-striped table-bordered" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        {columnConfig?.map((config, index) => {
                            return config.ColumnID === index ?   <th key={index}>{config.header}</th> : "NULL"
                        })}
                    </tr>
                </thead>
                <tbody>
                    {/* {loading &&
                        <tr>
                            {columnConfig?.map(( index) => {
                                return <td  className="placeholder-glow" key={index}>
                                            <span className="placeholder"></span>
                                       </td>
                            })}
                        </tr>
                    } */}
                    { data?.Category.map((row, rowIndex) => (
                        <tr key={row.id}>
                            {columnConfig.map((column, colIndex) => (
                                <td key={colIndex}>{row[column.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        {columnConfig?.map((config, index) => {
                            return config.ColumnID === index ? <th key={index}>{config.header}</th> : "NULL"
                        })}
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default Table;   