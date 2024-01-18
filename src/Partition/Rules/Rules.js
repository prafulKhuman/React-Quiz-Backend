
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { RulesColumn } from "../../Config/ColumnConfig"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import * as formik from 'formik';
import * as yup from 'yup';
import CommanTable from '../../Component/Table/CommanTable';
import { useQuery, useMutation } from '@apollo/client';
import { GET_QUIZ } from './../../ApolloClient/Quiz/QuizApollo'
import { GET_RULES, CREATE_RULES, DELETE_RULES, UPDATE_RULES } from './../../ApolloClient/Rules/RulesApollo'


function Rules(props) {

  const { data } = useQuery(GET_QUIZ);
  const RulesList = useQuery(GET_RULES);
  const { Formik } = formik;
  
  
  const [record, setRecord] = useState([]);
  const [updateRecord, setUpdateRecord] = useState([]);
  
  
  useEffect(() => {
    if (RulesList?.data?.Rules) {
      const updatedRecord = RulesList?.data?.Rules.map((item, index) => ({
        no: index + 1,
        id: item.id,
        quizid : item.quizid ,
        quiz: item.quiz,
        rules: item.rules,
        
      }));
      
      setRecord(updatedRecord);
    }
  }, [RulesList?.data]);
  
  const schema = yup.object().shape({
    quiz: yup.string().required(),
    rules: (updateRecord.length === 0 && yup.string().required()) ,
  });

 console.log(data);
  const [addRules] = useMutation(CREATE_RULES, {
    refetchQueries: [{ query: GET_RULES }],
  });

  const [deleteRules] = useMutation(DELETE_RULES, {
    refetchQueries: [{ query: GET_RULES }],
  });

  const [updateRules] = useMutation(UPDATE_RULES, {
    refetchQueries: [{ query: GET_RULES }],
  });

  const handleRemove = (Id) => {
    deleteRules({ variables: { id: Id.id } })
      .then(() => {
        toast.success('Rules Deleted successfully!');
      })
      .catch((error) => {
        console.error('GraphQL error:', error.message);
        toast.error('Error Deleting Rules. Please try again.');
      });

  };


  return (<>
    <div className='ml-3 d-flex justify-content-between'>
      <div><p><i class="bi bi-arrow-return-right"></i> DashBoard / Quiz Rules </p></div>
    </div>

    <Card
      border="secondary"
      style={{ width: '95vw', marginTop: '2%', marginLeft: '2%' }}
    >
      <Card.Header> {updateRecord.length !== 0 ? "Update Quiz Rules" :  "Add Quiz Rules"}</Card.Header>
      <Card.Body>


        <Formik
          validationSchema={schema}
          onSubmit={(values, action) => {
          const quizObject = JSON.parse(values.quiz);

            (updateRecord.length !== 0 ?  updateRules({ variables: { id: (updateRecord.id).toString(), quizid : updateRecord.quizid , quiz: quizObject.name, rules: (values.rules !== "" ? values.rules : updateRecord.rules) } }) : 
            addRules({ variables: { quizid: quizObject.id , quiz: quizObject.name, rules: values.rules } }))
              .then(() => {
                toast.success(`Quiz ${updateRecord.length !== 0 ? `Update` : `Added`} successfully!`);
                setUpdateRecord([]);
                action.resetForm({
                  values: {
                    quiz: "",
                    rules: "",
                  }
                });
              })
              .catch((error) => {
                console.error('GraphQL error:', error.message);
                toast.error(`Error ${updateRecord.length !== 0 ? `Updating` : `Adding`} Quiz. Please try again.`);
              });



          }}
          initialValues={{
            quiz: "",
            rules: "",
          }}
        >
          {({ handleSubmit, handleChange , values, touched, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="9" controlId="validationFormik01">
                  <Form.Label>Select Quiz Name</Form.Label>
                  <Form.Select aria-label="Quiz Select" name="quiz" value={values.quiz} isInvalid={!!errors.quiz} onChange={handleChange}>
                    <option>Select Quiz Name</option>
                    {data?.Quiz.map((item) => {
                      return (
                        <option value={JSON.stringify({ id: item.id, name: item.name })}  key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Form.Select>

                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>



              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="9" controlId="validationFormik01">
                  <Form.Label>Rules</Form.Label>
                  <Form.Label style={{marginLeft: "46%" , color:"#dc3545"}}> & Please Add Any Digit Or Character like A- , 1- etc in new line .... </Form.Label>
                  <Form.Control
                    as="textarea" 
                    rows={3}
                    name="rules"
                    value={values.rules ? values.rules : updateRecord?.rules ? updateRecord.rules : ""}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    touched={touched}
                    isInvalid={!!errors.rules}
                 
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.rules}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="validationFormik01" style={{ marginTop: "6%" }}>
                  <Button type="submit">{updateRecord.length !== 0 ? "Update  Rules" :  "Add  Rules"}</Button>
                </Form.Group>

                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 1500,
                  }}
                />
              </Row>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
    <div className='mt-7'>
      <h5 className='text-center mt-5 text-uppercase  mb-4'>Quiz Rules List</h5>
      <CommanTable updateRecord={(item) => setUpdateRecord(item)} rowConfig={record} columnConfig={RulesColumn} loading={RulesList.loading} error={RulesList.error} handleDelete={(id) => handleRemove(id)}  />
    </div>

  </>);
}

export default Rules;