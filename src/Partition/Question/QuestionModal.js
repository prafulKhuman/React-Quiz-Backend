import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_QUIZ } from './../../ApolloClient/Quiz/QuizApollo';
import { GET_QUESTION, CREATE_QUESTION, DELETE_QUESTION, UPDATE_QUESTION } from './../../ApolloClient/Question/QuestionApollo';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import toast, { Toaster } from 'react-hot-toast';
import QuestionTable from './QuestionTable/QuestionTable';
import CommanTable from "../../Component/Table/CommanTable";
import {QuestionColumn} from "../../Config/ColumnConfig"

function QuestionModal() {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [formDataArray, setFormDataArray] = useState([]);
  const [showAccordion, setShowAccordion] = useState(false);
  const [formState, setFormState] = useState({
    question: '',
    options: [
      { id: 'A', value: '', status: false },
      { id: 'B', value: '', status: false },
      { id: 'C', value: '', status: false },
      { id: 'D', value: '', status: false },
    ],
  });


  const QuizList = useQuery(GET_QUIZ);
  const QuestionList = useQuery(GET_QUESTION);

  const [addQuestion] = useMutation(CREATE_QUESTION, {
    refetchQueries: [{ query: GET_QUESTION }],
  });

  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    refetchQueries: [{ query: GET_QUESTION }],
  });

  const [updateQuestion] = useMutation(UPDATE_QUESTION, {
    refetchQueries: [{ query: GET_QUESTION }],
  });

  const handleQuizChange = (e) => {
    const ID = e.target.value;
    const selected = QuizList?.data?.Quiz.find((id) => id.id === ID);
    setSelectedQuiz(selected);
  };

  const handleOptionChange = (e, id) => {
    const { value } = e.target;

    setFormState((prevFormState) => ({
      ...prevFormState,
      options: prevFormState.options.map((option) =>
        option.id === id ? { ...option, value: value, status: false } : option
      ),
    }));
  };

  const handleImageClick = (id) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      options: prevFormState.options.map((option) =>
        option.id === id ? { ...option, status: !option.status } : { ...option, status: false }
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   

    // Validation for Quiz selection
    if (!selectedQuiz.id) {
      
      toast.error("Please select a quiz.");
      return;
    }

    // Validation for Question
    if (!formState.question.trim()) {
    
      toast.error("Please enter a question.");
      return;
    }

    // Validation for Options
    const invalidOptions = formState.options.map((option, index) => {
      if (!option.value.trim()) {
        return `Please enter a value for Option ${String.fromCharCode(65 + index)}.`;
      }
      
      return '';
    });

    if (invalidOptions.some((error) => error !== '')) {
      
      toast.error(invalidOptions);
      return;
    }

    if (!formState.options.some((option) => option.status)) {
      toast.error('Please select at least one option.');
      return;
    }
   
    // Validation for checking if the limit is exceeded
    if (selectedQuiz?.totalQuestion < formDataArray.length + 1) {
      toast.error( 'Limit exceeded');
      return;
    }

    // All validations passed, proceed with form submission
    const updatedFormDataArray = [...formDataArray, { ...formState }];

    setFormDataArray(updatedFormDataArray);

    setFormState((prevFormState) => ({
      ...prevFormState,
      question: '',
      options: [
        { id: 'A', value: '', status: false },
        { id: 'B', value: '', status: false },
        { id: 'C', value: '', status: false },
        { id: 'D', value: '', status: false },
      ],
    }));

    if (selectedQuiz?.totalQuestion === updatedFormDataArray.length) {
      addQuestion({
        variables: { quizName: selectedQuiz.name, quizId: selectedQuiz.id, questions: updatedFormDataArray },
      })
        .then(() => {
          toast.success('Quiz added successfully!');
          setFormDataArray([]);
        })
        .catch((error) => {
          console.error('GraphQL error:', error.message);
          toast.error('Error adding Quiz. Please try again.');
        });
    }
  };


  console.log(QuestionList , "question");
  const response =  QuestionList?.data?.Question.map((row , index)=>{
        
            return  {
              No: index +1 ,
              id: row.id ,
              quizName: row.quizName,
              questionCount : row.questions.length,
              
             }
       
   
  })
 

  const handleRemove =(id)=>{
    
    deleteQuestion({ variables: { id: id } })
      .then(() => {
         toast.success('Question Deleted successfully!');
     })
     .catch((error) => {
         console.error('GraphQL error:', error.message);
         toast.error('Error Deleting Question. Please try again.');
     });


  }
  return (
    <>
      <div >
        <div>
          <p>
            <i className="bi bi-arrow-return-right"></i> DashBoard / Question
          </p>
        </div>
      </div>
      <Card
        border="secondary"
        style={{ width: '95vw', marginTop: '2%', marginLeft: '2%' }}
      >
        <Card.Header>Question Details</Card.Header>
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} md="8" controlId="validationFormik01">
                <Form.Label>Select Quiz</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="QuizList"
                  onChange={handleQuizChange}
                >
                  <option>Open and select quiz</option>
                  {QuizList?.data?.Quiz.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
               
              </Form.Group>
            </Row>
            <div className="mt-5">
              <p className="">
                Name :: <span> {selectedQuiz?.name}</span>
              </p>
              <p className="">
                Description :: <span>{selectedQuiz?.description}</span>
              </p>
              <p className="">
                Category :: <span>{selectedQuiz?.category}</span>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <Accordion defaultActiveKey="0">
        <Card
          border="secondary"
          style={{ width: '95vw', marginTop: '2%', marginLeft: '2%' }}
        >
          <Card.Header>
            <Row>
              <Col className="d-flex align-items-center" md={{ span: 4 }}>
                Add Question{' '}
                <span style={{ marginLeft: '5%', fontWeight: '800' }}>
                  {' '}
                  {formDataArray.length} out of {selectedQuiz?.totalQuestion ? selectedQuiz?.totalQuestion : 0}{' '}
                </span>
              </Col>
              <Col
                className="d-flex justify-content-end align-items-center"
                md={{ span: 3, offset: 5 }}
              >
                <span onClick={() => setShowAccordion(!showAccordion)} style={{ cursor: 'pointer' }}>
                  {' '}
                  <CustomToggle eventKey="0">
                    {showAccordion ? (
                      <i class="bi bi-arrow-bar-down" style={{ fontSize: '2rem', display: 'block', marginRight: '10px' }}></i>
                    ) : (
                      <i class="bi bi-arrow-bar-up" style={{ fontSize: '2rem', display: 'block', marginRight: '10px' }}></i>
                    )}
                  </CustomToggle>{' '}
                </span>
              </Col>
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="10" controlId="validationFormik01">
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                      type="text"
                      name="question"
                      placeholder="Enter Question"
                      value={formState.question}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          question: e.target.value,
                        })
                      }
                    />
                    
                  </Form.Group>
                </Row>
                <Row className="mb-2 mt-5">
                  <Form.Group as={Col} md="7" controlId="validationFormik01">
                    <Form.Label>Options</Form.Label>
                  </Form.Group>
                </Row>
                {formState.options.map((option, index) => (
                  <Row className="ml-2 mb-3" key={option.id}>
                    <Form.Group as={Col} md="10">
                      <Form.Control
                        type="text"
                        name={`option${option.id}`}
                        placeholder={`Enter Option ${option.id}`}
                        value={option.value}
                        onChange={(e) => handleOptionChange(e, option.id)}
                      />
                      
                    </Form.Group>
                    <Form.Group as={Col} md="1">
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleImageClick(option.id)}
                      >
                        {option.status ? (
                          <img
                            width="22"
                            height="22"
                            src="https://img.icons8.com/windows/32/checked--v1.png"
                            alt="checked--v1"
                          />
                        ) : (
                          <img
                            width="22"
                            height="22"
                            src="https://img.icons8.com/fluency-systems-regular/48/circled-x.png"
                            alt="circled-x"
                          />
                        )}
                      </Button>
                     
                    </Form.Group>
                  </Row>
                ))}
                <Row className="justify-content-end">
                  <Form.Group as={Col} md="2" controlId="validationFormik02">
                    <Button style={{ width: '100%' }} type="submit" name="kp">
                      {selectedQuiz?.totalQuestion > formDataArray.length + 1 ? 'Next...' : 'Submit'}
                    </Button>
                  </Form.Group>
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 2000,
                    }}
                  />
                </Row>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
          <div style={{ margin: '20px' }}>
            <QuestionTable RowConfig={formDataArray} />
          </div>
        </Card>
      </Accordion>
      <div className='mt-7'>
            <p className='text-center'>Quiz List</p> 
            {/*   modify = {(data)=>handleUpdate(data)} */}
            <CommanTable rowConfig={response} columnConfig={QuestionColumn} loading={QuestionList?.loading} error={QuestionList?.error} handleDelete={(id)=> handleRemove(id)}/>
      </div>
    </>
  );
}

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div onClick={decoratedOnClick}>
      <div>{children}</div>
    </div>
  );
}

export default QuestionModal;
