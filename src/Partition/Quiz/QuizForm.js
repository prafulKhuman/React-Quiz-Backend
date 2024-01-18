import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery, useMutation } from '@apollo/client';
import { GET_QUIZ, CREATE_QUIZ, DELETE_QUIZ, UPDATE_QUIZ } from './../../ApolloClient/Quiz/QuizApollo'
import { GET_CATEGORY } from './../../ApolloClient/Category/CategoryQuery'
import CommanTable from '../../Component/Table/CommanTable';
import { QuizColumn } from "../../Config/ColumnConfig";


function QuizForm() {


    const { Formik } = formik;


    const quizList = useQuery(GET_QUIZ);
    const { data } = useQuery(GET_CATEGORY);

    const [addQuiz] = useMutation(CREATE_QUIZ, {
        refetchQueries: [{ query: GET_QUIZ }],
    });

    const [deleteQuiz] = useMutation(DELETE_QUIZ, {
        refetchQueries: [{ query: GET_QUIZ }],
    });

    const [updateQuiz] = useMutation(UPDATE_QUIZ, {
        refetchQueries: [{ query: GET_QUIZ }],
    });

    const [record, setRecord] = useState([]);
    const [updateRecord, setUpdateRecord] = useState([]);



    useEffect(() => {
        if (quizList?.data?.Quiz) {
            const updatedRecord = quizList?.data.Quiz.map((item, index) => {
                const response = data?.Category.find((fil) => (fil.id).toString() === item.category);
                console.log(response, "updated");
                if (response !== null) {
                    return {
                        no: index + 1,
                        id: item.id,
                        name: item.name,
                        category: response?.name,
                        description: item.description,
                        totalQuestion: item.totalQuestion,
                    };
                }
                return null;
            });

            setRecord(updatedRecord.filter(Boolean));
        }
    }, [quizList?.data, data]);

    const handleRemove = (Id) => {
        deleteQuiz({ variables: { id: Id.id } })
            .then(() => {
                toast.success('Quiz Deleted successfully!');
            })
            .catch((error) => {
                console.error('GraphQL error:', error.message);
                toast.error('Error Deleting Quiz. Please try again.');
            });

    };


   

    const schema = yup.object().shape({
        QuizName: (updateRecord.length === 0 && yup.string().required())  ,
        QuizCategory:   yup.string().required(),
        QuizDescription:  (updateRecord.length === 0 && yup.string().required()),
        QuizTotal:  (updateRecord.length === 0 && yup.string().required()),
    });




    return (<>
        <div className='ml-3 d-flex justify-content-between'>
            <div><p><i class="bi bi-arrow-return-right"></i> DashBoard / Quiz </p></div>
        </div>

        <Card
            border="secondary"
            style={{ width: '95vw', marginTop: '2%', marginLeft: '2%' }}
        >
            <Card.Header>{updateRecord.length !== 0 ? "Update Quiz" : "Add Quiz"}</Card.Header>
            <Card.Body>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, action) => {

                       
                        (updateRecord.length !== 0 ? updateQuiz({ variables: { id: updateRecord.id, name: (values.QuizName !== '' ? values.QuizName : updateRecord.name ), category:  values.QuizCategory, description: (values.QuizDescription !== '' ? values.QuizDescription : updateRecord.description ) , totalQuestion: (values.QuizTotal !== null ? values.QuizTotal : parseInt(updateRecord.totalQuestion) )  } }) :
                            addQuiz({ variables: { name: values.QuizName, category: values.QuizCategory, description: values.QuizDescription, totalQuestion: values.QuizTotal } }))
                            .then(() => {
                                toast.success(updateRecord.length !== 0 ? 'Quiz Updated successfully!' : 'Quiz Added successfully');
                                setUpdateRecord([]);
                                action.resetForm({
                                    values: {
                                        QuizName: '',
                                        QuizCategory: '',
                                        QuizDescription: '',
                                        QuizTotal: null,
                                    }
                                });


                            })
                            .catch((error) => {
                                console.error('GraphQL error:', error.message);
                                toast.error(updateRecord.length !== 0 ? 'Error Updateing Quiz. Please try again.' : 'Error adding Quiz. Please try again.');
                            });



                    }}
                    initialValues={{
                        QuizName: '',
                        QuizCategory: '',
                        QuizDescription: '',
                        QuizTotal: null,

                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationFormik01">
                                    <Form.Label>Quiz Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="QuizName"
                                        placeholder="Quiz Name"
                                        value={values.QuizName ? values.QuizName : updateRecord?.name ? updateRecord.name : ""}
                                        onChange={handleChange}
                                        {...(updateRecord.length === 0 && { touched, isInvalid: !!errors.QuizName })}

                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.QuizName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormik02">
                                    <Form.Label>Quiz Category</Form.Label>

                                    <Form.Select aria-label="Quiz Select" name="QuizCategory" isInvalid={!!errors.QuizCategory} onChange={handleChange}>
                                        <option>Select Category</option>
                                        {data?.Category.map((item) => (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))}
                                    </Form.Select>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.QuizCategory}
                                    </Form.Control.Feedback>

                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                                    <Form.Label>Quiz Description </Form.Label>
                                    <InputGroup hasValidation>

                                        <Form.Control
                                            type="text"
                                            placeholder="QuizDescription"
                                            aria-describedby="inputGroupPrepend"
                                            name="QuizDescription"
                                            value={values.QuizDescription ? values.QuizDescription : updateRecord?.description ? updateRecord.description : ""}
                                            onChange={handleChange}
                                            {...(updateRecord.length === 0 && { touched, isInvalid: !!errors.QuizDescription })}

                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.QuizDescription}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationFormik03">
                                    <Form.Label>Quiz Total Question</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="QuizTotal"
                                        name="QuizTotal"
                                        value={values.QuizTotal ? values.QuizTotal : updateRecord?.totalQuestion ? updateRecord?.totalQuestion : ""}
                                        onChange={handleChange}
                                        {...(updateRecord.length === 0 && { touched, isInvalid: !!errors.QuizTotal })}

                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.QuizTotal}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="2" controlId="validationFormik02" style={{ marginTop: "2.4%" }}>
                                    <Button type="submit">  {updateRecord.length !== 0 ? "Update Quiz" : "Add Quiz"}</Button>
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
            <h5 className='text-center mt-5 text-uppercase fw-bolder '>Quiz List</h5>
            <CommanTable updateRecord={(item) => setUpdateRecord(item)} rowConfig={record} columnConfig={QuizColumn} loading={quizList.loading} error={quizList.error} handleDelete={(id) => handleRemove(id)}  />

        </div>


    </>);
}

export default QuizForm;