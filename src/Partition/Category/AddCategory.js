import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import React ,{ useEffect , useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import "./../Question/Table.css";
import { useQuery, useMutation} from '@apollo/client';
import { GET_CATEGORY , CREATE_CATEGORY  , DELETE_CATEGORY , UPDATE_CATEGORY} from './../../ApolloClient/Category/CategoryQuery'
import {CategoryColumn} from "../../Config/ColumnConfig"
import CommanTable from '../../Component/Table/CommanTable';



function AddCategory() {
    const categorList = useQuery(GET_CATEGORY);

    const [addCategory] = useMutation(CREATE_CATEGORY, {
        refetchQueries: [{ query: GET_CATEGORY }],
    });

    const [deleteCategory] = useMutation(DELETE_CATEGORY, {
        refetchQueries: [{ query: GET_CATEGORY }],
    });

    const [updateCategory] = useMutation(UPDATE_CATEGORY, {
        refetchQueries: [{ query: GET_CATEGORY }],
    });

  
    const { Formik } = formik;

   

  
    const [ record , setRecord ] = useState([]);
    const [ updatedRecord , setUpdatedRecord ] = useState([]);

    useEffect(() => {
      if (categorList?.data?.Category) {
        const updatedRecord = categorList?.data.Category.map((item, index) => ({
          no: index + 1,
          id: item.id,
          name: item.name
        }));
    
        setRecord(updatedRecord);
      }
    }, [categorList?.data]);

    const schema = yup.object().shape({
        category: (updatedRecord.length === 0 && yup.string().required()) ,
    });


    const handleRemove = (Id) => {
         deleteCategory({ variables: { id: Id.id } })
         .then(() => {
            toast.success('Category Deleted successfully!');
        })
        .catch((error) => {
            console.error('GraphQL error:', error.message);
            toast.error('Error Deleting category. Please try again.');
        });

    };


   

    console.log(updatedRecord , "updatedRecord");
    
    return (<>
        <div>
            <div><p><i class="bi bi-arrow-return-right"></i> DashBoard / Category </p></div>
        </div>
       

        <Card
            border="secondary"
            style={{ width: '95vw', marginTop: '2%', marginLeft: '2%' }}
        >
            <Card.Header> {updatedRecord.length !== 0 ? "Update Category" : "Add Category"} </Card.Header>
            <Card.Body>

                <Formik
                    validationSchema={schema} 
                    onSubmit={(values, action) => {
                        (updatedRecord.length !== 0 ?  updateCategory({ variables: { id: updatedRecord.id, name: (values.category !== '' ? values.category : updatedRecord.name ) } }) : 
                        addCategory({ variables: { name: values.category } }))
                            .then(() => {
                                toast.success(updatedRecord.length !== 0 ? 'Category Updated successfully!' : 'Category Added successfully!');
                                setUpdatedRecord([]);
                                action.resetForm({
                                    values: {
                                        category: ''
                                    }
                                });
                            })
                            .catch((error) => {
                                console.error('GraphQL error:', error.message);
                                toast.error(updatedRecord.length !== 0 ? 'Error Updating category. Please try again.' : 'Error Adding category. Please try again.');
                            });
                    }}
                    initialValues={{
                        category: '',

                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form  onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="7" controlId="validationFormik01">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="category"
                                        placeholder='Eneter Category'
                                        value={values.category ? values.category : updatedRecord?.name ? updatedRecord.name : ""}
                                        onChange={handleChange}
                                        {...(updatedRecord.length === 0 && { touched, isInvalid: !!errors.category })}
                                    />
                                     <Form.Control.Feedback type="invalid">
                                        {errors.category}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="5" controlId="validationFormik02" style={{marginTop: "2.4%"}}>
                                    <Button type="submit"> {updatedRecord.length !== 0 ? "Update Category" : "Add Category"}</Button>
                                    <Toaster
                                        position="top-right"
                                        toastOptions={{
                                            duration: 1500,
                                        }}
                                    />
                                </Form.Group>
                            </Row>
                           
                            
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>

        <div className='mt-7'>
            <p className='text-center'>Category List</p> 
            <CommanTable updateRecord={(item)=> setUpdatedRecord(item)} rowConfig={record} columnConfig={CategoryColumn} loading={categorList.loading} error={categorList.error} handleDelete={(id)=> handleRemove(id)}  />
        </div>

    </ >);
}

export default AddCategory;